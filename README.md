# ✨ Personal Scheduler — PrakashToDo

A sleek, modern **Personal To-Do & Scheduler** web app built with pure HTML, CSS, and JavaScript. Features a beautiful glassmorphism UI, dark/light theme switching, task filtering, activity logging, and persistent local storage — no backend required.

---
## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [How to Use](#-how-to-use)
- [Screenshots](#-screenshots)
- [License](#-license)

## ✨ Features

### ✅ Task Management
- **Add Tasks** — Type a task and click *Add* (or press Enter)
- **Complete Tasks** — Check the checkbox to mark a task as done
- **Edit Tasks** — Click *Edit* to rename any existing task
- **Delete Tasks** — Remove individual tasks with the *Delete* button
- **Clear All** — Wipe the entire task list in one click (with confirmation)

📂 Project Structure
personal-scheduler/
│
├── index.html      # Main webpage
├── style.css       # Stylesheet
├── script.js       # JavaScript logic
└── README.md       # Project documentation

### 🔍 Filters
- **All** — View every task at a glance
- **Pending** — Focus only on unfinished tasks
- **Completed** — Review what you've already accomplished

▶️ How to Run the Project
Download or clone the repository
Open the project folder
Double-click index.html

OR

Use VS Code Live Server for better experience

📸 Screenshots
<img width="1920" height="1200" alt="Screenshot (888)" src="https://github.com/user-attachments/assets/0b0b5e91-19bc-4b20-8a4e-d9b14d40122e" /><img width="1920" height="1200" alt="Screenshot (889)" src="https://github.com/user-attachments/assets/f02b2ac9-706a-4416-ba13-5499b69960d8" />


### 📊 Progress History
- **Today's Completed** — Live count of tasks finished today
- **This Week** — Weekly completion tracker
- **Total Completed** — All-time completed count
- **Recent Activity Log** — Timestamped log of the last 10 actions (add, edit, delete, complete, clear)

### 🌙 Dark / Light Theme
- Toggle between **Light Mode** ☀️ and **Dark Mode** 🌙
- Theme preference is saved automatically across sessions

### 💾 Persistent Storage
- All tasks and activity history are saved in the browser's **localStorage**
- Data survives page refreshes and browser restarts — no login needed

## 🛠️ Tech Stack

| Technology   | Purpose                         |
|--------------|---------------------------------|
| HTML5        | Page structure & layout         |
| CSS3         | Glassmorphism design & theming  |
| JavaScript   | App logic & interactivity       |
| LocalStorage | Persistent data storage         |
| Google Fonts | Poppins font for clean UI       |


## 📁 Project Structure

```
PrakashToDo/
│
├── todolist.html    # Main application page
├── style.css        # All styles (glassmorphism, dark/light themes, animations)
├── script.js        # Core app logic (tasks, filters, activity log, theme toggle)
└── README.md        # Project documentation
```
## 📖 How to Use

### Adding a Task
1. Click the input box at the top
2. Type your task (e.g., *"Complete assignment"*)
3. Click the **Add** button

### Completing a Task
- Click the **checkbox** next to any task
- The task text will be struck through and marked as completed
- The **Progress History** counters update automatically

### Editing a Task
- Click the **Edit** button on any task
- A prompt will appear — type the new task name and confirm

### Deleting a Task
- Click the **Delete** button on any task to remove it instantly

### Filtering Tasks
- Use the **All / Pending / Completed** filter buttons to switch views

### Switching Themes
- Click the 🌞 / 🌙 button in the top-right corner to toggle themes

## 🎨 Design Highlights

- **Glassmorphism UI** — Frosted glass card with backdrop blur
- **Gradient background** — Smooth teal-to-purple gradient
- **Micro-animations** — Tasks fade in from below on entry, hover lifts cards
- **Responsive** — Adapts to mobile screens (≤ 560px)
- **Poppins Font** — Clean, modern typography via Google Fonts

---
