// Mobile navigation menu
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', function () {
  navLinks.classList.toggle('open');

  // Update accessibility state for screen readers
  const isOpen = navLinks.classList.contains('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
});

// Close the mobile menu after a navigation link is selected
document.querySelectorAll('.nav-links a').forEach(function (link) {
  link.addEventListener('click', function () {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// Small typing effect in the hero heading
const roleElement = document.getElementById('typedRole');
const roles = ['Aspiring Developer', 'Python Learner', 'Web Developer'];
let roleIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeRole() {
  const currentRole = roles[roleIndex];

  if (deleting) {
    characterIndex--;
  } else {
    characterIndex++;
  }

  roleElement.textContent = currentRole.substring(0, characterIndex);

  let delay = deleting ? 55 : 95;

  if (!deleting && characterIndex === currentRole.length) {
    deleting = true;
    delay = 1300;
  } else if (deleting && characterIndex === 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 350;
  }

  setTimeout(typeRole, delay);
}

typeRole();

// Keep the footer year up to date
document.getElementById('year').textContent = new Date().getFullYear();


// Contact form: compose an email in the visitor's default email application.
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
if (contactForm) {
  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;
    const name = document.getElementById('senderName').value.trim();
    const email = document.getElementById('senderEmail').value.trim();
    const message = document.getElementById('senderMessage').value.trim();
    const subject = encodeURIComponent('Portfolio message from ' + name);
    const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message);
    formStatus.textContent = 'Opening your email application...';
    window.location.href = 'mailto:mr.tushar.1511@gmail.com?subject=' + subject + '&body=' + body;
  });
}

// Reading progress indicator.
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
progressBar.setAttribute('aria-hidden', 'true');
document.body.appendChild(progressBar);
function updateScrollProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progressBar.style.width = progress + '%';
}
window.addEventListener('scroll', updateScrollProgress, { passive: true });
updateScrollProgress();

// Reveal content as it enters the viewport, while respecting reduced-motion settings.
const revealTargets = document.querySelectorAll('.section, .quick-info, .project-card, .about-card, .fact-card, .skill-card, .contact-item');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  revealTargets.forEach((element) => element.classList.add('js-reveal'));
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach((element) => revealObserver.observe(element));
}

// Highlight the navigation item for the section currently in view.
const pageSections = document.querySelectorAll('main section[id]');
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.nav-links a').forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  pageSections.forEach((section) => sectionObserver.observe(section));
}
