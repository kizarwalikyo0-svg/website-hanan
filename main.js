// ============================================
// MAIN PAGE JAVASCRIPT - BAGIAN 1
// Theme, Navbar, Settings, Loading, Scroll
// Ultra Lengkap dengan Efek Maksimal
// ============================================

// ===== GLOBAL VARIABLES =====
const htmlElement = document.documentElement;
const body = document.body;

// Navbar Elements
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelectorAll('.nav-link');

// Theme Elements
const themeSwitch = document.getElementById('themeSwitch');

// Settings Elements
const settingsBtn = document.getElementById('settingsBtn');
const settingsPanel = document.getElementById('settingsPanel');
const settingsOverlay = document.getElementById('settingsOverlay');
const closeSettings = document.getElementById('closeSettings');

// Loading Elements
const loadingScreen = document.getElementById('loadingScreen');
const loadingProgress = document.getElementById('loadingProgress');

// Scroll Elements
const scrollProgress = document.getElementById('scrollProgress');
const scrollTop = document.getElementById('scrollTop');

// Cursor Elements
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');

// ===== THEME MANAGEMENT =====
const currentTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', currentTheme);

if (currentTheme === 'dark') {
    themeSwitch.checked = true;
}

themeSwitch.addEventListener('change', () => {
    const theme = themeSwitch.checked ? 'dark' : 'light';
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Add transition effect
    body.style.transition = 'background 0.5s ease, color 0.5s ease';
    
    // Create ripple effect
    createThemeRipple();
});

function createThemeRipple() {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50px;
        height: 50px;
        background: var(--accent-gradient);
        border-radius: 50%;
        opacity: 0.3;
        pointer-events: none;
        z-index: 9999;
    `;
    body.appendChild(ripple);
    
    ripple.animate([
        { transform: 'translate(-50%, -50%) scale(0)', opacity: 0.5 },
        { transform: 'translate(-50%, -50%) scale(50)', opacity: 0 }
    ], {
        duration: 800,
        easing: 'ease-out'
    });
    
    setTimeout(() => ripple.remove(), 800);
}

// ===== LOADING SCREEN =====
let loadingPercent = 0;
const loadingInterval = setInterval(() => {
    loadingPercent += Math.random() * 15;
    if (loadingPercent >= 100) {
        loadingPercent = 100;
        clearInterval(loadingInterval);
        setTimeout(hideLoading, 300);
    }
    loadingProgress.style.width = loadingPercent + '%';
}, 200);

function hideLoading() {
    loadingScreen.classList.add('hidden');
    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 500);
    
    // Start animations
    initializeAnimations();
}

// ===== CUSTOM CURSOR =====
if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorRing.style.left = e.clientX + 'px';
            cursorRing.style.top = e.clientY + 'px';
        }, 100);
    });
    
    // Cursor hover effects
    const interactiveElements = document.querySelectorAll('a, button, .gallery-item, .nav-link');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(2)';
            cursorRing.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

// ===== NAVBAR FUNCTIONALITY =====

// Hamburger Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    body.style.overflow = hamburger.classList.contains('active') ? 'hidden' : 'auto';
});

// Close menu when clicking nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        body.style.overflow = 'auto';
    });
});

// Navbar Scroll Effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
    
    // Update scroll progress
    updateScrollProgress();
    
    // Show/Hide scroll to top
    if (currentScroll > 500) {
        scrollTop.classList.add('visible');
    } else {
        scrollTop.classList.remove('visible');
    }
});

// Update scroll progress bar
function updateScrollProgress() {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
}

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== SETTINGS PANEL =====
settingsBtn.addEventListener('click', openSettings);
closeSettings.addEventListener('click', closeSettingsPanel);
settingsOverlay.addEventListener('click', closeSettingsPanel);

function openSettings() {
    settingsPanel.classList.add('active');
    settingsOverlay.classList.add('active');
    body.style.overflow = 'hidden';
}

function closeSettingsPanel() {
    settingsPanel.classList.remove('active');
    settingsOverlay.classList.remove('active');
    body.style.overflow = 'auto';
}

// Close with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeSettingsPanel();
    }
});

// ===== SCROLL TO TOP =====
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ===== SCROLL TO SECTION =====
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// ===== SMOOTH ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = this.getAttribute('href').substring(1);
        if (target) {
            scrollToSection(target);
        }
    });
});

// ===== INTERSECTION OBSERVER =====
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Trigger specific animations
            if (entry.target.classList.contains('stat-box')) {
                animateCounter(entry.target);
            }
        }
    });
}, observerOptions);

// Observe content sections
document.querySelectorAll('.content-section').forEach(section => {
    observer.observe(section);
});

// ===== ANIMATED COUNTERS =====
function animateCounter(element) {
    const numberElement = element.querySelector('.stat-number');
    if (!numberElement || numberElement.classList.contains('counted')) return;
    
    const target = parseInt(numberElement.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            numberElement.textContent = target;
            clearInterval(timer);
        } else {
            numberElement.textContent = Math.floor(current);
        }
    }, 16);
    
    numberElement.classList.add('counted');
}

// Start counter animations for hero stats
const heroStatsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statBoxes = entry.target.querySelectorAll('.stat-box');
            statBoxes.forEach((box, index) => {
                setTimeout(() => {
                    animateCounter(box);
                }, index * 200);
            });
            heroStatsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    heroStatsObserver.observe(heroStats);
}

// ===== HERO PARTICLES =====
function createHeroParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: var(--accent-primary);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5 + 0.2};
            animation: float-particle ${Math.random() * 20 + 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        container.appendChild(particle);
    }
}

// Add particle animation
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes float-particle {
        0%, 100% {
            transform: translate(0, 0);
        }
        25% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
        }
        50% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
        }
        75% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
        }
    }
`;
document.head.appendChild(particleStyle);

// ===== QUICK ACTIONS =====
function resetProgress() {
    if (confirm('Reset semua progress? (Ini hanya demo)')) {
        alert('Progress direset! (Demo saja)');
    }
}

function shareWebsite() {
    if (navigator.share) {
        navigator.share({
            title: 'Razik HTML - Belajar HTML',
            text: 'Belajar HTML dengan cara yang menyenangkan!',
            url: window.location.href
        });
    } else {
        const url = window.location.href;
        navigator.clipboard.writeText(url);
        alert('Link disalin ke clipboard!');
    }
}

function printPage() {
    window.print();
}

// ===== PARALLAX EFFECT =====
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const heroContent = document.querySelector('.hero-content');
            
            if (heroContent && scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
            }
            
            ticking = false;
        });
        ticking = true;
    }
});

