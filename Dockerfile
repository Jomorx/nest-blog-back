# 引用镜像
FROM node:latest
# 作者
# docker build -t nest/blog:0.1  .
# docker run -id -p 3000:3000  nest/blog:0.1
# MAINTAINER hch
# 容器启动命令
CMD ["node","./dist/main.js -p 3000:3000"]