FROM php:8.2-apache

ARG APP_SECRET
ARG JWT_PASSPHRASE
ARG DATABASE_URL

ENV APP_SECRET=$APP_SECRET
ENV JWT_PASSPHRASE=$JWT_PASSPHRASE
ENV DATABASE_URL=$DATABASE_URL
ENV APP_ENV=prod
ENV APP_DEBUG=0

RUN a2enmod rewrite
RUN apt-get update && apt-get install --no-install-recommends -y wget unzip libzip-dev libicu-dev libpq-dev && \
    docker-php-ext-install zip intl opcache pdo pdo_pgsql

RUN wget https://getcomposer.org/download/latest-stable/composer.phar && \
    mv composer.phar /usr/bin/composer && \
    chmod +x /usr/bin/composer

WORKDIR /var/www/
COPY .docker/apache.conf /etc/apache2/sites-available/000-default.conf
COPY .docker/php-overrides.ini /usr/local/etc/php/conf.d
COPY .docker/entrypoint.sh /entrypoint.sh
COPY . /var/www/

RUN chmod +x /entrypoint.sh

RUN composer install --no-ansi --no-dev --no-interaction --no-progress --optimize-autoloader
RUN php bin/console lexik:jwt:generate-keypair --skip-if-exists

CMD ["apache2-foreground"]
ENTRYPOINT [ "/entrypoint.sh" ]