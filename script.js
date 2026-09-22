const opening = document.getElementById('opening');
const openInvite = document.getElementById('openInvite');
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');

document.body.classList.add('locked');

openInvite.addEventListener('click', () => {
  opening.classList.add('hidden');
  document.body.classList.remove('locked');
  window.scrollTo({top: 0, behavior: 'smooth'});
});

menuBtn.addEventListener('click', () => nav.classList.toggle('open'));
document.querySelectorAll('nav a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

// Contagem regressiva para 24/04/2027 às 16:00 (horário local).
const weddingDate = new Date(2027, 3, 24, 16, 0, 0);

function updateCountdown() {
  const now = new Date();
  let diff = weddingDate - now;
  if (diff < 0) diff = 0;

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById('days').textContent = String(days).padStart(2,'0');
  document.getElementById('hours').textContent = String(hours).padStart(2,'0');
  document.getElementById('minutes').textContent = String(minutes).padStart(2,'0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2,'0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Animações ao rolar.
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, {threshold: 0.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Galeria ampliada.
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

document.querySelectorAll('.photo-card').forEach(card => {
  card.addEventListener('click', () => {
    lightboxImg.src = card.dataset.image;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImg.src = '';
}
document.getElementById('closeLightbox').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

// Formulário demonstrativo.
document.getElementById('rsvpForm').addEventListener('submit', e => {
  e.preventDefault();
  const form = new FormData(e.target);
  const nome = form.get('nome');
  const presenca = form.get('presenca');
  document.getElementById('formMessage').textContent =
    `Obrigado, ${nome}! Sua resposta foi registrada como: ${presenca}.`;
  e.target.reset();
});
