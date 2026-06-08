document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Optional: Animate hamburger lines
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up').forEach(el => {
        observer.observe(el);
    });

    // Accordion functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all items
            document.querySelectorAll('.accordion-item').forEach(accItem => {
                accItem.classList.remove('active');
            });

            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Gallery Image Loading
    const images = [
        "91390_0.jpg", "91391_0.jpg", "91392_0.jpg", "91393_0.jpg", 
        "91394_0.jpg", "91395_0.jpg", "91396_0.jpg", "91397_0.jpg",
        "91398_0.jpg", "91399_0.jpg", "91400_0.jpg", "91401_0.jpg",
        "91402_0.jpg", "91403_0.jpg", "91405_0.jpg", "91406_0.jpg",
        "91407_0.jpg", "91408_0.jpg", "91409_0.jpg", "91410.jpg"
    ];

    const galleryContainer = document.getElementById('gallery-container');
    
    // Setup modal elements
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <button class="modal-close">&times;</button>
        <img src="" alt="Enlarged Image">
    `;
    document.body.appendChild(modal);
    
    const modalImg = modal.querySelector('img');
    const closeBtn = modal.querySelector('.modal-close');

    // Make modal closeable
    const closeModal = () => modal.classList.remove('active');
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if(e.target === modal) closeModal();
    });

    images.forEach((img, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item fade-in-up';
        // Add random staggered delay
        item.style.transitionDelay = `${(index % 4) * 0.1}s`;
        
        // Randomly assign some masonry-like sizes
        if (index === 0 || index === 7) item.classList.add('large');
        else if (index === 3 || index === 10) item.classList.add('tall');
        else if (index === 5 || index === 14) item.classList.add('wide');

        const imgPath = `EE_picture/${img}`;
        
        item.innerHTML = `
            <img src="${imgPath}" alt="NCREE Photo ${index + 1}" loading="lazy">
            <div class="gallery-overlay">
                <span style="color: white; font-weight: 600;">檢視照片</span>
            </div>
        `;

        item.addEventListener('click', () => {
            modalImg.src = imgPath;
            modal.classList.add('active');
        });

        galleryContainer.appendChild(item);
        observer.observe(item);
    });
});
