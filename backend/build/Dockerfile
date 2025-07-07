FROM denoland/deno:2.4.0 as builder
WORKDIR /app
COPY . .
RUN deno cache src/main.ts

FROM denoland/deno:latest
WORKDIR /app

COPY --from=builder --chown=deno:deno /app .

USER deno

CMD ["deno", "run", "--allow-net", "--allow-env", "--allow-sys", "src/main.ts"]
