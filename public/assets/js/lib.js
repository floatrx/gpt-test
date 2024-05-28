/* global ReadableStream, TextDecoder */

const root = document.getElementById('root');
const baseUrl = '/api';

/**
 * Locks the UI by disabling all buttons during a fetch request.
 * + Clears the root element if loading is true.
 * @param loading
 */
const lockUi = (loading) => {
  document.querySelectorAll('button').forEach((button) => {
    button.disabled = loading;
    if (loading) {
      root.innerHTML = '';
    }
  });
};

/**
 * Appends a text node to the root element.
 * @param text
 */
const appendTextNode = (text) => {
  const textNode = document.createTextNode(text);
  root.appendChild(textNode);
};

/**
 * [Test 1] Fetches a joke from the bot API (streaming).
 */
export function requestJoke() {
  lockUi(true);

  fetch(`${baseUrl}/bot/stream`)
    .then((res) => {
      const reader = res.body.getReader();
      const decoder = new TextDecoder('utf-8');
      // read data from a stream...
      return new ReadableStream({
        start(controller) {
          function push() {
            reader.read().then(({ done, value }) => {
              if (done) {
                controller.close();
                return;
              }
              const text = decoder.decode(value);
              // console.log('>', text); // Log the current value as text

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
    })
    .finally(() => lockUi(false));
}

/**
 * [Test 2] Fetches a greeting from the bot API.
 */
export function requestGreeting() {
  lockUi(true);

  fetch(`${baseUrl}/bot/greeting`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      appendTextNode(data.answer);
    })
    .catch((err) => console.error(err))
    .finally(() => lockUi(false));
}

/**
 * [Test 3] Fetches a test message from the server.
 */
export function requestTest() {
  lockUi(true);

  fetch(`${baseUrl}/test`)
    .then((res) => res.text())
    .then((text) => {
      appendTextNode(text + new Date().toISOString());
    })
    .catch((err) => console.error(err))
    .finally(() => lockUi(false));
}
