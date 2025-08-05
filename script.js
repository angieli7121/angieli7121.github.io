// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        }
    });

    // Initialize chatbot
    initChatbot();
    
    // Initialize timeline
    initTimeline();
});

// Chatbot functionality - Simplified
function initChatbot() {
    console.log('Initializing chatbot...');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');

    if (!chatbotInput || !chatbotSend) {
        console.log('Chatbot elements not found');
        return;
    }

    // Simple message handling
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (!message) return;

        // Add user message
        addMessage(message, 'user');
        chatbotInput.value = '';

        // Simple response
        setTimeout(() => {
            addMessage('Thanks for your message! I\'ll get back to you soon.', 'bot');
        }, 1000);
    }

    // Send message on button click or Enter key
    chatbotSend.addEventListener('click', sendMessage);
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.innerHTML = `<div class="message-content">${text}</div>`;
        
        const chatbotMessages = document.getElementById('chatbotMessages');
        if (chatbotMessages) {
            chatbotMessages.appendChild(messageDiv);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }
    }
}

// Timeline functionality
function initTimeline() {
    console.log('Initializing timeline...');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    console.log('Found timeline items:', timelineItems.length);
    
    if (timelineItems.length === 0) {
        console.log('No timeline items found');
        return;
    }
    
    timelineItems.forEach((item, index) => {
        console.log(`Setting up timeline item ${index + 1}`);
        
        item.addEventListener('click', function(e) {
            console.log(`Timeline item ${index + 1} clicked`);
            e.preventDefault();
            e.stopPropagation();
            
            // Close all other timeline items
            timelineItems.forEach(otherItem => {
                if (otherItem !== this) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            this.classList.toggle('active');
            console.log(`Timeline item ${index + 1} active:`, this.classList.contains('active'));
            
            // Smooth scroll to the item if it's not fully visible
            if (this.classList.contains('active')) {
                setTimeout(() => {
                    this.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }, 300);
            }
        });
        
        // Add hover effect for better UX
        item.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'scale(1.02)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'scale(1)';
            }
        });
        
        // Add cursor pointer style
        item.style.cursor = 'pointer';
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        const activeItem = document.querySelector('.timeline-item.active');
        if (!activeItem) return;
        
        const timelineItems = Array.from(document.querySelectorAll('.timeline-item'));
        const currentIndex = timelineItems.indexOf(activeItem);
        
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            e.preventDefault();
            const nextItem = timelineItems[currentIndex + 1];
            if (nextItem) {
                activeItem.classList.remove('active');
                nextItem.classList.add('active');
                nextItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            e.preventDefault();
            const prevItem = timelineItems[currentIndex - 1];
            if (prevItem) {
                activeItem.classList.remove('active');
                prevItem.classList.add('active');
                prevItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        } else if (e.key === 'Escape') {
            activeItem.classList.remove('active');
        }
    });
    
    console.log('Timeline initialization complete');
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.hero-content, .hero-image, .chatbot-window, .timeline-item');
    
    console.log('Setting up animations for', animatedElements.length, 'elements');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to social links
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
        });
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
            setTimeout(() => {
                this.style.transform = 'translateY(-2px)';
            }, 150);
        });
    });
    
    // Add smooth scrolling for timeline button
    const timelineButton = document.querySelector('a[href="#timeline"]');
    if (timelineButton) {
        timelineButton.addEventListener('click', function(e) {
            e.preventDefault();
            const timeline = document.getElementById('timeline');
            if (timeline) {
                timeline.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    console.log('All interactive features initialized');
}); 