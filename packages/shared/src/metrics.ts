import axios from 'axios';
import { config } from './config';

export interface TestMetric {
  testType: string; // Dynamically derived from workspace name
  testCategory: string; // Workspace name (e2e, api, etc.)
  testName: string;
  success: boolean;
  responseTime: number;
  timestamp: number;
  endpoint?: string;
  statusCode?: number;
  errorMessage?: string;
  browser?: string;
  // Feature categorization
  featureType?: string;    // campaigns, sending, analytics, etc.
  subFeature?: string;     // create_campaign, send_email, view_dashboard, etc.
  severity?: 'critical' | 'high' | 'medium' | 'low';
  businessImpact?: string; // revenue, customer_experience, compliance, etc.
}

export interface SLIMetrics {
  availability: number;  // Success rate (0-1)
  latency: number;       // Response time in ms
  errorRate: number;     // Error rate (0-1)
}

export class MetricsReporter {
  private baseUrl = 'https://insights-collector.newrelic.com/v1/accounts';

  constructor(
    private accountId: string = config.newRelicAccountId!,
    private insertKey: string = config.newRelicInsertKey!
  ) { }


  async sendSLIMetrics(sli: SLIMetrics): Promise<void> {
    return this.sendBatchedSLIMetrics([sli]);
  }

  async sendBatchedSLIMetrics(slis: SLIMetrics[]): Promise<void> {
    if (!this.accountId || !this.insertKey) {
      console.warn('New Relic credentials not configured, skipping SLI metrics');
      return;
    }

    if (slis.length === 0) {
      return;
    }

    const events = slis.map(sli => ({
      eventType: 'AutomationSLI',
      ...sli,
      timestamp: Date.now(),
      service: process.env.AUTOMATION_SERVICE || 'automation',
      environment: config.environment
    }));

    const url = `${this.baseUrl}/${this.accountId}/events`;

    try {
      const response = await axios.post(url, events, {
        headers: {
          'Content-Type': 'application/json',
          'X-Insert-Key': this.insertKey
        },
        timeout: 10000
      });

      console.log(`✅ ${events.length} SLI metrics sent to New Relic: ${response.status}`);
    } catch (error: any) {
      console.error(`❌ Failed to send ${events.length} SLI metrics to New Relic:`);
    }
  }

  calculateSLI(metrics: TestMetric[]): SLIMetrics {
    if (metrics.length === 0) {
      return { availability: 0, latency: 0, errorRate: 1 };
    }

    const successCount = metrics.filter(m => m.success).length;
    const availability = successCount / metrics.length;
    const errorRate = 1 - availability;

    // Calculate p95 latency
    const responseTimes = metrics.map(m => m.responseTime).sort((a, b) => a - b);
    const p95Index = Math.floor(responseTimes.length * 0.95);
    const latency = responseTimes[p95Index] || 0;

    return {
      availability,
      latency,
      errorRate
    };
  }
}

export const metricsReporter = new MetricsReporter();
