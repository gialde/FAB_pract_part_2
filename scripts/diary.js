document.addEventListener('DOMContentLoaded', function() {
    const addEntryBtn = document.getElementById('addEntryBtn');
    const addEntryModal = document.getElementById('addEntryModal');
    const closeBtn = addEntryModal.querySelector('.close');
    const diaryForm = document.getElementById('diaryForm');
    
    addEntryBtn.addEventListener('click', function() {
        addEntryModal.style.display = 'block';
    });
    
    closeBtn.addEventListener('click', function() {
        addEntryModal.style.display = 'none';
    });
    
    diaryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const date = document.getElementById('entryDate').value;
        const task = document.getElementById('entryTask').value;
        const status = document.getElementById('entryStatus').value;
        
        // Добавление новой записи в timeline
        addTimelineEntry(date, task, status);
        
        // Очистка формы и закрытие модального окна
        diaryForm.reset();
        addEntryModal.style.display = 'none';
    });
    
    function addTimelineEntry(date, task, status) {
        const timeline = document.querySelector('.timeline');
        const timelineItem = document.createElement('div');
        timelineItem.className = `timeline-item ${status}`;
        
        const statusSymbol = status === 'completed' ? '✓' : '⟳';
        
        timelineItem.innerHTML = `
            <span class="date">${formatDate(date)}</span>
            <span class="task">${task}</span>
            <span class="status">${statusSymbol}</span>
        `;
        
        timeline.prepend(timelineItem);
    }
    
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
    }
});