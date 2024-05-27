import OpenAI from 'openai';
import type { Stream } from 'openai/streaming';

import ChatCompletionChunk = OpenAI.ChatCompletionChunk;

export type ChatCompletionMessageParam = OpenAI.ChatCompletionMessageParam;
export type ChatCompletionStream = Stream<ChatCompletionChunk>;

// Type guard for ChatCompletionStream
export const isStream = (response: any): response is ChatCompletionStream => {
  return 'controller' in response;
};
