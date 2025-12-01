// ProTrack Lite v1.0 - Task Management System
// Professional task management with persistence, analytics, and responsive design

let tasks = [];

// Task data model:
// {
//     id: string,
//     title: string,
//     description: string,
//     priority: 'high'|'medium'|'low',
//     dueDate: string (YYYY-MM-DD),
//     tag: string,
//     status: 'pending'|'completed',
//     completedAt: string (ISO date) | null,
//     createdAt: string (ISO date)
// }

// Load tasks from localStorage
function loadTasks() {
    const storedTasks = localStorage.getItem('protrack-tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
    renderTasks();
    updateProgress();
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('protrack-tasks', JSON.stringify(tasks));
    updateProgress();
}

// Check due date reminders and show browser notifications if permitted
function checkReminders() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    tasks.forEach(task => {
        if (task.status === 'pending') {
            const dueDate = new Date(task.dueDate);
            if (dueDate <= tomorrow && dueDate >= today) {
                // Show reminder - for simplicity, just console.log or could add notification
                console.log(`Reminder: Task "${task.title}" is due ${dueDate.toDateString()}`);

                // Request notification permission and show if granted
                if ('Notification' in window && Notification.permission === 'granted') {
                    new Notification(`Task Due: ${task.title}`, {
                        body: `Due date: ${dueDate.toLocaleDateString()}`,
                        icon: '/favicon.ico' // Could add a favicon
                    });
                } else if ('Notification' in window && Notification.permission !== 'denied') {
                    Notification.requestPermission();
                }
            }
        }
    });
}

// Add new task
function addTask(title, description, priority, dueDate, tag) {
    const newTask = {
        id: Date.now().toString(),
        title: trim(title),
        description: trim(description),
        priority: priority,
        dueDate: dueDate,
        tag: trim(tag),
        status: 'pending',
        completedAt: null,
        createdAt: new Date().toISOString()
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks();
}

// Edit task
function editTask(id, updates) {
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], ...updates };
        saveTasks();
        renderTasks();
    }
}

// Delete task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

// Toggle task status
function toggleTaskStatus(id) {
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        const task = tasks[taskIndex];
        task.status = task.status === 'pending' ? 'completed' : 'pending';
        task.completedAt = task.status === 'completed' ? new Date().toISOString() : null;
        saveTasks();
        renderTasks();
    }
}

// Render tasks
function renderTasks(filterOptions = {}) {
    const taskListEl = document.getElementById('task-list');
    if (!taskListEl) return;

    // Apply filters
    let filteredTasks = applyFilters(filterOptions);

    // Sort by due date (closest first), then by priority
    filteredTasks.sort((a, b) => {
        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);
        const dateDiff = dateA - dateB;

        if (dateDiff === 0) {
            const priorityOrder = { high: 3, medium: 2, low: 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
        }

        return dateDiff;
    });

    taskListEl.innerHTML = filteredTasks.map(task => createTaskHTML(task)).join('');
}

