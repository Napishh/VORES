document.addEventListener("DOMContentLoaded", function () {
        // Ambil elemen yang memiliki class .reveal
        const semuaElemen = document.querySelectorAll(".reveal");
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Tambahkan class .active dari CSS untuk memicu animasi masuk
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        if (window.location.hash) {
            window.location.hash = '';
        }

        semuaElemen.forEach(el => {
        // Jika elemen adalah section fitur (misal memiliki ID #fitur-server atau class tertentu)
        // Kita langsung aktifkan animasinya tanpa lewat observer
        if (el.id === "fitur-server" || el.classList.contains("langsung")) {
            el.classList.add("active");
        } else {
            // Elemen lain tetap menunggu di-scroll
            observer.observe(el);
        }
    });

        // Fungsi cek status API Server Minecraft
        async function checkServer() {
            const statusElement = document.getElementById("server-status");
            try {
                const response = await fetch("https://api.mcsrvstat.us/2/play.vores.my.id");
                const data = await response.json();

                if (data.online) {
                    statusElement.innerText = "ONLINE";
                    statusElement.style.color = "#00ff66";
                    statusElement.style.borderColor = "rgba(0,255,102,.3)";
                    statusElement.style.background = "rgba(0,255,102,.08)";
                } else {
                    statusElement.innerText = "OFFLINE";
                    statusElement.style.color = "#ff4d4d";
                    statusElement.style.borderColor = "rgba(255,77,77,.3)";
                    statusElement.style.background = "rgba(255,77,77,.08)";
                }
            } catch (error) {
                statusElement.innerText = "ERROR";
            }
        }
        
        checkServer();
        setInterval(checkServer, 30000); // Update status setiap 30 detik
    });