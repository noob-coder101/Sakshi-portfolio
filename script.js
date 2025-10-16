document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Typing animation
    const words = ['innovative', 'user-centric', 'impactful', 'solutions for new age problems'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.querySelector('.typing');
    
    function type() {
        const currentWord = words[wordIndex];
        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex--);
            if (charIndex < 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex++);
            if (charIndex > currentWord.length) {
                isDeleting = wordIndex < words.length - 1;
                charIndex = wordIndex < words.length - 1 ? currentWord.length : currentWord.length;
                setTimeout(type, wordIndex < words.length - 1 ? 1000 : 5000);
                return;
            }
        }
        setTimeout(type, isDeleting ? 50 : 100);
    }
    type();

    // Fade-in on scroll
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'visible');
            }
        });
    }, { threshold: 0.1 });
    sections.forEach(section => observer.observe(section));

    // Toggle work details
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const details = btn.nextElementSibling;
            const isHidden = details.style.display === 'none' || !details.style.display;
            details.style.display = isHidden ? 'block' : 'none';
            btn.textContent = isHidden ? 'Hide Details' : 'Show Details';
        });
    });

    // Form submission
    document.querySelector('form').addEventListener('submit', e => {
        e.preventDefault();
        console.log('Form submitted:', {
            name: e.target[0].value,
            email: e.target[1].value,
            message: e.target[2].value
        });
        alert('Message sent! (This is a demo; integrate Formspree for real submissions.)');
        e.target.reset();
    });
});