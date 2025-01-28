// Initialize Firebase App
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js';
import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAikYjF9ZY1gMpnpmfJStUF9-uqrqSJWV0",
    authDomain: "alohamaile.firebaseapp.com",
    databaseURL: "https://alohamaile.firebaseio.com",
    projectId: "alohamaile",
    storageBucket: "alohamaile.firebasestorage.app",
    messagingSenderId: "222665399871",
    appId: "1:222665399871:web:367c77659213659058628a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Main functionality
document.addEventListener('DOMContentLoaded', () => {
    // Remove loading screen immediately
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.remove();
    }
    document.body.style.overflow = 'visible';

    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileCloseBtn = document.querySelector('.mobile-close-btn');
    const mobileDropdownTriggers = document.querySelectorAll('.mobile-dropdown-trigger');

    if (mobileMenuBtn && mobileMenu) {
        // Open mobile menu
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });

        // Close mobile menu
        mobileCloseBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
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

    // Add fade-in class to elements
    const elementsToAnimate = document.querySelectorAll('.vision-card, .service-card, .hero-content, .hero-stats');
    elementsToAnimate.forEach(element => {
        element.classList.add('fade-in');
    });

    // Initialize scroll observer
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

    // Observe fade-in elements
    document.querySelectorAll('.fade-in').forEach(element => {
        fadeInObserver.observe(element);
    });

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

    // Animate stats when in view
    const stats = document.querySelectorAll('.stat-number');
    const animateStats = () => {
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-value') || '0');
            const current = parseInt(stat.textContent || '0');
            
            if (current < target) {
                const increment = target / 50; // Adjust for animation speed
                stat.textContent = Math.ceil(Math.min(current + increment, target));
                setTimeout(animateStats, 20);
            }
        });
    };

    // Start stats animation when in view
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }

    // Innovation Page Interactions
    // Parallax effect for images
    const parallaxImage = document.querySelector('.parallax-image');
    if (parallaxImage) {
        document.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            const xAxis = (clientX - innerWidth / 2) / 25;
            const yAxis = (clientY - innerHeight / 2) / 25;
            
            parallaxImage.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${-yAxis}deg)`;
        });
    }

    // Gradient sphere animation
    const sphere = document.querySelector('.gradient-sphere');
    if (sphere) {
        document.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            const moveX = (clientX - innerWidth / 2) / 50;
            const moveY = (clientY - innerHeight / 2) / 50;
            
            sphere.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${moveX * 2}deg)`;
        });
    }

    // Create fade-in animation style
    const fadeInStyle = document.createElement('style');
    fadeInStyle.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(fadeInStyle);

    // Update login button based on auth state
    function updateLoginButton() {
        const loginBtns = document.querySelectorAll('.login-btn');
        const userName = localStorage.getItem('userName');

        loginBtns.forEach(btn => {
            if (userName) {
                btn.innerHTML = `Aloha ${userName} <i class="fas fa-user"></i>`;
                btn.onclick = handleSignOut;
            } else {
                btn.innerHTML = `Login <i class="fas fa-user"></i>`;
                btn.onclick = () => window.location.href = 'login.html';
            }
        });
    }

    // Handle sign out
    async function handleSignOut() {
        try {
            await signOut(auth);
            localStorage.removeItem('userName');
            updateLoginButton();
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Error signing out:', error);
        }
    }

    // Listen for auth state changes
    onAuthStateChanged(auth, (user) => {
        if (user) {
            localStorage.setItem('userName', user.displayName || user.email.split('@')[0]);
        } else {
            localStorage.removeItem('userName');
        }
        updateLoginButton();
    });

    // Initialize login button state
    updateLoginButton();
}); 