<?php

if (($_SERVER['VERCEL'] ?? $_ENV['VERCEL'] ?? null) === '1') {
    $storagePath = sys_get_temp_dir().'/dbfos-storage';

    $_ENV['SESSION_DRIVER'] ??= 'array';
    $_SERVER['SESSION_DRIVER'] ??= 'array';
    $_ENV['CACHE_STORE'] ??= 'array';
    $_SERVER['CACHE_STORE'] ??= 'array';

    foreach (['framework/cache/data', 'framework/sessions', 'framework/views', 'logs'] as $directory) {
        $path = $storagePath.'/'.$directory;

        if (! is_dir($path) && ! mkdir($path, 0775, true) && ! is_dir($path)) {
            throw new RuntimeException("Unable to create Laravel storage directory: {$path}");
        }
    }

    $_ENV['LARAVEL_STORAGE_PATH'] = $_SERVER['LARAVEL_STORAGE_PATH'] = $storagePath;
    $_ENV['APP_PACKAGES_CACHE'] = $_SERVER['APP_PACKAGES_CACHE'] = $storagePath.'/packages.php';
    $_ENV['APP_SERVICES_CACHE'] = $_SERVER['APP_SERVICES_CACHE'] = $storagePath.'/services.php';
}

require __DIR__.'/../public/index.php';
