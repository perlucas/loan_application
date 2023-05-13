FROM node:17

WORKDIR /home/node/app

COPY . .

RUN chown -Rh node:node /home/node/app

USER node

RUN npm install

RUN npm run build

# CMD npm run start:dev
CMD node ./build/src/index.js