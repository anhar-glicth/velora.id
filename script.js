// Navbar scroll effect: Menambahkan background saat di-scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle: Fungsi untuk membuka/menutup menu di HP
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    
    // Animasi ikon hamburger menjadi 'X'
    const spans = hamburger.querySelectorAll('span');
    if (mobileMenu.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Reveal on scroll: Memunculkan elemen saat user men-scroll ke bawah
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        // Cek apakah elemen sudah masuk ke area viewport
        const isVisible = rect.top < window.innerHeight - 100;
        if (isVisible) {
            el.classList.add('visible');
        }
    });
};

// Jalankan fungsi saat scroll dan saat halaman pertama kali dimuat
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Smooth scroll untuk link navigasi
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Tutup menu mobile jika sedang terbuka
        mobileMenu.classList.remove('open');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// PRICING SWITCHER LOGIC
const switchBtns = document.querySelectorAll('.switch-btn');
const priceValues = document.querySelectorAll('.price-val');
const periodTexts = document.querySelectorAll('.period-text');

switchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update Active Button
        switchBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const period = btn.getAttribute('data-period');
        
        // Update Prices
        priceValues.forEach(price => {
            const newPrice = price.getAttribute(`data-price-${period}`);
            price.innerText = `Rp ${newPrice}`;
        });

        // Update Period Text
        periodTexts.forEach(text => {
            if (period === '1') text.innerText = 'bulan';
            else if (period === '6') text.innerText = '6 bulan';
            else if (period === '12') text.innerText = '12 bulan';
        });
    });
});
