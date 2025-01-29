// Navigation and Footer Components
const navigationHTML = `
<nav class="main-nav">
    <div class="logo">
        <a href="index.html">
            <img src="images/Knovon_black.png" alt="Knovon Logo" class="logo-img">
        </a>
    </div>
    <div class="nav-container">
        <ul class="nav-links">
            <li class="dropdown">
                <a href="#" class="dropdown-trigger">Innovations <i class="fas fa-chevron-down"></i></a>
                <div class="mega-dropdown">
                    <div class="dropdown-content">
                        <div class="dropdown-section featured">
                            <h3>Our Innovations</h3>
                            <img src="images/KnovonStock00001.png" alt="Knovon Innovation" class="dropdown-image">
                            <p>Creating cutting-edge solutions that shape the future of technology.</p>
                            <a href="innovation.html" class="learn-more-btn">View All Projects <i class="fas fa-arrow-right"></i></a>
                        </div>
                        <div class="dropdown-section links">
                            <div class="link-column">
                                <h4>Featured iOS Apps</h4>
                                <div class="app-links">
                                    <a href="#" class="app-link">
                                        <img src="images/excutiveActions.png" alt="Executive Action" class="app-icon">
                                        <div class="app-info">
                                            <span class="app-name">Executive Action</span>
                                            <span class="app-platform">iOS App</span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div class="link-column">
                                <h4>Programs</h4>
                                <ul>
                                    <li><a href="https://kids.knovon.org" target="_blank">Knovon Kids</a></li>
                                    <li><a href="#">Executive Action</a></li>
                                    <li><a href="#">Web Programs</a></li>
                                    <li><a href="apps.html">More Apps</a></li>
                                </ul>
                            </div>
                            <div class="link-column">
                                <h4>Solutions</h4>
                                <ul>
                                    <li><a href="software.html">Software Development</a></li>
                                    <li><a href="games.html">Game Development</a></li>
                                    <li><a href="innovation.html">Research & Innovation</a></li>
                                    <li><a href="careers.html">Join Our Team</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
            <li class="dropdown">
                <a href="#" class="dropdown-trigger">About Us <i class="fas fa-chevron-down"></i></a>
                <div class="mega-dropdown">
                    <div class="dropdown-content">
                        <div class="dropdown-section featured">
                            <h3>About Knovon</h3>
                            <img src="images/KnovonStock00002.png" alt="Knovon Office" class="dropdown-image">
                            <p>A dynamic team of developers, designers, and innovators creating cutting-edge solutions.</p>
                            <a href="about.html" class="learn-more-btn">Learn More <i class="fas fa-arrow-right"></i></a>
                        </div>
                        <div class="dropdown-section links">
                            <div class="link-column">
                                <h4>Company</h4>
                                <ul>
                                    <li><a href="about.html#story">Our Story</a></li>
                                    <li><a href="about.html#mission">Mission & Values</a></li>
                                    <li><a href="team.html">Leadership Team</a></li>
                                    <li><a href="about.html#impact">Social Impact</a></li>
                                </ul>
                            </div>
                            <div class="link-column">
                                <h4>What We Do</h4>
                                <ul>
                                    <li><a href="software.html">Software Development</a></li>
                                    <li><a href="games.html">Game Development</a></li>
                                    <li><a href="innovation.html">Innovation Lab</a></li>
                                </ul>
                            </div>
                            <div class="link-column">
                                <h4>Latest Updates</h4>
                                <div class="news-item">
                                    <span class="news-date">March 2024</span>
                                    <a href="#" class="news-link">Knovon Launches New Innovation Lab</a>
                                </div>
                                <div class="news-item">
                                    <span class="news-date">February 2024</span>
                                    <a href="#" class="news-link">New Game Development Projects</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
            <li><a href="careers.html">Careers</a></li>
            <li class="dropdown">
                <a href="#" class="dropdown-trigger">Contact <i class="fas fa-chevron-down"></i></a>
                <div class="mega-dropdown">
                    <div class="dropdown-content">
                        <div class="dropdown-section featured">
                            <h3>Get in Touch</h3>
                            <img src="images/KnovonStock00003.png" alt="Contact Us" class="dropdown-image">
                            <p>We'd love to hear from you! Reach out through any of these channels.</p>
                            <div class="contact-options">
                                <a href="mailto:hello@knovon.org" class="contact-option">
                                    <i class="fas fa-envelope"></i>
                                    <div class="contact-info">
                                        <span class="contact-label">Email Us</span>
                                        <span class="contact-value">hello@knovon.org</span>
                                    </div>
                                </a>
                                <a href="tel:8019870671" class="contact-option">
                                    <i class="fas fa-phone"></i>
                                    <div class="contact-info">
                                        <span class="contact-label">Call Us</span>
                                        <span class="contact-value">(801) 987-0671</span>
                                    </div>
                                </a>
                                <a href="support.html" class="contact-option">
                                    <i class="fas fa-headset"></i>
                                    <div class="contact-info">
                                        <span class="contact-label">Support</span>
                                        <span class="contact-value">Get Help</span>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div class="dropdown-section links">
                            <div class="link-column">
                                <h4>Help & Support</h4>
                                <ul>
                                    <li><a href="support.html">Support Center</a></li>
                                    <li><a href="report-problem.html">Report a Problem</a></li>
                                    <li><a href="feedback.html">Give Feedback</a></li>
                                </ul>
                            </div>
                            <div class="link-column">
                                <h4>Connect With Us</h4>
                                <ul>
                                    <li><a href="https://twitter.com/knovon_" target="_blank"><i class="fab fa-twitter"></i> Twitter</a></li>
                                    <li><a href="https://www.linkedin.com/company/knovon/" target="_blank"><i class="fab fa-linkedin"></i> LinkedIn</a></li>
                                    <li><a href="https://www.instagram.com/knovon/" target="_blank"><i class="fab fa-instagram"></i> Instagram</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
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
</nav>

<!-- Mobile Menu -->
<div class="mobile-menu">
    <div class="mobile-menu-header">
        <img src="images/Knovon_black.png" alt="Knovon Logo" class="mobile-logo">
        <button class="mobile-close-btn">
            <i class="fas fa-times"></i>
        </button>
    </div>
    <nav class="mobile-nav">
        <ul class="mobile-nav-list">
            <li class="mobile-dropdown">
                <button class="mobile-dropdown-trigger">
                    Innovations <i class="fas fa-chevron-down"></i>
                </button>
                <ul class="mobile-dropdown-content">
                    <li><a href="innovation.html">View All Projects</a></li>
                    <li><a href="https://kids.knovon.org">Knovon Kids</a></li>
                    <li><a href="#">Executive Action</a></li>
                    <li><a href="#">Web Programs</a></li>
                    <li><a href="apps.html">All Apps</a></li>
                </ul>
            </li>
            <li class="mobile-dropdown">
                <button class="mobile-dropdown-trigger">
                    About Us <i class="fas fa-chevron-down"></i>
                </button>
                <ul class="mobile-dropdown-content">
                    <li><a href="about.html#story">Our Story</a></li>
                    <li><a href="about.html#mission">Mission & Values</a></li>
                    <li><a href="team.html">Leadership Team</a></li>
                    <li><a href="about.html#impact">Social Impact</a></li>
                </ul>
            </li>
            <li><a href="careers.html">Careers</a></li>
            <li class="mobile-dropdown">
                <button class="mobile-dropdown-trigger">
                    Contact <i class="fas fa-chevron-down"></i>
                </button>
                <ul class="mobile-dropdown-content">
                    <li><a href="support.html">Support Center</a></li>
                    <li><a href="report-problem.html">Report a Problem</a></li>
                    <li><a href="feedback.html">Give Feedback</a></li>
                    <li><a href="contact.html">Contact Page</a></li>
                </ul>
            </li>
        </ul>
    </nav>
    <div class="mobile-menu-footer">
        <button class="login-btn mobile-login">
            <i class="fas fa-user"></i>
            Login
        </button>
        <div class="mobile-social-links">
            <a href="https://twitter.com/knovon_" target="_blank" aria-label="Follow us on Twitter"><i class="fab fa-twitter"></i></a>
            <a href="https://www.linkedin.com/company/knovon/" target="_blank" aria-label="Connect on LinkedIn"><i class="fab fa-linkedin"></i></a>
            <a href="https://www.instagram.com/knovon/" target="_blank" aria-label="Follow us on Instagram"><i class="fab fa-instagram"></i></a>
        </div>
    </div>
</div>
`;

