document.addEventListener('DOMContentLoaded', () => {
    // === DEKLARASI ELEMEN DOM ===
    const page1 = document.getElementById('page1');
    const page2 = document.getElementById('page2');
    const page3 = document.getElementById('page3');
    
    const btnToP2 = document.getElementById('btn-to-p2');
    const btnToP3 = document.getElementById('btn-to-p3');
    const whiteOverlay = document.getElementById('white-overlay');
    
    const candle = document.getElementById('candle');
    const wishInstruction = document.getElementById('wish-instruction');
    const letterContainer = document.getElementById('letter-container');
    const typewriterText = document.getElementById('typewriter-text');
    const btnPlayMusic = document.getElementById('btn-play-music');
    const bgMusic = document.getElementById('bg-music');

    // Teks surat cinta (Maksimal 100 kata) - GANTI DENGAN KATA-KATAMU SENDIRI
    const secretMessage = `Selamat ulang tahun yang ke-22, sayangku. Di usia yang baru ini, aku berdoa agar semua hal baik selalu menyertaimu. Terima kasih sudah hadir dan menjadi warna yang paling indah dalam hidupku. Aku mencintai setiap detik yang kita habiskan bersama, tawamu, senyummu, dan semua tentangmu. Mari terus melangkah bersama, menaklukkan dunia, dan membuat lebih banyak memori tak terlupakan di masa depan. I love you, today, tomorrow, and forever. ❤️`;

    // === TRANSISI HALAMAN 1 KE HALAMAN 2 ===
    btnToP2.addEventListener('click', () => {
        // Mainkan lagu saat tombol pertama diklik (mengatasi pemblokiran autoplay browser)
        bgMusic.play().catch(error => {
            console.log("Browser memblokir autoplay, lagu harus diputar manual.");
        });

        // Fade in ke putih
        whiteOverlay.classList.add('fade-in');
        
        setTimeout(() => {
            // Sembunyikan P1, Tampilkan P2 saat layar putih
            page1.classList.remove('active');
            page1.classList.add('hidden');
            
            page2.classList.remove('hidden');
            page2.classList.add('active');
            
            // Fade out layar putih
            whiteOverlay.classList.remove('fade-in');
        }, 1500); // Tunggu 1.5 detik (sesuai durasi transisi CSS)
    });

    // === TRANSISI HALAMAN 2 KE HALAMAN 3 ===
    btnToP3.addEventListener('click', () => {
        // Fade in ke putih
        whiteOverlay.classList.add('fade-in');
        
        setTimeout(() => {
            // Sembunyikan P2, Tampilkan P3
            page2.classList.remove('active');
            page2.classList.add('hidden');
            
            page3.classList.remove('hidden');
            page3.classList.add('active');
            
            // Fade out layar putih
            whiteOverlay.classList.remove('fade-in');
        }, 1500);
    });

    // === INTERAKSI LILIN DAN KUE (HALAMAN 3) ===
    let isBlownOut = false;
    
    candle.addEventListener('click', () => {
        if (isBlownOut) return; // Mencegah klik berkali-kali
        isBlownOut = true;

        // 1. Ubah lilin menjadi mati (emoji tanpa lilin menyala)
        candle.innerHTML = '🎂💨';
        wishInstruction.style.opacity = '0';
        
        // Sembunyikan kontainer lilin setelah sedikit jeda
        setTimeout(() => {
            document.getElementById('candle-container').style.display = 'none';
        }, 500);

        // 2. Ledakan Confetti
        triggerConfetti();

        // 3. Tampilkan kontainer surat dan mulai efek mengetik
        setTimeout(() => {
            letterContainer.classList.remove('hidden');
            typeWriterEffect(secretMessage, typewriterText, 50, () => {
                // Munculkan tombol pengontrol musik setelah teks selesai diketik
                btnPlayMusic.classList.remove('hidden');
            });
        }, 1000);
    });

    // === FUNGSI CONFETTI ===
    function triggerConfetti() {
        var duration = 3000;
        var end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#ff0000', '#ffc0cb', '#ffffff'] // Merah, Pink, Putih
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#ff0000', '#ffc0cb', '#ffffff']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }

    // === FUNGSI TYPEWRITER (EFEK MENGETIK) ===
    function typeWriterEffect(text, element, speed, callback) {
        let i = 0;
        element.innerHTML = ''; // Bersihkan elemen dulu
        
        function typing() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(typing, speed);
            } else if (callback) {
                callback(); // Jalankan fungsi lanjutan setelah selesai mengetik
            }
        }
        typing();
    }

    // === PLAY / JEDA MUSIK (DI HALAMAN 3) ===
    btnPlayMusic.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            btnPlayMusic.innerHTML = 'Jeda Lagu ⏸️';
        } else {
            bgMusic.pause();
            btnPlayMusic.innerHTML = 'Lanjutkan Lagu 🎵';
        }
    });
});