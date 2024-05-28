import { requestGreeting, requestJoke, requestTest } from './js/lib.js';

document.addEventListener('DOMContentLoaded', function () {
  const jokeButton = document.getElementById('btn-joke');
  const greetingButton = document.getElementById('btn-greet');
  const testButton = document.getElementById('btn-test');

  jokeButton.addEventListener('click', requestJoke);
  greetingButton.addEventListener('click', requestGreeting);
  testButton.addEventListener('click', requestTest);

  console.log('scripts.js loaded!');
});
