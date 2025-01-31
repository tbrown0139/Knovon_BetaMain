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
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements that should animate on scroll
    document.querySelectorAll('.vision-card, .impact-content, .stat-card, .join-card').forEach(element => {
        element.classList.add('fade-in');
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
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps

                function updateCount() {
                    count += increment;
                    if (count < target) {
                        counter.textContent = Math.floor(count) + '+';
                        requestAnimationFrame(updateCount);
                    } else {
                        counter.textContent = target + '+';
                    }
                }

                updateCount();
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    // Observe stat numbers
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

// Splash screen functionality
function initializeSplashScreen() {
    const splashScreen = document.getElementById('splash-screen');
    const quoteDisplay = document.querySelector('.quote-display');
    const loadingProgress = document.querySelector('.loading-progress');
    
    if (!splashScreen || !quoteDisplay || !loadingProgress) return;

    let currentQuote = 0;
    let progress = 0;

    // Hide main content initially
    document.querySelector('main').style.opacity = '0';
    
    // Function to update quote with fade effect
    function updateQuote() {
        quoteDisplay.style.opacity = '0';
        quoteDisplay.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            quoteDisplay.textContent = constitutionalQuotes[currentQuote];
            quoteDisplay.style.opacity = '1';
            quoteDisplay.style.transform = 'translateY(0)';
            currentQuote = (currentQuote + 1) % constitutionalQuotes.length;
        }, 500);
    }

    // Initial quote
    updateQuote();

    // Quote rotation interval
    const quoteInterval = setInterval(updateQuote, 3000);

    // Progress bar animation
    const progressInterval = setInterval(() => {
        progress += 0.5;
        loadingProgress.style.width = `${progress}%`;

        if (progress >= 100) {
            clearInterval(progressInterval);
            clearInterval(quoteInterval);
            
            // Fade out splash screen
            splashScreen.style.opacity = '0';
            splashScreen.style.transition = 'opacity 0.8s ease';
            
            // Show main content
            document.querySelector('main').style.opacity = '1';
            document.querySelector('main').style.transition = 'opacity 0.8s ease';
            
            // Remove splash screen after fade
            setTimeout(() => {
                splashScreen.style.display = 'none';
            }, 800);
        }
    }, 30);
} 