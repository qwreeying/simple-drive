ARG NODE_TAG=node:21-alpine

# Base
FROM --platform=$BUILDPLATFORM $NODE_TAG AS base

WORKDIR /base
COPY . .
RUN corepack enable &&\
    pnpm i

# Backend builder
FROM --platform=$BUILDPLATFORM base AS backend-builder

WORKDIR /base/backend
RUN pnpm pack &&\
    mv backend-*.tgz pack.tgz

# Frontend builder
FROM --platform=$BUILDPLATFORM base AS frontend-builder

WORKDIR /base/frontend
RUN pnpm run build

# Main image
FROM $NODE_TAG AS runner

COPY --from=backend-builder pack.tgz .

RUN corepack enable && \
    tar xvf pack.tgz && \
    rm pack.tgz && \
    mv package app && \
    cd app && \
    pnpm i --production

WORKDIR /app
COPY --from=frontend-builder dist static

CMD ["pnpm", "start"]
