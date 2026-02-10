#!/bin/sh
set -e

echo "🚀 Laravel container starting..."

if [ ! -f vendor/autoload.php ]; then
    echo "📦 Installing Composer dependencies..."
    composer install --no-interaction --prefer-dist --optimize-autoloader
fi

if [ ! -f .env ]; then
    echo "⚙️ Creating .env file..."
    cp .env.example .env
    php artisan key:generate
else
    echo "✅ .env already exists"
fi

echo "🧹 Clearing caches..."
php artisan config:clear
php artisan cache:clear
php artisan route:clear

echo "🗄 Running migrations..."
# php artisan migrate --force

echo "✅ Laravel ready!"

exec "$@"
