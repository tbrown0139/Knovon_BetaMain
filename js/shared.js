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
            // Try different path variations
            let navHtml;
            try {
                const navResponse = await fetch('/components/nav.html');
                if (navResponse.ok) {
                    navHtml = await navResponse.text();
                }
            } catch {
                try {
                    const navResponse = await fetch('./components/nav.html');
                    if (navResponse.ok) {
                        navHtml = await navResponse.text();
                    }
                } catch {
                    try {
                        const navResponse = await fetch('../components/nav.html');
                        if (navResponse.ok) {
                            navHtml = await navResponse.text();
                        }
                    } catch (error) {
                        console.error('All navigation fetch attempts failed:', error);
                        fallbackToStaticNav();
                        return;
                    }
                }
            }

            if (navHtml) {
                headerElement.innerHTML = navHtml;
                initializeNavigation();
            } else {
                fallbackToStaticNav();
            }
        }

        // Load footer with similar path handling
        const footerElement = document.querySelector('footer');
        if (footerElement) {
            let footerHtml;
            try {
                const footerResponse = await fetch('/components/footer.html');
                if (footerResponse.ok) {
                    footerHtml = await footerResponse.text();
                }
            } catch {
                try {
                    const footerResponse = await fetch('./components/footer.html');
                    if (footerResponse.ok) {
                        footerHtml = await footerResponse.text();
                    }
                } catch {
                    try {
                        const footerResponse = await fetch('../components/footer.html');
                        if (footerResponse.ok) {
                            footerHtml = await footerResponse.text();
                        }
                    } catch (error) {
                        console.error('All footer fetch attempts failed:', error);
                        fallbackToStaticFooter();
                        return;
                    }
                }
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
        let timeoutId;

        dropdown.addEventListener('mouseenter', () => {
            clearTimeout(timeoutId);
            dropdowns.forEach(d => {
                if (d !== dropdown) {
                    const megaDropdown = d.querySelector('.mega-dropdown');
                    if (megaDropdown) {
                        megaDropdown.style.opacity = '0';
                        megaDropdown.style.visibility = 'hidden';
                    }
                }
            });
        });

        dropdown.addEventListener('mouseleave', () => {
            timeoutId = setTimeout(() => {
                const megaDropdown = dropdown.querySelector('.mega-dropdown');
                if (megaDropdown) {
                    megaDropdown.style.opacity = '0';
                    megaDropdown.style.visibility = 'hidden';
                }
            }, 200);
        });
    });
}

function setActiveLink(links) {
    const currentPath = window.location.pathname;
    
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath.includes(href) && href !== '/')) {
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

function initializeSplashScreen() {
    const splashScreen = document.querySelector('.splash-screen');
    const contentWrapper = document.querySelector('.content-wrapper');
    const loadingProgress = document.querySelector('.loading-progress');
    
    if (!splashScreen || !contentWrapper || !loadingProgress) return;

    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress > 100) {
            progress = 100;
            clearInterval(interval);
            
            // Hide splash screen and show content
            setTimeout(() => {
                splashScreen.style.opacity = '0';
                contentWrapper.classList.add('visible');
                setTimeout(() => {
                    splashScreen.style.display = 'none';
                }, 300);
            }, 500);
        }
        loadingProgress.style.width = `${progress}%`;
    }, 500);
} 