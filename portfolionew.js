// Toast functionality
function createToast(type, title, message) {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
    
    toast.innerHTML = `
        <i class="${icon}"></i>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, 300);
    }, 5000);
}

// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const name = formData.get('name');
            const email = formData.get('mail');
            const phone = formData.get('number');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !phone || !subject || !message) {
                createToast('error', 'Error!', 'Please fill in all fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                createToast('error', 'Invalid Email!', 'Please enter a valid email address.');
                return;
            }
            
            // Phone validation (basic)
            const phoneRegex = /^\d{10,}$/;
            if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
                createToast('error', 'Invalid Phone!', 'Please enter a valid phone number.');
                return;
            }
            
            // Simulate form submission
            const submitButton = form.querySelector('.btn');
            const originalText = submitButton.innerHTML;
            
            // Show loading state
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Reset button
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                // Show success message
                createToast('success', 'Message Sent!', 'Thank you for your message. I\'ll get back to you soon!');
                
                // Reset form
                form.reset();
            }, 2000);
        });
    }
});

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-menus a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            let targetSection = document.querySelector(targetId);
            
            // Handle the skills section ID mismatch
            if (targetId === '#skills' && !targetSection) {
                targetSection = document.querySelector('#Skills');
            }
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Image Slider Functionality
let currentImageIndex = 0;
const images = document.querySelectorAll('.photo');
const dots = document.querySelectorAll('.dot');

function showImage(index) {
    // Hide all images
    images.forEach(img => img.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show current image and activate corresponding dot
    if (images[index]) {
        images[index].classList.add('active');
        dots[index].classList.add('active');
        currentImageIndex = index;
    }
}

function changeImage(direction) {
    let newIndex = currentImageIndex + direction;
    
    if (newIndex >= images.length) {
        newIndex = 0;
    } else if (newIndex < 0) {
        newIndex = images.length - 1;
    }
    
    showImage(newIndex);
}

function goToImage(index) {
    showImage(index);
}

// Auto-advance slider every 5 seconds
function autoAdvance() {
    changeImage(1);
}

// Initialize slider
document.addEventListener('DOMContentLoaded', function() {
    if (images.length > 0) {
        showImage(0);
        
        // Start auto-advance
        setInterval(autoAdvance, 5000);
    }
});

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effect to skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add typing effect to the main title
    const title = document.querySelector('.title');
    if (title) {
        const text = title.textContent;
        title.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }
    
    // Add animation to skill progress bars
    const skillItemsWithProgress = document.querySelectorAll('.skill-item[data-skill]');
    skillItemsWithProgress.forEach(item => {
        const progressBar = item.querySelector('.progress');
        if (progressBar) {
            const width = progressBar.style.width;
            progressBar.style.width = '0%';
            
            setTimeout(() => {
                progressBar.style.width = width;
            }, 500);
        }
    });
    
    // Add personality trait animations
    const traits = document.querySelectorAll('.trait');
    traits.forEach((trait, index) => {
        trait.style.opacity = '0';
        trait.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            trait.style.transition = 'all 0.5s ease';
            trait.style.opacity = '1';
            trait.style.transform = 'translateY(0)';
        }, 300 + (index * 200));
    });
    
    // Add fun facts animation
    const factsList = document.querySelector('.facts-list');
    if (factsList) {
        const facts = factsList.querySelectorAll('li');
        facts.forEach((fact, index) => {
            fact.style.opacity = '0';
            fact.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                fact.style.transition = 'all 0.5s ease';
                fact.style.opacity = '1';
                fact.style.transform = 'translateX(0)';
            }, 1000 + (index * 200));
        });
    }
    
    // Add scroll animations for sections
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
        sectionObserver.observe(section);
    });
});
