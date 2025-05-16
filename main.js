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

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === signupModal) {
        hideModal();
    }
});

// Form validation and submission
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
    alert('Thank you for joining the Stargazer\'s Society! We\'ll be in touch soon.');
    hideModal();
    form.reset();
});

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}