FROM node:20.11-slim AS builder

RUN mkdir -p /usr/app/node_modules \
    && mkdir -p /usr/app/tmp \
    && chown -R node:node /usr/app

WORKDIR /usr/app

COPY --chown=node:node . .

USER node

RUN yarn install --frozen-lockfile \
    && yarn build \
    && rm -rf node_modules \
    && yarn install --frozen-lockfile --silent --production

# Final version
FROM node:20.11-alpine as FINAL

WORKDIR /usr/app

USER node

COPY --chown=node:node --from=BUILDER /usr/app/ ./

EXPOSE 3333

RUN ["chmod", "+x", "/usr/app/init.sh"]

ENTRYPOINT ["./init.sh"]