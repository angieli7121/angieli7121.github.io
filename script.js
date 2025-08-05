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
    
    // Initialize tabs
    initTabs();
    
    // Initialize timeline with delay to ensure DOM is ready
    setTimeout(() => {
        initTimeline();
    }, 100);
});

// Tab functionality
function initTabs() {
    console.log('Initializing tabs...');
    
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    if (tabButtons.length === 0 || tabPanes.length === 0) {
        console.log('No tabs found');
        return;
    }
    
    console.log('Found tabs:', tabButtons.length);
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            console.log('Switching to tab:', targetTab);
            
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            this.classList.add('active');
            const targetPane = document.getElementById(targetTab + '-tab');
            if (targetPane) {
                targetPane.classList.add('active');
            }
            
            // Reinitialize timeline if switching to professional tab
            if (targetTab === 'professional') {
                setTimeout(() => {
                    initTimeline();
                }, 100);
            }
        });
    });
    
    console.log('Tabs initialized');
}

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

// Timeline functionality - Simplified and more robust
function initTimeline() {
    console.log('Initializing timeline...');
    
    // Try multiple selectors to find timeline items
    let timelineItems = document.querySelectorAll('.timeline-item');
    
    if (timelineItems.length === 0) {
        console.log('No .timeline-item found, trying alternative selectors...');
        timelineItems = document.querySelectorAll('[data-year]');
    }
    
    if (timelineItems.length === 0) {
        console.log('No timeline items found with any selector');
        return;
    }
    
    console.log('Found timeline items:', timelineItems.length);
    
    // Convert to array for easier manipulation
    const itemsArray = Array.from(timelineItems);
    
    itemsArray.forEach((item, index) => {
        console.log(`Setting up timeline item ${index + 1}:`, item);
        
        // Ensure the item is clickable
        item.style.cursor = 'pointer';
        item.style.position = 'relative';
        
        // Add click event listener
        item.addEventListener('click', function(e) {
            console.log(`Timeline item ${index + 1} clicked`);
            e.preventDefault();
            e.stopPropagation();
            
            // Find the details element within this item
            const details = this.querySelector('.timeline-details');
            if (!details) {
                console.log('No details element found in item', index + 1);
                return;
            }
            
            // Close all other timeline items
            itemsArray.forEach(otherItem => {
                if (otherItem !== this) {
                    otherItem.classList.remove('active');
                    const otherDetails = otherItem.querySelector('.timeline-details');
                    if (otherDetails) {
                        otherDetails.style.maxHeight = '0';
                        otherDetails.style.opacity = '0';
                    }
                }
            });
            
            // Toggle current item
            const isActive = this.classList.contains('active');
            
            if (isActive) {
                // Close this item
                this.classList.remove('active');
                details.style.maxHeight = '0';
                details.style.opacity = '0';
                console.log(`Timeline item ${index + 1} closed`);
            } else {
                // Open this item
                this.classList.add('active');
                details.style.maxHeight = '500px';
                details.style.opacity = '1';
                console.log(`Timeline item ${index + 1} opened`);
                
                // Scroll to item
                setTimeout(() => {
                    this.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }, 300);
            }
        });
        
        // Add hover effect
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
        
        // Initialize details as hidden
        const details = item.querySelector('.timeline-details');
        if (details) {
            details.style.maxHeight = '0';
            details.style.opacity = '0';
            details.style.transition = 'max-height 0.5s ease, opacity 0.5s ease';
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
    const animatedElements = document.querySelectorAll('.hero-content, .hero-image, .chatbot-window, .timeline-item, .content-card');
    
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