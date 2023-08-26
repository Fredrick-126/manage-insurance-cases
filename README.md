# Insurance Cases

## Installation
This project based Laravel framework 10.x, so suggest to read [Laravel Document](https://laravel.com/docs/10.x/installation) 
before starting installation.

### Clone project from git
- `git clone https://github.com/webdev103/insurance-cases-manage.git`

### Install packages
- `cd insurance-cases-manage`
- `composer install`
- `npm install`

### Configuration .env file
Make the `.env` file if not exists and then edit environment variables in the `.env` file 
- `cp .env.example .env`

### Database migration
Before doing migration, DB should be created first in the mysql. 
#### After creating DB, execute php artisan commands:
- `php artisan db:migrate`
- `php artisan db:seed`

### Front end develop
- `npm run watch`

### Front end build
- `npm run build`
