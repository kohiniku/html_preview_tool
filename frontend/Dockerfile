FROM node:20-alpine AS base

WORKDIR /app

RUN corepack enable

COPY frontend/package.json /app/package.json
RUN pnpm install

COPY frontend /app

RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]
