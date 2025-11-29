document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Prevent scrolling when menu is open
        if (navLinks.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = 'auto';
        }
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            body.style.overflow = 'auto';
        });
    });

    // Scroll Reveal Animation
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    // Header Scroll Effect
    let lastScroll = 0;
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.style.boxShadow = 'none';
            header.style.transform = 'translateY(0) translateX(-50%)';
        }
        else if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-200%) translateX(-50%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0) translateX(-50%)';
            header.style.boxShadow = '0 10px 30px -10px rgba(2,12,27,0.7)';
        }
        lastScroll = currentScroll;
    });

    // Terminal Typing Effect
    const typingElement = document.getElementById('typing-effect');
    if (typingElement) {
        const textToType = [
            "initializing neural_net...",
            "loading weights from 'gpt-4-finetuned.pth'...",
            "connecting to vector_db...",
            "system ready.",
            "hello, world!"
        ];
        let lineIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 50;

        function type() {
            const currentLine = textToType[lineIndex];

            if (isDeleting) {
                typingElement.innerHTML = currentLine.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 30;
            } else {
                typingElement.innerHTML = currentLine.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 50 + Math.random() * 50;
            }

            if (!isDeleting && charIndex === currentLine.length) {
                // Finished typing line
                if (lineIndex === textToType.length - 1) {
                    // Stop at the last line
                    return;
                }
                isDeleting = true;
                typeSpeed = 1000; // Pause before deleting
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                lineIndex++;
                typeSpeed = 500; // Pause before typing next line
                typingElement.innerHTML += "<br/>> "; // Add new prompt line effect visually if needed, but here we just replace text
                // Actually, for a realistic terminal, we might want to append lines. 
                // Let's keep it simple: clear and type next line, or append.
                // To keep it simple and clean in the one line space:
            }

            // Better Logic for multi-line terminal feel:
            // We will just append lines to the content, not delete them.
        }

        // Refined Logic for appending lines
        async function typeLines() {
            for (let i = 0; i < textToType.length; i++) {
                const line = textToType[i];
                // Type the line
                for (let j = 0; j < line.length; j++) {
                    typingElement.innerHTML += line[j];
                    await new Promise(r => setTimeout(r, 50 + Math.random() * 30));
                }
                // Add new line
                if (i < textToType.length - 1) {
                    typingElement.innerHTML += "<br/><span class='prompt'>vishal@dev:~$</span> ";
                    await new Promise(r => setTimeout(r, 500));
                }
            }
        }

        typeLines();
    }
});
