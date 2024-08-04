FROM node:lts-buster

RUN apt-get update && \
  apt-get install -y \
  ffmpeg \
  imagemagick \
  webp && \
  apt-get upgrade -y && \
  rm -rf /var/lib/apt/lists/*
  
RUN git clone https://github.com/DeeCeeXxx/Queen_Anita-V3

COPY package.json .

RUN npm install && npm install qrcode-terminal
RUN npm install pm2 -g
RUN npm install --legacy-peer-deps


COPY . .

EXPOSE 3000

CMD ["node", "index.js", "--server"]
