const header = document.querySelector('header');
const hamburger = document.getElementById('hamburger');
const navlist = document.querySelector('.navlist');
const form = document.getElementById('ContactForm');

window.addEventListener('scroll', () => {
    // A partir de 50px de scroll se canvia de clase a la versión sticky
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// El menú de hamburguesa, solo se ve en móviles
hamburger.addEventListener('click', () => {
    navlist.classList.toggle('open');
});

// Cierra el menú al pulsar cualquier link
navlist.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navlist.classList.remove('open');
    });
});

function showError(input, message) {
    const errorSpan = document.getElementById(input.id + '-error');
    input.classList.add('invalid');
    input.classList.remove('valid');
    input.setAttribute('aria-invalid', 'true');
    errorSpan.textContent = message;
}

function showValid(input) {
    const errorSpan = document.getElementById(input.id + '-error');
    input.classList.remove('invalid');
    input.classList.add('valid');
    input.setAttribute('aria-invalid', 'false');
    errorSpan.textContent = '';
}

function validateField(input) {
    const value = input.value.trim();

    if (value === '') {
        showError(input, 'This field is required.');
        return false;
    }

    if (input.type === 'email') {
        // Lo que permite filtrar el correo electrónico
        // Es una expresión regex que indica que el string tiene que tener:
        //  - Una @
        //  - Un .
        //  - Caràcteres entre medias de cada sección
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showError(input, 'Please enter a valid email address.');
            return false;
        }
    }

    if (input.type === 'date') {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selected = new Date(value);
        if (selected < today) {
            showError(input, 'Please select a date from today onwards.');
            return false;
        }
    }

    showValid(input);
    return true;
}

form.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('blur', () => validateField(input));
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fields = form.querySelectorAll('input, textarea');
    let formIsValid = true;

    fields.forEach(field => {
        if (!validateField(field)) {
            formIsValid = false;
        }
    });

    if (formIsValid) {
        form.innerHTML = `
            <p style="color: #B4C99A; font-size: 1.2rem; font-weight: bold;">
                Your request has been sent! We'll contact you shortly.
            </p>`;
    }
});