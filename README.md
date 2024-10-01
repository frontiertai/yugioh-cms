# クローン後実行するコマンド
`mkdir ./docker/nginx/logs`  
`mkdir ./docker/mysql`  

# シンボリックリンク
`php artisan storage:link`  

# .env作成
`cp .env.example .env`

# パッケージインストール
* appコンテナに入る
`docker compose exec app bash`
`composer install`
`npm install`

# マイグレーション
* appコンテナに入る  
`docker compose exec app bash`  
`php artisan migrate`  
ロールバック  
`php artisan migrate:rollback`  

# viteサーバー起動
* appコンテナに入る  
`docker compose exec app bash`  
`npm run dev`