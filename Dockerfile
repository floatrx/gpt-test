# Main
FROM node:20

# Install bun globally
RUN npm install -g bun@latest

WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install

COPY . .

# Demo
WORKDIR /app/demo
RUN bun install
RUN bun run build
COPY . .

WORKDIR /app

CMD [ "bun", "dev" ]
