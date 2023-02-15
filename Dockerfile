FROM node:16
WORKDIR /var/www/node
COPY package.json ./
RUN yarn install
COPY . ./
CMD [  "npm", "run", "start:dev"  ]