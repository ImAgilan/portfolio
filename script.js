// ============================================
// UTILITY FUNCTIONS
// ============================================

const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

const throttle = (func, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// ============================================
// ADVANCED SCROLL ANIMATIONS
// ============================================

class AdvancedScrollAnimations {
  constructor() {
    this.observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -80px 0px'
    };
    
    this.sectionObserverOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };
    
    this.init();
  }

  init() {
    this.createMainObserver();
    this.createSectionObservers();
    this.createStatsObserver();
    this.createProjectsObserver();
    this.createSkillsObserver();
    this.createContactObserver();
    this.createFooterObserver();
    this.initSkillsHover();
  }

  createMainObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // Special handling for hero section
          if (entry.target.id === 'hero') {
            this.animateHeroSection();
          }
        }
      });
    }, this.observerOptions);

    document.querySelectorAll('.animate-element').forEach(el => observer.observe(el));
  }

  createSectionObservers() {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // Trigger section-specific animations
          this.triggerSectionAnimations(entry.target);
        }
      });
    }, this.sectionObserverOptions);

    // Observe all main sections
    document.querySelectorAll('section').forEach(section => {
      sectionObserver.observe(section);
    });
  }

  createStatsObserver() {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animate individual stat cards with delay
          const statCards = entry.target.querySelectorAll('.stat-card');
          statCards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('visible');
            }, index * 100);
          });
        }
      });
    }, { threshold: 0.3 });

    const aboutStats = document.querySelector('.about-stats');
    if (aboutStats) statsObserver.observe(aboutStats);
  }

  createProjectsObserver() {
    const projectsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animate project cards with staggered delay
          const projectCards = entry.target.querySelectorAll('.project-card');
          projectCards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('visible');
            }, (index % 4) * 100 + Math.floor(index / 4) * 50);
          });
        }
      });
    }, { threshold: 0.1 });

    const projectsGrid = document.querySelector('.projects-grid');
    if (projectsGrid) projectsObserver.observe(projectsGrid);
  }

  createSkillsObserver() {
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.2 });

    const skillsWrapper = document.querySelector('.skills-wrapper');
    if (skillsWrapper) skillsObserver.observe(skillsWrapper);
  }

  createContactObserver() {
    const contactObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animate contact form fields sequentially
          const formGroups = entry.target.querySelectorAll('.form-group');
          formGroups.forEach((group, index) => {
            setTimeout(() => {
              group.style.opacity = '1';
              group.style.transform = 'translateX(0)';
            }, index * 150);
          });
        }
      });
    }, { threshold: 0.3 });

    const contactForm = document.querySelector('.contact-form');
    if (contactForm) contactObserver.observe(contactForm);
  }

  createFooterObserver() {
    const footerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelector('.container').classList.add('visible');
        }
      });
    }, { threshold: 0.5 });

    const footer = document.querySelector('footer');
    if (footer) footerObserver.observe(footer);
  }

  triggerSectionAnimations(section) {
    const sectionId = section.id;
    
    switch(sectionId) {
      case 'hero':
        this.animateHeroSection();
        break;
      case 'about':
        this.animateAboutSection();
        break;
      case 'projects':
        this.animateProjectsSection();
        break;
      case 'skills':
        this.animateSkillsSection();
        break;
      case 'contact':
        this.animateContactSection();
        break;
    }
  }

  animateHeroSection() {
    // Hero section already has specific animations in CSS
    // Additional JS-based animations can be added here
    console.log('Animating hero section');
  }

  animateAboutSection() {
    // Stats counter animation will be handled separately
    console.log('Animating about section');
  }

  animateProjectsSection() {
    // Add subtle hover effects enhancement
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) scale(1.02)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(-10px) scale(1)';
      });
    });
  }

  animateSkillsSection() {
    // Enhanced skill box animations
    const skillBoxes = document.querySelectorAll('.skill-box');
    skillBoxes.forEach(box => {
      box.addEventListener('mouseenter', () => {
        box.style.animation = 'skillPulse 0.5s ease-in-out';
      });
      
      box.addEventListener('animationend', () => {
        box.style.animation = 'skillPulse 3s ease-in-out infinite';
      });
    });
  }

  animateContactSection() {
    // Form field focus animations
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach(input => {
      input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'scale(1.02)';
      });
      
      input.addEventListener('blur', () => {
        input.parentElement.style.transform = 'scale(1)';
      });
    });
  }

  initSkillsHover() {
    document.querySelectorAll('.skills-row').forEach(row => {
      row.addEventListener('mouseenter', () => {
        row.style.animationPlayState = 'paused';
      });
      row.addEventListener('mouseleave', () => {
        row.style.animationPlayState = 'running';
      });
    });
  }
}

