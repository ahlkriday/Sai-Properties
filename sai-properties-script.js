// ==================== LOADING SCREEN ====================
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 2000);
});

// ==================== NAVBAR ====================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navItems = document.querySelectorAll('.nav-item');

// Hamburger toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking nav item
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar scroll effect
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ==================== ACTIVE NAVIGATION ====================
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-item[href*=${sectionId}]`);
        
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offset = 100;
            const targetPosition = target.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== HERO METRICS COUNTER ====================
const metricValues = document.querySelectorAll('.metric-value');

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const target = parseInt(entry.target.getAttribute('data-count'));
            entry.target.classList.add('counted');
            animateCounter(entry.target, target);
        }
    });
}, { threshold: 0.5 });

metricValues.forEach(metric => {
    counterObserver.observe(metric);
});

// ==================== SCROLL ANIMATIONS ====================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(el => {
    scrollObserver.observe(el);
});

// ==================== PROPERTY CARDS HOVER EFFECT ====================
const propertyItems = document.querySelectorAll('.property-item');

propertyItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// ==================== CATEGORY CARDS INTERACTION ====================
const categoryCards = document.querySelectorAll('.category-card');

categoryCards.forEach(card => {
    card.addEventListener('click', function() {
        const category = this.getAttribute('data-category');
        console.log(`Selected category: ${category}`);
        
        // Add ripple effect
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.width = '100%';
        ripple.style.height = '100%';
        ripple.style.top = '0';
        ripple.style.left = '0';
        ripple.style.background = 'rgba(99, 102, 241, 0.3)';
        ripple.style.borderRadius = '20px';
        ripple.style.transform = 'scale(0)';
        ripple.style.transition = 'transform 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        this.style.position = 'relative';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.style.transform = 'scale(1)';
        }, 10);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// ==================== GALLERY HOVER EFFECT ====================
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// ==================== INQUIRY BUTTONS ====================
const inquiryBtns = document.querySelectorAll('.inquiry-btn');

inquiryBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const category = this.textContent.trim();
        console.log(`Inquiry for: ${category}`);
        
        // Visual feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
});

// ==================== FLOATING ACTION BUTTON ====================
const fab = document.getElementById('fab');

function updateFab() {
    if (window.pageYOffset > 500) {
        fab.classList.add('show');
    } else {
        fab.classList.remove('show');
    }
}

window.addEventListener('scroll', updateFab);

fab.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==================== SEARCH BUTTON ====================
const searchBtn = document.getElementById('searchBtn');

searchBtn.addEventListener('click', () => {
    console.log('Search clicked');
    // Pulse animation
    searchBtn.style.transform = 'scale(1.2)';
    setTimeout(() => {
        searchBtn.style.transform = 'scale(1)';
    }, 200);
});

// ==================== PARALLAX EFFECT ====================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-shape');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.3 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// ==================== STAGGER ANIMATION FOR VISUAL CARDS ====================
const visualCards = document.querySelectorAll('.visual-card');

visualCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 1500 + (index * 200));
});

// ==================== ADVANTAGE ITEMS ANIMATION ====================
const advantageItems = document.querySelectorAll('.advantage-item');

const advantageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.3 });

advantageItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    advantageObserver.observe(item);
});

// ==================== STAT CARDS ANIMATION ====================
const statCards = document.querySelectorAll('.stat-card');

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1)';
            }, index * 150);
        }
    });
}, { threshold: 0.3 });

statCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'scale(0.8)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    statObserver.observe(card);
});

// ==================== PHONE LINK TRACKING ====================
const phoneLinks = document.querySelectorAll('a[href^="tel:"]');

phoneLinks.forEach(link => {
    link.addEventListener('click', function() {
        console.log('Phone clicked:', this.getAttribute('href'));
    });
});

// ==================== BUTTON RIPPLE EFFECT ====================
const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .cta-btn');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement('span');
        
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== SECTION HEADING ANIMATIONS ====================
const sectionHeadings = document.querySelectorAll('.section-heading');

const headingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.3 });

sectionHeadings.forEach(heading => {
    heading.style.opacity = '0';
    heading.style.transform = 'translateY(30px)';
    heading.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    headingObserver.observe(heading);
});

// ==================== PROPERTY SPECS ANIMATION ====================
const propertySpecs = document.querySelectorAll('.property-specs .spec');

propertySpecs.forEach((spec, index) => {
    spec.style.opacity = '0';
    spec.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        spec.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        spec.style.opacity = '1';
        spec.style.transform = 'scale(1)';
    }, 100 * index);
});

// ==================== GRADIENT TEXT ANIMATION ====================
const gradientText = document.querySelector('.gradient-text');

if (gradientText) {
    let hue = 0;
    setInterval(() => {
        hue = (hue + 1) % 360;
        gradientText.style.filter = `hue-rotate(${hue}deg)`;
    }, 50);
}

// ==================== MOUSE FOLLOW EFFECT ON HERO ====================
const heroSection = document.querySelector('.hero-section');
const heroShapes = document.querySelectorAll('.hero-shape');

heroSection.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    const xPercent = (clientX / innerWidth - 0.5) * 2;
    const yPercent = (clientY / innerHeight - 0.5) * 2;
    
    heroShapes.forEach((shape, index) => {
        const speed = (index + 1) * 10;
        const x = xPercent * speed;
        const y = yPercent * speed;
        
        shape.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ==================== INFO ITEMS STAGGER ====================
const infoItems = document.querySelectorAll('.info-item');

const infoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.3 });

infoItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    infoObserver.observe(item);
});

// ==================== LAZY LOAD OPTIMIZATION ====================
// Pause animations when elements are not in viewport
const animatedElements = document.querySelectorAll('.hero-shape, .visual-card');

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        } else {
            entry.target.style.animationPlayState = 'paused';
        }
    });
}, { threshold: 0.1 });

animatedElements.forEach(element => {
    animationObserver.observe(element);
});

// ==================== PERFORMANCE: REDUCE MOTION ====================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
    });
}

// ==================== CONSOLE BRANDING ====================
console.log('%c Sai Properties ', 'background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; font-size: 24px; padding: 10px; font-weight: bold;');
console.log('%c Modern Living | Premium Real Estate ', 'background: #ec4899; color: white; font-size: 14px; padding: 5px;');
console.log('📞 Contact: 083906 76759');
console.log('📍 Location: Kharghar, Navi Mumbai');

// ==================== ERROR HANDLING ====================
window.addEventListener('error', (e) => {
    console.error('Error occurred:', e.message);
});

// ==================== PAGE VISIBILITY ====================
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Page hidden');
    } else {
        console.log('Page visible');
    }
});
