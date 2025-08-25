// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add loading animation to demo buttons
document.querySelectorAll('a[href="#demo-loop"], a[href="#demo-synth"]').forEach(button => {
  button.addEventListener('click', function(e) {
    e.preventDefault();
    
    const originalText = this.textContent;
    this.style.opacity = '0.7';
    this.textContent = 'Loading...';
    
    // Simulate loading time
    setTimeout(() => {
      this.style.opacity = '1';
      this.textContent = originalText;
      
      // Here you would typically navigate to your actual app
      if (this.getAttribute('href') === '#demo-loop') {
        console.log('Launching LoopStation Pro...');
        // window.location.href = 'loopstation-pro.html';
      } else {
        console.log('Launching Audio to Synth...');
        // window.location.href = 'audio-to-synth.html';
      }
    }, 1500);
  });
});

// Add intersection observer for animations
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
document.addEventListener('DOMContentLoaded', () => {
  const animateElements = document.querySelectorAll('.tool-card, .demo-card, .faq-item');
  
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

// Add mobile menu toggle
const createMobileMenu = () => {
  const nav = document.querySelector('.nav');
  const header = document.querySelector('.header .container');
  
  // Create mobile menu button
  const menuButton = document.createElement('button');
  menuButton.className = 'mobile-menu-btn';
  menuButton.innerHTML = '☰';
  menuButton.style.cssText = `
    display: none;
    background: none;
    border: none;
    color: var(--text);
    font-size: 24px;
    cursor: pointer;
    padding: 8px;
  `;
  
  // Add mobile styles
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 768px) {
      .mobile-menu-btn {
        display: block !important;
      }
      
      .nav {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--card);
        backdrop-filter: blur(20px);
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        flex-direction: column;
        padding: 20px;
        transform: translateY(-100%);
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s ease;
      }
      
      .nav.active {
        transform: translateY(0);
        opacity: 1;
        pointer-events: auto;
      }
      
      .header {
        position: relative;
      }
    }
  `;
  
  document.head.appendChild(style);
  header.appendChild(menuButton);
  
  menuButton.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuButton.innerHTML = nav.classList.contains('active') ? '×' : '☰';
  });
  
  // Close menu when clicking links
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      menuButton.innerHTML = '☰';
    });
  });
};

// Initialize mobile menu
createMobileMenu();

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const nav = document.querySelector('.nav');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    if (nav.classList.contains('active')) {
      nav.classList.remove('active');
      menuBtn.innerHTML = '☰';
    }
  }
});

// Add focus management for accessibility
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('focus', function() {
    this.style.outline = '2px solid var(--brand)';
    this.style.outlineOffset = '2px';
  });
  
  button.addEventListener('blur', function() {
    this.style.outline = 'none';
  });
});