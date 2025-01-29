document.addEventListener('DOMContentLoaded', () => {
    // Enable scrolling on page load
    document.body.style.overflow = 'visible';

    const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR02C8wL_oKyAFgh2VBtrBV5K4vLezEe_jkt6WtgJ-VR3HaPnM-VLVOHJ9cqRVlVuv6Fje8Qni_dYfL/pub?gid=1969710670&single=true&output=csv';
    
    // Fetch and display job positions
    async function loadJobPositions() {
        try {
            const response = await fetch(CSV_URL);
            const csvText = await response.text();
            const positions = parseCSV(csvText);
            
            setupFilters(positions);
            displayPositions(positions);
        } catch (error) {
            console.error('Error loading positions:', error);
            document.querySelector('.positions-grid').innerHTML = '<p class="error-message">Unable to load positions. Please try again later.</p>';
        }
    }

    // Parse CSV data
    function parseCSV(csvText) {
        const lines = csvText.split('\n');
        const headers = lines[0].split(',');
        return lines.slice(1).map(line => {
            const values = line.split(',');
            return headers.reduce((obj, header, index) => {
                obj[header.trim()] = values[index]?.trim() || '';
                return obj;
            }, {});
        });
    }

    // Display positions in the grid
    let currentPage = 1;
    const positionsPerPage = 6;
    let allPositions = [];
    let filteredPositions = [];

    function displayPositions(positions, append = false) {
        const positionsGrid = document.querySelector('.positions-grid');
        const startIndex = append ? (currentPage - 1) * positionsPerPage : 0;
        const endIndex = startIndex + positionsPerPage;
        const positionsToShow = positions.slice(startIndex, endIndex);

        const positionCards = positionsToShow.map(position => `
            <div class="position-card" data-category="${position.Department}">
                <h3>${position.Title}</h3>
                <p class="position-id">Job ID: ${position['Job ID']}</p>
                <p class="position-type">
                    <i class="fas ${getDepartmentIcon(position.Department)}"></i>
                    ${position.Department}
                </p>
                <div class="position-details">
                    <p class="position-desc">${position.Description}</p>
                    <ul class="position-requirements">
                        ${position.Requirements ? `
                            ${position.Requirements.split(';').map(req => `
                                <li><i class="fas fa-check-circle"></i>${req.trim()}</li>
                            `).join('')}
                        ` : ''}
                    </ul>
                </div>
                <a href="${position['Link to apply']}" class="apply-btn" target="_blank">
                    <span>Apply Now</span>
                    <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        `).join('');

        if (append) {
            positionsGrid.insertAdjacentHTML('beforeend', positionCards);
        } else {
            positionsGrid.innerHTML = positionCards;
        }

        // Initialize hover effects for new cards
        initializePositionCards();

        // Update load more button visibility
        const loadMoreBtn = document.querySelector('.load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.style.display = endIndex >= positions.length ? 'none' : 'inline-flex';
        }
    }

    // Get appropriate icon for each department
    function getDepartmentIcon(department) {
        const icons = {
            'Software Development': 'fa-code',
            'Game Development': 'fa-gamepad',
            'Creative Design': 'fa-palette',
            'Human Resources': 'fa-users',
            'Operations': 'fa-cogs',
            'Innovation': 'fa-lightbulb'
        };
        return icons[department] || 'fa-briefcase';
    }

    // Setup department filters
    function setupFilters(positions) {
        allPositions = positions;
        filteredPositions = positions;
        currentPage = 1;
        
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter positions
                currentPage = 1;
                filteredPositions = filter === 'all' 
                    ? allPositions 
                    : allPositions.filter(position => position.Department === filter);
                
                displayPositions(filteredPositions);
            });
        });
    }

    // Load more functionality
    document.querySelector('.load-more-btn')?.addEventListener('click', () => {
        currentPage++;
        displayPositions(filteredPositions, true);
    });

    // Load positions when page loads
    loadJobPositions();

    // Smooth scroll for "View Open Positions" button
    const viewPositionsBtn = document.querySelector('.view-positions-btn');
    if (viewPositionsBtn) {
        viewPositionsBtn.addEventListener('click', () => {
            document.querySelector('.open-positions').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // Apply button functionality
    document.querySelector('.positions-grid').addEventListener('click', (e) => {
        if (e.target.classList.contains('apply-btn')) {
            e.preventDefault();
            const position = e.target.closest('.position-card').querySelector('h3').textContent;
            const link = e.target.getAttribute('href');
            if (link) {
                window.open(link, '_blank');
            }
        }
    });

    // Intersection Observer for animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    document.querySelectorAll('.benefit-card, .position-card, .culture-gallery img').forEach(element => {
        observer.observe(element);
    });

    // AI hover effect
    document.querySelectorAll('.ai-hover-effect').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / card.clientWidth) * 100;
            const y = ((e.clientY - rect.top) / card.clientHeight) * 100;
            card.style.setProperty('--x', `${x}%`);
            card.style.setProperty('--y', `${y}%`);
        });
    });

    // Neural network animation
    function createNeuralNetwork() {
        const container = document.querySelector('.neural-network');
        if (!container) return;

        const width = container.clientWidth;
        const height = container.clientHeight;
        const nodes = [];
        const connections = [];
        const numNodes = 20;

        // Create nodes
        for (let i = 0; i < numNodes; i++) {
            const node = document.createElement('div');
            node.className = 'network-node';
            node.style.left = `${Math.random() * 90}%`;
            node.style.top = `${Math.random() * 90}%`;
            container.appendChild(node);
            nodes.push(node);

            // Add glow effect
            const glow = document.createElement('div');
            glow.className = 'node-glow';
            node.appendChild(glow);
        }

        // Create connections
        nodes.forEach((node, i) => {
            nodes.slice(i + 1).forEach(targetNode => {
                const connection = document.createElement('div');
                connection.className = 'network-connection';
                container.appendChild(connection);
                connections.push({
                    element: connection,
                    start: node,
                    end: targetNode
                });
            });
        });

        // Animate connections
        function updateConnections() {
            connections.forEach(conn => {
                const rect1 = conn.start.getBoundingClientRect();
                const rect2 = conn.end.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();

                const x1 = rect1.left - containerRect.left + rect1.width / 2;
                const y1 = rect1.top - containerRect.top + rect1.height / 2;
                const x2 = rect2.left - containerRect.left + rect2.width / 2;
                const y2 = rect2.top - containerRect.top + rect2.height / 2;

                const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

                conn.element.style.width = `${length}px`;
                conn.element.style.left = `${x1}px`;
                conn.element.style.top = `${y1}px`;
                conn.element.style.transform = `rotate(${angle}deg)`;
            });
        }

        // Animate nodes
        function animateNodes() {
            nodes.forEach(node => {
                const currentLeft = parseFloat(node.style.left);
                const currentTop = parseFloat(node.style.top);
                
                const newLeft = currentLeft + (Math.random() - 0.5) * 0.5;
                const newTop = currentTop + (Math.random() - 0.5) * 0.5;
                
                node.style.left = `${Math.max(0, Math.min(90, newLeft))}%`;
                node.style.top = `${Math.max(0, Math.min(90, newTop))}%`;
            });
            
            updateConnections();
            requestAnimationFrame(animateNodes);
        }

        // Start animation
        animateNodes();
    }

    // Initialize neural network when section is visible
    const neuralNetworkObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                createNeuralNetwork();
                neuralNetworkObserver.disconnect();
            }
        });
    }, { threshold: 0.1 });

    const neuralNetwork = document.querySelector('.neural-network');
    if (neuralNetwork) {
        neuralNetworkObserver.observe(neuralNetwork);
    }

    // Add these styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .network-node {
            position: absolute;
            width: 8px;
            height: 8px;
            background: var(--primary-color);
            border-radius: 50%;
            transition: all 0.3s ease;
        }

        .node-glow {
            position: absolute;
            width: 100%;
            height: 100%;
            background: inherit;
            border-radius: inherit;
            filter: blur(5px);
            opacity: 0.5;
        }

        .network-connection {
            position: absolute;
            height: 1px;
            background: linear-gradient(90deg, 
                rgba(0, 113, 227, 0.1), 
                rgba(0, 199, 183, 0.1));
            transform-origin: left center;
        }
    `;
    document.head.appendChild(style);

    // AI Hover Effect for Benefit Cards
    document.querySelectorAll('.benefit-card.ai-hover-effect').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / card.clientWidth) * 100;
            const y = ((e.clientY - rect.top) / card.clientHeight) * 100;
            
            card.style.setProperty('--x', `${x}%`);
            card.style.setProperty('--y', `${y}%`);
        });
    });

    // Intersection Observer for Why Choose Knovon section
    const whyKnovonSection = document.querySelector('.why-knovon');
    const benefitCards = document.querySelectorAll('.benefit-card');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Stagger animation for benefit cards
                benefitCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 150 * index);
                });
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initialize animations
    if (whyKnovonSection) {
        sectionObserver.observe(whyKnovonSection);
        
        // Set initial states for animations
        benefitCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    }

    // Enhanced icon animations
    document.querySelectorAll('.card-icon').forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            const glow = icon.querySelector('::after');
            if (glow) {
                glow.style.opacity = '0.8';
            }
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) rotate(0deg)';
            const glow = icon.querySelector('::after');
            if (glow) {
                glow.style.opacity = '0.5';
            }
        });
    });

    // Tech Hover Effect for Benefit Cards
    document.querySelectorAll('.tech-hover-effect').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / card.clientWidth) * 100;
            const y = ((e.clientY - rect.top) / card.clientHeight) * 100;
            
            card.style.setProperty('--x', `${x}%`);
            card.style.setProperty('--y', `${y}%`);
        });
    });

    // Create tech particles animation
    function createTechParticles() {
        const container = document.querySelector('.tech-particles');
        if (!container) return;

        const particleCount = 50;
        const particles = [];

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'tech-particle';
            container.appendChild(particle);
            
            const size = Math.random() * 4 + 2;
            const startX = Math.random() * 100;
            const startY = Math.random() * 100;
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * -20;

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${startX}%`;
            particle.style.top = `${startY}%`;
            particle.style.animation = `floatParticle ${duration}s linear ${delay}s infinite`;
            
            particles.push(particle);
        }
    }

    // Add particle styles
    const particleStyles = document.createElement('style');
    particleStyles.textContent = `
        .tech-particle {
            position: absolute;
            background: linear-gradient(135deg, #0071e3, #00c7b7);
            border-radius: 50%;
            opacity: 0.3;
            pointer-events: none;
        }

        @keyframes floatParticle {
            0% {
                transform: translate(0, 0) rotate(0deg);
                opacity: 0;
            }
            25% {
                opacity: 0.3;
            }
            75% {
                opacity: 0.3;
            }
            100% {
                transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(particleStyles);

    // Initialize particles when the page loads
    createTechParticles();

    // Position card hover effect
    function initializePositionCards() {
        document.querySelectorAll('.position-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / card.clientWidth) * 100;
                const y = ((e.clientY - rect.top) / card.clientHeight) * 100;
                card.style.setProperty('--x', `${x}%`);
                card.style.setProperty('--y', `${y}%`);
            });
        });
    }

    // Animated Particles
    function createParticles() {
        const particlesContainer = document.querySelector('.animated-particles');
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3 + 1}px;
                height: ${Math.random() * 3 + 1}px;
                background: rgba(0, 113, 227, ${Math.random() * 0.5 + 0.1});
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: float ${Math.random() * 10 + 10}s linear infinite;
                transform: translate(-50%, -50%);
            `;
            particlesContainer.appendChild(particle);
        }
    }

    // Testimonial Slider
    function initTestimonialSlider() {
        const testimonials = document.querySelectorAll('.testimonial');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const dotsContainer = document.querySelector('.slider-dots');
        let currentIndex = 0;
        let autoplayInterval;

        // Create dots
        testimonials.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = `dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        function updateSlider() {
            testimonials.forEach((testimonial, index) => {
                testimonial.classList.toggle('active', index === currentIndex);
            });
            
            document.querySelectorAll('.dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        function goToSlide(index) {
            currentIndex = index;
            updateSlider();
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % testimonials.length;
            updateSlider();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            updateSlider();
        }

        // Event listeners
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);

        // Auto advance slides
        function startAutoplay() {
            autoplayInterval = setInterval(nextSlide, 5000);
        }

        function stopAutoplay() {
            clearInterval(autoplayInterval);
        }

        // Pause autoplay on hover
        const testimonialSection = document.querySelector('.testimonials-section');
        testimonialSection.addEventListener('mouseenter', stopAutoplay);
        testimonialSection.addEventListener('mouseleave', startAutoplay);

        // Start autoplay
        startAutoplay();
    }

    // Initialize particles and slider when the page loads
    createParticles();
    initTestimonialSlider();

    // Add keyframe animation for particles
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes float {
            0% {
                transform: translate(-50%, -50%) translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) translateY(-100vh) translateX(${Math.random() * 200 - 100}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(particleStyle);
});

// Function to filter positions
function filterPositions(category) {
    const cards = document.querySelectorAll('.position-card');
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
} 