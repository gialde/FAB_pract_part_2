document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Здесь можно добавить отправку формы
            alert('Сообщение отправлено!');
            contactForm.reset();
        }
    });
    
    function validateForm() {
        let isValid = true;
        
        // Валидация имени
        const name = document.getElementById('name');
        const nameError = document.getElementById('nameError');
        if (name.value.trim().length < 2) {
            nameError.textContent = 'Имя должно содержать минимум 2 символа';
            nameError.style.display = 'block';
            isValid = false;
        } else {
            nameError.style.display = 'none';
        }
        
        // Валидация email
        const email = document.getElementById('email');
        const emailError = document.getElementById('emailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            emailError.textContent = 'Введите корректный email адрес';
            emailError.style.display = 'block';
            isValid = false;
        } else {
            emailError.style.display = 'none';
        }
        
        // Валидация сообщения
        const message = document.getElementById('message');
        const messageError = document.getElementById('messageError');
        if (message.value.trim().length < 10) {
            messageError.textContent = 'Сообщение должно содержать минимум 10 символов';
            messageError.style.display = 'block';
            isValid = false;
        } else {
            messageError.style.display = 'none';
        }
        
        return isValid;
    }
});