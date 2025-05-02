FROM denoland/deno:latest as builder
WORKDIR /app
COPY . .
RUN deno cache src/main.ts

FROM denoland/deno:latest
WORKDIR /app

RUN addgroup --system --gid 1001 deno && \
    adduser --system --uid 1001 --gid 1001 deno
COPY --from=builder --chown=deno:deno /app .

USER deno

CMD ["deno", "run", "--allow-net", "--allow-env", "--allow-sys", "src/main.ts"]
