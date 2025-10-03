FROM oven/bun:latest

WORKDIR /app

COPY bun.lock package.json ./

COPY serviceAccountKey.json ./app

RUN bun install

COPY . .

EXPOSE 5000

CMD ["bun", "run", "dev"]