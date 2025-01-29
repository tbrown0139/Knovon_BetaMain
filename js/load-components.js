// Function to load components
async function loadComponents() {
    // Load navigation
    const headerContainer = document.querySelector('header');
    if (headerContainer) {
        try {
            const response = await fetch('/components/nav.html');
            const html = await response.text();
            headerContainer.innerHTML = html;

            // Initialize mobile menu functionality after loading
            initializeMobileMenu();
        } catch (error) {
            console.error('Error loading navigation:', error);
        }
    }
}

// Initialize mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileCloseBtn = document.querySelector('.mobile-close-btn');
    const mobileDropdownTriggers = document.querySelectorAll('.mobile-dropdown-trigger');

    if (mobileMenuBtn && mobileMenu) {
        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        // Close mobile menu
        mobileCloseBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Handle mobile dropdowns
        mobileDropdownTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const parent = trigger.parentElement;
                const content = parent.querySelector('.mobile-dropdown-content');
                
                // Close other dropdowns
                mobileDropdownTriggers.forEach(otherTrigger => {
                    if (otherTrigger !== trigger) {
                        otherTrigger.parentElement.classList.remove('active');
                    }
                });

                // Toggle current dropdown
                parent.classList.toggle('active');
            });
        });
    }
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', loadComponents); 