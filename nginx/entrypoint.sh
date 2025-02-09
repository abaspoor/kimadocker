#!/bin/sh

# Replace environment variables in nginx.template.conf and save as nginx.conf
envsubst '$BACKEND_URL $FRONTEND_URL' < /etc/nginx/nginx.template.conf > /etc/nginx/nginx.conf

# Start Nginx
exec nginx -g "daemon off;"
