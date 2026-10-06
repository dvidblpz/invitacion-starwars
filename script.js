/* =========================================================
   ELEMENTOS PRINCIPALES
========================================================= */

const introScreen =
    document.getElementById("introScreen");

const enterInvitation =
    document.getElementById("enterInvitation");

const crawlSection =
    document.getElementById("crawlSection");

const continueJourney =
    document.getElementById("continueJourney");

const invitationContent =
    document.getElementById("invitationContent");

const music =
    document.getElementById("backgroundMusic");

const musicToggle =
    document.getElementById("musicToggle");

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const closeLightbox =
    document.getElementById("closeLightbox");


/* =========================================================
   VARIABLES
========================================================= */

let musicStarted = false;
let crawlFinished = false;
let invitationOpened = false;


/* =========================================================
   BLOQUEAR SCROLL AL INICIO
========================================================= */

document.body.classList.add("lock-scroll");


/* =========================================================
   MÚSICA
========================================================= */

function startMusic() {

    if (!music) {
        return;
    }

    music.volume = 0.45;

    const playPromise = music.play();

    if (playPromise !== undefined) {

        playPromise
            .then(() => {

                musicStarted = true;

                if (musicToggle) {
                    musicToggle.textContent = "Ⅱ";
                }

            })
            .catch(() => {

                /*
                 El navegador puede bloquear autoplay.
                 En este caso no hacemos nada porque
                 el botón ENTER THE GALAXY ya representa
                 una interacción del usuario.
                */

                musicStarted = false;

            });

    }

}


/* =========================================================
   BOTÓN ENTER THE GALAXY
========================================================= */

if (enterInvitation) {

    enterInvitation.addEventListener(
        "click",
        () => {

            /*
             * 1. Ocultar pantalla inicial
             */

            introScreen.classList.add("hidden");


            /*
             * 2. Iniciar música
             */

            startMusic();


            /*
             * 3. Mostrar opening crawl
             */

            setTimeout(() => {

                crawlSection.classList.add("active");

                crawlSection.setAttribute(
                    "aria-hidden",
                    "false"
                );

            }, 500);


            /*
             * 4. El crawl tarda 38 segundos.
             *    Después aparece el botón.
             */

            setTimeout(() => {

                crawlFinished = true;

                continueJourney.classList.add("visible");

            }, 38500);

        }
    );

}


/* =========================================================
   CONTINUAR LA HISTORIA
========================================================= */

if (continueJourney) {

    continueJourney.addEventListener(
        "click",
        () => {

            if (invitationOpened) {
                return;
            }

            invitationOpened = true;


            /*
             * Ocultar crawl
             */

            crawlSection.classList.remove("active");

            crawlSection.setAttribute(
                "aria-hidden",
                "true"
            );


            /*
             * Ocultar botón
             */

            continueJourney.classList.remove(
                "visible"
            );


            /*
             * Mostrar invitación
             */

            invitationContent.classList.add(
                "visible"
            );

            invitationContent.setAttribute(
                "aria-hidden",
                "false"
            );


            /*
             * Activar scroll
             */

            document.body.classList.remove(
                "lock-scroll"
            );


            /*
             * Llevar al inicio de la invitación
             */

            setTimeout(() => {

                invitationContent.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }, 700);

        }
    );

}


/* =========================================================
   CONTROL DE MÚSICA
========================================================= */

if (musicToggle) {

    musicToggle.addEventListener(
        "click",
        () => {

            if (!music) {
                return;
            }

            if (music.paused) {

                music.play()
                    .then(() => {

                        musicStarted = true;

                        musicToggle.textContent =
                            "Ⅱ";

                    })
                    .catch(() => {

                        musicToggle.textContent =
                            "▶";

                    });

            } else {

                music.pause();

                musicToggle.textContent =
                    "▶";

            }

        }
    );

}


/* =========================================================
   COUNTDOWN
========================================================= */

const weddingDate =
    new Date(
        "2028-12-05T19:00:00"
    ).getTime();


