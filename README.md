# クローン後実行するコマンド
`mkdir ./docker/nginx/logs`  
`mkdir ./docker/mysql`  

# マイグレーション
appコンテナ内で実行  
`php artisan migrate`  
ロールバック  
`php artisan migrate:rollback`  