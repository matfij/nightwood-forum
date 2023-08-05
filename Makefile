.ONESHELL:

build.dev:
	cd .infra && docker-compose up --build

start.dev:
	cd .infra && docker-compose up

stop.dev:
	cd .infra && docker-compose down -v

gen.api.client:
	cd apps/generator && npm run gen:spec && npm run gen:client
	rm -r apps/auth/src/modules/gateway/clients/generator
	mv apps/generator/generator-client apps/auth/src/modules/gateway/clients/generator


Beware vitest@0.34
