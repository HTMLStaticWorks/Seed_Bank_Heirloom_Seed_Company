document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

    // Check saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (!themeIcon) return;
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }

    // RTL Toggle
    const rtlToggle = document.getElementById('rtl-toggle');
    const savedDir = localStorage.getItem('dir') || 'ltr';
    htmlElement.setAttribute('dir', savedDir);

    if (rtlToggle) {
        rtlToggle.addEventListener('click', () => {
            const currentDir = htmlElement.getAttribute('dir');
            const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
            htmlElement.setAttribute('dir', newDir);
            localStorage.setItem('dir', newDir);
        });
    }

    // Mobile Menu Toggle
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', () => {
            navbarCollapse.classList.toggle('show');
        });
    }

    // Back to top button
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Scroll Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                
                // Add specific animation classes based on data attributes if provided
                const animType = entry.target.getAttribute('data-anim');
                if (animType) {
                    entry.target.classList.add(`animate-${animType}`);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Skeleton loader removal simulation
    const skeletons = document.querySelectorAll('.skeleton-wrapper');
    if(skeletons.length > 0) {
        setTimeout(() => {
            skeletons.forEach(skel => {
                skel.classList.remove('skeleton');
                // show actual content logic here
            });
        }, 1500);
    }
});

// Master Brand Component Definition
class BrandLogo extends HTMLElement {
    connectedCallback() {
        const location = this.getAttribute('location') || 'header';
        
        let customStyles = '';
        let wrapperClass = 'navbar-brand d-inline-flex align-items-center text-decoration-none';
        
        if (location === 'auth') {
            customStyles = 'justify-content: center; margin: 0 auto 1.5rem auto; width: 100%;';
        } else if (location === 'footer') {
            customStyles = 'margin-bottom: 20px;';
        }

        this.innerHTML = `
            <a class="${wrapperClass}" href="index.html" style="gap: 12px; height: 50px; ${customStyles}">
                <i class="fa-solid fa-seedling" style="color: var(--accent-color); font-size: 2rem; line-height: 1;"></i>
                <span style="font-weight: 700; color: var(--text-primary) !important; font-size: 2rem; line-height: 1; margin-top: 5px;">Seed Vault</span>
            </a>
        `;
    }
}
customElements.define('brand-logo', BrandLogo);
