document.addEventListener('DOMContentLoaded', function() {
    const footerHTML = `
    <footer class="footer py-5" style="background-color: var(--bg-primary); color: var(--text);">
        <div class="container">
            <div class="row g-5">
                <div class="col-lg-3 col-md-6 footer-widget">
                    <brand-logo location="footer"></brand-logo>
                    <p>Dedicated to preserving agricultural biodiversity through high-quality heirloom seeds.</p>
                    <div class="social-icons d-flex gap-3 mt-4">
                        <a href="#" style="color: var(--text);"><i class="fa-brands fa-facebook-f fs-5"></i></a>
                        <a href="#" style="color: var(--text);"><i class="fa-brands fa-twitter fs-5"></i></a>
                        <a href="#" style="color: var(--text);"><i class="fa-brands fa-instagram fs-5"></i></a>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 footer-widget">
                    <h4 class="mb-4" style="color: var(--heading-color);">Quick Links</h4>
                    <ul class="footer-links list-unstyled">
                        <li class="mb-3"><a href="index.html" class="text-decoration-none" style="color: var(--text);">Home</a></li>
                        <li class="mb-3"><a href="about.html" class="text-decoration-none" style="color: var(--text);">About Us</a></li>
                        <li class="mb-3"><a href="services.html" class="text-decoration-none" style="color: var(--text);">Seed Catalog</a></li>
                        <li class="mb-3"><a href="contact.html" class="text-decoration-none" style="color: var(--text);">Contact</a></li>
                    </ul>
                </div>
                <div class="col-lg-2 col-md-6 footer-widget">
                    <h4 class="mb-4" style="color: var(--heading-color);">Resources</h4>
                    <ul class="footer-links list-unstyled">
                        <li class="mb-3"><a href="blog.html" class="text-decoration-none" style="color: var(--text);">Growing Guides</a></li>
                        <li class="mb-3"><a href="pricing.html" class="text-decoration-none" style="color: var(--text);">Pricing Plans</a></li>
                        <li class="mb-3"><a href="gallery.html" class="text-decoration-none" style="color: var(--text);">Gallery</a></li>
                        <li class="mb-3"><a href="#" class="text-decoration-none" style="color: var(--text);">FAQs</a></li>
                    </ul>
                </div>
                <div class="col-lg-5 col-md-12 footer-widget">
                    <h4 class="mb-4" style="color: var(--heading-color);">Newsletter</h4>
                    <p>Subscribe to our newsletter for seasonal planting tips and seed saving guides.</p>
                    <form class="d-flex flex-column flex-sm-row gap-2 mt-4" style="max-width: 400px;">
                        <input type="email" class="form-control py-2" placeholder="Email Address" required style="border-radius: 8px;">
                        <button class="btn-primary flex-shrink-0" type="submit" style="padding: 10px 25px; border-radius: 8px;">Subscribe</button>
                    </form>
                </div>
            </div>
            <div class="footer-bottom mt-5 pt-4 border-top text-center text-md-start d-md-flex justify-content-between align-items-center" style="border-color: rgba(128,128,128,0.2) !important;">
                <p class="mb-0">&copy; 2026 Seed Vault. All rights reserved.</p>
                <button onclick="window.scrollTo({top: 0, behavior: 'smooth'})" class="btn-primary rounded-circle shadow" style="width: 45px; height: 45px; padding: 0; display: flex; align-items: center; justify-content: center; border: none;" aria-label="Back to top">
                    <i class="fa-solid fa-arrow-up text-dark"></i>
                </button>
            </div>
        </div>
    </footer>
    `;
    const footerContainer = document.getElementById('global-footer');
    if (footerContainer) {
        footerContainer.innerHTML = footerHTML;
    }
});
