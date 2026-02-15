// Language Management
function getStoredLanguage() {
    return localStorage.getItem('preferredLanguage');
}

function setStoredLanguage(lang) {
    localStorage.setItem('preferredLanguage', lang);
}

function redirectToLanguage(lang) {
    const currentPath = window.location.pathname;
    const isEnglishPage = currentPath.includes('index-en.html');
    
    if (lang === 'es' && isEnglishPage) {
        window.location.href = 'index.html';
    } else if (lang === 'en' && !isEnglishPage) {
        window.location.href = 'index-en.html';
    }
}

// Mobile Menu Toggle
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

if (burger) {
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burger.classList.toggle('toggle');
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        burger.classList.remove('toggle');
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Reveal Animations on Scroll
const revealOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, revealOptions);

document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
});

// Language Switcher Event
const languageSwitch = document.getElementById('language-switch');
if (languageSwitch) {
    languageSwitch.addEventListener('change', (e) => {
        const selectedLang = e.target.value;
        setStoredLanguage(selectedLang);
        redirectToLanguage(selectedLang);
    });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '0.8rem 5%';
        navbar.style.background = 'rgba(10, 15, 28, 0.95)';
    } else {
        navbar.style.padding = '1.2rem 5%';
        navbar.style.background = 'rgba(10, 15, 28, 0.8)';
    }
});

// Auto-redirect based on browser language (only on first visit)
document.addEventListener('DOMContentLoaded', () => {
    const storedLang = getStoredLanguage();
    const currentPath = window.location.pathname;
    
    if (!storedLang && (currentPath === '/' || currentPath === '/perfil/' || currentPath.endsWith('index.html') || currentPath.endsWith('index-en.html'))) {
        const userLang = navigator.language || navigator.userLanguage;
        const lang = userLang.startsWith('es') ? 'es' : 'en';
        setStoredLanguage(lang);
        redirectToLanguage(lang);
    }
});