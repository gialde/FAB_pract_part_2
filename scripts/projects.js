document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('projectModal');
    const closeBtn = modal.querySelector('.close');
    const projectCards = document.querySelectorAll('.project-card');
    const modalTitle = document.getElementById('modalTitle');
    const modalTech = document.getElementById('modalTech');
    const modalDescription = document.getElementById('modalDescription');

    // --- Модальное окно ---
    projectCards.forEach(card => {
        const detailsBtn = card.querySelector('.project-details-btn');
        detailsBtn.addEventListener('click', () => {
            modal.classList.add('show');
            modalTitle.textContent = card.querySelector('.project-title').textContent;
            modalTech.textContent = "Технологии: " + card.querySelector('.project-tech').textContent;
            modalDescription.textContent = card.querySelector('.project-description').textContent;
        });
    });

    closeBtn.addEventListener('click', () => modal.classList.remove('show'));
    window.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('show'); });

    // --- Фильтрация проектов с плавностью ---
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });
});
