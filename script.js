let pages = document.querySelectorAll(".page");
let currentPage = 0;
let interval;
let music = document.getElementById("backgroundMusic");

// Fungsi untuk menampilkan hanya halaman aktif
function showPage(index) {
    pages.forEach((page, i) => {
        page.classList.remove("active");
        if (i === index) {
            page.classList.add("active");
        }
    });
}

// Fungsi untuk memulai sinkronisasi musik dan halaman
function startSync() {
    resetBook(false); // Pastikan buku dimulai dari halaman pertama tanpa menghentikan musik
    music.play(); // Putar musik
    autoFlipPages(); // Mulai perubahan halaman otomatis
}

// Fungsi untuk memulai ulang buku ke halaman pertama
function resetBook(stopMusic = true) {
    clearInterval(interval); // Hentikan interval otomatis
    pages.forEach((page) => {
        page.classList.remove("flipped");
    });
    currentPage = 0;
    showPage(currentPage); // Tampilkan halaman pertama
    if (stopMusic) {
        music.currentTime = 0; // Reset musik ke awal jika diminta
        music.pause(); // Hentikan musik jika diminta
    }
}

// Fungsi untuk pembalikan halaman otomatis dengan interval 2 detik dan pengulangan
function autoFlipPages() {
    showPage(currentPage); // Tampilkan halaman pertama saat dimulai

    interval = setInterval(() => {
        if (currentPage < pages.length - 1) {
            pages[currentPage].classList.add("flipped");
            pages[currentPage].style.zIndex = currentPage; // Menetapkan z-index untuk menumpuk halaman
            currentPage++;
            showPage(currentPage); // Tampilkan halaman berikutnya
        } else {
            // Jika sudah sampai di halaman terakhir, kembali ke halaman pertama
            currentPage = 0; // Reset ke halaman pertama
            pages.forEach((page) => {
                page.classList.remove("flipped");
            });
            showPage(currentPage); // Tampilkan halaman pertama
        }
    }, 2000); // Interval 2 detik untuk setiap halaman
}

// Fungsi untuk memulai animasi love dan menampilkan buku
function startAnimation() {
    document.getElementById("cover").style.display = "none"; // Sembunyikan cover depan
    document.getElementById("bookAndControls").style.display = "flex"; // Tampilkan buku dan kontrol
    generateHearts(); // Mulai animasi love
}

// Fungsi untuk membuat animasi love
function generateHearts() {
    let loveContainer = document.getElementById("loveContainer");
    setInterval(() => {
        let heart = document.createElement("div");
        heart.className = "love";
        heart.innerHTML = "❤️";
        heart.style.left = Math.random() * 100 + "vw"; // Posisi acak
        loveContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove(); // Hapus love setelah animasi selesai
        }, 3000); // Durasi animasi 3 detik
    }, 300); // Tambah love setiap 300ms
}

function playMusic() {
    music.play().catch(error => console.log('Musik tidak dapat diputar:', error));
}

function pauseMusic() {
    music.pause();
}

window.onload = () => {
    showPage(currentPage); // Tampilkan halaman pertama saat dimuat
};
