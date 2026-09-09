document.addEventListener('DOMContentLoaded', () => {
    const menuLinks = document.querySelectorAll('.menu a');
    const sections = document.querySelectorAll('main section[id]');
    const revealElements = document.querySelectorAll('.reveal');
    const yearElement = document.getElementById('year');
    const copyButton = document.getElementById('copy-email');
    const githubButton = document.getElementById('click-github');

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
});