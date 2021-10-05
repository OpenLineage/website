FROM node:16

WORKDIR /app

COPY . .

RUN yarn
RUN yarn global add gatsby-cli
RUN gatsby telemetry --disable

CMD [ "gatsby", "build" ]
