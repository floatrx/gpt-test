import { CHAT_MODEL } from '@/config';
import { randomDelay } from '@/lib/delay';
import { openai } from '@/openai';

import { type ChatCompletionMessageParam, isStream } from '@/types/openai';

export const createPrompt = async (
  prompt = '',
  params?: string[],
  stream = false,
  onChunk?: (content?: string | null) => void,
) => {
  const extraParams: ChatCompletionMessageParam[] = params?.map((param) => ({ role: 'system', content: param })) || [];

  const messages: ChatCompletionMessageParam[] = [
    { role: 'system', content: "you're chat assistant and your name is Floatrx" },
    { role: 'system', content: "let's start the chat with the visitor" },
    ...extraParams,
  ];

  if (prompt) {
    messages.push({ role: 'user', content: prompt });
  }

  const response = await openai.chat.completions.create({
    model: CHAT_MODEL,
    messages,
    stream,
  });

  if (isStream(response)) {
    const chunks = [];
    for await (const chunk of response) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        await randomDelay(); // simulate processing delay
        chunks.push(content);
        onChunk?.(content);
      }
    }
    return [chunks.join(''), response] as const; // return the full response
  }

  const answer = response.choices[0]?.message?.content || 'Sorry, I cannot answer that question.';

  return [answer, response];
};
