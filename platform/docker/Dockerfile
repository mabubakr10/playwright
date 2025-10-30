FROM mcr.microsoft.com/playwright:v1.53.1-jammy

RUN corepack enable && corepack prepare pnpm@10.12.3 --activate

RUN apt-get update && \
    pnpm dlx playwright install-deps && \
    apt-get autoremove -y && \
    apt-get autoclean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

ENV WORKDIR=/app
WORKDIR $WORKDIR

COPY . .

RUN pnpm install --frozen-lockfile && \
    pnpm build
