const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const clearAllBtn = document.getElementById("clearAllBtn");
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Filter button references
const allTasksBtn = document.getElementById("allTasks");
const pendingTasksBtn = document.getElementById("pendingTasks");
const completedTasksBtn = document.getElementById("completedTasks");

// Load saved tasks and activity log on startup
document.addEventListener("DOMContentLoaded", loadTasks);

// Add new task
addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text === "") return alert("Please enter a task!");
  const newTask = { text, completed: false };
  saveTask(newTask);
  taskInput.value = "";
  // 1. Log the activity
  logActivity('add', text);
  // 2. Rerender and update counts
  filterTasks(document.querySelector('.filter-btn.active').id.replace('Tasks', ''));
  updateTaskCounts();
  // 3. Update Progress History (from inline script)
  updateProgressHistory();
});

// Function to create and add a task element
function createAndAppendTaskElement(taskObj) {
  const li = document.createElement("li");
  if (taskObj.completed) li.classList.add("completed");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "checkbox";
  checkbox.checked = taskObj.completed;

  const span = document.createElement("span");
  span.className = "task-text";
  span.textContent = taskObj.text;

  const btnGroup = document.createElement("div");
  btnGroup.className = "btn-group";

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.className = "edit-btn";

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn";

  btnGroup.appendChild(editBtn);
  btnGroup.appendChild(deleteBtn);

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(btnGroup);
  taskList.appendChild(li);

  // Checkbox toggle
  checkbox.addEventListener("change", () => {
    li.classList.toggle("completed");
    updateCompletion(taskObj.text, checkbox.checked);
    updateTaskCounts();
    // 1. Log complete/uncomplete activity
    logActivity(checkbox.checked ? 'complete' : 'uncomplete', taskObj.text);
    // 2. Update Progress History (from inline script)
    updateProgressHistory();

    // If we're on a filtered view, hide the task if its status changed
    const currentFilter = document.querySelector('.filter-btn.active').id.replace('Tasks', '');
    if (currentFilter !== 'all') {
      filterTasks(currentFilter);
    }
  });

  // Edit task
  editBtn.addEventListener("click", () => {
    const oldText = span.textContent;
    const newText = prompt("Edit task:", oldText);
    if (newText && newText.trim() !== "" && newText.trim() !== oldText) {
      updateTask(taskObj.text, newText.trim());
      span.textContent = newText.trim();
      taskObj.text = newText.trim();
      logActivity('edit', oldText + ' to ' + newText.trim()); // Log edit activity
    }
  });

  // Delete task
  deleteBtn.addEventListener("click", () => {
    li.remove();
    removeTask(taskObj.text);
    updateTaskCounts();
    logActivity('delete', taskObj.text); // Log delete activity
    updateProgressHistory();
  });
}

// ===================================
// ACTIVITY LOG FUNCTIONS (The fix for your issue)
// ===================================

function getActivityLog() {
  return JSON.parse(localStorage.getItem("activityLog")) || [];
}

function logActivity(action, taskData) {
  const log = getActivityLog();
  const timestamp = new Date().toLocaleString(); // Use local time for display
  const newEntry = { action, task: taskData, timestamp };
  
  // Prepend new entry and limit the log size (e.g., last 10 entries)
  log.unshift(newEntry); 
  if (log.length > 10) log.pop();

  localStorage.setItem("activityLog", JSON.stringify(log));
  displayActivityLog(); // Update the display immediately
}

function displayActivityLog() {
  const log = getActivityLog();
  const activityLogUl = document.getElementById("activityLog");
  // Ensure the element exists before trying to manipulate it
  if (!activityLogUl) return; 
  
  activityLogUl.innerHTML = "";

  if (log.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No recent activity.";
    activityLogUl.appendChild(li);
    return;
  }

  log.forEach(entry => {
    const li = document.createElement("li");
    let actionText = "";
    
    switch(entry.action) {
      case 'add':
        actionText = `**Added** task: "${entry.task}"`;
        break;
      case 'complete':
        actionText = `**Completed** task: "${entry.task}"`;
        break;
      case 'uncomplete':
        actionText = `**Unmarked** task: "${entry.task}"`;
        break;
      case 'delete':
        actionText = `**Deleted** task: "${entry.task}"`;
        break;
      case 'edit':
        actionText = `**Edited** task: ${entry.task}`;
        break;
      case 'clear':
        actionText = `**Cleared all** tasks.`;
        break;
    }
    
    // Add time and style
    li.innerHTML = `${actionText} <span style="opacity:0.6; font-size: 0.85em;">(${entry.timestamp})</span>`;
    activityLogUl.appendChild(li);
  });
}

// ===================================
// Counter and Filter Functions
// ===================================

function updateTaskCounts() {
  const tasks = getTasks();
  const pending = tasks.filter(t => !t.completed).length;
  const completed = tasks.filter(t => t.completed).length;

  document.getElementById("pendingCount").textContent = `${pending} Pending`;
  document.getElementById("completedCount").textContent = `${completed} Completed`;
}

function filterTasks(filter) {
  taskList.innerHTML = "";

  const tasks = getTasks();
  let filteredTasks = [];

  switch (filter) {
    case 'pending':
      filteredTasks = tasks.filter(t => !t.completed);
      break;
    case 'completed':
      filteredTasks = tasks.filter(t => t.completed);
      break;
    case 'all':
    default:
      filteredTasks = tasks;
      break;
  }

  filteredTasks.forEach(createAndAppendTaskElement);

  // Update button active state
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  const targetBtn = document.getElementById(`${filter}Tasks`);
  if (targetBtn) targetBtn.classList.add('active');
}

allTasksBtn.addEventListener("click", () => filterTasks('all'));
pendingTasksBtn.addEventListener("click", () => filterTasks('pending'));
completedTasksBtn.addEventListener("click", () => filterTasks('completed'));

// Local Storage and Load functions
function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTask(taskObj) {
  const tasks = getTasks();
  tasks.push(taskObj);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  filterTasks('all'); 
  updateTaskCounts(); 
  displayActivityLog(); // Load and display the activity log on startup
  // Call the function from the inline script to ensure initial progress is set
  if (typeof updateProgressHistory === 'function') {
      updateProgressHistory();
  }
}

function removeTask(text) {
  let tasks = getTasks().filter(t => t.text !== text);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTask(oldText, newText) {
  const tasks = getTasks();
  const task = tasks.find(t => t.text === oldText);
  if (task) task.text = newText;
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateCompletion(text, completed) {
  const tasks = getTasks();
  const task = tasks.find(t => t.text === text);
  if (task) task.completed = completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear All Tasks
clearAllBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to clear all tasks?")) {
    localStorage.removeItem("tasks");
    taskList.innerHTML = "";
    updateTaskCounts(); 
    logActivity('clear', 'N/A'); // Log clear all activity
    updateProgressHistory();
  }
});

// Theme toggle functionality
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});