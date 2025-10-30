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
// SCROLL ANIMATIONS
// ============================================

class ScrollAnimations {
  constructor() {
    this.observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -80px 0px'
    };
    
    this.init();
  }

  init() {
    this.createMainObserver();
    this.createExperienceObserver();
    this.initSkillsHover();
  }

  createMainObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, this.observerOptions);

    document.querySelectorAll('.animate-element').forEach(el => observer.observe(el));
  }

  createExperienceObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -100px 0px' });

    document.querySelectorAll('.experience-item').forEach(item => observer.observe(item));
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
// COUNTER ANIMATION
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
// HERO ENTRANCE ANIMATION
// ============================================

class HeroAnimation {
  constructor() {
    this.init();
  }

  init() {
    window.addEventListener('load', () => {
      const heroElements = document.querySelectorAll('#hero .animate-element');
      
      heroElements.forEach((el, index) => {
        setTimeout(() => el.classList.add('visible'), index * 200);
      });
    });
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
      this.modules.push(new Navigation());
      this.modules.push(new ScrollAnimations());
      this.modules.push(new CounterAnimation());
      this.modules.push(new ParallaxEffect());
      this.modules.push(new ContactForm());
      this.modules.push(new HeroAnimation());
      this.modules.push(new NeuralNetwork());
      this.modules.push(new HeroSlideshow());
      this.modules.push(new TypingEffect());

      console.log('Portfolio initialized successfully');
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














  // CSS Variables for consistency with your portfolio
        document.documentElement.style.setProperty('--bg-dark', '#0d0d0d');
        document.documentElement.style.setProperty('--bg-card', '#1a1a1a');
        document.documentElement.style.setProperty('--accent', '#ff2d95');
        document.documentElement.style.setProperty('--accent-hover', '#ff5aaa');
        document.documentElement.style.setProperty('--text-primary', '#ffffff');
        document.documentElement.style.setProperty('--text-secondary', '#b3b3b3');
        document.documentElement.style.setProperty('--gradient', 'linear-gradient(135deg, #ff2d95 0%, #ff6b9d 100%)');
        document.documentElement.style.setProperty('--transition-normal', '0.3s ease');

        // Project data with URLs (replace with actual project URLs)
        const projectData = {
            'uva-vec': 'https://example.com/uva-vec',
            'ats-media': 'https://example.com/ats-media',
            'ceylon-tracks': 'https://example.com/ceylon-tracks',
            'campus-website': 'https://example.com/campus-website',
            'mind-map': 'https://example.com/mind-map'
        };

        // Initialize the section
        document.addEventListener('DOMContentLoaded', function() {
            // Scroll animations for project items
            const projectItems = document.querySelectorAll('.project-item');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });

            projectItems.forEach(item => observer.observe(item));

            // Project modal functionality
            const modal = document.querySelector('.project-modal');
            const modalIframe = document.querySelector('.modal-iframe');
            const modalClose = document.querySelector('.modal-close');
            const viewProjectBtns = document.querySelectorAll('.view-project-btn');

            // Open modal when "View Project" is clicked
            viewProjectBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const projectItem = this.closest('.project-item');
                    const projectId = projectItem.getAttribute('data-project');
                    const projectUrl = projectData[projectId];
                    
                    if (projectUrl) {
                        modalIframe.src = projectUrl;
                        modal.classList.add('active');
                        document.body.style.overflow = 'hidden';
                    }
                });
            });

            // Close modal
            function closeModal() {
                modal.classList.remove('active');
                modalIframe.src = '';
                document.body.style.overflow = 'auto';
            }

            modalClose.addEventListener('click', closeModal);
            
            // Close modal when clicking outside content
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeModal();
                }
            });

            // Close modal with Escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && modal.classList.contains('active')) {
                    closeModal();
                }
            });
        });


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
