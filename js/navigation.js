// Load navigation
async function loadNavigation() {
    try {
        // Use relative path instead of absolute path
        const response = await fetch('../components/nav.html');
        const html = await response.text();
        
        // Check if the header exists before setting innerHTML
        const header = document.querySelector('header');
        if (header) {
            header.innerHTML = html;
            // Initialize navigation functionality after loading
            initializeNavigation();
        } else {
            console.error('Header element not found');
        }
    } catch (error) {
        console.error('Error loading navigation:', error);
        // Fallback: If fetch fails, try loading from a string template
        const header = document.querySelector('header');
        if (header) {
            header.innerHTML = getNavigationTemplate();
            initializeNavigation();
        }
    }
}

// Fallback navigation template
function getNavigationTemplate() {
    return `
    <nav class="main-nav">
        <div class="logo">
            <a href="index.html">
                <img src="Knovon_black.png" alt="Knovon Logo" class="logo-img">
            </a>
        </div>
        <div class="nav-container">
            <ul class="nav-links">
                <li class="dropdown">
                    <a href="#" class="dropdown-trigger">About <i class="fas fa-chevron-down"></i></a>
                    <div class="mega-dropdown">
                        <div class="dropdown-content">
                            <div class="dropdown-section featured">
                                <h3>About Knovon</h3>
                                <p>Empowering the next generation through innovative technology and hands-on learning experiences.</p>
                                <a href="about.html" class="learn-more-btn">Learn More <i class="fas fa-arrow-right"></i></a>
                            </div>
                            <div class="dropdown-section links">
                                <div class="link-column">
                                    <h4>Company</h4>
                                    <ul>
                                        <li><a href="about.html#story">Our Story</a></li>
                                        <li><a href="about.html#mission">Mission & Values</a></li>
                                        <li><a href="about.html#team">Leadership Team</a></li>
                                        <li><a href="about.html#impact">Social Impact</a></li>
                                    </ul>
                                </div>
                                <div class="link-column">
                                    <h4>What We Do</h4>
                                    <ul>
                                        <li><a href="software.html">Software Development</a></li>
                                        <li><a href="games.html">Game Development</a></li>
                                        <li><a href="training.html">Workforce Training</a></li>
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
                                        <a href="#" class="news-link">Partnership with Local Schools Announced</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li><a href="projects.html">Projects</a></li>
                <li><a href="careers.html">Careers</a></li>
                <li class="dropdown">
                    <a href="#" class="dropdown-trigger">Contact <i class="fas fa-chevron-down"></i></a>
                    <div class="mega-dropdown">
                        <div class="dropdown-content">
                            <div class="dropdown-section featured">
                                <h3>Get in Touch</h3>
                                <p>We'd love to hear from you! Reach out through any of these channels.</p>
                                <div class="contact-options">
                                    <a href="mailto:hello@knovon.org" class="contact-option">
                                        <i class="fas fa-envelope"></i>
                                        <div class="contact-info">
                                            <span class="contact-label">Email Us</span>
                                            <span class="contact-value">hello@knovon.org</span>
                                        </div>
                                    </a>
                                    <a href="tel:+18019870671" class="contact-option">
                                        <i class="fas fa-phone"></i>
                                        <div class="contact-info">
                                            <span class="contact-label">Call Us</span>
                                            <span class="contact-value">(801) 987-0671</span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div class="dropdown-section links">
                                <div class="link-column">
                                    <h4>Quick Links</h4>
                                    <ul>
                                        <li><a href="contact.html#general"><i class="fas fa-envelope"></i> General Inquiries</a></li>
                                        <li><a href="contact.html#support"><i class="fas fa-headset"></i> Support</a></li>
                                        <li><a href="contact.html#careers"><i class="fas fa-briefcase"></i> Careers</a></li>
                                        <li><a href="contact.html#press"><i class="fas fa-newspaper"></i> Press & Media</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <button class="login-btn">Login <i class="fas fa-user"></i></button>
        </div>
        <button class="mobile-menu-btn">
            <span></span>
            <span></span>
            <span></span>
        </button>
    </nav>`;
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
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
            // If link is in dropdown, add active class to parent
            const dropdownParent = link.closest('.dropdown');
            if (dropdownParent) {
                dropdownParent.querySelector('.dropdown-trigger').classList.add('active');
            }
        }
    });
}

// Load navigation when DOM is ready
document.addEventListener('DOMContentLoaded', loadNavigation); 