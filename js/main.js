/* =============================================
   CARROSSEL
   ============================================= */
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const items = document.querySelectorAll('.item');
const dots = document.querySelectorAll('.dot');
const numberIndicator = document.querySelector('.numbers');

let active = 0;
const totalItems = items.length;
let autoplayTimer;

function update(direction) {
  items[active].classList.remove('active');
  dots[active].classList.remove('active');

  active += direction;
  if (active < 0) active = totalItems - 1;
  if (active >= totalItems) active = 0;

  items[active].classList.add('active');
  dots[active].classList.add('active');
  numberIndicator.textContent = String(active + 1).padStart(2, '0');

  // Reinicia autoplay ao clicar
  clearInterval(autoplayTimer);
  startAutoplay();
}

function startAutoplay() {
  autoplayTimer = setInterval(() => update(1), 3000);
}

startAutoplay();

prevButton.addEventListener('click', () => update(-1));
nextButton.addEventListener('click', () => update(1));

// Suporte a swipe no mobile
let touchStartX = 0;

document.querySelector('.container').addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
});

document.querySelector('.container').addEventListener('touchend', (e) => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) update(diff > 0 ? 1 : -1);
});

/* =============================================
   ANIMAÇÕES DE SCROLL (data-aos)
   ============================================= */
const aosElements = document.querySelectorAll('[data-aos]');

const aosObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Pequeno delay escalonado para elementos no mesmo grupo
      setTimeout(() => {
        entry.target.classList.add('aos-visible');
      }, i * 100);
      aosObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

aosElements.forEach((el) => aosObserver.observe(el));

/* =============================================
   NEWSLETTER
   ============================================= */
const newsletterForm = document.getElementById('newsletterForm');
const formMsg = document.getElementById('formMsg');

newsletterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('emailInput').value.trim();

  if (email) {
    formMsg.textContent = '✦ Obrigado! Você receberá nossas novidades em breve.';
    formMsg.classList.add('visible');
    document.getElementById('emailInput').value = '';

    setTimeout(() => {
      formMsg.classList.remove('visible');
    }, 5000);
  }
});

/* =============================================
   HEADER — destaque no link ativo
   ============================================= */
const sections = document.querySelectorAll('section[id], div[id]');
const navLinks = document.querySelectorAll('header nav ul li a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => {
        link.style.color = link.getAttribute('href') === '#' + entry.target.id
          ? '#00f7ff'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach((sec) => navObserver.observe(sec));

 

const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});
