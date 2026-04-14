// Simple interactive behaviors: mobile nav toggle, smooth scroll, form handling, year
document.addEventListener('DOMContentLoaded', function () {
  // Year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // close mobile nav after clicking
        if (nav && nav.classList.contains('open')) {
          nav.classList.remove('open');
          if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // Simple contact form handling (client-side only)
  const form = document.getElementById('contactForm');
  const formMsg = document.getElementById('formMsg');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      formMsg.textContent = '';
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !message) {
        formMsg.style.color = 'crimson';
        formMsg.textContent = 'Mohon lengkapi semua kolom.';
        return;
      }

      // Basic email pattern
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        formMsg.style.color = 'crimson';
        formMsg.textContent = 'Alamat email tidak valid.';
        return;
      }

      // Simulasi pengiriman
      formMsg.style.color = 'green';
      formMsg.textContent = 'Pesan terkirim. Terima kasih!';
      form.reset();

      // Jika mau kirim ke server, lakukan fetch() ke endpoint backend di sini.
    });
  }
});