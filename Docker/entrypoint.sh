#!/bin/sh

# Create storage link
php artisan storage:link || true

# Migrate database
php artisan migrate

# Generate optimized caches for production
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Create log directory for supervisor
mkdir -p /var/log/supervisor

# Start all services via supervisor
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf