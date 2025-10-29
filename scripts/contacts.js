document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const modal = document.getElementById('modal');
    const overlay = document.getElementById('overlay');
    const closeModalBtn = document.getElementById('closeModalBtn');
    let previousActiveElement;

    function openModal() {
        previousActiveElement = document.activeElement;
        modal.classList.add('show');
        overlay.classList.add('show');
        modal.focus();
        document.querySelectorAll('body > *:not(.modal):not(.overlay)').forEach(el => el.setAttribute('aria-hidden', 'true'));
        document.addEventListener('keydown', handleEscape);
    }

    function closeModal() {
        modal.classList.remove('show');
        overlay.classList.remove('show');
        document.querySelectorAll('[aria-hidden="true"]').forEach(el => el.removeAttribute('aria-hidden'));
        if(previousActiveElement) previousActiveElement.focus();
        document.removeEventListener('keydown', handleEscape);
    }

    function handleEscape(e) {
        if(e.key === 'Escape') closeModal();
    }

    closeModalBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if(validateForm()) {
            openModal();
            contactForm.reset();
        }
    });

    function validateForm() {
        let isValid = true;

        const name = document.getElementById('name');
        const nameError = document.getElementById('nameError');
        if(name.value.trim().length < 2) {
            nameError.textContent = 'Имя должно содержать минимум 2 символа';
            nameError.style.display = 'block';
            isValid = false;
        } else {
            nameError.style.display = 'none';
        }

        const email = document.getElementById('email');
        const emailError = document.getElementById('emailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email.value)) {
            emailError.textContent = 'Введите корректный email адрес';
            emailError.style.display = 'block';
            isValid = false;
        } else {
            emailError.style.display = 'none';
        }

        const message = document.getElementById('message');
        const messageError = document.getElementById('messageError');
        if(message.value.trim().length < 10) {
            messageError.textContent = 'Сообщение должно содержать минимум 10 символов';
            messageError.style.display = 'block';
            isValid = false;
        } else {
            messageError.style.display = 'none';
        }

        return isValid;
    }
});