// ============================================
// NAVIGATION
// ============================================

class Navigation {
  constructor() {
    this.navbar = document.getElementById('navbar');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.menuToggle = document.querySelector('.menu-toggle');
    this.navLinksContainer = document.querySelector('.nav-links');
    this.sections = document.querySelectorAll('.section');
    
    this.init();
  }

  init() {
    if (!this.navbar) return;

    window.addEventListener('scroll', throttle(() => this.handleScroll(), 100), { passive: true });
    this.menuToggle?.addEventListener('click', () => this.toggleMobileMenu());

    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        this.closeMobileMenu();
        this.smoothScroll(e, link);
      });
    });

    this.updateActiveNavLink();
  }

  handleScroll() {
    this.navbar.classList.toggle('scrolled', window.scrollY > 50);
    this.updateActiveNavLink();
  }

  toggleMobileMenu() {
    const isExpanded = this.menuToggle.classList.toggle('active');
    this.navLinksContainer.classList.toggle('active');
    this.menuToggle.setAttribute('aria-expanded', isExpanded);
  }

  closeMobileMenu() {
    this.menuToggle.classList.remove('active');
    this.navLinksContainer.classList.remove('active');
    this.menuToggle.setAttribute('aria-expanded', 'false');
  }

  updateActiveNavLink() {
    const scrollPosition = window.scrollY + 150;

    this.sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        this.navLinks.forEach(link => {
          const isActive = link.getAttribute('href') === `#${sectionId}`;
          link.classList.toggle('active', isActive);
        });
      }
    });
  }

  smoothScroll(e, link) {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  }
}

// ============================================
// ENHANCED COUNTER ANIMATION
// ============================================

class CounterAnimation {
  constructor() {
    this.counters = document.querySelectorAll('.stat-card h3');
    this.hasAnimated = false;
    this.speed = 80;
    this.init();
  }

  init() {
    if (this.counters.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.hasAnimated) {
          this.hasAnimated = true;
          setTimeout(() => this.animate(), 500);
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });

    const aboutStats = document.querySelector('.about-stats');
    if (aboutStats) observer.observe(aboutStats);
  }

  animate() {
    this.counters.forEach(counter => {
      const target = parseInt(counter.parentElement.parentElement.getAttribute('data-target'));
      this.updateCounter(counter, target);
    });
  }

  updateCounter(counter, target) {
    const inc = Math.max(1, Math.ceil(target / this.speed));
    let count = 0;
    
    const update = () => {
      count = Math.min(count + inc, target);
      counter.textContent = `${count}+`;
      
      if (count < target) {
        requestAnimationFrame(update);
      }
    };
    
    update();
  }
}

// ============================================
// PARALLAX EFFECT
// ============================================

class ParallaxEffect {
  constructor() {
    this.init();
  }

  init() {
    document.addEventListener('mousemove', throttle((e) => this.handleMouseMove(e), 50), { passive: true });
  }

  handleMouseMove(e) {
    const cards = document.querySelectorAll('.stat-card.visible');
    if (cards.length === 0) return;

    const x = (e.clientX / window.innerWidth - 0.5);
    const y = (e.clientY / window.innerHeight - 0.5);

    cards.forEach((card, index) => {
      const speed = (index % 2 === 0) ? 15 : -15;
      const xMove = x * speed;
      const yMove = y * speed;
      
      card.style.transform = `translate(${xMove}px, ${yMove}px)`;
    });
  }
}

// ============================================
// CONTACT FORM
// ============================================

class ContactForm {
  constructor() {
    this.form = document.querySelector('.contact-form');
    this.init();
  }

