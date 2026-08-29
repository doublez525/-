const scene = document.querySelector('.scene');
const field = document.querySelector('#heart-field');
const reveal = document.querySelector('#reveal-button');
const again = document.querySelector('#again-button');
const loveMessage = document.querySelector('#love-message');

let heartTimer;
let heartTimeouts = [];
const colors = ['#e53861', '#f05a7b', '#ff7b91', '#d91d53', '#f4a2b3', '#ee4266'];

function makeHeart() {
  const heart = document.createElement('span');
  heart.className = 'flying-heart';
  heart.textContent = '♥';
  heart.style.setProperty('--x', `${Math.random() * 100}vw`);
  heart.style.setProperty('--size', `${18 + Math.random() * 42}px`);
  heart.style.setProperty('--color', colors[Math.floor(Math.random() * colors.length)]);
  heart.style.setProperty('--time', `${3.6 + Math.random() * 2.7}s`);
  heart.style.setProperty('--delay', `${Math.random() * .35}s`);
  heart.style.setProperty('--drift', `${-120 + Math.random() * 240}px`);
  field.appendChild(heart);
  heart.addEventListener('animationend', () => heart.remove());
}

function clearHearts() {
  clearInterval(heartTimer);
  heartTimer = undefined;
  heartTimeouts.forEach(clearTimeout);
  heartTimeouts = [];
  field.replaceChildren();
}

function fillHearts() {
  clearHearts();
  for (let i = 0; i < 62; i += 1) {
    heartTimeouts.push(setTimeout(makeHeart, i * 38));
  }
  heartTimer = setInterval(() => { for (let i = 0; i < 3; i += 1) makeHeart(); }, 260);
}

reveal.addEventListener('click', () => {
  scene.classList.add('active');
  loveMessage.setAttribute('aria-hidden', 'false');
  fillHearts();
});

again.addEventListener('click', () => {
  clearHearts();
  scene.classList.remove('active');
  loveMessage.setAttribute('aria-hidden', 'true');
  setTimeout(() => reveal.focus(), 400);
});
