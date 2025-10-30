build:
	docker compose build

setup: build
	docker compose run --rm tests sh -c "\
		pnpm install && \
		pnpm --filter shared build"

reset:
	docker compose down --volumes --remove-orphans
	$(MAKE) setup

shell:
	docker compose run --rm tests bash

synthetics-%:
	docker compose run --rm tests pnpm --filter synthetics-$* test

smoke-%:
	rm -rf packages/smoke/$*/.features-gen
	docker compose run --rm tests pnpm --filter smoke-$* bddgen
	docker compose run --rm tests pnpm --filter smoke-$* test

test-all:
	docker compose run --rm tests pnpm test
