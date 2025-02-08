// Function to fetch and display tasks
function fetchTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    document.getElementById('taskList').innerHTML = tasks.map((task, index) => 
        `<li>${task} <span onclick="deleteTask(${index})">&times;</span></li>`
    ).join('');
}

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    if (taskInput.value.trim() === '') {
        alert("Please enter a task!");
        return;
    }

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(taskInput.value);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    taskInput.value = '';
    fetchTasks();
}

// Function to delete a task
function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    fetchTasks();
}

// Load tasks on page load
window.onload = fetchTasks;