// ===== INITIALIZE ANIMATIONS =====
function initializeAnimations() {
    createHeroParticles();
    
    // Add entrance animations
    const animatedElements = document.querySelectorAll('.hero-content > *');
    animatedElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
    });
}

// ===== PAGE VISIBILITY =====
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is hidden
        console.log('Page hidden - pausing animations');
    } else {
        // Resume animations when tab is visible
        console.log('Page visible - resuming animations');
    }
});

// ===== CONSOLE MESSAGES =====
console.log('%c🚀 Razik HTML Website', 'color: #667eea; font-size: 28px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
console.log('%c✨ Version 2.0 Ultra - Main Page', 'color: #764ba2; font-size: 18px; font-weight: bold;');
console.log('%c💻 Developed with ❤️ by Razik', 'color: #4a5568; font-size: 14px;');
console.log('%c📧 Email: kizarwalikyo0@gmail.com', 'color: #3b82f6; font-size: 12px;');
console.log('%c📱 WhatsApp: +62-878-3692-0010', 'color: #10b981; font-size: 12px;');
console.log('%c🎮 Easter Eggs:', 'color: #f6ad55; font-size: 14px; font-weight: bold;');
console.log('%c  - Ketik "razik" di keyboard', 'color: #718096; font-size: 12px;');
console.log('%c  - Kode Konami: ↑ ↑ ↓ ↓ ← → ← → B A', 'color: #718096; font-size: 12px;');

// ===== PERFORMANCE MONITORING =====
window.addEventListener('load', () => {
    setTimeout(() => {
        const perfData = performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`%c⚡ Page loaded in ${pageLoadTime}ms`, 'color: #fbbf24; font-weight: bold;');
    }, 0);
});

// ===== LIGHTBOX GALLERY =====
const galleryImages = ['img/1.png', 'img/2.png', 'img/3.png', 'img/4.png', 'img/5.png'];
let currentImageIndex = 0;

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxCounter = document.getElementById('lightboxCounter');

function openLightbox(index) {
    currentImageIndex = index;
    showLightboxImage();
    lightbox.classList.add('active');
    body.style.overflow = 'hidden';
    
    // Add zoom animation
    lightboxImage.style.animation = 'zoomIn 0.3s ease';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    body.style.overflow = 'auto';
}

function navigateLightbox(direction) {
    currentImageIndex += direction;
    
    if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    } else if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    }
    
    // Add slide animation
    lightboxImage.style.animation = 'none';
    setTimeout(() => {
        showLightboxImage();
        lightboxImage.style.animation = 'zoomIn 0.3s ease';
    }, 50);
}

