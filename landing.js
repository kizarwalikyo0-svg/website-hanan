// ============================================
// LANDING PAGE JAVASCRIPT
// ============================================

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Load saved theme
const currentTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', currentTheme);

if (currentTheme === 'dark') {
    themeToggle.checked = true;
}

// Theme toggle event
themeToggle.addEventListener('change', () => {
    const theme = themeToggle.checked ? 'dark' : 'light';
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Add smooth transition effect
    document.body.style.transition = 'all 0.5s ease';
});

// ===== PARTICLES BACKGROUND =====
function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random animation values
        particle.style.setProperty('--tx', (Math.random() - 0.5) * 200 + 'px');
        particle.style.setProperty('--ty', (Math.random() - 0.5) * 200 + 'px');
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        container.appendChild(particle);
    }
}

// ===== BUTTON PARTICLES EFFECT =====
function createButtonParticles(button) {
    const particlesContainer = button.querySelector('.button-particles');
    
    button.addEventListener('mouseenter', () => {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('span');
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: white;
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                opacity: 0;
                animation: particle-burst 1s ease-out forwards;
                animation-delay: ${Math.random() * 0.3}s;
            `;
            particlesContainer.appendChild(particle);
            
            setTimeout(() => particle.remove(), 1500);
        }
    });
}

// Add particle burst animation
const style = document.createElement('style');
style.textContent = `
    @keyframes particle-burst {
        0% {
            transform: translate(0, 0) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(${() => (Math.random() - 0.5) * 100}px, ${() => (Math.random() - 0.5) * 100}px) scale(1);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== BUTTON CLICK - GO TO MAIN PAGE =====
const enterButton = document.getElementById('enterButton');

enterButton.addEventListener('click', () => {
    // Add shatter effect
    enterButton.style.filter = 'blur(2px)';
    
    // Create explosion effect
    createExplosion(enterButton);
    
    // Fade out and navigate
    setTimeout(() => {
        document.body.style.opacity = '0';
        document.body.style.transform = 'scale(0.95)';
        document.body.style.transition = 'all 0.8s ease';
    }, 500);
    
    setTimeout(() => {
        window.location.href = 'main.html';
    }, 1300);
});

// ===== EXPLOSION EFFECT =====
function createExplosion(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 50%;
            left: ${centerX}px;
            top: ${centerY}px;
            pointer-events: none;
            z-index: 9999;
        `;
        
        document.body.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / 30;
        const velocity = 100 + Math.random() * 100;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        particle.animate([
            {
                transform: 'translate(0, 0) scale(1)',
                opacity: 1
            },
            {
                transform: `translate(${tx}px, ${ty}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 1000,
            easing: 'cubic-bezier(0, 0.5, 0.5, 1)'
        });
        
        setTimeout(() => particle.remove(), 1000);
    }
}

// ===== MOUSE FOLLOW EFFECT =====
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        
        shape.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ===== CURSOR GLOW EFFECT =====
const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    transform: translate(-50%, -50%);
    transition: all 0.3s ease;
`;
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    createButtonParticles(enterButton);
    
    // Add entrance animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 1s ease';
    }, 100);
});

// ===== KEYBOARD SHORTCUT (ENTER KEY) =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        enterButton.click();
    }
});

// ===== PREVENT CONTEXT MENU =====
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// ===== CONSOLE MESSAGE =====
console.log('%c🚀 Welcome to Razik Website!', 'color: #667eea; font-size: 24px; font-weight: bold;');
console.log('%c✨ Version 2.0 Pro - Landing Page', 'color: #764ba2; font-size: 16px;');
console.log('%cPress ENTER or click the button to continue!', 'color: #4a5568; font-size: 14px;');