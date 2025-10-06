FROM oven/bun:latest

WORKDIR /app

COPY bun.lock package.json serviceAccountKey.json /

RUN bun install

COPY . .

EXPOSE 5000

CMD ["bun", "src/index.ts"]