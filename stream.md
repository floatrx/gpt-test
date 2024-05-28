# OpenAI stream

## Introduction

OpenAI stream is a new way to interact with OpenAI's API. It allows you to interact with the API in real-time, without having to wait for a response. This makes it ideal for applications that require low latency, such as chatbots or real-time translation services.

## Express

```ts
async (req: Request, res: Response) => {
    // 1. Set the headers
    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Transfer-Encoding", "chunked");

    // 2. Request the completion
    const response = await openai.chat.completions.create({
        model: CHAT_MODEL,
        messages: [
            { role: "system", content: "..." },
            { role: "user", content: "..." },
        ],
        stream: true,
    });

    // 3. Prepare the response
    for await (const chunk of response) {
        const content = chunk.choices[0]?.delta?.content;
        if (content) {
            await randomDelay(); // simulate processing delay
            // 4. Send the chunk content
            res.write(content); // <--
        }
    }

    res.end();
};
```

## Client side

```ts
export const readStream = async (reader: ReadableStreamDefaultReader<Uint8Array>, onChunk?: (text: string) => void) => {
    const decoder = new TextDecoder();
    let result = "";
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value);
        result += text;
        onChunk?.(text);
    }
    return result;
};
```
