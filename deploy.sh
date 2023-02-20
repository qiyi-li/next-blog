docker start b21&&
cd /home/blog/app/next-blog &&
git pull &&
yarn install --production=false &&
yarn build &&
docker build . -t node-blog-app &&
docker kill app &&
docker rm app &&
docker run --name app --network=host -p 4000:4000 -d node-blog-app&&
echo 'deploy success'