  init() {
    if (!this.form) return;
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    
    // Add input animations
    this.addInputAnimations();
  }

  addInputAnimations() {
    const inputs = this.form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
      });
      
      input.addEventListener('blur', () => {
        if (!input.value) {
          input.parentElement.classList.remove('focused');
        }
      });
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData.entries());
    
    // Basic validation
    if (!data.name || !data.email || !data.message) {
      alert('Please fill in all required fields.');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      alert('Please enter a valid email address.');
      return;
    }
    
    this.showSuccessMessage();
    this.form.reset();
  }

  showSuccessMessage() {
    alert('Thank you for your message! I will get back to you soon.');
  }
}

// ============================================
// ENHANCED HERO ANIMATIONS
// ============================================

class HeroAnimation {
  constructor() {
    this.init();
  }

  init() {
    window.addEventListener('load', () => {
      const heroElements = document.querySelectorAll('#hero .animate-element');
      
      heroElements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add('visible');
          
          // Additional hero-specific animations
          if (el.classList.contains('hero-text')) {
            this.animateHeroText();
          }
        }, index * 200);
      });
    });
  }

  animateHeroText() {
    // Add subtle animation to hero name
    const heroName = document.querySelector('.hero-name');
    if (heroName) {
      setTimeout(() => {
        heroName.style.animation = 'nameReveal 1s ease-out';
      }, 500);
    }
  }
}

// ============================================
// NEURAL NETWORK CANVAS
// ============================================

class NeuralNetwork {
  constructor() {
    this.canvas = document.getElementById('neuralCanvas');
    this.ctx = this.canvas?.getContext('2d');
    this.nodes = [];
    this.NUM_NODES = 70;
    this.MAX_DIST = 150;
    this.ROSE_PINK = 'rgba(255, 79, 145, 0.7)';
    this.animationId = null;
    
    this.init();
  }

