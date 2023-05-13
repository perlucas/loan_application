FROM node:17

WORKDIR /home/node/app

COPY . .

RUN chown -Rh node:node /home/node/app

USER node

RUN npm install

CMD npm run start