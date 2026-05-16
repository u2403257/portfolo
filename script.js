// Navigation Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Modal Logic
const modalOverlay = document.getElementById('modalOverlay');
let currentlyOpenModal = null;

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    // Close any currently open modal first
    if (currentlyOpenModal) {
        closeModal(currentlyOpenModal.id);
    }
    
    modal.classList.add('active');
    modalOverlay.classList.add('active');
    currentlyOpenModal = modal;
    
    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    modal.classList.remove('active');
    modalOverlay.classList.remove('active');
    currentlyOpenModal = null;
    
    // Restore background scrolling
    document.body.style.overflow = 'auto';
}

// Close modal when clicking on overlay
modalOverlay.addEventListener('click', () => {
    if (currentlyOpenModal) {
        closeModal(currentlyOpenModal.id);
    }
});

// Close modal on Escape key press
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && currentlyOpenModal) {
        closeModal(currentlyOpenModal.id);
    }
});

// Optional: Add simple scroll animation using Intersection Observer
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply initial styles for animation to cards
document.querySelectorAll('.card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.5s ease ${index * 0.1}s`;
    observer.observe(card);
});
