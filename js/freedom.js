document.addEventListener('DOMContentLoaded', () => {
    initializeSplashScreen();
    initializeParticles();
    initializeScrollAnimations();
    initializeStatCounters();
});

function initializeParticles() {
    const particlesContainer = document.querySelector('.hero-particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random positioning and size
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.width = particle.style.height = `${Math.random() * 3 + 1}px`;
        
        // Random animation duration and delay
        particle.style.animation = `float ${Math.random() * 10 + 5}s linear infinite`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        particlesContainer.appendChild(particle);
    }
}

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add stagger effect for grid items
                if (entry.target.parentElement.classList.contains('vision-grid') ||
                    entry.target.parentElement.classList.contains('join-options')) {
                    const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements that should animate on scroll
    document.querySelectorAll('.vision-card, .impact-content, .impact-stats, .stat-card, .join-card').forEach(element => {
        observer.observe(element);
    });
}

function initializeStatCounters() {
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent);
                let count = 0;
                const duration = 2000;
                const start = performance.now();

                function easeOutQuart(x) {
                    return 1 - Math.pow(1 - x, 4);
                }

                function updateCount(currentTime) {
                    const elapsed = currentTime - start;
                    const progress = Math.min(elapsed / duration, 1);

                    if (progress < 1) {
                        count = Math.floor(easeOutQuart(progress) * target);
                        counter.textContent = count + '+';
                        requestAnimationFrame(updateCount);
                    } else {
                        counter.textContent = target + '+';
                    }
                }

                requestAnimationFrame(updateCount);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.stat-number').forEach(counter => {
        observer.observe(counter);
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Constitutional quotes for splash screen
const constitutionalQuotes = [
    "Congress shall make no law respecting an establishment of religion, or prohibiting the free exercise thereof...",
    "...or abridging the freedom of speech, or of the press...",
    "...the right of the people to keep and bear Arms, shall not be infringed.",
    "The right of the people to be secure in their persons, houses, papers, and effects...",
    "We the People of the United States, in Order to form a more perfect Union...",
    "Life, Liberty and the pursuit of Happiness",
    "We hold these truths to be self-evident, that all men are created equal..."
];

function initializeSplashScreen() {
    const splashScreen = document.getElementById('splash-screen');
    const quoteDisplay = document.querySelector('.quote-display');
    const loadingProgress = document.querySelector('.loading-progress');
    const mainContent = document.querySelector('main');
    const quoteContainer = document.querySelector('.quote-container');
    const splashLogo = document.querySelector('.splash-logo');
    
    if (!splashScreen || !quoteDisplay || !loadingProgress || !mainContent || !quoteContainer || !splashLogo) {
        console.error('Required elements not found');
        return;
    }

    // Ensure main content is hidden and splash screen is visible
    mainContent.style.opacity = '0';
    mainContent.style.transform = 'translateY(50px)';
    splashScreen.style.opacity = '1';
    
    let currentQuote = 0;
    let progress = 0;

    // Display first quote immediately
    quoteDisplay.textContent = constitutionalQuotes[0];
    quoteDisplay.style.opacity = '1';

    // Change quotes every 2 seconds
    const quoteInterval = setInterval(() => {
        currentQuote = (currentQuote + 1) % constitutionalQuotes.length;
        quoteDisplay.style.opacity = '0';
        
        setTimeout(() => {
            quoteDisplay.textContent = constitutionalQuotes[currentQuote];
            quoteDisplay.style.opacity = '1';
        }, 500);
    }, 2000);

    // Update progress bar
    const progressInterval = setInterval(() => {
        progress += 1;
        loadingProgress.style.width = `${progress}%`;

        if (progress >= 100) {
            // Clear intervals
            clearInterval(progressInterval);
            clearInterval(quoteInterval);
            
            // Hide quotes and show logo
            quoteContainer.classList.add('hide');
            
            // Show logo after quotes fade out
            setTimeout(() => {
                splashLogo.classList.add('show');
                
                // Start exit sequence after logo animation
                setTimeout(() => {
                    splashLogo.classList.add('exit');
                    splashScreen.classList.add('exit');
                    
                    // Show main content
                    setTimeout(() => {
                        mainContent.classList.add('visible');
                    }, 400);
                    
                    // Remove splash screen
                    setTimeout(() => {
                        splashScreen.remove();
                    }, 1200);
                }, 2000); // Show logo for 2 seconds
            }, 500); // Wait for quotes to fade out
        }
    }, 50);
}

// Add header scroll effect
function initializeHeaderScroll() {
    const header = document.getElementById('header-container');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// Initialize everything after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Start with splash screen
    initializeSplashScreen();
    
    // Initialize other features after splash screen
    setTimeout(() => {
        initializeHeaderScroll();
        initializeParticles();
        initializeScrollAnimations();
        initializeStatCounters();
    }, 5500);
}); 