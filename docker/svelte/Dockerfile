FROM node:20 as builder

RUN chsh -s /bin/bash && \
  npm i -g pnpm@8

WORKDIR /home/node

COPY . .

RUN pnpm install --frozen-lockfile

RUN pnpm dlx turbo build --filter client

FROM nginx:1.25.2-alpine

COPY docker/svelte/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /home/node/apps/client/build /usr/share/nginx/html

EXPOSE 80

RUN chown nginx.nginx /usr/share/nginx/html/ -R

CMD nginx -g 'daemon off;'