// Create task HTML
function createTaskHTML(task) {
    const priorityColors = {
        high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
        medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
        low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    };

    const statusClasses = task.status === 'completed' ? 'opacity-60' : '';

    const dueDate = new Date(task.dueDate);
    const isOverdue = dueDate < new Date() && task.status === 'pending';
    const dueClass = isOverdue ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-300';

    return `
        <div class="task-card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 ${statusClasses}">
            <div class="flex items-start justify-between">
                <div class="flex-1">
                    <div class="flex items-center gap-3 mb-2">
                        <input type="checkbox" 
                               ${task.status === 'completed' ? 'checked' : ''} 
                               onchange="toggleTaskStatus('${task.id}')" 
                               class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <h3 class="text-lg font-semibold ${task.status === 'completed' ? 'line-through' : ''}">${escapeHtml(task.title)}</h3>
                        <span class="px-2 py-1 text-xs font-medium rounded-full ${priorityColors[task.priority]}">
                            ${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                        </span>
                        ${task.tag ? `<span class="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-full">${escapeHtml(task.tag)}</span>` : ''}
                    </div>
                    <div class="mb-3 text-sm ${dueClass}">
                        Due: ${dueDate.toLocaleDateString()}
                        ${isOverdue ? '<span class="font-semibold">(Overdue)</span>' : ''}
                    </div>
                    ${task.description ? `
                        <div class="task-description text-gray-700 dark:text-gray-300 text-sm mb-4">
                            <button onclick="toggleDescription(this)" data-task-id="${task.id}" class="text-blue-600 dark:text-blue-400 hover:underline">Show Description</button>
                        </div>
                    ` : ''}
                </div>
                <div class="flex gap-2 ml-4">
                    <button onclick="openEditModal('${task.id}')" class="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                    </button>
                    <button onclick="confirmDelete('${task.id}', '${escapeHtml(task.title)}')" class="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Apply filters
function applyFilters(options) {
    let filtered = tasks.slice();

    // Status filter
    if (options.status && options.status !== 'all') {
        filtered = filtered.filter(task => task.status === options.status);
    }

    // Priority filter
    if (options.priority && options.priority !== 'all') {
        filtered = filtered.filter(task => task.priority === options.priority);
    }

    // Tag filter
    if (options.tag) {
        filtered = filtered.filter(task => task.tag.toLowerCase().includes(options.tag.toLowerCase()));
    }

    // Search filter
    if (options.search) {
        const searchLower = options.search.toLowerCase();
        filtered = filtered.filter(task =>
            task.title.toLowerCase().includes(searchLower) ||
            task.description.toLowerCase().includes(searchLower) ||
            task.tag.toLowerCase().includes(searchLower)
        );
    }

    return filtered;
}

// Update progress indicator
function updateProgress() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.status === 'completed').length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    const progressTextEl = document.getElementById('progress-text');
    const progressBarEl = document.getElementById('progress-bar');

    if (progressTextEl) progressTextEl.textContent = `${completed}/${total} tasks completed`;
    if (progressBarEl) progressBarEl.style.width = `${percentage}%`;
}

// Utility functions
function trim(str) {
    return (str || '').trim();
}

function escapeHtml(text) {
    const map = {
        '&': '&',
        '<': '<',
        '>': '>',
        '"': '"',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

function toggleDescription(button) {
    const parent = button.parentElement;
    const isExpanded = parent.classList.contains('expanded');

    if (isExpanded) {
        parent.innerHTML = `<button onclick="toggleDescription(this)" data-task-id="${button.dataset.taskId}" class="text-blue-600 dark:text-blue-400 hover:underline">Show Description</button>`;
        parent.classList.remove('expanded');
    } else {
        const task = tasks.find(t => t.id === button.dataset.taskId);
        parent.innerHTML = escapeHtml(task.description);
        parent.classList.add('expanded');
    }
}

function confirmDelete(id, title) {
    if (confirm(`Are you sure you want to delete the task "${title}"?`)) {
        deleteTask(id);
    }
}

function openEditModal(id) {
    // Simple edit mode - for now, just prompt or inline edit
    // Could be enhanced with modal later
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const newTitle = prompt('Edit title:', task.title);
    if (newTitle !== null) {
        editTask(id, { title: newTitle });
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
    checkReminders();

    // Task form submission
    const taskForm = document.getElementById('task-form');
    if (taskForm) {
        taskForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const title = document.getElementById('task-title').value;
            const description = document.getElementById('task-description').value;
            const priority = document.getElementById('task-priority').value;
            const dueDate = document.getElementById('task-due-date').value;
            const tag = document.getElementById('task-tag').value;

            if (!title || !dueDate) {
                alert('Title and due date are required!');
                return;
            }

            addTask(title, description, priority, dueDate, tag);

            // Reset form
            taskForm.reset();
        });
    }

    // Filter and search listeners
    const searchInput = document.getElementById('search-input');
    const statusFilter = document.getElementById('status-filter');
    const priorityFilter = document.getElementById('priority-filter');
    const tagFilter = document.getElementById('tag-filter');

    const updateFilters = () => {
        const options = {
            search: searchInput ? searchInput.value : '',
            status: statusFilter ? statusFilter.value : 'all',
            priority: priorityFilter ? priorityFilter.value : 'all',
            tag: tagFilter ? tagFilter.value : ''
        };
        renderTasks(options);
    };

    if (searchInput) searchInput.addEventListener('input', updateFilters);
    if (statusFilter) statusFilter.addEventListener('change', updateFilters);
    if (priorityFilter) priorityFilter.addEventListener('change', updateFilters);
    if (tagFilter) tagFilter.addEventListener('input', updateFilters);
});

// Mobile menu toggle
function toggleMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobile-menu-overlay');

    if (sidebar && overlay) {
        sidebar.classList.toggle('-translate-x-full');
        sidebar.classList.toggle('lg:translate-x-0');
        overlay.classList.toggle('hidden');
    }
}
