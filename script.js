// Wait for DOM content to be loaded
document.addEventListener('DOMContentLoaded', () => {
    // Remove the overflow: hidden from body immediately
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
                if (mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });

    // Loading Screen Animation
    const loading = document.querySelector('.loading');
    const loadingMessage = document.querySelector('.loading-message');
    
    const messages = [
        'Initializing',
        'Almost Ready'
    ];
    
    let messageIndex = 0;
    
    const updateMessage = () => {
        if (messageIndex < messages.length) {
            loadingMessage.style.opacity = '0';
            setTimeout(() => {
                loadingMessage.textContent = messages[messageIndex];
                loadingMessage.style.opacity = '1';
                messageIndex++;
            }, 100);
        }
    };
    
    updateMessage();
    const messageInterval = setInterval(updateMessage, 500);
    
    // Hide loading screen
    const hideLoader = () => {
        clearInterval(messageInterval);
        loading.classList.add('fade-out');
        setTimeout(() => {
            loading.style.display = 'none';
            document.body.style.overflow = 'visible';
        }, 200);
    };

    // Start hiding the loader after a shorter delay
    setTimeout(hideLoader, 1000);

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
    document.addEventListener('DOMContentLoaded', function() {
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

        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements
        const elements = document.querySelectorAll('.research-grid, .gaming-grid, .showcase-card');
        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(el);
        });
    });

    // Add fade-in animation class
    const fadeInStyle = document.createElement('style');
    fadeInStyle.textContent = `
        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(fadeInStyle);
}); 