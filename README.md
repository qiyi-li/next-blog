## 创建容器

```
docker run -v "$PWD/blog-data":/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:14

```

## 创建数据库

``` 
docker exec -it 容器id bash
psql -U blog
CREATE DATABASE blog_development ENCODING 'UTF8' LC_COLLATE 'en_US.utf8' LC_CTYPE 'en_US.utf8';
```

## 清空之前的开发环境

```
docker kill 容器id
docker rm 容器id
rm -rf blog-data 
或
docker volume rm blog-data
```

## 数据表

```
yarn m:run
node dist/seed.js 
```

## docker build
```
docker build . -t node-blog-app
```
## docker run
```
docker run --network=host -p 3000:3000 -d node-blog-app
```
ssh blog@T 'sh /home/blog/app/next-blog/deploy.sh'

## nginx
```
docker run --name nginx1 --network=host -v /home/blog/app/next-blog/nginx.conf:/etc/nginx/conf.d/default.conf -v /home/blog/app/next-blog/.next/static:/usr/shar/nginx/html/_next/static nginx:1.23.3
```