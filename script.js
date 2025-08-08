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

    // Custom navigation functionality
    initCustomNavigation();
    
    // Timeline controls functionality
    initTimelineControls();

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

    // Chatbot is now handled by Gradio web component
    
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

// Chatbot is now handled by Gradio web component

// Timeline functionality - Fixed to handle tab switching
function initTimeline() {
    console.log('Initializing timeline...');
    
    // Clear any existing timeline event listeners
    clearTimelineListeners();
    
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
        
        // Create a click handler function that we can reference
        const clickHandler = function(e) {
            console.log(`Timeline item ${index + 1} clicked`);
            e.preventDefault();
            e.stopPropagation();
            
            // Find the details element within this item
            const details = this.querySelector('.timeline-details');
            if (!details) {
                console.log('No details element found in item', index + 1);
                return;
            }
            
            // Get fresh list of all timeline items
            const currentItems = document.querySelectorAll('.timeline-item');
            
            // Close all other timeline items
            currentItems.forEach(otherItem => {
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
                details.style.maxHeight = '1000px';
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
        };
        
        // Store the handler for later removal
        item._timelineClickHandler = clickHandler;
        
        // Add click event listener
        item.addEventListener('click', clickHandler);
        
        // Create hover handlers
        const mouseEnterHandler = function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'scale(1.02)';
            }
        };
        
        const mouseLeaveHandler = function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'scale(1)';
            }
        };
        
        // Store handlers for later removal
        item._timelineMouseEnterHandler = mouseEnterHandler;
        item._timelineMouseLeaveHandler = mouseLeaveHandler;
        
        // Add hover effects
        item.addEventListener('mouseenter', mouseEnterHandler);
        item.addEventListener('mouseleave', mouseLeaveHandler);
        
                   // Initialize details as hidden
           const details = item.querySelector('.timeline-details');
           if (details) {
               details.style.maxHeight = '0';
               details.style.opacity = '0';
               details.style.transition = 'max-height 0.5s ease, opacity 0.5s ease';
           }
       });
       
       // Auto-expand the first timeline item
       if (itemsArray.length > 0) {
           const firstItem = itemsArray[0];
           const firstDetails = firstItem.querySelector('.timeline-details');
           if (firstDetails) {
               firstItem.classList.add('active');
               firstDetails.style.maxHeight = '1000px';
               firstDetails.style.opacity = '1';
               console.log('Auto-expanded first timeline item');
           }
       }
       
       console.log('Timeline initialization complete');
   }

// Function to clear existing timeline event listeners
function clearTimelineListeners() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        if (item._timelineClickHandler) {
            item.removeEventListener('click', item._timelineClickHandler);
        }
        if (item._timelineMouseEnterHandler) {
            item.removeEventListener('mouseenter', item._timelineMouseEnterHandler);
        }
        if (item._timelineMouseLeaveHandler) {
            item.removeEventListener('mouseleave', item._timelineMouseLeaveHandler);
        }
    });
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

// Custom navigation functionality
function initCustomNavigation() {
    // Home link - scroll to top
    const homeLink = document.getElementById('home-link');
    if (homeLink) {
        homeLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Projects link - scroll to Experience & Expertise section
    const projectsLink = document.getElementById('projects-link');
    if (projectsLink) {
        projectsLink.addEventListener('click', function(e) {
            e.preventDefault();
            const timelineSection = document.getElementById('timeline');
            if (timelineSection) {
                timelineSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Contact link - show email tooltip and copy to clipboard
    const contactLink = document.getElementById('contact-link');
    if (contactLink) {
        contactLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            const email = 'yajieli912@gmail.com';
            
            // Copy to clipboard
            navigator.clipboard.writeText(email).then(() => {
                // Show tooltip
                showEmailTooltip(this, email);
            }).catch(() => {
                // Fallback for older browsers
                fallbackCopyToClipboard(email);
                showEmailTooltip(this, email);
            });
        });
    }
}

// Show email tooltip
function showEmailTooltip(element, email) {
    // Remove any existing tooltip
    const existingTooltip = document.querySelector('.email-tooltip');
    if (existingTooltip) {
        existingTooltip.remove();
    }

    // Create tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'email-tooltip';
    tooltip.innerHTML = `
        <div class="tooltip-content">
            <div class="email-text">${email}</div>
            <div class="copied-text">Copied to clipboard!</div>
        </div>
    `;

    // Add to DOM
    document.body.appendChild(tooltip);

    // Position tooltip
    const rect = element.getBoundingClientRect();
    tooltip.style.position = 'fixed';
    tooltip.style.top = (rect.bottom + 10) + 'px';
    tooltip.style.left = (rect.left + rect.width / 2) + 'px';
    tooltip.style.transform = 'translateX(-50%)';

    // Show tooltip
    setTimeout(() => {
        tooltip.classList.add('show');
    }, 10);

    // Hide tooltip after 3 seconds
    setTimeout(() => {
        tooltip.classList.remove('show');
        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.parentNode.removeChild(tooltip);
            }
        }, 300);
    }, 3000);
}

// Fallback copy function for older browsers
function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
    } catch (err) {
        console.error('Fallback copy failed:', err);
    }
    
    document.body.removeChild(textArea);
}

// Timeline controls functionality
function initTimelineControls() {
    const toggleBtn = document.getElementById('toggleAllBtn');
    if (!toggleBtn) return;

    // Track state on the button element
    toggleBtn._expanded = false;

    toggleBtn.addEventListener('click', function() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        const expanding = !this._expanded;

        timelineItems.forEach(item => {
            const details = item.querySelector('.timeline-details');
            if (!details) return;
            if (expanding) {
                item.classList.add('active');
                details.style.maxHeight = '1000px';
                details.style.opacity = '1';
            } else {
                item.classList.remove('active');
                details.style.maxHeight = '0';
                details.style.opacity = '0';
            }
        });

        // Update state, label and icon
        this._expanded = expanding;
        const icon = this.querySelector('i');
        if (expanding) {
            this.innerHTML = '';
            this.appendChild(icon);
            icon.className = 'fas fa-compress-alt';
            this.appendChild(document.createTextNode(' Collapse All'));
        } else {
            this.innerHTML = '';
            this.appendChild(icon);
            icon.className = 'fas fa-expand-alt';
            this.appendChild(document.createTextNode(' Expand All'));
        }
    });
} 