document.addEventListener('DOMContentLoaded', () => {
    const menuLinks = document.querySelectorAll('.menu a');
    const sections = document.querySelectorAll('main section[id]');
    const revealElements = document.querySelectorAll('.reveal');
    const yearElement = document.getElementById('year');
    const copyButton = document.getElementById('copy-email');
    const githubButton = document.getElementById('click-github');
    const carousel = document.querySelector('.project-carousel');

    const setActiveLink = (sectionId) => {
        menuLinks.forEach((link) => {
            const isActive = link.getAttribute('href') === `#${sectionId}`;
            link.classList.toggle('active', isActive);
        });
    };

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveLink(entry.target.id);
                }
            });
        },
        {
            threshold: 0.5
        }
    );

    sections.forEach((section) => observer.observe(section));

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.2
        }
    );

    revealElements.forEach((element) => revealObserver.observe(element));

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    if (copyButton) {
        const email = 'gabrielsa.tech@gmail.com';

        copyButton.addEventListener('click', () => {
            const subject = encodeURIComponent('Contato pelo site');
            const body = encodeURIComponent('Olá Gabriel,\n\nGostaria de entrar em contato sobre...');
            const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;

            window.location.href = mailtoLink;
        });
    }

    if (githubButton) {
        githubButton.addEventListener('click', () => {
            window.open('https://github.com/EngSoftGabriel', '_blank');
        });
    }

    if (carousel) {
        const images = carousel.querySelectorAll('.project-image');
        const dots = carousel.querySelectorAll('.carousel-dot');
        const previousButton = carousel.querySelector('.carousel-previous');
        const nextButton = carousel.querySelector('.carousel-next');
        let activeIndex = 0;

        const showImage = (index) => {
            activeIndex = (index + images.length) % images.length;

            images.forEach((image, imageIndex) => {
                image.classList.toggle('is-active', imageIndex === activeIndex);
            });

            dots.forEach((dot, dotIndex) => {
                const isActive = dotIndex === activeIndex;
                dot.classList.toggle('is-active', isActive);
                dot.toggleAttribute('aria-current', isActive);
            });
        };

        previousButton.addEventListener('click', () => showImage(activeIndex - 1));
        nextButton.addEventListener('click', () => showImage(activeIndex + 1));
        dots.forEach((dot, dotIndex) => {
            dot.addEventListener('click', () => showImage(dotIndex));
        });

        carousel.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft') showImage(activeIndex - 1);
            if (event.key === 'ArrowRight') showImage(activeIndex + 1);
        });
    }
});