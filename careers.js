document.addEventListener('DOMContentLoaded', () => {
    const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR02C8wL_oKyAFgh2VBtrBV5K4vLezEe_jkt6WtgJ-VR3HaPnM-VLVOHJ9cqRVlVuv6Fje8Qni_dYfL/pub?gid=1969710670&single=true&output=csv';
    
    // Fetch and display job positions
    async function loadJobPositions() {
        try {
            const response = await fetch(CSV_URL);
            const csvText = await response.text();
            const positions = parseCSV(csvText);
            displayPositions(positions);
            setupFilters(positions);
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
    function displayPositions(positions) {
        const positionsGrid = document.querySelector('.positions-grid');
        positionsGrid.innerHTML = positions.map(position => `
            <div class="position-card" data-category="${position.Department}">
                <h3>${position.Title}</h3>
                <p class="position-id">Job ID: ${position['Job ID']}</p>
                <p class="position-type"><i class="fas fa-building"></i> ${position.Department}</p>
                <p class="position-desc">${position.Discription}</p>
                <a href="${position['Link to apply']}" class="apply-btn" target="_blank">Apply Now</a>
            </div>
        `).join('');
    }

    // Setup department filters
    function setupFilters(positions) {
        const departments = [...new Set(positions.map(p => p.Department))];
        const filterContainer = document.querySelector('.positions-filter');
        
        // Clear existing filter buttons except "All"
        const allButton = filterContainer.querySelector('[data-filter="all"]');
        filterContainer.innerHTML = '';
        filterContainer.appendChild(allButton);
        
        // Add department filter buttons
        departments.forEach(dept => {
            const button = document.createElement('button');
            button.className = 'filter-btn';
            button.setAttribute('data-filter', dept);
            button.textContent = dept;
            filterContainer.appendChild(button);
        });

        // Filter functionality
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');
                const cards = document.querySelectorAll('.position-card');

                cards.forEach(card => {
                    if (filterValue === 'all') {
                        card.style.display = 'block';
                        return;
                    }

                    const cardCategory = card.getAttribute('data-category');
                    card.style.display = cardCategory === filterValue ? 'block' : 'none';
                });
            });
        });
    }

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
    const applyButtons = document.querySelectorAll('.apply-btn');
    applyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const position = button.parentElement.querySelector('h3').textContent;
            // Replace with actual application form or redirect
            alert(`Applying for position: ${position}\nRedirecting to application form...`);
        });
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

    document.querySelectorAll('.benefit-card, .position-card, .testimonial').forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}); 