function showLightboxImage() {
    lightboxImage.src = galleryImages[currentImageIndex];
    lightboxImage.alt = `Gambar ${currentImageIndex + 1}`;
    lightboxCaption.textContent = `Gambar ${currentImageIndex + 1}`;
    lightboxCounter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
        closeLightbox();
    } else if (e.key === 'ArrowLeft') {
        navigateLightbox(-1);
    } else if (e.key === 'ArrowRight') {
        navigateLightbox(1);
    }
});

// Close lightbox on outside click
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// ===== CODE COPY FUNCTIONALITY =====
function copyCode(button) {
    const codeBlock = button.closest('.code-block');
    const code = codeBlock.querySelector('code').textContent;
    
    navigator.clipboard.writeText(code).then(() => {
        const originalContent = button.innerHTML;
        button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span class="copy-text">Tersalin!</span>
        `;
        button.style.background = '#48bb78';
        button.style.borderColor = '#48bb78';
        
        setTimeout(() => {
            button.innerHTML = originalContent;
            button.style.background = '';
            button.style.borderColor = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        alert('Gagal menyalin kode!');
    });
}

// ===== CONFETTI EFFECT =====
function createConfetti(count = 100) {
    const container = document.getElementById('confettiContainer');
    const colors = ['#667eea', '#764ba2', '#f6ad55', '#48bb78', '#4299e1'];
    
    for (let i = 0; i < count; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.cssText = `
            left: ${Math.random() * 100}%;
            top: -10px;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            opacity: ${Math.random() * 0.8 + 0.2};
            animation-duration: ${Math.random() * 2 + 2}s;
            animation-delay: ${Math.random() * 0.5}s;
        `;
        container.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 4000);
    }
}

// ===== EASTER EGG - KONAMI CODE =====
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        activateKonamiEasterEgg();
    }
});

function activateKonamiEasterEgg() {
    console.log('%c🎉 KONAMI CODE ACTIVATED!', 'color: #fbbf24; font-size: 24px; font-weight: bold;');
    
    // Rainbow HTML text
    body.classList.add('rainbow-mode');
    
    // Confetti explosion
    createConfetti(150);
    
    // Screen shake
    body.classList.add('shake-animation');
    setTimeout(() => body.classList.remove('shake-animation'), 500);
    
    // Show alert
    setTimeout(() => {
        alert('🎉 SELAMAT! Kamu menemukan Konami Code!\n\n↑ ↑ ↓ ↓ ← → ← → B A\n\nLihat semua teks HTML jadi RAINBOW! 🌈');
    }, 600);
    
    // Auto disable after 30 seconds
    setTimeout(() => {
        body.classList.remove('rainbow-mode');
    }, 30000);
}

// ===== EASTER EGG - TYPING "RAZIK" =====
let typedText = '';
const secretWord = 'razik';
let typingTimeout;

document.addEventListener('keypress', (e) => {
    clearTimeout(typingTimeout);
    
    typedText += e.key.toLowerCase();
    
    if (typedText.includes(secretWord)) {
        activateRazikEasterEgg();
        typedText = '';
    }
    
    typingTimeout = setTimeout(() => {
        typedText = '';
    }, 2000);
});

function activateRazikEasterEgg() {
    console.log('%c🚀 RAZIK EASTER EGG!', 'color: #667eea; font-size: 24px; font-weight: bold;');
    
    // Create sparkle effect around cursor
    createSparkleEffect();
    
    // Confetti
    createConfetti(80);
    
    // Bounce animation on all cards
    document.querySelectorAll('.glass-card').forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('bounce-animation');
            setTimeout(() => card.classList.remove('bounce-animation'), 800);
        }, index * 100);
    });
    
    // Show alert
    setTimeout(() => {
        alert('🎉 AWESOME! Kamu mengetik nama pembuat!\n\nRAZIK\n\nSelamat, kamu menemukan Easter Egg kedua! ✨');
    }, 500);
}

function createSparkleEffect() {
    let sparkleCount = 0;
    const maxSparkles = 20;
    
    const sparkleInterval = setInterval(() => {
        if (sparkleCount >= maxSparkles) {
            clearInterval(sparkleInterval);
            return;
        }
        
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: linear-gradient(45deg, #ffd700, #ffed4e);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${Math.random() * window.innerWidth}px;
            top: ${Math.random() * window.innerHeight}px;
            animation: sparkle-fade 1s ease-out forwards;
        `;
        body.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 1000);
        sparkleCount++;
    }, 100);
    
    // Add sparkle animation
    if (!document.getElementById('sparkle-animation')) {
        const style = document.createElement('style');
        style.id = 'sparkle-animation';
        style.textContent = `
            @keyframes sparkle-fade {
                0% {
                    transform: scale(0) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: scale(2) rotate(180deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== FLOATING EMOJIS (Random) =====
function createFloatingEmoji() {
    const emojis = ['✨', '🚀', '💻', '⭐', '🎨', '🔥', '💡', '🎯'];
    const emoji = document.createElement('div');
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.cssText = `
        position: fixed;
        font-size: 2rem;
        pointer-events: none;
        z-index: 9999;
        left: ${Math.random() * window.innerWidth}px;
        bottom: -50px;
        animation: float-up ${3 + Math.random() * 2}s ease-out forwards;
        opacity: 0.7;
    `;
    body.appendChild(emoji);
    
    setTimeout(() => emoji.remove(), 5000);
}

// Add float-up animation
const floatStyle = document.createElement('style');
floatStyle.textContent = `
    @keyframes float-up {
        to {
            bottom: 120vh;
            transform: translateX(${Math.random() * 100 - 50}px) rotate(${Math.random() * 360}deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(floatStyle);

// Random floating emojis every 30 seconds
setInterval(() => {
    if (Math.random() > 0.7) {
        createFloatingEmoji();
    }
}, 30000);

// ===== CARD 3D TILT EFFECT =====
document.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ===== BUTTON RIPPLE EFFECT =====
document.querySelectorAll('.cta-btn, .action-btn, .nav-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: ripple-effect 0.6s ease-out;
        `;
        
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple-effect {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ===== RANDOM PARTICLE CLICK EFFECT =====
document.addEventListener('click', (e) => {
    if (Math.random() > 0.8) {
        createClickParticles(e.clientX, e.clientY);
    }
});

function createClickParticles(x, y) {
    const colors = ['#667eea', '#764ba2', '#f6ad55'];
    const particleCount = 8;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 50;
        
        particle.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            z-index: 9999;
        `;
        
        body.appendChild(particle);
        
        particle.animate([
            { 
                transform: 'translate(0, 0) scale(1)',
                opacity: 1
            },
            { 
                transform: `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 600,
            easing: 'ease-out'
        });
        
        setTimeout(() => particle.remove(), 600);
    }
}

// ===== IMAGE LAZY LOADING =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== PREVENT UNWANTED BEHAVIORS =====
// Prevent right-click on images (optional)
// document.querySelectorAll('img').forEach(img => {
//     img.addEventListener('contextmenu', (e) => e.preventDefault());
// });

// Prevent drag on images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('dragstart', (e) => e.preventDefault());
});

// ===== ACCESSIBILITY ENHANCEMENTS =====
// Focus visible for keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    body.classList.remove('keyboard-nav');
});

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Error occurred:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// ===== INITIALIZE ON DOM READY =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('%c✅ Main page initialized successfully!', 'color: #48bb78; font-weight: bold; font-size: 14px;');
    
    // Initialize any remaining features
    initializeTooltips();
});

function initializeTooltips() {
    // Add tooltips for buttons with aria-label
    document.querySelectorAll('[aria-label]').forEach(el => {
        el.setAttribute('title', el.getAttribute('aria-label'));
    });
}

// ===== FPS COUNTER (DEBUG - Comment out in production) =====
// let fps = 0;
// let lastTime = performance.now();
// 
// function measureFPS() {
//     const currentTime = performance.now();
//     fps = Math.round(1000 / (currentTime - lastTime));
//     lastTime = currentTime;
//     
//     if (fps < 30) {
//         console.warn(`Low FPS detected: ${fps}`);
//     }
//     
//     requestAnimationFrame(measureFPS);
// }
// measureFPS();

// ===== SERVICE WORKER (Optional PWA) =====
// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('/sw.js')
//             .then(reg => console.log('Service Worker registered'))
//             .catch(err => console.log('Service Worker registration failed:', err));
//     });
// }

// ===== FINAL CONSOLE MESSAGE =====
console.log('%c────────────────────────────────────────', 'color: #4a5568;');
console.log('%c🎊 Website loaded successfully!', 'color: #48bb78; font-size: 16px; font-weight: bold;');
console.log('%c🎮 Try the Easter Eggs!', 'color: #f6ad55; font-size: 14px;');
console.log('%c────────────────────────────────────────', 'color: #4a5568;');

// BAGIAN 2 SELESAI - Total main.js: 470 + 480 = 950+ baris!
// ============================================
// END OF MAIN.JS
// ============================================