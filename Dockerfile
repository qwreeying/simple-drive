ARG NODE_TAG=node:21-alpine

# Base
FROM --platform=$BUILDPLATFORM $NODE_TAG AS base

WORKDIR /base
COPY . .
RUN corepack enable &&\
    pnpm i

# Backend builder
FROM --platform=$BUILDPLATFORM base AS builder-backend

WORKDIR /base/backend
RUN pnpm pack &&\
    mv backend-*.tgz pack.tgz

# Frontend builder
FROM --platform=$BUILDPLATFORM base AS builder-frontend

WORKDIR /base/frontend
RUN pnpm run build

# Main builder
FROM $NODE_TAG AS builder

COPY --from=builder-backend /base/backend/pack.tgz pack.tgz

RUN corepack enable && \
    tar xvf pack.tgz && \
    rm pack.tgz && \
    mv package app && \
    cd app && \
    pnpm i --production

COPY --from=builder-frontend /base/frontend/dist /app/static

# Main image
FROM builder AS runner

WORKDIR /app

ENV PORT="3000"
ENV NODE_ENV="production"
ENV DRIVE="/data/files"
ENV DB="/data/data.db"

CMD ["node", "dist/index.js"]