const footerHTML = `
<footer class="main-footer">
    <div class="footer-content">
        <div class="footer-grid">
            <div class="footer-column">
                <img src="images/Knovon_black.png" alt="Knovon Logo" class="footer-logo">
                <p class="footer-description">Creating innovative technology solutions while providing real-world development opportunities.</p>
                <div class="social-links">
                    <a href="https://twitter.com/knovon_" target="_blank" aria-label="Follow us on Twitter"><i class="fab fa-twitter"></i></a>
                    <a href="https://www.linkedin.com/company/knovon/" target="_blank" aria-label="Connect on LinkedIn"><i class="fab fa-linkedin"></i></a>
                    <a href="https://www.instagram.com/knovon/" target="_blank" aria-label="Follow us on Instagram"><i class="fab fa-instagram"></i></a>
                </div>
            </div>
            <div class="footer-column">
                <h4>Company</h4>
                <ul>
                    <li><a href="about.html">About Us</a></li>
                    <li><a href="team.html">Our Team</a></li>
                    <li><a href="careers.html">Careers</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
            </div>
            <div class="footer-column">
                <h4>Solutions</h4>
                <ul>
                    <li><a href="software.html">Software Development</a></li>
                    <li><a href="games.html">Game Development</a></li>
                    <li><a href="innovation.html">Innovation Lab</a></li>
                    <li><a href="apps.html">Mobile Apps</a></li>
                </ul>
            </div>
            <div class="footer-column">
                <h4>Support</h4>
                <ul>
                    <li><a href="support.html">Help Center</a></li>
                    <li><a href="privacy.html">Privacy Policy</a></li>
                    <li><a href="terms.html">Terms of Service</a></li>
                    <li><a href="sitemap.html">Sitemap</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; ${new Date().getFullYear()} Knovon. All rights reserved.</p>
        </div>
    </div>
</footer>
`;

// Function to load components
function loadComponents() {
    // Load navigation
    const headerContainer = document.querySelector('header');
    if (headerContainer) {
        headerContainer.innerHTML = navigationHTML;
    }

    // Load footer
    const footerContainer = document.querySelector('footer');
    if (footerContainer) {
        footerContainer.innerHTML = footerHTML;
    }

    // Initialize mobile menu functionality
    initializeMobileMenu();
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