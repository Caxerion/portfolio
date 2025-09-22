function myMenuFunction() {
    var menuBtn = document.getElementById("mynavmenu");
    if (menuBtn.className === "nav-menu") {
        menuBtn.classList.toggle("responsive");
    } else {
        menuBtn.className = "nav-menu";
    }
}

var typingEffect = new Typed(".typedtext",  {
    strings: ["Junior Programmer", "Designer", "Newbie Game Developer", "Website Developer"],
    loop: true,
    typeSpeed: 70,
    backSpeed: 50,
    backDelay: 2000,
});

// Position tooltips at the end of progress bars
function positionTooltips() {
    const skillItems = document.querySelectorAll('.skill-item');

    skillItems.forEach(item => {
        const progressBar = item.querySelector('.skill-progress-bar');
        const tooltip = item.querySelector('.skill-percentage-tooltip');

        if (progressBar && tooltip) {
            // Get the width of the progress bar
            const progressBarWidth = progressBar.offsetWidth;
            // Position the tooltip at the end of the progress bar
            tooltip.style.left = progressBarWidth + 'px';
        }
    });
}

// Skills hover effect
document.addEventListener('DOMContentLoaded', function() {
    const skillItems = document.querySelectorAll('.skill-item');

    // Position tooltips initially
    positionTooltips();

    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const progressBar = this.querySelector('.skill-progress-container');
            const tooltip = this.querySelector('.skill-percentage-tooltip');

            if (progressBar && tooltip) {
                progressBar.style.opacity = '1';
                tooltip.style.opacity = '1';
            }
        });

        item.addEventListener('mouseleave', function() {
            const progressBar = this.querySelector('.skill-progress-container');
            const tooltip = this.querySelector('.skill-percentage-tooltip');

            if (progressBar && tooltip) {
                progressBar.style.opacity = '0';
                tooltip.style.opacity = '0';
            }
        });
    });
});

// Collapse functionality for skills section
function toggleCollapse() {
    const collapse = document.querySelector('.collapse');
    const icon = document.querySelector('.collapse-icon');
    const isExpanded = collapse.classList.contains('collapse-expanded');

    // Toggle the expanded class
    collapse.classList.toggle('collapse-expanded');
    icon.style.transform = collapse.classList.contains('collapse-expanded') ? 'rotate(180deg)' : 'rotate(0deg)';

    // If collapsing, hide all tooltips and progress bars
    if (isExpanded) {
        const progressContainers = document.querySelectorAll('.skill-progress-container');
        const tooltips = document.querySelectorAll('.skill-percentage-tooltip');

        progressContainers.forEach(container => {
            container.style.opacity = '0';
        });

        tooltips.forEach(tooltip => {
            tooltip.style.opacity = '0';
        });
    } else {
        // If expanding, show tooltips and reposition them
        setTimeout(() => {
            const visibleTooltips = document.querySelectorAll('.skill-percentage-tooltip');
            visibleTooltips.forEach(tooltip => {
                tooltip.style.opacity = '1';
            });
            positionTooltips();
        }, 10);
    }

    // Save state
    localStorage.setItem('skillsCollapseState', collapse.classList.contains('collapse-expanded'));
}

// Category switching
function switchCategory(category) {
    const tabs = document.querySelectorAll('.category-tab');
    const frontendSkills = document.getElementById('frontend-skills');
    const backendSkills = document.getElementById('backend-skills');
    const designSkills = document.getElementById('design-skills');
    const gamedevSkills = document.getElementById('gamedev-skills');
    const databaseSkills = document.getElementById('database-skills');
    const toolsSkills = document.getElementById('tools-skills');
    const otherSkills = document.getElementById('other-skills');

    // Update active tab
    tabs.forEach(tab => tab.classList.remove('active'));
    document.querySelector(`[data-category="${category}"]`).classList.add('active');

    // Show/hide skills
    frontendSkills.style.display = category === 'frontend' ? 'block' : 'none';
    backendSkills.style.display = category === 'backend' ? 'block' : 'none';
    designSkills.style.display = category === 'design' ? 'block' : 'none';
    gamedevSkills.style.display = category === 'gamedev' ? 'block' : 'none';
    databaseSkills.style.display = category === 'Database' ? 'block' : 'none';
    toolsSkills.style.display = category === 'tools' ? 'block' : 'none';
    otherSkills.style.display = category === 'other' ? 'block' : 'none';

    // Position tooltips for the newly visible category
    setTimeout(positionTooltips, 10);

    // Save category
    localStorage.setItem('selectedSkillsCategory', category);
}

