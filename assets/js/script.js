document.addEventListener('DOMContentLoaded', () => {
    // Inject Favicon dynamically
    const faviconLink = document.createElement('link');
    faviconLink.rel = 'icon';
    faviconLink.type = 'image/svg+xml';
    // Seedling SVG
    const svgData = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="20" fill="#2e5939"/><path d="M20 28V16" stroke="white" stroke-width="2.5" stroke-linecap="round"/><path d="M20 22C16.5 22 13 18.5 13 14C16.5 14 20 17.5 20 22Z" fill="white"/><path d="M20 17C23.5 17 27 13.5 27 9C23.5 9 20 12.5 20 17Z" fill="white"/></svg>`;
    faviconLink.href = 'data:image/svg+xml;base64,' + btoa(svgData);
    document.head.appendChild(faviconLink);
    
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
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex-shrink: 0;">
                    <rect width="40" height="40" rx="20" fill="var(--accent-color)"/>
                    <path d="M20 28V16" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
                    <path d="M20 22C16.5 22 13 18.5 13 14C16.5 14 20 17.5 20 22Z" fill="white"/>
                    <path d="M20 17C23.5 17 27 13.5 27 9C23.5 9 20 12.5 20 17Z" fill="white"/>
                </svg>
                <span style="font-weight: 800; color: var(--text-primary) !important; font-size: 1.75rem; letter-spacing: -0.5px; line-height: 1; font-family: 'Inter', sans-serif;">Seed Vault</span>
            </a>
        `;
    }
}
customElements.define('brand-logo', BrandLogo);
