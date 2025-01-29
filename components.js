console.log('Components.js loaded');
console.log('Base URL:', window.location.pathname);

// Function to setup mobile menu
export function setupMobileMenu(container) {
    const mobileMenuBtn = container.querySelector('.mobile-menu-btn');
    const mobileMenu = container.querySelector('.mobile-menu');
    const mobileCloseBtn = container.querySelector('.mobile-close-btn');
    const mobileDropdownTriggers = container.querySelectorAll('.mobile-dropdown-trigger');

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
}

// Function to load components
export async function loadComponent(containerSelector, filePath) {
    const container = document.querySelector(containerSelector);
    if (!container) {
        console.error(`Container ${containerSelector} not found`);
        return;
    }

    console.log('Attempting to load:', filePath);
    console.log('Container found:', !!container);

    try {
        // Try relative path first
        let response = await fetch(filePath);
        
        // If that fails, try with base path
        if (!response.ok) {
            const basePath = window.location.pathname.includes('/knovon/') ? '/knovon' : '';
            response = await fetch(`${basePath}${filePath}`);
        }

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const content = await response.text();
        container.innerHTML = content;

        // If this is the header, setup the active state and mobile menu
        if (containerSelector === '#header-container') {
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            console.log('Current page:', currentPage);
            const activeLink = container.querySelector(`a[href="${currentPage}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }

            // Setup mobile menu
            setupMobileMenu(container);
        }
    } catch (error) {
        console.error('Error loading component:', error);
        container.innerHTML = `<div class="component-error">Error loading component: ${error.message}</div>`;
    }
}

// Initialize components
export async function initComponents() {
    await loadComponent('#header-container', 'components/header.html');
    await loadComponent('#footer-container', 'components/footer.html');
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    console.log('Loading components...');
    await initComponents();
}); 