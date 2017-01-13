# Service 1

This is a PHP service which authenticate an user based on their Macaroons, and only allow a teacher to access it.

It is a really simple use of [immense](https://github.com/immense/php-macaroons)'s implementation of Macaroons.

To run it, you'll need to install the [implementation's requirements](https://github.com/immense/php-macaroons#requirements). Then, you'll need [composer](https://getcomposer.org/) to install it, by running `composer init` and `composer require immense/macaroons` in this directory.
