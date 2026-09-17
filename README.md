# abbtds

## Bootstrap the first administrator

Set `DBFOS_ADMIN_EMAIL` and a unique `DBFOS_ADMIN_PASSWORD` of at least 12 characters in `.env`, then run `php artisan migrate` and `php artisan db:seed`. The seeder creates a `System Administrator` account with username `admin` only when both values are supplied. Re-running it does not reset an existing account's password.
