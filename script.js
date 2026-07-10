document.addEventListener('DOMContentLoaded', function () {
    const formularioContacto = document.getElementById('form-contacto');
    const respuestaContacto = document.getElementById('form-response');
    const formularioMateria = document.getElementById('add-materia-form');
    const respuestaMateria = document.getElementById('add-materia-response');

    if (formularioContacto && respuestaContacto) {
        formularioContacto.addEventListener('submit', function (event) {
            event.preventDefault();

            const nombre = document.getElementById('nombre').value.trim();
            const correo = document.getElementById('correo').value.trim();
            const telefono = document.getElementById('telefono').value.trim();

            if (!nombre || !correo || !telefono) {
                respuestaContacto.textContent = 'Por favor completa todos los campos obligatorios.';
                respuestaContacto.className = 'hidden-message success';
                return;
            }

            respuestaContacto.textContent = `Gracias, ${nombre}. Tu solicitud ha sido recibida. Nos pondremos en contacto contigo pronto.`;
            respuestaContacto.className = 'hidden-message success';
            formularioContacto.reset();
        });
    }

    if (formularioMateria && respuestaMateria) {
        formularioMateria.addEventListener('submit', function (event) {
            event.preventDefault();

            const cuatrimestre = document.getElementById('cuatrimestre-select').value;
            const materia = document.getElementById('materia-input').value.trim();
            const lista = document.querySelector(`.cuatrimestre-card[data-cuatrimestre="${cuatrimestre}"] .subject-list`);

            respuestaMateria.className = 'form-feedback';

            if (!materia) {
                respuestaMateria.textContent = 'Escribe el nombre de la materia antes de agregarla.';
                respuestaMateria.classList.add('error');
                return;
            }

            if (!lista) {
                respuestaMateria.textContent = 'No se encontró el cuatrimestre seleccionado.';
                respuestaMateria.classList.add('error');
                return;
            }

            const nuevoItem = document.createElement('li');
            nuevoItem.textContent = materia;
            lista.appendChild(nuevoItem);

            respuestaMateria.textContent = `Materia agregada a ${document.querySelector(`#cuatrimestre-select option[value="${cuatrimestre}"]`).textContent}.`;
            respuestaMateria.classList.add('success');
            formularioMateria.reset();
        });
    }

    const carouselSection = document.querySelector('.carousel-section');

    if (carouselSection) {
        const slides = carouselSection.querySelectorAll('.carousel-slide');
        const prevButton = carouselSection.querySelector('.carousel-btn.prev');
        const nextButton = carouselSection.querySelector('.carousel-btn.next');
        const dotsContainer = carouselSection.querySelector('.carousel-dots');
        let currentSlide = 0;
        let intervalId = null;

        const setActiveSlide = (index) => {
            slides.forEach((slide, slideIndex) => {
                slide.classList.toggle('active', slideIndex === index);
            });
            const dots = dotsContainer.querySelectorAll('.carousel-dot');
            dots.forEach((dot, dotIndex) => {
                dot.classList.toggle('active', dotIndex === index);
            });
            currentSlide = index;
        };

        const createDots = () => {
            slides.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.type = 'button';
                dot.className = 'carousel-dot';
                dot.addEventListener('click', () => {
                    setActiveSlide(index);
                    resetAutoSlide();
                });
                dotsContainer.appendChild(dot);
            });
        };

        const nextSlide = () => {
            const nextIndex = (currentSlide + 1) % slides.length;
            setActiveSlide(nextIndex);
        };

        const prevSlide = () => {
            const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
            setActiveSlide(prevIndex);
        };

        const startAutoSlide = () => {
            intervalId = setInterval(nextSlide, 6000);
        };

        const resetAutoSlide = () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
            startAutoSlide();
        };

        createDots();
        setActiveSlide(0);
        startAutoSlide();

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                prevSlide();
                resetAutoSlide();
            });
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                nextSlide();
                resetAutoSlide();
            });
        }
    }
});
