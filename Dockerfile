FROM node:20
WORKDIR /usr/src/app
COPY package.json bun.lockb ./
RUN npm install -g bun@latest
RUN bun install
COPY . .
CMD [ "bun", "dev" ]
