// ASCII art for Knovon logo
const KNOVON_ASCII = `
    ██╗  ██╗███╗   ██╗ ██████╗ ██╗   ██╗ ██████╗ ███╗   ██╗
    ██║ ██╔╝████╗  ██║██╔═══██╗██║   ██║██╔═══██╗████╗  ██║
    █████╔╝ ██╔██╗ ██║██║   ██║██║   ██║██║   ██║██╔██╗ ██║
    ██╔═██╗ ██║╚██╗██║██║   ██║╚██╗ ██╔╝██║   ██║██║╚██╗██║
    ██║  ██╗██║ ╚████║╚██████╔╝ ╚████╔╝ ╚██████╔╝██║ ╚████║
    ╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝   ╚═══╝   ╚═════╝ ╚═╝  ╚═══╝
`;

// Startup messages
const startupMessages = [
    'Initializing system...',
    'Loading core components...',
    'Checking system integrity...',
    'Establishing secure connection...',
    'Loading Knovon framework...',
    'Starting up...'
];

// Function to create and append a new terminal line
function createTerminalLine(text = '') {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    line.textContent = text;
    return line;
}

// Function to simulate typing
async function typeText(element, text, speed = 50) {
    for (let i = 0; i < text.length; i++) {
        element.textContent += text[i];
        await new Promise(resolve => setTimeout(resolve, speed));
    }
}

// Function to get logo points
function getLogoPoints() {
    const points = [];
    const centerX = 150;
    const centerY = 150;
    const size = 60;

    // Create points for the 'K' shape
    const kPoints = [
        // Vertical line
        ...Array.from({ length: 20 }, (_, i) => ({
            x: centerX - size,
            y: centerY - size + (i * (size * 2) / 19)
        })),

        // Diagonal lines
        ...Array.from({ length: 15 }, (_, i) => ({
            x: centerX - size + (i * (size * 2) / 14),
            y: centerY - size + (i * size / 14)
        })),
        ...Array.from({ length: 15 }, (_, i) => ({
            x: centerX - size + (i * (size * 2) / 14),
            y: centerY + (i * size / 14)
        }))
    ];

    // Create points for the 'N' shape
    const nPoints = [
        // Left vertical line
        ...Array.from({ length: 20 }, (_, i) => ({
            x: centerX + size/2,
            y: centerY - size + (i * (size * 2) / 19)
        })),

        // Diagonal line
        ...Array.from({ length: 20 }, (_, i) => ({
            x: centerX + size/2 + (i * size/19),
            y: centerY + size - (i * (size * 2) / 19)
        })),

        // Right vertical line
        ...Array.from({ length: 20 }, (_, i) => ({
            x: centerX + size*1.5,
            y: centerY - size + (i * (size * 2) / 19)
        }))
    ];

    // Add circular points for the 'O' shape
    for (let i = 0; i < 40; i++) {
        const angle = (i * Math.PI * 2) / 40;
        points.push({
            x: centerX + Math.cos(angle) * (size/2),
            y: centerY + Math.sin(angle) * (size/2)
        });
    }

    // Combine all points
    return [...points, ...kPoints, ...nPoints];
}

// Function to create particles
function createParticles() {
    const container = document.querySelector('.particle-container');
    const numParticles = 300; // Increased for more detail
    const particles = [];
    const logoPoints = getLogoPoints();
    
    // Create particles
    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Smaller particles for more detail
        const size = Math.random() * 2 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random starting position in a circle around the container
        const angle = Math.random() * Math.PI * 2;
        const distance = 250 + Math.random() * 100;
        const startX = Math.cos(angle) * distance + 150;
        const startY = Math.sin(angle) * distance + 150;
        
        // Get random target point from logo points
        const targetPoint = logoPoints[Math.floor(Math.random() * logoPoints.length)];
        
        // Add slight randomness to target position
        const randomOffset = 2;
        const targetX = targetPoint.x + (Math.random() - 0.5) * randomOffset;
        const targetY = targetPoint.y + (Math.random() - 0.5) * randomOffset;
        
        particle.style.transform = `translate(${startX}px, ${startY}px)`;
        particle.style.opacity = '0';
        
        container.appendChild(particle);
        particles.push({
            element: particle,
            x: startX,
            y: startY,
            targetX,
            targetY,
            size
        });
    }
    
    return particles;
}

