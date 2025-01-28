document.addEventListener('DOMContentLoaded', () => {
    // Typing effect for text elements
    const typingTexts = document.querySelectorAll('.typing-text');
    
    function typeText(element) {
        const text = element.textContent;
        element.textContent = '';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, 50);
            }
        }
        
        type();
    }

    // Terminal simulation
    const terminalContent = document.getElementById('terminalContent');
    const terminalMessages = [
        '> Initializing neural networks...',
        '> Loading machine learning models...',
        '> Processing data streams...',
        '> Analyzing patterns...',
        '> Generating insights...',
        '> System ready.'
    ];

    let messageIndex = 0;

    function addTerminalMessage() {
        if (messageIndex < terminalMessages.length) {
            const p = document.createElement('p');
            p.textContent = terminalMessages[messageIndex];
            terminalContent.appendChild(p);
            messageIndex++;
            setTimeout(addTerminalMessage, 1500);
        }
    }

    // Start animations when elements are in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('typing-text')) {
                    typeText(entry.target);
                }
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe elements
    typingTexts.forEach(text => observer.observe(text));
    document.querySelectorAll('.research-card').forEach(card => observer.observe(card));

    // Start terminal simulation
    setTimeout(addTerminalMessage, 1000);
}); 