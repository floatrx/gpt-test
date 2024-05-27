import { requestGreeting, requestJoke } from './js/lib.js';

document.addEventListener('DOMContentLoaded', function () {
  const baseUrl = 'http://localhost:3000/api/bot';

  const jokeButton = document.getElementById('btn-joke');
  const greetingButton = document.getElementById('btn-greet');

  jokeButton.addEventListener('click', requestJoke);
  greetingButton.addEventListener('click', requestGreeting);

  console.log('scripts.js loaded!');
});
