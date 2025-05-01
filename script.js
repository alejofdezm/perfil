// Toggle mobile menu
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('toggle');
});

// Smooth scroll for nav links with animation trigger
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        // Desplazamiento suave
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        // Forzar la visibilidad de la sección para activar la animación
        setTimeout(() => {
            targetSection.classList.add('visible');
        }, 100);
    });
});

// Fade-in animation on scroll with IntersectionObserver
const sections = document.querySelectorAll('.section');
const options = {
    threshold: 0.2,
    rootMargin: '0px 0px -10% 0px'
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // No desobservamos para que la animación se reactive al volver a la sección
        }
    });
}, options);

sections.forEach(section => {
    observer.observe(section);
});