// Modal management
const signupBtn = document.getElementById('signupBtn');
const signupModal = document.getElementById('signupModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const form = document.querySelector('form');

// Show modal with animation
signupBtn.addEventListener('click', () => {
    signupModal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
});

// Hide modal with animation
const hideModal = () => {
    signupModal.style.opacity = '0';
    setTimeout(() => {
        signupModal.style.display = 'none';
        signupModal.style.opacity = '1';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }, 300);
};

closeModalBtn.addEventListener('click', hideModal);

// Improved touch handling for modal close
let touchStartY;
signupModal.addEventListener('touchstart', (e) => {
    if (e.target === signupModal) {
        touchStartY = e.touches[0].clientY;
    }
}, { passive: true });

signupModal.addEventListener('touchend', (e) => {
    if (e.target === signupModal && touchStartY && Math.abs(e.changedTouches[0].clientY - touchStartY) < 5) {
        hideModal();
    }
    touchStartY = null;
}, { passive: true });

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === signupModal) {
        hideModal();
    }
});

// Form validation and submission with improved mobile UX
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const experience = document.getElementById('telescope').value;
    
    // Basic validation
    if (!name || !email || !experience) {
        alert('Please fill in all fields');
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Mock form submission
    console.log('Form submitted:', { name, email, experience });
    
    // Show toast notification
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = `Welcome to the Stargazer's Society, ${name}! We'll contact you soon.`;
    document.body.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Remove toast after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => document.body.removeChild(toast), 300);
    }, 5000);
    
    hideModal();
    form.reset();
});

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Handle viewport height for mobile browsers
function updateViewportHeight() {
    // First we get the viewport height and we multiply it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// We listen to the resize event
window.addEventListener('resize', () => {
    // Avoid resize events from mobile address bar showing/hiding
    setTimeout(updateViewportHeight, 100);
});

// We listen to the orientationchange event
window.addEventListener('orientationchange', () => {
    // Wait for the orientation change to complete
    setTimeout(updateViewportHeight, 100);
});

// Initial call
updateViewportHeight();

// Add touch-action to allow native scrolling
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.touchAction = 'pan-y';
});