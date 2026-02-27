document.addEventListener("DOMContentLoaded", () => {

    const musica = document.getElementById("musica");
    const botaoIntro = document.getElementById("btnCosmoIntro");
    const btnVideo = document.getElementById("btnVideo");

    /* ========================= */
    /* CLICK INICIAL */
    /* ========================= */
    botaoIntro.addEventListener("click", despertarCosmo);

    function despertarCosmo() {

        /* 🌑 remover tela preta */
        const intro = document.getElementById("intro");

        if (intro) {
            intro.style.opacity = "0";
            setTimeout(() => intro.remove(), 2000);
        }

        /* ⚡ flash */
        const flash = document.getElementById("flash");
        if (flash) flash.classList.add("flash-active");

        /* 🎉 mensagem final */
        const final = document.getElementById("final");
        if (final) final.classList.add("show");

        /* ⭐ partículas */
        iniciarParticulas();

        /* 🎵 música fade-in */
        musica.volume = 0;
        musica.play().catch(() => {});

        let volume = 0;

        const fade = setInterval(() => {
            volume += 0.02;
            musica.volume = volume;

            if (volume >= 1) clearInterval(fade);
        }, 120);

        /* ▶ botão do vídeo aparece depois */
        setTimeout(() => {
            btnVideo.classList.remove("hidden");
            btnVideo.classList.add("show");
        }, 2500);
    }

    /* ========================= */
    /* PARTÍCULAS COSMO */
    /* ========================= */

    function iniciarParticulas() {

        const container = document.getElementById("particles");

        setInterval(() => {

            const particle = document.createElement("div");
            particle.classList.add("particle");

            particle.style.left =
                Math.random() * window.innerWidth + "px";

            particle.style.bottom = "0px";

            container.appendChild(particle);

            setTimeout(() => particle.remove(), 3000);

        }, 120);
    }

    /* ========================= */
    /* MOSTRAR VIDEO */
    /* ========================= */

window.mostrarVideo = function () {

    /* parar música */
 if (musica && !musica.paused) {
    musica.pause();
    musica.currentTime = 0;
}

    /* criar overlay */
    const overlay = document.createElement("div");
    overlay.id = "videoOverlay";

    overlay.innerHTML = `
        <div class="video-container">

            <video id="videoPlayer" autoplay controls>
                <source src="video/retro.mp4" type="video/mp4">
                Seu navegador não suporta vídeo.
            </video>

            <button id="fecharVideo">✖</button>

        </div>
    `;

    document.body.appendChild(overlay);

    const video = document.getElementById("videoPlayer");

    /* garante autoplay */
    video.volume = 1;
    video.play().catch(()=>{});

    /* fechar vídeo */
    document
        .getElementById("fecharVideo")
        .addEventListener("click", () => {

            video.pause();
            overlay.remove();

            /* música volta */
            musica.play().catch(()=>{});
        });
}
});