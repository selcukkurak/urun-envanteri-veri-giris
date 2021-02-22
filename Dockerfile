FROM nginx:1.17-alpine

COPY build /usr/share/nginx/html
COPY docker/default.conf /etc/nginx/conf.d/

EXPOSE 80