// Load saved state on page load
document.addEventListener('DOMContentLoaded', function() {
    // Always scroll to top (home section) when page loads
    window.scrollTo(0, 0);

    // Remove any hash from URL to prevent automatic scrolling
    if (window.location.hash) {
        history.replaceState(null, null, ' ');
    }

    // Enhanced button interactions
    initInteractiveButtons();
    
    // Add click handlers for social icons to disable hover after click
    const socialIcons = document.querySelectorAll('.icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            this.classList.add('clicked');
        });
    });

    // Add ripple animation CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    // Initialize navbar state
    const navbar = document.getElementById('header');
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }


    const savedCategory = localStorage.getItem('selectedSkillsCategory') || 'backend';
    switchCategory(savedCategory);

    const savedCollapseState = localStorage.getItem('skillsCollapseState') === 'true';
    if (savedCollapseState) {
        document.querySelector('.collapse').classList.add('collapse-expanded');
        document.querySelector('.collapse-icon').style.transform = 'rotate(180deg)';
    }

    // Add download resume functionality
    const downloadBtn = document.getElementById('downloadResume');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            // Create a temporary anchor element
            const link = document.createElement('a');
            link.href = 'makalah_asli.pdf';
            link.download = 'Kenneth_Resume.pdf'; // Suggested filename for download

            // Append to body, click, and remove
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Load saved theme
    loadTheme();

    // Welcome popup functionality
    const welcomePopup = document.getElementById('welcomePopup');
    const popupClose = document.getElementById('popupClose');
    const exploreBtn = document.getElementById('exploreBtn');
    const contactBtn = document.getElementById('contactBtn');

    // Check if user came from auth
    const fromAuth = sessionStorage.getItem('fromAuth');
    if (fromAuth === 'true') {
        // Clear the flag
        sessionStorage.removeItem('fromAuth');

        // Show popup after a short delay
        setTimeout(() => {
            showWelcomePopup();
        }, 1000);
    }

    function showWelcomePopup() {
        if (welcomePopup) {
            welcomePopup.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
    }

    function hideWelcomePopup() {
        if (welcomePopup) {
            welcomePopup.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    }

    // Close popup when clicking close button
    if (popupClose) {
        popupClose.addEventListener('click', hideWelcomePopup);
    }

    // Close popup when clicking overlay
    if (welcomePopup) {
        welcomePopup.addEventListener('click', function(e) {
            if (e.target === welcomePopup || e.target.classList.contains('popup-overlay')) {
                hideWelcomePopup();
            }
        });
    }

    // Explore button - scroll to about section
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            hideWelcomePopup();
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Contact button - scroll to contact section
    if (contactBtn) {
        contactBtn.addEventListener('click', function() {
            hideWelcomePopup();
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Close popup on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && welcomePopup && welcomePopup.classList.contains('active')) {
            hideWelcomePopup();
        }
    });

    // Initialize Owl Carousel for projects
    $('.projects-carousel').owlCarousel({
        loop: true,
        margin: 5,
        nav: true,
        dots: false, // Disable default dots
        autoplay: false, // Disabled autoplay to reduce lag
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        autoplaySpeed: 1000,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            1024: {
                items: 3
            }
        },
        // Update custom dots when carousel changes
        onChanged: function(property) {
            var current = property.item.index;
            // Calculate which dot should be active (0-3)
            var dotIndex = current % 4;

            // Remove active class from all dots
            $('.custom-dot').removeClass('active');

            // Add active class to current dot
            $('.custom-dot').eq(dotIndex).addClass('active');
        }
    });

    // Add click functionality to custom dots
    $('.custom-dot').on('click', function() {
        var slideIndex = $(this).data('slide');
        $('.projects-carousel').trigger('to.owl.carousel', [slideIndex, 300]);
    });

    // Project card tooltip functionality
    $('.project-card').hover(
        function() {
            // Mouse enter
            $(this).find('.project-tooltip').css('opacity', '1');
        },
        function() {
            // Mouse leave
            $(this).find('.project-tooltip').css('opacity', '0');
        }
    );

    // Initialize Owl Carousel for blur cards
    $('.blur-cards-carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        dots: true,
        autoplay: false, // Disabled autoplay to reduce lag
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        autoplaySpeed: 1000,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            1024: {
                items: 3
            }
        }
    });

    // Add hover effect to navbar links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.classList.add('nav-link-hover');
        });

        link.addEventListener('mouseleave', function() {
            this.classList.remove('nav-link-hover');
        });
    });

    // Override smooth scroll behavior to prevent automatic scrolling to anchors
    document.addEventListener('click', function(e) {
        if (e.target.matches('a[href^="#"]')) {
            e.preventDefault();
            const target = document.querySelector(e.target.getAttribute('href'));
            if (target) {
                // Use smooth scroll only when explicitly clicking navigation links
                target.scrollIntoView({ behavior: 'smooth' });

                // Remove hover effect from all navbar links after scrolling
                const navLinks = document.querySelectorAll('.nav-link');
                navLinks.forEach(link => {
                    link.classList.remove('nav-link-hover');
                });

                // Add hover effect to the clicked link
                e.target.classList.add('nav-link-hover');
            }
        }
    });

    // Scroll-based navbar color change and hover effect management (optimized for responsiveness)
    const handleScroll = debounce(function() {
        const navbar = document.getElementById('header');
        const scrollPosition = window.scrollY;

        // Remove hover effect from nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('nav-link-hover');
        });

        // Toggle navbar color based on scroll position
        if (scrollPosition > 50) { // Change color after scrolling 50px (reduced from 100px)
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    }, 5); // 5ms debounce delay (reduced from 10ms)

    window.addEventListener('scroll', handleScroll);
});

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Enhanced button interactions
function initInteractiveButtons() {
    const buttons = document.querySelectorAll('.btn:not(.project-btn):not(.about-btn .btn)');

    buttons.forEach((button, index) => {
        // Add click animation
        button.addEventListener('click', function(e) {
            e.preventDefault();

            // Disable hover after click for non-featured buttons
            if (!this.closest('.featured-text-info')) {
                this.classList.add('clicked');
            }

            // Skip loading and ripple for project-btn
            if (!this.classList.contains('project-btn')) {
                // Add loading state
                this.classList.add('loading');

                // Create ripple effect
                const ripple = document.createElement('div');
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.6);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;

                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';

                this.appendChild(ripple);

                // Remove ripple after animation
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            }

            // Smooth scroll to target section
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    setTimeout(() => {
                        targetSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                        if (!this.classList.contains('project-btn')) {
                            this.classList.remove('loading');
                        }
                    }, 800);
                } else {
                    if (!this.classList.contains('project-btn')) {
                        this.classList.remove('loading');
                    }
                }
            } else {
                // If no valid target, just remove loading state
                if (!this.classList.contains('project-btn')) {
                    setTimeout(() => {
                        this.classList.remove('loading');
                    }, 800);
                }
            }
        });

        // Add hover sound effect (visual feedback)
        button.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused'; // Pause pulse animation on hover
        });

        button.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running'; // Resume pulse animation
        });

        // Add keyboard support
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// Mobile menu toggle
function myMenuFunction() {
    const navMenu = document.getElementById("mynavmenu");
    navMenu.classList.toggle("active");
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const navMenu = document.getElementById("mynavmenu");
        navMenu.classList.remove("active");
    });
});

// Theme switching functionality
function toggleTheme() {
    const html = document.documentElement;
    const themeIcon = document.getElementById('themeIcon');
    const currentTheme = html.getAttribute('data-theme');

    if (currentTheme === 'dark') {
        html.removeAttribute('data-theme');
        themeIcon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    } else {
        html.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    }
}

// Load saved theme on page load
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const themeIcon = document.getElementById('themeIcon');

    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fas fa-sun';
    } else {
        document.documentElement.removeAttribute('data-theme');
        themeIcon.className = 'fas fa-moon';
    }
}

// Owl Carousel responsive settings removed - using single initialization above
// Removed duplicate carousel initialization and responsiveness handling
// Zoom prevention for better UX
// document.addEventListener('wheel', function(event) {
//   if (event.ctrlKey) {
//     event.preventDefault();
//   }
// }, { passive: false });
