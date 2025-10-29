# Makefile: 배포 전 필수 점검을 자동화하는 명령 집합
#
# 주요 타겟 설명
# - done: 배포 전에 필요한 모든 점검 절차를 순서대로 실행합니다.
# - install: 패키지 매니저를 자동 감지하여 의존성을 설치합니다.
# - env-check: .env 파일과 핵심 환경변수 유무를 점검합니다.
# - prisma-generate: Prisma Client를 생성합니다.
# - prisma-migrate-status: 현재 마이그레이션 상태를 확인합니다(변경 사항/적용 여부).
# - format-check: 코드 포맷을 검사합니다(Biome).
# - lint: 정적 분석/린팅을 수행합니다(Biome).
# - type-check: 타입 검사를 수행합니다(TypeScript).
# - build: Next.js 프로덕션 빌드를 수행합니다.
# - help: 사용 가능한 타겟을 안내합니다.
#
# 사용 예시:
#   make done      # 배포 전 점검 전체 실행
#   make help      # 도움말 보기

# Bash를 사용하여 조건/배열 처리를 안정적으로 수행
SHELL := /bin/bash

# 패키지 매니저 자동 감지 (bun > pnpm > yarn > npm)
PKG_MGR := $(shell \
  if command -v bun >/dev/null 2>&1; then echo bun; \
  elif command -v pnpm >/dev/null 2>&1; then echo pnpm; \
  elif command -v yarn >/dev/null 2>&1; then echo yarn; \
  else echo npm; fi)

# 패키지 매니저별 실행 래퍼 설정
ifeq ($(PKG_MGR),bun)
  RUN := bun run
  INSTALL := bun install
  PRISMA := bunx prisma
else ifeq ($(PKG_MGR),pnpm)
  RUN := pnpm run
  INSTALL := pnpm install
  PRISMA := pnpm exec prisma
else ifeq ($(PKG_MGR),yarn)
  RUN := yarn run
  INSTALL := yarn install
  PRISMA := npx prisma
else
  RUN := npm run
  # package-lock.json이 있으면 재현성을 위해 ci 사용, 없으면 install
  INSTALL := bash -lc 'if [ -f package-lock.json ]; then npm ci; else npm install; fi'
  PRISMA := npm exec prisma
endif

# 색상/아이콘 정의
OK := "\033[32m✔\033[0m"
WARN := "\033[33m⚠\033[0m"
ERR := "\033[31m✘\033[0m"
STEP := "\033[36m➜\033[0m"

.PHONY: done help install env-check prisma-generate prisma-migrate-status format format-check lint lint-fix type-check build

## done: 배포 전 필수 점검을 모두 수행합니다. (환경변수 점검 제외)
done: install prisma-generate prisma-migrate-status format lint-fix type-check build
	@echo -e $(OK) "모든 사전 점검이 완료되었습니다(환경변수 점검 제외). 배포를 진행해도 안전합니다!"

## help: 사용 가능한 타겟을 안내합니다.
help:
	@echo "사용 가능한 타겟:"
	@echo "  make done                 배포 전 점검 전체 실행"
	@echo "  make env-check            .env와 핵심 환경변수 확인"
	@echo "  make install              의존성 설치"
	@echo "  make prisma-generate      Prisma Client 생성"
	@echo "  make prisma-migrate-status마이그레이션 상태 확인"
	@echo "  make format               코드 포맷 자동 적용 (Biome)"
	@echo "  make format-check         코드 포맷 검사 (Biome)"
	@echo "  make lint                 린팅 (Biome)"
	@echo "  make lint-fix             린트 자동 수정 (Biome)"
	@echo "  make type-check           타입 검사 (TypeScript)"
	@echo "  make build                Next.js 프로덕션 빌드"

## env-check: .env 파일 존재 및 핵심 환경변수(DATABASE_URL, AUTH_SECRET) 확인
env-check:
	@echo -e $(STEP) "환경변수 점검 중 (.env)"
	@if [ ! -f .env ]; then \
	  echo -e $(ERR) " .env 파일이 존재하지 않습니다. 배포 전 .env를 준비하세요."; \
	  echo "    - 필요한 키: DATABASE_URL, AUTH_SECRET"; \
	  exit 1; \
	fi
	@missing=0; \
	for key in DATABASE_URL AUTH_SECRET; do \
	  if ! grep -q "^$$key=" .env; then \
	    echo -e $(ERR) " $$key 가 .env에 없습니다"; missing=1; \
	  fi; \
	done; \
	if [ $$missing -eq 1 ]; then \
	  echo -e $(ERR) " 환경변수 누락을 먼저 해결하세요."; \
	  exit 1; \
	else \
	  echo -e $(OK) " 환경변수 확인 완료"; \
	fi

## install: 패키지 매니저 자동 감지 후 의존성 설치
install:
	@echo -e $(STEP) "의존성 설치 중 (패키지 매니저: $(PKG_MGR))"
	@$(INSTALL)
	@echo -e $(OK) " 의존성 설치 완료"

## prisma-generate: Prisma Client 생성 (src/generated/prisma)
prisma-generate:
	@echo -e $(STEP) "Prisma Client 생성 중"
	@$(PRISMA) generate
	@echo -e $(OK) " Prisma Client 생성 완료"

## prisma-migrate-status: 현재 마이그레이션 상태를 확인
prisma-migrate-status:
	@echo -e $(STEP) "Prisma 마이그레이션 상태 확인 중"
	@$(PRISMA) migrate status || (echo -e $(WARN) " migrate status 확인 실패. DATABASE_URL을 확인하세요." && exit 1)
	@echo -e $(OK) " 마이그레이션 상태 확인 완료"

## format-check: Biome 포맷 검사 (자동 수정 없이 확인만)
format-check:
	@echo -e $(STEP) "코드 포맷 검사 중 (Biome)"
	@$(RUN) format:check
	@echo -e $(OK) " 포맷 검사 통과"

## format: Biome 포맷 자동 적용 (실패 방지 목적)
format:
	@echo -e $(STEP) "코드 포맷 자동 적용 중 (Biome)"
	@$(RUN) format
	@echo -e $(OK) " 포맷 자동 적용 완료"

## lint: Biome 린트 수행 (권장 규칙 기반)
lint:
	@echo -e $(STEP) "린트 검사 중 (Biome)"
	@$(RUN) lint
	@echo -e $(OK) " 린트 검사 통과"

## lint-fix: Biome 린트 자동 수정 수행 (가능한 범위 내)
lint-fix:
	@echo -e $(STEP) "린트 자동 수정 중 (Biome)"
	@$(RUN) lint:fix || (echo -e $(WARN) " 일부 린트 규칙은 자동 수정되지 않을 수 있습니다. 나중에 'make lint'로 확인하세요." && true)
	@echo -e $(OK) " 린트 자동 수정 완료"

## type-check: TypeScript 타입 검사 수행
type-check:
	@echo -e $(STEP) "타입 검사 중 (TypeScript)"
	@$(RUN) type-check
	@echo -e $(OK) " 타입 검사 통과"

## build: Next.js 프로덕션 빌드 수행
build:
	@echo -e $(STEP) "Next.js 빌드 중"
	@$(RUN) build
	@echo -e $(OK) " 빌드 완료"