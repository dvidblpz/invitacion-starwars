/* =========================================================
   ELEMENTOS
========================================================= */

const introScreen =
    document.getElementById("introScreen");

const enterInvitation =
    document.getElementById("enterInvitation");

const crawlSection =
    document.getElementById("crawlSection");

const crawlContainer =
    document.querySelector(".crawl-container");

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

let invitationStarted = false;

let crawlStarted = false;


/* =========================================================
   BLOQUEAR SCROLL AL INICIO
========================================================= */

document.body.classList.add(
    "lock-scroll"
);


/* =========================================================
   MÚSICA
========================================================= */

function startMusic() {

    if (!music) {
        return;
    }

    music.volume = 0.45;

    const playPromise =
        music.play();

    if (playPromise !== undefined) {

        playPromise
            .then(() => {

                musicStarted = true;

                if (musicToggle) {

                    musicToggle.textContent =
                        "Ⅱ";

                }

            })
            .catch(() => {

                /*
                 * Algunos navegadores pueden bloquear
                 * el audio. Como el usuario ya hizo clic,
                 * normalmente el navegador permitirá
                 * reproducirlo.
                 */

                musicStarted = false;

            });

    }

}


/* =========================================================
   ENTER THE GALAXY
========================================================= */

if (enterInvitation) {

    enterInvitation.addEventListener(
        "click",
        () => {

            /*
             * Evitar doble activación
             */

            if (crawlStarted) {
                return;
            }

            crawlStarted = true;


            /*
             * Ocultar pantalla inicial
             */

            introScreen.classList.add(
                "hidden"
            );


            /*
             * Iniciar música
             */

            startMusic();


            /*
             * Mostrar Opening Crawl
             */

            setTimeout(() => {

                crawlSection.classList.add(
                    "active"
                );

                crawlSection.setAttribute(
                    "aria-hidden",
                    "false"
                );

            }, 500);

        }
    );

}


/* =========================================================
   DETECTAR FINAL REAL DE LA ANIMACIÓN
========================================================= */

if (crawlContainer) {

    crawlContainer.addEventListener(
        "animationend",
        (event) => {

            /*
             * Solo nos interesa la animación
             * starWarsCrawl.
             */

            if (
                event.animationName !==
                "starWarsCrawl"
            ) {
                return;
            }


            /*
             * Esperamos un momento para que
             * el final del crawl se vea limpio.
             */

            setTimeout(() => {

                openInvitation();

            }, 500);

        }
    );

}


/* =========================================================
   ABRIR INVITACIÓN AUTOMÁTICAMENTE
========================================================= */

function openInvitation() {

    /*
     * Evitar que se ejecute más de una vez.
     */

    if (invitationStarted) {
        return;
    }

    invitationStarted = true;


    /*
     * Fundido del crawl
     */

    crawlSection.classList.add(
        "fade-out"
    );


    /*
     * Después de iniciar el fade,
     * mostramos la invitación.
     */

    setTimeout(() => {

        crawlSection.classList.remove(
            "active"
        );

        crawlSection.setAttribute(
            "aria-hidden",
            "true"
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
         * Llevar automáticamente
         * al inicio de la invitación.
         */

        setTimeout(() => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }, 100);

    }, 850);

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
        document.getElementById(
            "days"
        );

    const hours =
        document.getElementById(
            "hours"
        );

    const minutes =
        document.getElementById(
            "minutes"
        );

    const seconds =
        document.getElementById(
            "seconds"
        );


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
        String(daysValue)
            .padStart(2, "0");

    hours.textContent =
        String(hoursValue)
            .padStart(2, "0");

    minutes.textContent =
        String(minutesValue)
            .padStart(2, "0");

    seconds.textContent =
        String(secondsValue)
            .padStart(2, "0");

}


updateCountdown();


setInterval(
    updateCountdown,
    1000
);


/* =========================================================
   GALERÍA
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
   CERRAR GALERÍA
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


    if (
        invitationStarted
    ) {

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
                event.target ===
                lightbox
            ) {

                closeGallery();

            }

        }
    );

}


/* =========================================================
   ESC PARA CERRAR GALERÍA
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
   ATAJOS DE TECLADO
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        const key =
            event.key.toLowerCase();


        const modifier =
            event.ctrlKey ||
            event.metaKey;


        /*
         * Copiar
         */

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


        /*
         * F12
         */

        if (
            event.key === "F12"
        ) {

            event.preventDefault();

        }


        /*
         * Herramientas de desarrollador
         */

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
   PROTEGER IMÁGENES
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
   PARALLAX
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

        }


        else if (
            !document.hidden &&
            musicStarted &&
            music.paused
        ) {

            music.play()
                .catch(() => {});

        }

    }
);