function updateCountdown() {

    const now =
        new Date().getTime();

    const distance =
        weddingDate - now;


    const days =
        document.getElementById("days");

    const hours =
        document.getElementById("hours");

    const minutes =
        document.getElementById("minutes");

    const seconds =
        document.getElementById("seconds");


    if (
        !days ||
        !hours ||
        !minutes ||
        !seconds
    ) {
        return;
    }


    if (distance <= 0) {

        days.textContent = "00";
        hours.textContent = "00";
        minutes.textContent = "00";
        seconds.textContent = "00";

        return;
    }


    const daysValue =
        Math.floor(
            distance /
            (1000 * 60 * 60 * 24)
        );

    const hoursValue =
        Math.floor(
            (distance %
                (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );

    const minutesValue =
        Math.floor(
            (distance %
                (1000 * 60 * 60)) /
            (1000 * 60)
        );

    const secondsValue =
        Math.floor(
            (distance %
                (1000 * 60)) /
            1000
        );


    days.textContent =
        String(daysValue).padStart(2, "0");

    hours.textContent =
        String(hoursValue).padStart(2, "0");

    minutes.textContent =
        String(minutesValue).padStart(2, "0");

    seconds.textContent =
        String(secondsValue).padStart(2, "0");

}


updateCountdown();

setInterval(
    updateCountdown,
    1000
);


/* =========================================================
   GALERÍA / LIGHTBOX
========================================================= */

const galleryItems =
    document.querySelectorAll(
        ".gallery-item"
    );


galleryItems.forEach(
    (item) => {

        item.addEventListener(
            "click",
            () => {

                const image =
                    item.dataset.image;

                if (!image) {
                    return;
                }

                lightboxImage.src =
                    image;

                lightbox.classList.add(
                    "active"
                );

                lightbox.setAttribute(
                    "aria-hidden",
                    "false"
                );

                document.body.classList.add(
                    "lock-scroll"
                );

            }
        );

    }
);


/* =========================================================
   CERRAR LIGHTBOX
========================================================= */

function closeGallery() {

    lightbox.classList.remove(
        "active"
    );

    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );

    lightboxImage.src = "";

    if (invitationOpened) {

        document.body.classList.remove(
            "lock-scroll"
        );

    }

}


if (closeLightbox) {

    closeLightbox.addEventListener(
        "click",
        closeGallery
    );

}


if (lightbox) {

    lightbox.addEventListener(
        "click",
        (event) => {

            if (
                event.target === lightbox
            ) {

                closeGallery();

            }

        }
    );

}


/* =========================================================
   TECLA ESC
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            lightbox.classList.contains(
                "active"
            )
        ) {

            closeGallery();

        }

    }
);


/* =========================================================
   PROTECCIÓN CONTRA COPIA
========================================================= */

/*
 * Importante:
 * Esta protección evita la copia casual desde
 * la interfaz, pero ningún sitio web puede
 * garantizar una protección absoluta contra
 * herramientas de desarrollador o capturas.
 */


document.addEventListener(
    "selectstart",
    (event) => {

        event.preventDefault();

    }
);


document.addEventListener(
    "copy",
    (event) => {

        event.preventDefault();

    }
);


document.addEventListener(
    "cut",
    (event) => {

        event.preventDefault();

    }
);


document.addEventListener(
    "contextmenu",
    (event) => {

        event.preventDefault();

    }
);


document.addEventListener(
    "dragstart",
    (event) => {

        event.preventDefault();

    }
);


/* =========================================================
   BLOQUEAR ATAJOS COMUNES
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        const key =
            event.key.toLowerCase();

        const modifier =
            event.ctrlKey ||
            event.metaKey;


        if (
            modifier &&
            [
                "c",
                "x",
                "u",
                "s",
                "a"
            ].includes(key)
        ) {

            event.preventDefault();

        }


        if (
            event.key === "F12"
        ) {

            event.preventDefault();

        }


        if (
            modifier &&
            event.shiftKey &&
            [
                "i",
                "j",
                "c"
            ].includes(key)
        ) {

            event.preventDefault();

        }

    }
);


/* =========================================================
   EVITAR ARRASTRAR IMÁGENES
========================================================= */

document
    .querySelectorAll("img")
    .forEach(
        (image) => {

            image.setAttribute(
                "draggable",
                "false"
            );

            image.addEventListener(
                "dragstart",
                (event) => {

                    event.preventDefault();

                }
            );

        }
    );


/* =========================================================
   PARALLAX SUAVE
========================================================= */

let ticking = false;

window.addEventListener(
    "scroll",
    () => {

        if (ticking) {
            return;
        }

        window.requestAnimationFrame(
            () => {

                const scrollY =
                    window.scrollY;

                const stars =
                    document.querySelectorAll(
                        ".stars"
                    );

                stars.forEach(
                    (star, index) => {

                        const speed =
                            (index + 1) *
                            0.025;

                        star.style.transform =
                            `translateY(${scrollY * speed}px)`;

                    }
                );


                ticking = false;

            }
        );

        ticking = true;

    },
    {
        passive: true
    }
);


/* =========================================================
   VISIBILIDAD DE LA PÁGINA
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (!music) {
            return;
        }

        if (
            document.hidden &&
            !music.paused
        ) {

            music.pause();

        } else if (
            !document.hidden &&
            musicStarted &&
            music.paused
        ) {

            music.play()
                .catch(() => {});

        }

    }
);