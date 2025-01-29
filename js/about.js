// About page specific functionality
document.addEventListener('DOMContentLoaded', () => {
    initializeAnimations();
});

function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });

    // Add floating animation to shapes
    document.querySelectorAll('.shape').forEach(shape => {
        shape.style.animationDelay = `${Math.random() * 5}s`;
    });
} 