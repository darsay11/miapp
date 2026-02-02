#!/bin/sh
PORT=${PORT:-80}
sed -i "s/PORT_PLACEHOLDER/$PORT/g" /etc/nginx/nginx.conf
nginx -g 'daemon off;'
