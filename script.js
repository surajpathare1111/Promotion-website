// Set current year in footer
document.addEventListener('DOMContentLoaded', function() {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});

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

// Enhanced demo button interactions
document.querySelectorAll('a[href="#demo-loop"], a[href="#demo-synth"]').forEach(button => {
  button.addEventListener('click', function(e) {
    e.preventDefault();
    
    const originalText = this.textContent;
    const originalBackground = this.style.background;
    
    // Show loading state
    this.style.opacity = '0.8';
    this.textContent = 'Loading...';
    this.style.pointerEvents = 'none';
    
    // Add loading animation
    this.style.background = 'linear-gradient(45deg, #667eea, #764ba2, #667eea)';
    this.style.backgroundSize = '200% 200%';
    this.style.animation = 'gradientShift 1s ease-in-out infinite';
    
    // Simulate loading time
    setTimeout(() => {
      this.style.opacity = '1';
      this.textContent = originalText;
      this.style.background = originalBackground;
      this.style.pointerEvents = 'auto';
      this.style.animation = 'none';
      
      // Here you would typically navigate to your actual app
      if (this.getAttribute('href') === '#demo-loop') {
        console.log('Launching LoopStation Pro...');
        // In a real app, you might do:
        // window.open('loopstation-pro.html', '_blank');
        showNotification('LoopStation Pro would launch here!');
      } else {
        console.log('Launching Audio to Synth...');
        // In a real app, you might do:
        // window.open('audio-to-synth.html', '_blank');
        showNotification('Audio → Synth would launch here!');
      }
    }, 2000);
  });
});

// Add CSS for loading animation
const style = document.createElement('style');
style.textContent = `
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  .notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    transform: translateX(400px);
    opacity: 0;
    transition: all 0.3s ease;
  }
  
  .notification.show {
    transform: translateX(0);
    opacity: 1;
  }
  
  .mobile-menu-btn {
    display: none;
    background: none;
    border: none;
    color: #4a5568;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
  }
  
  @media (max-width: 768px) {
    .mobile-menu-btn {
      display: block;
    }
    
    .nav {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      flex-direction: column;
      padding: 1rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
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
    
    .nav a {
      padding: 0.5rem 0;
      border-bottom: 1px solid #e2e8f0;
      text-align: center;
    }
    
    .nav a:last-child {
      border-bottom: none;
    }
  }
`;
document.head.appendChild(style);

// Notification system
function showNotification(message) {
  // Remove existing notification if any
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  
  // Show notification
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);
  
  // Hide and remove notification
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
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
document.addEventListener('DOMContentLoaded', () => {
  const animateElements = document.querySelectorAll('.tool-card, .demo-card, .faq-item, .spec-card');
  
  animateElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
  });
});

// Mobile menu toggle
function createMobileMenu() {
  const nav = document.querySelector('.nav');
  const header = document.querySelector('.header .container');
  
  if (!nav || !header) return;
  
  // Create mobile menu button
  const menuButton = document.createElement('button');
  menuButton.className = 'mobile-menu-btn';
  menuButton.innerHTML = '☰';
  menuButton.setAttribute('aria-label', 'Toggle navigation menu');
  
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
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !menuButton.contains(e.target)) {
      nav.classList.remove('active');
      menuButton.innerHTML = '☰';
    }
  });
}

// Initialize mobile menu
document.addEventListener('DOMContentLoaded', createMobileMenu);

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const nav = document.querySelector('.nav');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    if (nav && nav.classList.contains('active')) {
      nav.classList.remove('active');
      if (menuBtn) menuBtn.innerHTML = '☰';
    }
  }
});

// Enhanced focus management for accessibility
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('focus', function() {
    this.style.outline = '2px solid #667eea';
    this.style.outlineOffset = '2px';
  });
  
  button.addEventListener('blur', function() {
    this.style.outline = 'none';
  });
});

// Add scroll-to-top functionality
function createScrollToTop() {
  const scrollButton = document.createElement('button');
  scrollButton.innerHTML = '↑';
  scrollButton.className = 'scroll-to-top';
  scrollButton.setAttribute('aria-label', 'Scroll to top');
  
  // Add styles
  const scrollStyle = `
    .scroll-to-top {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      border: none;
      border-radius: 50%;
      width: 3rem;
      height: 3rem;
      font-size: 1.25rem;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      z-index: 100;
    }
    
    .scroll-to-top.visible {
      opacity: 1;
      visibility: visible;
    }
    
    .scroll-to-top:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 25px rgba(0, 0, 0, 0.4);
    }
  `;
  
  if (!document.querySelector('#scroll-to-top-styles')) {
    const styleElement = document.createElement('style');
    styleElement.id = 'scroll-to-top-styles';
    styleElement.textContent = scrollStyle;
    document.head.appendChild(styleElement);
  }
  
  document.body.appendChild(scrollButton);
  
  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollButton.classList.add('visible');
    } else {
      scrollButton.classList.remove('visible');
    }
  });
  
  // Scroll to top when clicked
  scrollButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Initialize scroll-to-top
document.addEventListener('DOMContentLoaded', createScrollToTop);

// Add performance monitoring
function trackPerformance() {
  if ('performance' in window) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.timing;
        const loadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
        
        // You could send this data to analytics
        if (loadTime > 3000) {
          console.warn('Page load time is slow. Consider optimizing.');
        }
      }, 0);
    });
  }
}

trackPerformance();