document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const taskList = document.getElementById('task-list');
        const newTaskItem = document.createElement('li');
        newTaskItem.className = 'task-item';
        newTaskItem.innerHTML = `
            <span>${taskText}</span>
            <button onclick="deleteTask(this)">Delete</button>
        `;
        taskList.appendChild(newTaskItem);

        saveTasks();
        taskInput.value = '';
    }
}

function deleteTask(buttonElement) {
    const taskItem = buttonElement.parentNode;
    taskItem.remove();
    saveTasks();
}

function saveTasks() {
    const taskList = document.getElementById('task-list');
    const tasks = Array.from(taskList.children).map(task => task.querySelector('span').innerText);

    // Use localStorage to save tasks
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const taskList = document.getElementById('task-list');
    const storedTasks = localStorage.getItem('tasks');

    if (storedTasks) {
        const tasks = JSON.parse(storedTasks);

        tasks.forEach(taskText => {
            const newTaskItem = document.createElement('li');
            newTaskItem.className = 'task-item';
            newTaskItem.innerHTML = `
                <span>${taskText}</span>
                <button onclick="deleteTask(this)">Delete</button>
            `;
            taskList.appendChild(newTaskItem);
        });
    }
}
