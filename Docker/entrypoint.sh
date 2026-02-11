#!/bin/sh

# Cache Laravel
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan cache:clear

# Start PHP-FPM in the background
php-fpm -D

# Start Nginx in the foreground
nginx -g "daemon off;"
