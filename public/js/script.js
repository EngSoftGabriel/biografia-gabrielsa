document.addEventListener('DOMContentLoaded', () => {
    const menuLinks = document.querySelectorAll('.menu a');
    const sections = document.querySelectorAll('main section[id]');
    const revealElements = document.querySelectorAll('.reveal');
    const yearElement = document.getElementById('year');
    const copyButton = document.getElementById('copy-email');

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

        copyButton.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(email);
                copyButton.textContent = 'E-mail copiado!';
            } catch (error) {
                copyButton.textContent = 'Não foi possível copiar';
                console.error('Erro ao copiar e-mail:', error);
            }

            setTimeout(() => {
                copyButton.textContent = 'Copiar e-mail';
            }, 1500);
        });
    }
});