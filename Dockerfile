FROM node:14-alpine as base
RUN apk add --no-cache git file re2c autoconf make g++ build-base bash
#install python, this is needed by opensea-creatures
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools

WORKDIR /src
COPY package*.json ./
EXPOSE 80 8080

# FROM base as production
# ENV NODE_ENV=production
# RUN npm ci --only=production
# COPY . ./
# CMD ["node", "bin/www"]

FROM base as dev
ENV NODE_ENV=development
RUN npm install -g nodemon && npm install
COPY . .

CMD [ "node", "src/index" ]
# CMD [ "nodemon", "src/bin/www" ]
