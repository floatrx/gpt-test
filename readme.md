# ✨ GPT-Test

## Description

This is a simple test project for the OpenAI API for learning purposes.

> [!CAUTION]
> It requires an API key from OpenAI to work and positive credit balance to make requests.

### Quick start using Docker (recommended)

```bash
docker-compose up --build
```

Open `http://localhost:3000/` in your browser.

### Manual setup (required `bun`)

> [!CAUTION]
> This project requires `bun` to be installed globally.

You can install it using the following commands:

With npm:

```bash
npm install -g bun@latest # or
yarn global add bun@latest
```

After installing bun globally, you can use it as the interpreter for any JavaScript or TypeScript file by running bun <filename> in your terminal.

Please note that you might need to add the global npm or yarn directory to your system's PATH if it's not already there. You can do this by adding the following line to your shell profile file (like .bashrc, .bash_profile, or .zshrc):

```bash
export PATH=$(npm prefix -g)/bin:$PATH # for npm
export PATH=$(yarn global bin):$PATH # for yarn
```

## Installation

1. Clone this repository.
2. Run `bun install` to install the dependencies.

## Usage

1. Start the server by running `bun dev`.
2. Open `http://localhost:3000/` in your browser.

## Dependencies

-   `express`: A web application framework for Node.js.
-   `openai`: The official OpenAI API client.
-   `express-rate-limit`: Middleware for rate-limiting incoming requests.
-   `express-async-handler`: Middleware for handling exceptions inside async express routes.
-   `typescript`: Better than JavaScript.

## Roadmap

-   [x] Add basic functionality.
-   [x] Add rate limiting.
-   [ ] Add telegram bot.
-   [ ] Add more features & tests.
