// gets input, list, and progress bar elements
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const progressFill = document.getElementById('progressFill');

// our list of task objects
let tasks = [];

// adds a task
function addTask() {
  const taskText = taskInput.value.trim();
  if (!taskText) return;

  // gets the current time and date
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const date = now.toLocaleDateString();

  // saves the task in the array
  tasks.push({
    text: taskText,
    completed: false,
    time,
    date
  });

  // clears input box
  taskInput.value = '';
  renderTasks();
}

// displays the tasks
function renderTasks() {
  // Clear existing tasks
  taskList.innerHTML = '';

  // loops through and display each task
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    if (task.completed) li.classList.add('completed');

    // task layout with time, task, date, and buttons
    li.innerHTML = `
      <span class="time">${task.time}</span>
      <span class="task">${task.text}</span>
      <span class="date">${task.date}</span>
      <div class="actions">
        <button onclick="toggleComplete(${index})">✔</button>
        <button onclick="deleteTask(${index})">❌</button>
        <button onclick="editTask(${index})">➕</button>
      </div>
    `;

    taskList.appendChild(li);
  });

  updateProgress();
}

// marks task as complete or undo
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

// deletes a task
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// edits task text
function editTask(index) {
  const newText = prompt('Edit task:', tasks[index].text);
  if (newText && newText.trim() !== '') {
    tasks[index].text = newText.trim();
    renderTasks();
  }
}

// updates progress bar
function updateProgress() {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  progressFill.style.width = percent + '%';
  progressFill.textContent = percent + '%';
}

// toggles light/dark theme
function toggleTheme() {
  document.body.classList.toggle("dark-mode");
}

