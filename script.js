const cursor = document.querySelector('.cursor-glow');
const clickables = document.querySelectorAll('a, button, .project-card, .skill-cloud span');
const toggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

let cursorX = window.innerWidth / 2;
let cursorY = window.innerHeight / 2;
let targetX = cursorX;
let targetY = cursorY;

window.addEventListener('pointermove', (event) => {
  targetX = event.clientX;
  targetY = event.clientY;
});

function animateCursor() {
  cursorX += (targetX - cursorX) * 0.18;
  cursorY += (targetY - cursorY) * 0.18;
  cursor.style.left = `${cursorX}px`;
  cursor.style.top = `${cursorY}px`;
  requestAnimationFrame(animateCursor);
}
animateCursor();

clickables.forEach((item) => {
  item.addEventListener('mouseenter', () => cursor.classList.add('is-active'));
  item.addEventListener('mouseleave', () => cursor.classList.remove('is-active'));
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

toggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  document.body.classList.toggle('menu-open', isOpen);
  toggle.setAttribute('aria-expanded', isOpen.toString());
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

document.querySelectorAll('.magnetic').forEach((button) => {
  button.addEventListener('pointermove', (event) => {
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    button.style.transform = `translate(${x * 0.12}px, ${y * 0.18}px)`;
  });

  button.addEventListener('pointerleave', () => {
    button.style.transform = '';
  });
});
