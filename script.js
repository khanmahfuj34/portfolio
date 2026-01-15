// script.js
// ============================================
// Premium Portfolio Website JavaScript
// Interactive animations and functionality
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Page Loader Animation
    const pageLoader = document.querySelector('.page-loader');
    setTimeout(() => {
        pageLoader.classList.add('fade-out');
        setTimeout(() => {
            pageLoader.style.display = 'none';
        }, 800);
    }, 2000);

    // Custom Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    document.addEventListener('mousemove', (e) => {
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;

        setTimeout(() => {
            cursorOutline.style.left = `${e.clientX}px`;
            cursorOutline.style.top = `${e.clientY}px`;
        }, 80);
    });

    // Interactive cursor effects
    document.querySelectorAll('a, button, .skill-card, .project-card, .contact-item, .tool-card').forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorDot.style.width = '16px';
            cursorDot.style.height = '16px';
            cursorDot.style.backgroundColor = 'rgba(0, 217, 255, 0.5)';

            cursorOutline.style.width = '60px';
            cursorOutline.style.height = '60px';
            cursorOutline.style.borderColor = 'rgba(0, 217, 255, 0.3)';
        });

        element.addEventListener('mouseleave', () => {
            cursorDot.style.width = '8px';
            cursorDot.style.height = '8px';
            cursorDot.style.backgroundColor = 'var(--accent-color)';

            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorOutline.style.borderColor = 'var(--accent-color)';
        });
    });

    // Navigation
    const nav = document.querySelector('.main-nav');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Nav scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Mobile nav toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Nav link click handler
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Close mobile menu if open
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');

            // Smooth scroll to section
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Particle Background for Hero Section
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Random properties
        const size = Math.random() * 5 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const opacity = Math.random() * 0.5 + 0.1;
        const animationDuration = Math.random() * 20 + 10;
        const animationDelay = Math.random() * 5;

        // Apply styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.opacity = opacity;
        particle.style.animationDuration = `${animationDuration}s`;
        particle.style.animationDelay = `${animationDelay}s`;

        // Add to container
        particlesContainer.appendChild(particle);
    }

    // Add CSS for particles
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        .particle {
            position: absolute;
            background-color: var(--accent-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: var(--z-background);
            animation: floatParticle linear infinite;
        }
        
        @keyframes floatParticle {
            0% {
                transform: translateY(0) translateX(0);
            }
            25% {
                transform: translateY(-20px) translateX(10px);
            }
            50% {
                transform: translateY(-40px) translateX(0);
            }
            75% {
                transform: translateY(-20px) translateX(-10px);
            }
            100% {
                transform: translateY(0) translateX(0);
            }
        }
    `;
    document.head.appendChild(particleStyle);

    // Typing Animation
    const typingText = document.querySelector('.typing-text');
    const textLines = [
        'Frontend Developer',
        'UI/UX Enthusiast',
        'React.js Specialist',
        'Problem Solver'
    ];

    let lineIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isEnd = false;

    function typeWriter() {
        const currentLine = textLines[lineIndex];

        if (isDeleting) {
            typingText.textContent = currentLine.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentLine.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentLine.length) {
            isEnd = true;
            setTimeout(typeWriter, 1500);
            return;
        }

        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            lineIndex++;
            if (lineIndex >= textLines.length) {
                lineIndex = 0;
            }
        }

        const speed = isDeleting ? 50 : isEnd ? 100 : 100;
        setTimeout(typeWriter, speed);

        if (isEnd) {
            isDeleting = true;
            isEnd = false;
        }
    }

    // Start typing effect after page loads
    setTimeout(typeWriter, 1000);

    // Animate stats counters
    const statNumbers = document.querySelectorAll('.stat-number');

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const increment = target / 100;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 20);
    }

    // Animate skill progress bars
    const progressBars = document.querySelectorAll('.progress-bar');

    function animateProgressBar(bar) {
        const targetWidth = bar.getAttribute('data-progress');
        bar.style.width = `${targetWidth}%`;
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate stats in about section
                if (entry.target.id === 'about') {
                    statNumbers.forEach(animateCounter);
                }

                // Animate skill progress bars
                if (entry.target.id === 'skills') {
                    progressBars.forEach(animateProgressBar);
                }

                // Add fade-in class to elements
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Add CSS for fade-in animation
    const fadeInStyle = document.createElement('style');
    fadeInStyle.textContent = `
        .fade-in .hero-intro,
        .fade-in .title-text,
        .fade-in .timeline-content,
        .fade-in .skill-card,
        .fade-in .project-card,
        .fade-in .tool-card,
        .fade-in .contact-item {
            animation: fadeInUp 0.8s ease forwards;
        }
        
        .fade-in .skill-card:nth-child(2) { animation-delay: 0.1s; }
        .fade-in .skill-card:nth-child(3) { animation-delay: 0.2s; }
        .fade-in .skill-card:nth-child(4) { animation-delay: 0.3s; }
        .fade-in .skill-card:nth-child(5) { animation-delay: 0.4s; }
        .fade-in .skill-card:nth-child(6) { animation-delay: 0.5s; }
        
        .fade-in .project-card:nth-child(2) { animation-delay: 0.2s; }
        .fade-in .project-card:nth-child(3) { animation-delay: 0.4s; }
        
        .fade-in .timeline-item:nth-child(2) { animation-delay: 0.2s; }
        .fade-in .timeline-item:nth-child(3) { animation-delay: 0.4s; }
    `;
    document.head.appendChild(fadeInStyle);

    // Contact Form Submission (UI only)
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // In a real implementation, you would send this data to a server
        // For this demo, we'll just show a success message

        // Create success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <h3>Message Sent Successfully!</h3>
            <p>Thank you ${name}, I'll get back to you soon.</p>
        `;

        // Add styles for success message
        const successStyle = document.createElement('style');
        successStyle.textContent = `
            .success-message {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) scale(0.8);
                background: rgba(20, 20, 20, 0.95);
                backdrop-filter: blur(10px);
                border: 1px solid var(--accent-color);
                border-radius: var(--radius-md);
                padding: var(--spacing-lg);
                text-align: center;
                z-index: 1000;
                opacity: 0;
                animation: showSuccess 0.5s ease forwards;
                max-width: 400px;
                width: 90%;
            }
            
            @keyframes showSuccess {
                to {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
            }
            
            .success-message i {
                font-size: 3rem;
                color: var(--accent-color);
                margin-bottom: var(--spacing-md);
            }
            
            .success-message h3 {
                margin-bottom: var(--spacing-sm);
                color: var(--text-color);
            }
            
            .success-message p {
                color: var(--text-secondary);
                margin-bottom: var(--spacing-md);
            }
        `;
        document.head.appendChild(successStyle);

        // Append and show success message
        document.body.appendChild(successMessage);

        // Remove message after 3 seconds
        setTimeout(() => {
            successMessage.style.opacity = '0';
            successMessage.style.transform = 'translate(-50%, -50%) scale(0.8)';

            setTimeout(() => {
                document.body.removeChild(successMessage);
            }, 500);
        }, 3000);

        // Reset form
        contactForm.reset();
    });

    // Ripple effect for buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.classList.add('ripple-effect');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple effect
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .ripple-effect {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.7);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    // Update active nav link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);

    // Initialize
    updateActiveNavLink();
});