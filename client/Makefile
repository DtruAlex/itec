docker := docker
compose	:= $(docker) compose
exec := $(compose) exec
run := $(compose) run
args = $(filter-out $@,$(MAKECMDGOALS))

.PHONY: help
help: ## Show available commands list
	@cat $(MAKEFILE_LIST) | grep -e "^[a-zA-Z_\-]*: *.*## *" | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

start: stop ## Start all project containers
	$(compose) up -d --remove-orphans
.PHONY: start

start-verbose: stop ## Start all project containers with verbosity
	$(compose) up --remove-orphans
.PHONY: start

stop: ## Stop the project containers
	- @docker ps -aq | xargs docker stop | xargs docker rm >/dev/null 2>&1
.PHONY: stop

restart: ## Restart all project containers
	$(compose) restart $(s)
.PHONY: restart

erase: ## Erase containers with related volumes
	$(compose) down -v
.PHONY: erase

install-npm:
	$(exec) npm install
.PHONY: install-npm

update-code: ## Update project submodules
	- git pull
.PHONY: update-code

update-submodules: ## Update project submodules
	git submodule update --recursive --remote
.PHONY: update-submodules

build-frontend:
	$(exec) npm run build
.PHONY: build-frontend

init:
    install-npm start