// Function to animate particles
function animateParticles(particles) {
    particles.forEach((particle, index) => {
        setTimeout(() => {
            particle.element.style.transform = `translate(${particle.targetX}px, ${particle.targetY}px)`;
            particle.element.style.opacity = '0.6';
            
            // Add floating animation after reaching target
            setTimeout(() => {
                particle.element.style.transition = 'transform 3s ease-in-out infinite';
                particle.element.style.transform = `translate(${particle.targetX}px, ${particle.targetY}px) translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px)`;
            }, 1000);
        }, index * 10); // Faster animation
    });
}

// Function to update loading progress
function updateLoadingProgress(progress) {
    const progressBar = document.querySelector('.loading-progress');
    const loadingMessage = document.querySelector('.loading-message');
    const messages = [
        'Initializing particles...',
        'Forming logo...',
        'Stabilizing pattern...',
        'Almost ready...',
        'Welcome to Knovon'
    ];
    
    progressBar.style.width = `${progress}%`;
    loadingMessage.textContent = messages[Math.floor((progress / 100) * (messages.length - 1))];
}

// Function to handle splash screen
function handleSplashScreen() {
    const splashScreen = document.querySelector('.splash-screen');
    const contentWrapper = document.querySelector('.content-wrapper');
    const loadingProgress = document.querySelector('.loading-progress');
    const loadingText = document.querySelector('.loading-text');
    
    // Remove no-js class since JavaScript is enabled
    document.documentElement.classList.remove('no-js');
    
    // Start loading animation
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += 2;
        
        if (progress <= 100) {
            loadingProgress.style.width = `${progress}%`;
            loadingText.textContent = `Loading... ${progress}%`;
            loadingText.setAttribute('aria-valuenow', progress);
        }
        
        if (progress >= 100) {
            clearInterval(loadingInterval);
            
            // Add completion animation
            loadingProgress.style.transition = 'all 0.3s ease-out';
            loadingText.textContent = 'Welcome to Knovon';
            
            // Show content and hide splash screen
            setTimeout(() => {
                contentWrapper.classList.add('visible');
                splashScreen.style.opacity = '0';
                splashScreen.style.transition = 'opacity 0.3s ease-out';
                
                setTimeout(() => {
                    splashScreen.style.display = 'none';
                    document.body.style.overflow = 'visible';
                }, 300);
            }, 200);
        }
    }, 20);
}

// Initialize animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in class to elements
    const elementsToAnimate = document.querySelectorAll('.value-card, .about-content, .about-image, .stat-item');
    elementsToAnimate.forEach(element => {
        element.classList.add('fade-in');
        fadeInObserver.observe(element);
    });
}

// Main functionality
document.addEventListener('DOMContentLoaded', () => {
    // Add no-js class by default
    document.documentElement.classList.add('no-js');
    
    // Initialize splash screen
    handleSplashScreen();
    
    // Initialize animations
    initializeAnimations();

    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileCloseBtn = document.querySelector('.mobile-close-btn');
    const mobileDropdownTriggers = document.querySelectorAll('.mobile-dropdown-trigger');

    if (mobileMenuBtn && mobileMenu) {
        // Open mobile menu
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        // Close mobile menu
        mobileCloseBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Handle dropdown toggles
        mobileDropdownTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const dropdown = trigger.closest('.mobile-dropdown');
                dropdown.classList.toggle('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('active') && 
                !mobileMenu.contains(e.target) && 
                !mobileMenuBtn.contains(e.target)) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Smooth scroll functionality
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });

    // Typing effect
    const dynamicText = document.querySelector('.dynamic-text');
    if (dynamicText) {
        const words = JSON.parse(dynamicText.getAttribute('data-words'));
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const typeEffect = () => {
            const currentWord = words[wordIndex];
            const currentChar = currentWord.substring(0, charIndex);
            dynamicText.textContent = currentChar;

            if (!isDeleting && charIndex < currentWord.length) {
                charIndex++;
                setTimeout(typeEffect, 100);
            } else if (isDeleting && charIndex > 0) {
                charIndex--;
                setTimeout(typeEffect, 50);
            } else {
                isDeleting = !isDeleting;
                if (!isDeleting) {
                    wordIndex = (wordIndex + 1) % words.length;
                }
                setTimeout(typeEffect, 1200);
            }
        };

        typeEffect();
    }

    // Simple login button functionality
    const loginBtns = document.querySelectorAll('.login-btn');
    loginBtns.forEach(btn => {
        btn.innerHTML = `Login <i class="fas fa-user"></i>`;
        btn.onclick = () => window.location.href = 'login.html';
    });
}); 