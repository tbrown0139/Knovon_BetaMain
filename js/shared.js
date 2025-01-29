// Load shared components (navigation and footer)
async function loadSharedComponents() {
    try {
        await Promise.all([
            loadNavigation(),
            loadFooter()
        ]);
    } catch (error) {
        console.error('Error loading shared components:', error);
    }
}

// Load navigation
async function loadNavigation() {
    try {
        const response = await fetch('./components/nav.html');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const html = await response.text();
        
        const header = document.querySelector('header');
        if (header) {
            header.innerHTML = html;
            initializeNavigation();
        } else {
            throw new Error('Header element not found');
        }
    } catch (error) {
        console.error('Error loading navigation:', error);
        fallbackToStaticNav();
    }
}

// Load footer
async function loadFooter() {
    try {
        const response = await fetch('./components/footer.html');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const html = await response.text();
        
        const footer = document.querySelector('footer');
        if (footer) {
            footer.innerHTML = html;
        } else {
            throw new Error('Footer element not found');
        }
    } catch (error) {
        console.error('Error loading footer:', error);
        fallbackToStaticFooter();
    }
}

// Fallback to static navigation if loading fails
function fallbackToStaticNav() {
    const header = document.querySelector('header');
    if (header) {
        header.innerHTML = getNavigationTemplate();
        initializeNavigation();
    }
}

// Fallback to static footer if loading fails
function fallbackToStaticFooter() {
    const footer = document.querySelector('footer');
    if (footer) {
        footer.innerHTML = getFooterTemplate();
    }
}

// Initialize navigation functionality
function initializeNavigation() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navContainer = document.querySelector('.nav-container');
    
    mobileMenuBtn?.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navContainer.classList.toggle('active');
    });

    // Dropdown functionality
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.dropdown-trigger');
        
        trigger?.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Close other dropdowns
            dropdowns.forEach(other => {
                if (other !== dropdown) {
                    other.classList.remove('active');
                }
            });
            
            dropdown.classList.toggle('active');
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        }
    });

    // Set active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || 
            (currentPage.includes('#') && href === currentPage.split('#')[0])) {
            link.classList.add('active');
            // If link is in dropdown, add active class to parent
            const dropdownParent = link.closest('.dropdown');
            if (dropdownParent) {
                dropdownParent.querySelector('.dropdown-trigger').classList.add('active');
            }
        }
    });
}

// Get navigation template (your existing template)
function getNavigationTemplate() {
    return `<nav class="main-nav">
        <div class="logo">
            <a href="index.html">
                <img src="./images/Knovon_black.png" alt="Knovon Logo" class="logo-img">
            </a>
        </div>
        <!-- Rest of your navigation template -->
    </nav>`;
}

// Get footer template
function getFooterTemplate() {
    return `<footer>
        <div class="footer-content">
            <div class="footer-section">
                <h4>Contact Us</h4>
                <p>Email: hello@knovon.org</p>
                <p>Phone: (801) 987-0671</p>
            </div>
            <div class="footer-section">
                <h4>Follow Us</h4>
                <div class="social-links">
                    <a href="#" aria-label="Follow us on Twitter"><i class="fab fa-twitter"></i></a>
                    <a href="#" aria-label="Connect on LinkedIn"><i class="fab fa-linkedin"></i></a>
                    <a href="#" aria-label="Follow us on Instagram"><i class="fab fa-instagram"></i></a>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; ${new Date().getFullYear()} Knovon. All rights reserved.</p>
        </div>
    </footer>`;
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', loadSharedComponents); 