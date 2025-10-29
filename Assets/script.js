document.addEventListener("DOMContentLoaded", function () {
    // Ambil elemen-elemen penting
    const header = document.querySelector("header");
    const navLinks = document.querySelectorAll(".nav-link");
    const navbarCollapse = document.querySelector(".navbar-collapse");

    // Hitung tinggi header (untuk offset scroll)
    const navHeight = header.offsetHeight;

    // Loop semua link navbar
    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");

            // Pastikan link menuju ke ID section (bukan link eksternal)
            if (targetId.startsWith("#")) {
                e.preventDefault();

                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    const targetPosition = targetSection.offsetTop - navHeight;

                    // Scroll ke posisi section dengan halus
                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth"
                    });

                    // Tutup menu collapse jika sedang terbuka (untuk mobile)
                    if (navbarCollapse.classList.contains("show")) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                        bsCollapse.hide();
                    }
                }
            }
        });
    });

    // --- Highlight menu aktif saat discroll ---
    const sections = document.querySelectorAll("section[id]");

    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 50; // sedikit offset
            if (scrollY >= sectionTop) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });

    // 🟩 Tutup menu jika klik di luar area navbar collapse (khusus mobile/tablet)
    document.addEventListener("click", function (e) {
        const isClickInsideNavbar = header.contains(e.target);
        const isNavbarOpen = navbarCollapse.classList.contains("show");

        if (!isClickInsideNavbar && isNavbarOpen) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
        }
    });
});
