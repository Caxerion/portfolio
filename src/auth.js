// Typing effect for profile role
class TypeWriter {
    constructor(element, words, wait = 3000) {
        this.element = element;
        this.words = words;
        this.wait = parseInt(wait, 10);
        this.wordIndex = 0;
        this.txt = '';
        this.isDeleting = false;
        this.type();
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.element.textContent = this.txt;

        let typeSpeed = 100;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Authentication system
class PortfolioAuth {
    constructor() {
        this.isAuthenticated = false;
        this.loadingOverlay = document.getElementById('loadingOverlay');
        this.enterBtn = document.getElementById('enterPortfolio');
        this.progressBar = document.getElementById('progressBar');
        
        this.init();
    }

    init() {
        // Initialize typing effect
        this.initTypingEffect();
        
        // Add event listeners
        this.addEventListeners();
        
        // Add entrance animation
        this.addEntranceAnimation();
        
        // Check if user is already authenticated
        this.checkAuthStatus();
    }

    initTypingEffect() {
        const typingElement = document.querySelector('.typing-text');
        const words = [
            'Extremely Junior Programmer',
            'Website Developer', 
            'Newbie Game Developer',
            'From Indonesia RAHHHHH 🗣️🗣️🔥🔥',
        ];
        
        if (typingElement) {
            new TypeWriter(typingElement, words, 2000);
        }
    }

    addEventListeners() {
        // Enter portfolio button
        this.enterBtn.addEventListener('click', (e) => {
            this.handleEnterPortfolio(e);
        });

        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.handleEnterPortfolio(e);
            }
        });

        // Quick links hover effects
        const quickLinks = document.querySelectorAll('.quick-link');
        quickLinks.forEach(link => {
            link.addEventListener('mouseenter', this.handleQuickLinkHover);
            link.addEventListener('mouseleave', this.handleQuickLinkLeave);
        });

        // Prevent context menu on profile image
        const profileImg = document.querySelector('.profile-image img');
        if (profileImg) {
            profileImg.addEventListener('contextmenu', (e) => e.preventDefault());
            profileImg.addEventListener('dragstart', (e) => e.preventDefault());
        }
    }

    addEntranceAnimation() {
        const authContent = document.querySelector('.auth-content');
        const shapes = document.querySelectorAll('.shape');
        
        // Animate auth content entrance
        authContent.style.opacity = '0';
        authContent.style.transform = 'translateY(50px) scale(0.9)';
        
        setTimeout(() => {
            authContent.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            authContent.style.opacity = '1';
            authContent.style.transform = 'translateY(0) scale(1)';
        }, 300);

        // Animate floating shapes
        shapes.forEach((shape, index) => {
            shape.style.opacity = '0';
            shape.style.transform = 'scale(0)';
            
            setTimeout(() => {
                shape.style.transition = 'all 0.6s ease-out';
                shape.style.opacity = '0.7';
                shape.style.transform = 'scale(1)';
            }, 500 + (index * 200));
        });
    }

    handleEnterPortfolio(e) {
        e.preventDefault();
        
        if (this.isAuthenticated) return;
        
        // Add click effect
        this.enterBtn.classList.add('clicked');
        
        // Create ripple effect
        this.createRippleEffect(e);
        
        // Start authentication process
        setTimeout(() => {
            this.startAuthentication();
        }, 300);
    }

    createRippleEffect(e) {
        const ripple = this.enterBtn.querySelector('.btn-ripple');
        const rect = this.enterBtn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.transform = 'translate(-50%, -50%) scale(0)';
        
        setTimeout(() => {
            ripple.style.transform = 'translate(-50%, -50%) scale(4)';
        }, 10);
    }

    startAuthentication() {
        this.isAuthenticated = true;
        
        // Show loading overlay
        this.loadingOverlay.classList.add('active');
        
        // Simulate loading progress
        this.simulateLoading();
    }

    simulateLoading() {
        let progress = 0;
        const loadingTexts = [
            'Initializing portfolio...',
            'Loading projects...',
            'Preparing experience...',
            'Almost ready...',
            'Welcome!'
        ];
        
        const progressInterval = setInterval(() => {
            progress += Math.random() * 15 + 5;
            
            if (progress >= 100) {
                progress = 100;
                clearInterval(progressInterval);
                
                // Final loading text
                document.querySelector('.loading-text').textContent = loadingTexts[4];
                
                setTimeout(() => {
                    this.redirectToPortfolio();
                }, 800);
            }
            
            // Update progress bar
            this.progressBar.style.width = progress + '%';
            
            // Update loading text based on progress
            const textIndex = Math.floor((progress / 100) * (loadingTexts.length - 1));
            document.querySelector('.loading-text').textContent = loadingTexts[textIndex];
            
        }, 200);
    }

    redirectToPortfolio() {
        // Store authentication status
        sessionStorage.setItem('portfolioAuth', 'true');
        sessionStorage.setItem('authTime', Date.now().toString());
        sessionStorage.setItem('fromAuth', 'true'); // Flag to show popup after auth

        // Add exit animation
        document.body.style.transition = 'opacity 0.5s ease-out';
        document.body.style.opacity = '0';

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 500);
    }

    checkAuthStatus() {
        const isAuth = sessionStorage.getItem('portfolioAuth');
        const authTime = sessionStorage.getItem('authTime');
        const currentTime = Date.now();
        
        // Check if authenticated and within 1 hour
        if (isAuth === 'true' && authTime && (currentTime - parseInt(authTime)) < 3600000) {
            // Auto redirect if recently authenticated
            setTimeout(() => {
                this.redirectToPortfolio();
            }, 1000);
        }
    }

    handleQuickLinkHover(e) {
        const link = e.currentTarget;
        link.style.transform = 'translateY(-3px) scale(1.1)';
    }

    handleQuickLinkLeave(e) {
        const link = e.currentTarget;
        link.style.transform = 'translateY(0) scale(1)';
    }
}

// Utility functions
function addParticleEffect() {
    const container = document.querySelector('.auth-background');
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            pointer-events: none;
            animation: particle-float ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        container.appendChild(particle);
    }
    
    // Add particle animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particle-float {
            0%, 100% {
                transform: translateY(0px) translateX(0px);
                opacity: 0;
            }
            10%, 90% {
                opacity: 1;
            }
            50% {
                transform: translateY(-20px) translateX(10px);
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize authentication system
    new PortfolioAuth();
    
    // Add particle effects
    addParticleEffect();
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Prevent zoom on mobile
    document.addEventListener('touchstart', (e) => {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    });
    
    // Add focus styles for accessibility
    const style = document.createElement('style');
    style.textContent = `
        .enter-btn:focus,
        .quick-link:focus {
            outline: 2px solid #667eea;
            outline-offset: 2px;
        }
        
        .enter-btn:focus:not(:focus-visible),
        .quick-link:focus:not(:focus-visible) {
            outline: none;
        }
    `;
    document.head.appendChild(style);
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is not visible
        document.querySelectorAll('.shape').forEach(shape => {
            shape.style.animationPlayState = 'paused';
        });
    } else {
        // Resume animations when tab becomes visible
        document.querySelectorAll('.shape').forEach(shape => {
            shape.style.animationPlayState = 'running';
        });
    }
});

// Export for potential external use
window.PortfolioAuth = PortfolioAuth;