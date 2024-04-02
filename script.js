const input = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const todoList = document.getElementById("todo-list");
window.addEventListener("load", function() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(taskText => addTask(taskText));
});
function addTask(taskText) {
    const li = document.createElement("li");
    li.classList.add('task-item');
    li.innerHTML = `
        <span class="task-text">${taskText}</span>
        <button class="action-btn edit-btn" title="Edit Task">✏️</button>
        <button class="action-btn complete-btn" title="Complete Task">✔️</button>
        <button class="action-btn delete-btn" title="Delete Task"></button>
    `;
    todoList.appendChild(li);
    saveTasks();
}
addTaskBtn.addEventListener("click", function() {
    const taskText = input.value.trim();
    if (taskText) {
        addTask(taskText);
        input.value = "";
    } else {
        alert("Please enter a task");
    }
});
todoList.addEventListener("click", function(event) {
    const target = event.target;
    if (target.classList.contains("edit-btn")) {
        const taskText = target.parentElement.querySelector('.task-text').innerText;
        const newTaskText = prompt('Edit task:', taskText);
        if (newTaskText) {
            target.parentElement.querySelector('.task-text').innerText = newTaskText;
            saveTasks();
        }
    } else if (target.classList.contains("complete-btn")) {
        target.parentElement.querySelector('.task-text').classList.toggle('completed-task');
        saveTasks();
    } else if (target.classList.contains('delete-btn')) {
        target.parentElement.remove();
        saveTasks();
    }
});
function handleKeyPress(event) {
    if (event.keyCode === 13) {
        const taskText = input.value.trim();
        if (taskText) {
            addTask(taskText);
            input.value = "";
        } else {
            alert("Please enter a task");
        }
    }
}
function saveTasks() {
    const tasks = Array.from(document.querySelectorAll('.task-text')).map(task => task.innerText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}