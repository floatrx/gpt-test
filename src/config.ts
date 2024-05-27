import OpenAI from 'openai';

// OpenAI
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
export const OPENAI_PROJECT_ID = process.env.OPENAI_PROJECT_ID;
export const CHAT_MODEL: OpenAI.Chat.ChatModel = 'gpt-4';

// Server
export const PORT = process.env.PORT || 3000;
export const REQUESTS_LIMIT = 10;

// Other
export const IS_DEV = process.env.NODE_ENV !== 'production';
export const ONE_MINUTE = 60 * 1000;
