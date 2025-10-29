document.addEventListener('DOMContentLoaded', () => {
    const addEntryBtn = document.getElementById('addEntryBtn');
    const modal = document.getElementById('addEntryModal');
    const closeModalBtn = modal.querySelector('.close');
    const diaryForm = document.getElementById('diaryForm');
    const timeline = document.querySelector('.timeline');
    let previousActiveElement;

    // Загружаем задачи из localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    renderTasks();

    // Открыть модальное окно
    addEntryBtn.addEventListener('click', () => {
        previousActiveElement = document.activeElement;
        modal.classList.add('show');
        modal.setAttribute('aria-hidden', 'false');
        modal.querySelector('#entryDate').focus();
        document.addEventListener('keydown', handleEscape);
    });

    // Закрыть модальное окно
    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', e => {
        if (e.target === modal) closeModal();
    });

    function closeModal() {
        modal.classList.remove('show');
        modal.setAttribute('aria-hidden', 'true');
        if (previousActiveElement) previousActiveElement.focus();
        document.removeEventListener('keydown', handleEscape);
        diaryForm.reset();
    }

    function handleEscape(e) {
        if (e.key === 'Escape') closeModal();
    }

    // Добавление новой записи
    diaryForm.addEventListener('submit', e => {
        e.preventDefault();
        const date = document.getElementById('entryDate').value;
        const task = document.getElementById('entryTask').value.trim();
        const status = document.getElementById('entryStatus').value;

        if (!date || !task) return;

        tasks.push({ date, task, status });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
        closeModal();
    });

    // Функция отрисовки задач
    function renderTasks() {
        timeline.innerHTML = '';
        if (tasks.length === 0) {
            timeline.innerHTML = '<p>Записей пока нет</p>';
            return;
        }

        tasks.forEach((task, index) => {
            const item = document.createElement('div');
            item.classList.add('timeline-item', task.status);
            item.innerHTML = `
                <span class="date">${task.date}</span>
                <span class="task">${task.task}</span>
                <span class="status">${task.status === 'completed' ? '✓' : '⟳'}</span>
                <button class="btn" aria-label="Удалить задачу" data-index="${index}" style="margin-left:1rem;">Удалить</button>
            `;
            timeline.appendChild(item);
        });

        // Обработчик удаления
        timeline.querySelectorAll('[data-index]').forEach(btn => {
            btn.addEventListener('click', e => {
                const idx = e.target.getAttribute('data-index');
                tasks.splice(idx, 1);
                localStorage.setItem('tasks', JSON.stringify(tasks));
                renderTasks();
            });
        });
    }
});
