.ONESHELL:

start.dev:
	cd .infra && docker-compose up

stop.dev:
	cd .infra && docker-compose down -v
