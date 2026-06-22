document.addEventListener('DOMContentLoaded', () => {
    // Inject Favicon dynamically
    const faviconLink = document.createElement('link');
    faviconLink.rel = 'icon';
    faviconLink.type = 'image/svg+xml';
    // Seedling SVG path filled with Deep Forest Green (#2e5939)
    const svgData = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#2e5939" d="M512 32c0 113.6-84.6 207.5-194.2 222c-7.1-53.4-30.6-101.6-65.3-139.3C290.8 46.3 364 0 448 0l32 0c17.7 0 32 14.3 32 32zM0 96C0 78.3 14.3 64 32 64l32 0c123.7 0 224 100.3 224 224l0 32 0 160c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-160C100.3 320 0 219.7 0 96z"/></svg>`;
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
                <i class="fa-solid fa-seedling" style="color: var(--accent-color); font-size: 2rem; line-height: 1;"></i>
                <span style="font-weight: 700; color: var(--text-primary) !important; font-size: 2rem; line-height: 1; margin-top: 5px;">Seed Vault</span>
            </a>
        `;
    }
}
customElements.define('brand-logo', BrandLogo);
