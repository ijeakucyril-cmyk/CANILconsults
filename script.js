document.addEventListener('DOMContentLoaded', () => {

    /* ================= 1. Theme Toggle (Light / Dark Mode) ================= */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');

    const savedTheme = localStorage.getItem('canil_theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', nextTheme);
        localStorage.setItem('canil_theme', nextTheme);
        updateThemeIcon(nextTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fa-solid fa-sun';
        } else {
            themeIcon.className = 'fa-solid fa-moon';
        }
    }

    /* ================= 2. Multi-Page Navigation ================= */
    const navButtons = document.querySelectorAll('[data-page]');
    const pageSections = document.querySelectorAll('.page-section');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');

    navButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = btn.getAttribute('data-page');

            // Switch Active Page
            pageSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === `page-${targetPage}`) {
                    section.classList.add('active');
                }
            });

            // Update Navigation Menu Active State
            document.querySelectorAll('.nav-links .nav-btn').forEach(nav => {
                nav.classList.remove('active');
                if (nav.getAttribute('data-page') === targetPage) {
                    nav.classList.add('active');
                }
            });

            // Close Mobile Drawer on Click
            navLinksContainer.classList.remove('show');

            // Scroll Smoothly to Top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // Mobile Toggle
    mobileMenuBtn.addEventListener('click', () => {
        navLinksContainer.classList.toggle('show');
    });

    /* ================= 3. Interactive Global Search Bar ================= */
    const searchInput = document.getElementById('search-input');
    const searchClear = document.getElementById('search-clear');
    const searchResultsDropdown = document.getElementById('search-results');

    // Index Searchable Items
    const searchableItems = [
        { title: "Tourist & Business Visas", page: "services", type: "Service", desc: "Embassy submission and visa documentation." },
        { title: "Study Abroad Admissions", page: "services", type: "Service", desc: "University selection, SOP support & admissions." },
        { title: "Flight Bookings & Ticketing", page: "services", type: "Service", desc: "Affordable local and international flights." },
        { title: "Hotel & Resort Reservations", page: "services", type: "Service", desc: "Worldwide accommodation reservations." },
        { title: "Custom Vacation Packages", page: "services", type: "Service", desc: "Curated tours, sightseeing & vacation packages." },
        { title: "Tropical Beach Resort", page: "gallery", type: "Gallery Photo", desc: "Maldives white sand ocean views." },
        { title: "Paris Eiffel Experience", page: "gallery", type: "Gallery Photo", desc: "Historic city travel and European tours." },
        { title: "Modern Skyline - Dubai", page: "gallery", type: "Gallery Photo", desc: "Luxury shopping and city trips." },
        { title: "About CANIL Consults", page: "about", type: "Company", desc: "Learn about our vision, leadership and track record." },
        { title: "Contact Us", page: "contact", type: "Support", desc: "Office address, phone lines, and inquiry form." }
    ];

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();

        if (query.length > 0) {
            searchClear.style.display = 'block';
            const matches = searchableItems.filter(item => 
                item.title.toLowerCase().includes(query) || 
                item.desc.toLowerCase().includes(query)
            );

            renderSearchResults(matches);
        } else {
            clearSearch();
        }
    });

    searchClear.addEventListener('click', clearSearch);

    function renderSearchResults(results) {
        searchResultsDropdown.innerHTML = '';

        if (results.length === 0) {
            searchResultsDropdown.innerHTML = `<div class="search-item"><p>No results found.</p></div>`;
        } else {
            results.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'search-item';
                itemDiv.innerHTML = `
                    <h4>${item.title} <small>(${item.type})</small></h4>
                    <p>${item.desc}</p>
                `;
                itemDiv.addEventListener('click', () => {
                    // Navigate to target page
                    document.querySelector(`[data-page="${item.page}"]`).click();
                    clearSearch();
                });
                searchResultsDropdown.appendChild(itemDiv);
            });
        }
        searchResultsDropdown.style.display = 'block';
    }

    function clearSearch() {
        searchInput.value = '';
        searchClear.style.display = 'none';
        searchResultsDropdown.style.display = 'none';
    }

    // Close search dropdown on click outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            searchResultsDropdown.style.display = 'none';
        }
    });

    /* ================= 4. Services Category Filtering ================= */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const serviceCards = document.querySelectorAll('#full-services-grid .service-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterVal = btn.getAttribute('data-filter');

            serviceCards.forEach(card => {
                if (filterVal === 'all' || card.getAttribute('data-category') === filterVal) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    /* ================= 5. Gallery Filtering & Lightbox ================= */
    const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');

    galleryFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            galleryFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const gfilterVal = btn.getAttribute('data-gfilter');

            galleryItems.forEach(item => {
                if (gfilterVal === 'all' || item.getAttribute('data-gcat') === gfilterVal) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Lightbox Preview Trigger
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            const title = item.getAttribute('data-title');
            const desc = item.getAttribute('data-desc');

            lightboxImg.src = imgSrc;
            lightboxCaption.innerHTML = `<strong>${title}</strong><p>${desc}</p>`;
            lightboxModal.style.display = 'flex';
        });
    });

    lightboxClose.addEventListener('click', () => {
        lightboxModal.style.display = 'none';
    });

    /* ================= 6. Booking / Service Inquiry Modal ================= */
    const serviceModal = document.getElementById('service-modal');
    const serviceClose = document.getElementById('service-close');
    const modalServiceTitle = document.getElementById('modal-service-title');
    const bookingForm = document.getElementById('booking-modal-form');

    document.querySelectorAll('.open-modal').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const serviceName = btn.getAttribute('data-service') || 'Consultation Service';
            modalServiceTitle.textContent = `Inquire: ${serviceName}`;
            serviceModal.style.display = 'flex';
        });
    });

    serviceClose.addEventListener('click', () => {
        serviceModal.style.display = 'none';
    });

    // Close Modals on Outer Click
    window.addEventListener('click', (e) => {
        if (e.target === lightboxModal) lightboxModal.style.display = 'none';
        if (e.target === serviceModal) serviceModal.style.display = 'none';
    });

    // Forms Submit Notifications
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you! Your booking request has been submitted to CANIL Consults.');
        serviceModal.style.display = 'none';
        bookingForm.reset();
    });

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const emailInput = document.getElementById('c-email');
            const email = emailInput ? emailInput.value.trim() : '';

            if (!email) {
                alert('Please enter a valid email address.');
                return;
            }

            const formData = {
                name: document.getElementById('c-name').value,
                email,
                service: document.getElementById('c-service').value,
                message: document.getElementById('c-message').value
            };

            try {
                const response = await fetch('https://canil-backend.onrender.com/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
                const result = await response.json();

                if (!response.ok || !result.success) {
                    alert('Server Error: ' + (result.message || 'Your message could not be sent.'));
                    return;
                }

                alert('Success! ' + result.message);
                contactForm.reset();
            } catch (err) {
                console.error('Fetch Error:', err);
                alert('Could not reach the CANIL contact server. Please try again later.');
            }
        });
    }

});