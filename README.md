## Setup

Persyaratan:

-   Docker
-   Docker Compose
-   WSL

Sebelum menjalankan perintah `docker-compose up -d --build` untuk pertama kali, kamu harus menjalankan perintah berikut:

```bash
   docker-compose run --rm -v $HOME/.cache/composer:/tmp -e COMPOSER_HOME=/tmp php composer install
   docker-compose run --rm node npm install
```

Sekarang kamu dapat menjalankan perintah :

```bash
   docker-compose up -d --build
```
