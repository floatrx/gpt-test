/* global ReadableStream, TextDecoder */

const root = document.getElementById('root');

const baseUrl = '/api/bot';

const appendTextNode = (text) => {
  const textNode = document.createTextNode(text);
  root.appendChild(textNode);
};

const clearRoot = () => {
  root.innerHTML = '';
};

export const requestJoke = () => {
  fetch(`${baseUrl}/stream`)
    .then((response) => {
      clearRoot();

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      return new ReadableStream({
        start(controller) {
          function push() {
            reader.read().then(({ done, value }) => {
              if (done) {
                controller.close();
                return;
              }
              const text = decoder.decode(value);
              console.log('>', text); // Log the current value as text

              appendTextNode(text);

              controller.enqueue(value);
              push();
            });
          }

          push();
        },
      });
    })
    .then((stream) => {
      return new Response(stream, { headers: { 'Content-Type': 'text/html' } }).text();
    })
    .then((result) => {
      console.log('Final result:', result);
    })
    .catch((err) => {
      console.error(err);
    });
};

export function requestGreeting() {
  clearRoot();

  fetch(`${baseUrl}/greeting`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      appendTextNode(data.answer);
    })
    .catch((err) => console.error(err));
}
