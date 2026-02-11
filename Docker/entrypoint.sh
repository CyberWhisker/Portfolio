#!/bin/sh
set -e

echo "🚀 Laravel container starting..."

# Wait for PostgreSQL to be ready
echo "⏳ Waiting for database..."
max_tries=30
count=0
until nc -z pgsql 5432 || [ $count -eq $max_tries ]; do
  echo "Database not ready yet... ($count/$max_tries)"
  sleep 2
  count=$((count + 1))
done

if [ $count -eq $max_tries ]; then
  echo "❌ Database connection timeout!"
  exit 1
fi

echo "✅ Database is ready!"

# Install dependencies if missing
if [ ! -f vendor/autoload.php ]; then
    echo "📦 Installing Composer dependencies..."
    composer install --no-interaction --prefer-dist --optimize-autoloader
fi

# Ensure .env exists
if [ ! -f .env ]; then
    echo "⚙️ Creating .env file..."
    cp .env.example .env
    php artisan key:generate
fi

# Set permissions
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Clear caches
echo "🧹 Clearing caches..."
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

# Run migrations
echo "🗄️ Running migrations..."
php artisan migrate --force

echo "✅ Laravel ready!"

exec "$@"