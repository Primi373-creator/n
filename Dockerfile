FROM node:lts-buster

RUN apt-get update && \
    apt-get install -y \
    ffmpeg \
    imagemagick \
    webp \
    yarn && \
    apt-get upgrade -y && \
    npm install -g pm2 && \
    rm -rf /var/lib/apt/lists/*


COPY . .

EXPOSE 3000

CMD ["yarn", "start"]