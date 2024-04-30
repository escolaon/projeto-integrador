FROM oven/bun
# USER bun
# EXPOSE 3000/tcp
WORKDIR /usr/src/app
COPY . .
RUN bun run init
RUN bun run migrate
RUN bun run build
CMD bun run prod