FROM node:16

WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]

RUN yarn
RUN yarn global add gatsby-cli
RUN gatsby telemetry --disable

COPY . .

ENTRYPOINT [ "gatsby" ]
