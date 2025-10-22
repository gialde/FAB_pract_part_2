document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Убираем активный класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Показываем/скрываем карточки в зависимости от фильтра
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Обработчик для кнопок "Подробнее"
    document.querySelectorAll('.project-details-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const projectTitle = this.closest('.project-card').querySelector('.project-title').textContent;
            alert(`Подробная информация о проекте: ${projectTitle}`);
        });
    });
});