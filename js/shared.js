// Shared functionality for loading components
document.addEventListener('DOMContentLoaded', () => {
    loadSharedComponents();
    initializeSplashScreen();
});

// Load shared components (navigation and footer)
async function loadSharedComponents() {
    try {
        // Load navigation
        const headerElement = document.querySelector('header');
        if (headerElement) {
            let navHtml;
            try {
                const navResponse = await fetch('./components/nav.html');
                if (navResponse.ok) {
                    navHtml = await navResponse.text();
                }
            } catch (error) {
                console.error('Navigation fetch failed:', error);
                fallbackToStaticNav();
                return;
            }

            if (navHtml) {
                headerElement.innerHTML = navHtml;
                initializeNavigation();
            } else {
                fallbackToStaticNav();
            }
        }

        // Load footer
        const footerElement = document.querySelector('footer');
        if (footerElement) {
            let footerHtml;
            try {
                const footerResponse = await fetch('./components/footer.html');
                if (footerResponse.ok) {
                    footerHtml = await footerResponse.text();
                }
            } catch (error) {
                console.error('Footer fetch failed:', error);
                fallbackToStaticFooter();
                return;
            }

            if (footerHtml) {
                footerElement.innerHTML = footerHtml;
            } else {
                fallbackToStaticFooter();
            }
        }
    } catch (error) {
        console.error('Error loading components:', error);
        fallbackToStaticNav();
        fallbackToStaticFooter();
    }
}

// Initialize navigation functionality
function initializeNavigation() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileCloseBtn = document.querySelector('.mobile-close-btn');
    const mobileDropdowns = document.querySelectorAll('.mobile-dropdown-trigger');
    const navLinks = document.querySelectorAll('.nav-links a');

    // Set active link based on current page
    setActiveLink(navLinks);

    // Mobile menu toggle
    if (mobileMenuBtn && mobileMenu && mobileCloseBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        mobileCloseBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Mobile dropdowns
    mobileDropdowns.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const dropdown = trigger.closest('.mobile-dropdown');
            dropdown.classList.toggle('active');
        });
    });

    // Close mobile menu on outside click
    document.addEventListener('click', (e) => {
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            if (!e.target.closest('.mobile-menu') && !e.target.closest('.mobile-menu-btn')) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });

    // Handle dropdown hover on desktop
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.dropdown-trigger');
        const megaDropdown = dropdown.querySelector('.mega-dropdown');

        if (trigger && megaDropdown) {
            // Show dropdown on hover for desktop
            if (window.innerWidth > 768) {
                dropdown.addEventListener('mouseenter', () => {
                    megaDropdown.style.opacity = '1';
                    megaDropdown.style.visibility = 'visible';
                });
                
                dropdown.addEventListener('mouseleave', () => {
                    megaDropdown.style.opacity = '0';
                    megaDropdown.style.visibility = 'hidden';
                });
            }
            
            // Handle click for touch devices
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const isVisible = megaDropdown.style.visibility === 'visible';
                
                // Close all other dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        const otherMegaDropdown = otherDropdown.querySelector('.mega-dropdown');
                        if (otherMegaDropdown) {
                            otherMegaDropdown.style.opacity = '0';
                            otherMegaDropdown.style.visibility = 'hidden';
                        }
                    }
                });
                
                // Toggle current dropdown
                megaDropdown.style.opacity = isVisible ? '0' : '1';
                megaDropdown.style.visibility = isVisible ? 'hidden' : 'visible';
            });
        }
    });
}

function setActiveLink(links) {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    links.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
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

// Get navigation template
function getNavigationTemplate() {
    return `<nav class="main-nav">
        <div class="logo">
            <a href="index.html">
                <img src="images/Knovon_black.png" alt="Knovon Logo" class="logo-img">
            </a>
        </div>
        <div class="nav-container">
            <ul class="nav-links">
                <li><a href="index.html">Home</a></li>
                <li><a href="about.html">About</a></li>
                <li><a href="careers.html">Careers</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
            <div class="nav-buttons">
                <button class="login-btn">Login <i class="fas fa-user"></i></button>
            </div>
        </div>
        <button class="mobile-menu-btn">
            <span></span>
            <span></span>
            <span></span>
        </button>
    </nav>`;
}

// Get footer template
function getFooterTemplate() {
    return `<div class="footer-content">
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
        <div class="footer-bottom">
            <p>&copy; ${new Date().getFullYear()} Knovon. All rights reserved.</p>
        </div>
    </div>`;
}

function initializeSplashScreen() {
    const splashScreen = document.querySelector('.splash-screen');
    const contentWrapper = document.querySelector('.content-wrapper');
    const loadingProgress = document.querySelector('.loading-progress');
    
    if (!splashScreen || !contentWrapper || !loadingProgress) return;

    // Simulate loading progress with faster timing
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 65; // Increased progress increment
        if (progress > 100) {
            progress = 100;
            clearInterval(interval);
            
            // Hide splash screen and show content faster
            setTimeout(() => {
                splashScreen.style.opacity = '0';
                contentWrapper.classList.add('visible');
                setTimeout(() => {
                    splashScreen.style.display = 'none';
                }, 100); // Reduced from 300ms
            }, 100); // Reduced from 500ms
        }
        loadingProgress.style.width = `${progress}%`;
    }, 50); // Reduced from 100ms
} 