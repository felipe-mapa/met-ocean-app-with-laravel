# METOCEAN APPLICATION WITH LARAVEL
I had developed this application previously with React and plain PHP. To practice my Laravel skills, I decided to convert the backend to Laravel. The interface is still the same but the backend is better structured and more secure with the use of Laravel.
It is an interactive metocean application to help marine professionals to make decisions based on the weather.

[DEMO](http://felipepavanela78601.ipage.com/metocean/)

## How to run this app
Clone project and install dependencies
```
$ git clone https://github.com/felipe-mapa/met-ocean-app-with-laravel
$ cd met-ocean-app-with-laravel
$ composer install
$ npm install
$ npm run dev
```

Generate an application key
```
php artisan key:generate
```

Rename .env.example to .env and modify DB name, username, password to your environment.

Create databse called 'metoc
Migrate database
```
$ php artisan migrate --seed
```

Import 'metocean.sql' into the database

Run backend server.
```
$ php artisan serve
```

## More information
You can see more information on my [previous app](https://github.com/felipe-mapa/met-ocean-app)