FROM oven/bun:latest
WORKDIR /app
COPY bun.lock package.json ./
RUN bun install
COPY . .
EXPOSE 3000
CMD ["bun", "run", "dev"]