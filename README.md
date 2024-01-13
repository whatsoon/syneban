## 📌 Syneban

Simple kanban board web application developed with Symfony and Next.js

## ⚙ Environments

Rename `.env.example` to `.env` and fill in the values.

Variables:

- `POSTGRES_USER` - Database username
- `POSTGRES_PASSWORD` - Database password
- `POSTGRES_DB` - Database name
- `SYMFONY_APP_SECRET` - Symfony secret
- `SYMFONY_JWT_PASSPHRASE` - JWT passphrase
- `GOOGLE_CLIENT_ID` - Google client ID
- `GOOGLE_LOGIN_URI` - Google login URI
- `SITE_URL` - Next.js URL (e.g. `http://localhost:3000`)
- `API_HOST` - Symfony URL (e.g. `http://localhost:3000`)

## 🐳 Docker

Run `docker-compose up -d`
