document.addEventListener('DOMContentLoaded', () => {
    const subjectsList = document.getElementById('subjects-list');

    // Add drag start event
    subjectsList.addEventListener('dragstart', (e) => {
        if (e.target.classList.contains('subject-item')) {
            e.target.classList.add('dragging');
        }
    });

    // Add drag end event
    subjectsList.addEventListener('dragend', (e) => {
        if (e.target.classList.contains('subject-item')) {
            e.target.classList.remove('dragging');
        }
    });

    // Add drag over event
    subjectsList.addEventListener('dragover', (e) => {
        e.preventDefault();
        const draggingItem = document.querySelector('.dragging');
        if (!draggingItem) return;

        const siblings = [...subjectsList.querySelectorAll('.subject-item:not(.dragging)')];

        const nextSibling = siblings.find(sibling => {
            const rect = sibling.getBoundingClientRect();
            const mid = rect.top + rect.height / 2;
            return e.clientY < mid;
        });

        subjectsList.insertBefore(draggingItem, nextSibling);
    });
});