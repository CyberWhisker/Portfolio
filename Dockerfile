# ----------------------------
# Base image: PHP + FPM
# ----------------------------
FROM php:8.4-fpm

WORKDIR /var/www/html

# ----------------------------
# Install system dependencies + PHP extensions + Nginx + Node 20 + npm + supervisor
# ----------------------------
RUN apt-get update && apt-get install -y \
    nginx \
    supervisor \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libonig-dev \
    libpq-dev \
    zip \
    unzip \
    git \
    curl \
    bash \
    gnupg \
    ca-certificates \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install \
        pdo \
        pdo_pgsql \
        pgsql \
        gd \
        mbstring \
        bcmath \
        exif \
        opcache \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# ----------------------------
# Install Composer
# ----------------------------
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
ENV COMPOSER_MEMORY_LIMIT=-1

# ----------------------------
# Copy Laravel app
# ----------------------------
COPY . .

# ----------------------------
# Install PHP dependencies
# ----------------------------
RUN composer install --no-dev --optimize-autoloader

# ----------------------------
# Install Node dependencies + build React/Vite frontend + SSR bundle
# ----------------------------
RUN npm install
RUN npm run build:ssr

# Verify both client and SSR builds exist
RUN ls -la /var/www/html/public/build && \
    test -f /var/www/html/public/build/manifest.json || \
    (echo "ERROR: Client build failed - manifest.json not found" && exit 1) && \
    test -f /var/www/html/bootstrap/ssr/ssr.js || \
    (echo "ERROR: SSR build failed - ssr.js not found" && exit 1)

# ----------------------------
# Fix permissions
# ----------------------------
RUN mkdir -p /var/www/html/storage /var/www/html/bootstrap/cache \
    && chown -R www-data:www-data /var/www/html \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 755 /var/www/html/public

# ----------------------------
# Copy configs
# ----------------------------
COPY Docker/nginx/default.conf /etc/nginx/sites-available/default
COPY Docker/supervisor/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY Docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# ----------------------------
# Expose port + start
# ----------------------------
EXPOSE 80
CMD ["/entrypoint.sh"]