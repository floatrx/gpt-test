/**
 * Read a stream and return the text
 * @param reader
 * @param onChunk
 */
export const readStream = async (reader: ReadableStreamDefaultReader<Uint8Array>, onChunk?: (text: string) => void) => {
  const decoder = new TextDecoder();
  let result = '';
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const text = decoder.decode(value);
    result += text;
    onChunk?.(text);
  }
  return result;
};
