# 引用镜像
FROM node:latest AS builder
# 作者
# docker build -t nest/blog:0.1  .
# docker run -id -p -rm 3000:3000  nest/blog:0.1
# MAINTAINER hch
WORKDIR /code
RUN npm i pnpm -g
ADD package.json pnpm-lock.yaml /code/
RUN pnpm install
# 容器启动命令
ADD . /code
CMD ["node","./dist/main.js -p 3000:3000"]