  init() {
    if (!this.canvas || !this.ctx) return;

    this.resizeCanvas();
    this.createNodes();
    this.animate();

    window.addEventListener('resize', debounce(() => this.resizeCanvas(), 250));
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createNodes() {
    this.nodes = [];
    for (let i = 0; i < this.NUM_NODES; i++) {
      this.nodes.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1,
        radius: 2 + Math.random() * 2
      });
    }
  }

  moveNode(node) {
    node.x += node.vx;
    node.y += node.vy;

    if (node.x <= 0 || node.x >= this.canvas.width) node.vx *= -1;
    if (node.y <= 0 || node.y >= this.canvas.height) node.vy *= -1;
  }

  drawNode(node) {
    this.ctx.beginPath();
    this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = this.ROSE_PINK;
    this.ctx.fill();
  }

  connectNodes() {
    for (let i = 0; i < this.NUM_NODES; i++) {
      for (let j = i + 1; j < this.NUM_NODES; j++) {
        const dx = this.nodes[i].x - this.nodes[j].x;
        const dy = this.nodes[i].y - this.nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.MAX_DIST) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(255, 79, 145, ${1 - dist / this.MAX_DIST})`;
          this.ctx.lineWidth = 1;
          this.ctx.moveTo(this.nodes[i].x, this.nodes[i].y);
          this.ctx.lineTo(this.nodes[j].x, this.nodes[j].y);
          this.ctx.stroke();
        }
      }
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.nodes.forEach(node => {
      this.moveNode(node);
      this.drawNode(node);
    });
    
    this.connectNodes();
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

// ============================================
// HERO SLIDESHOW
// ============================================

class HeroSlideshow {
  constructor() {
    this.slides = document.querySelectorAll('.slide');
    this.current = 0;
    this.interval = null;
    
    this.init();
  }

  init() {
    if (this.slides.length === 0) return;

    this.updateSlides();
    this.start();
    
    // Add click navigation
    this.addSlideNavigation();
  }

  addSlideNavigation() {
    this.slides.forEach((slide, index) => {
      slide.addEventListener('click', () => {
        this.current = index;
        this.updateSlides();
        this.restartInterval();
      });
    });
  }

  updateSlides() {
    this.slides.forEach((slide, index) => {
      slide.className = 'slide';
      const offset = (index - this.current + this.slides.length) % this.slides.length;
      
      if (offset === 0) slide.classList.add('active');
      else if (offset === 1) slide.classList.add('right1');
      else if (offset === 2) slide.classList.add('right2');
      else if (offset === this.slides.length - 1) slide.classList.add('left1');
      else if (offset === this.slides.length - 2) slide.classList.add('left2');
    });
  }

  rotate() {
    this.current = (this.current + 1) % this.slides.length;
    this.updateSlides();
  }

  start() {
    this.interval = setInterval(() => this.rotate(), 3000);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  restartInterval() {
    this.stop();
    this.start();
  }
}

// ============================================
// HERO TYPING EFFECT
// ============================================

class TypingEffect {
  constructor() {
    this.element = document.querySelector('.typing-text');
    this.roles = [
      'Software Engineer',
      'AI Engineer',
      'UI/UX Engineer',
      'Full Stack Developer'
    ];
    this.roleIndex = 0;
    this.charIndex = 0;
    this.typingSpeed = 100;
    this.deletingSpeed = 60;
    this.pauseTime = 1200;
    this.isDeleting = false;
    
    this.init();
  }

  init() {
    if (!this.element) return;
    this.type();
  }

  type() {
    const currentRole = this.roles[this.roleIndex];
    
    if (this.isDeleting) {
      this.element.textContent = currentRole.substring(0, this.charIndex - 1);
      this.charIndex--;
      
      if (this.charIndex === 0) {
        this.isDeleting = false;
        this.roleIndex = (this.roleIndex + 1) % this.roles.length;
        setTimeout(() => this.type(), 300);
        return;
      }
      
      setTimeout(() => this.type(), this.deletingSpeed);
    } else {
      this.element.textContent = currentRole.substring(0, this.charIndex + 1);
      this.charIndex++;
      
      if (this.charIndex === currentRole.length) {
        this.isDeleting = true;
        setTimeout(() => this.type(), this.pauseTime);
        return;
      }
      
      setTimeout(() => this.type(), this.typingSpeed);
    }
  }
}

// ============================================
// WORK EXPERIENCE TIMELINE ANIMATIONS
// ============================================

class TimelineAnimations {
  constructor() {
    this.init();
  }

  init() {
    // Reveal timeline rows on scroll with directional animation
    const timelineRows = document.querySelectorAll('.timeline-row');
    
    function revealTimeline() {
      timelineRows.forEach((row, i) => {
        const rect = row.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          row.classList.add('visible');
        }
      });
    }
    
    window.addEventListener('scroll', revealTimeline);
    window.addEventListener('load', revealTimeline);
  }
}

// ============================================
// INITIALIZE APPLICATION
// ============================================

class PortfolioApp {
  constructor() {
    this.modules = [];
    this.init();
  }

  init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initModules());
    } else {
      this.initModules();
    }
  }

  initModules() {
    try {
      this.modules.push(new AdvancedScrollAnimations());
      this.modules.push(new Navigation());
      this.modules.push(new CounterAnimation());
      this.modules.push(new ParallaxEffect());
      this.modules.push(new ContactForm());
      this.modules.push(new HeroAnimation());
      this.modules.push(new NeuralNetwork());
      this.modules.push(new HeroSlideshow());
      this.modules.push(new TypingEffect());
      this.modules.push(new TimelineAnimations());

      console.log('Portfolio initialized successfully with enhanced animations');
    } catch (error) {
      console.error('Error initializing portfolio:', error);
    }
  }

  destroy() {
    this.modules.forEach(module => {
      if (module.destroy) module.destroy();
      if (module.stop) module.stop();
    });
  }
}

// Initialize the application
const app = new PortfolioApp();

// Add CSS for additional animations
const additionalStyles = `
@keyframes nameReveal {
  0% { 
    background-position: -100% 0;
  }
  100% { 
    background-position: 0 0;
  }
}

.form-group.focused {
  transform: scale(1.02);
  transition: transform 0.3s ease;
}

.form-group.focused input,
.form-group.focused textarea {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(255, 45, 149, 0.1);
}

@keyframes skillPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);