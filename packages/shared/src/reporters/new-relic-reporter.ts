import type {
  FullConfig,
  FullResult,
  Reporter,
  Suite,
  TestCase,
  TestResult
} from '@playwright/test/reporter';
import { metricsReporter, TestMetric, deriveTestTypeFromWorkspace, deriveTestCategoryFromWorkspace } from '../index';

export default class NewRelicReporter implements Reporter {
  private testResults: TestMetric[] = [];

  onBegin(config: FullConfig, suite: Suite) {
    console.log(`🚀 Starting test run with ${suite.allTests().length} tests`);
  }

  onTestEnd(test: TestCase, result: TestResult) {
    // Dynamically determine test type from workspace directory name
    const testType = deriveTestTypeFromWorkspace(test.location.file);
    const testCategory = deriveTestCategoryFromWorkspace(test.location.file);

    // Extract custom tags
    const customTags = this.extractCustomTags(test);

    const metric: TestMetric = {
      testType,
      testCategory,
      testName: this.getCleanTestName(test),
      success: result.status === 'passed',
      responseTime: result.duration,
      timestamp: Date.now(),
      errorMessage: result.error?.message,
      // Add browser info for E2E tests
      ...(testCategory === 'e2e' && { browser: test.parent.project()?.name }),
      // Add custom feature tags
      ...customTags
    };

    this.testResults.push(metric);

    const status = result.status === 'passed' ? '✅' : '❌';
    const featureInfo = customTags.featureType ? `[${customTags.featureType}${customTags.subFeature ? ':' + customTags.subFeature : ''}]` : '';
    console.log(`${status} ${metric.testType.toUpperCase()}: ${featureInfo} ${metric.testName} (${metric.responseTime}ms)`);
  }

  async onEnd(result: FullResult) {
    console.log(`\n📊 Test run completed: ${result.status}`);

    if (this.testResults.length === 0) {
      console.log('No tests found');
      return;
    }


    // Collect all SLI metrics to send in a single batch
    const sliMetrics: any[] = [];


    // Calculate SLI metrics by feature type
    const featureTypes = [...new Set(this.testResults.map(t => t.featureType).filter(Boolean))];
    for (const featureType of featureTypes) {
      const featureTests = this.testResults.filter(t => t.featureType === featureType);
      if (featureTests.length > 0) {
        const featureSli = metricsReporter.calculateSLI(featureTests);
        const testType = featureTests[0].testType; // Get actual test type
        sliMetrics.push(this.createSLIWithContext(featureSli, testType, featureTests.length, { featureType, dimensionType: 'feature' }, featureTests));
      }
    }

    // Calculate SLI metrics by severity
    const severities = [...new Set(this.testResults.map(t => t.severity).filter(Boolean))];
    for (const severity of severities) {
      const severityTests = this.testResults.filter(t => t.severity === severity);
      if (severityTests.length > 0) {
        const severitySli = metricsReporter.calculateSLI(severityTests);
        const testType = severityTests[0].testType; // Get actual test type
        sliMetrics.push(this.createSLIWithContext(severitySli, testType, severityTests.length, { severity, dimensionType: 'severity' }, severityTests));
      }
    }

    // Overall SLI
    const overallSli = metricsReporter.calculateSLI(this.testResults);
    const overallTestType = this.testResults[0]?.testType || 'unknown';
    sliMetrics.push(this.createSLIWithContext(overallSli, overallTestType, this.testResults.length, { dimensionType: 'overall' }, this.testResults));

    // Send all SLI metrics in a single batch
    if (sliMetrics.length > 0) {
      console.log(`\n📊 Sending ${sliMetrics.length} SLI metrics to New Relic in batch...`);
      await metricsReporter.sendBatchedSLIMetrics(sliMetrics);
    }

    this.printSummary();
  }

  private createSLIWithContext(sli: any, testType: string, testCount: number, extraContext?: any, testSamples?: TestMetric[]) {
    // Derive testCategory from the first test sample if available
    const testCategory = testSamples?.[0]?.testCategory || deriveTestCategoryFromWorkspace(`/packages/${testType}/`);
    
    return {
      ...sli,
      testType,
      testCategory,
      testCount,
      service: process.env.AUTOMATION_SERVICE || 'automation',
      environment: process.env.APP_ENV,
      ...extraContext
    };
  }

  private extractCustomTags(test: TestCase): Partial<TestMetric> {
    const tags: Partial<TestMetric> = {};

    // Extract feature type tags (@campaigns, @sending, @analytics)
    const featureTag = test.tags.find((tag: string) => tag.startsWith('@') && !['@critical', '@high', '@medium', '@low', '@revenue', '@customer_experience', '@compliance', '@security'].includes(tag));
    if (featureTag) {
      // example: @campaigns/list becomes featureType: 'campaigns', subFeature: 'list'
      const featureParts = featureTag.substring(1).split('/');
      tags.featureType = featureParts[0]; // Remove @ prefix
      tags.subFeature = featureParts[1] || ''; // Default to empty string if no subfeature
    }

    // Extract severity from tags (@critical, @high, @medium, @low)
    const severityTag = test.tags.find((tag: string) => ['@critical', '@high', '@medium', '@low'].includes(tag));
    if (severityTag) {
      tags.severity = severityTag.substring(1) as 'critical' | 'high' | 'medium' | 'low';
    }

    // Extract business impact from tags (@revenue, @customer_experience, @compliance)
    const impactTag = test.tags.find((tag: string) => ['@revenue', '@customer_experience', '@compliance', '@security'].includes(tag));
    if (impactTag) {
      tags.businessImpact = impactTag.substring(1);
    }

    return tags;
  }

  private getCleanTestName(test: TestCase): string {
    // Remove describe block names and just use test title
    return test.title.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_').toLowerCase();
  }

  private printSummary() {
    console.log('\n📈 SLI Summary:');

    const passed = this.testResults.filter(t => t.success).length;
    const total = this.testResults.length;
    const availability = (passed / total) * 100;

    const responseTimes = this.testResults.map(t => t.responseTime).sort((a, b) => a - b);
    const p95Index = Math.floor(responseTimes.length * 0.95);
    const p95Latency = responseTimes[p95Index] || 0;

    const errorRate = ((total - passed) / total) * 100;

    console.log(`   Availability: ${availability.toFixed(1)}% (${passed}/${total})`);
    console.log(`   Latency (P95): ${p95Latency}ms`);
    console.log(`   Error Rate: ${errorRate.toFixed(1)}%`);

    // Breakdown by test type
    const testTypes = [...new Set(this.testResults.map(t => t.testType))];
    for (const testType of testTypes) {
      const typeTests = this.testResults.filter(t => t.testType === testType);
      const typePassed = typeTests.filter(t => t.success).length;
      console.log(`   ${testType.toUpperCase()} Tests: ${typePassed}/${typeTests.length} passed`);
    }
  }
}
