// Wait for DOM content to be loaded
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
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

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe fade-in elements
    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
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
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });
});

// Loading animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loading');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1000); // Add a slight delay for smoother transition
    }
}); 