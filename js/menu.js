// Menu functionality
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu functionality
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

    // Desktop dropdowns
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

    // Set active state for current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const activeLink = document.querySelector(`a[href="${currentPage}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}); 