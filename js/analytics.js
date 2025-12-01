// Analytics and Charts for ProTrack Lite

let tasks = [];

// Load tasks and initialize charts
function initializeAnalytics() {
    loadAnalyticsTasks();
    updateStats();
    renderCharts();
}

// Load tasks for analytics (same as in tasks.js)
function loadAnalyticsTasks() {
    const storedTasks = localStorage.getItem('protrack-tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
}

// Update statistics cards
function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.status === 'completed').length;
    const pending = tasks.filter(task => task.status === 'pending').length;
    const overdue = tasks.filter(task =>
        task.status === 'pending' && new Date(task.dueDate) < new Date()
    ).length;

    document.getElementById('total-tasks').textContent = total;
    document.getElementById('completed-tasks').textContent = completed;
    document.getElementById('pending-tasks').textContent = pending;
    document.getElementById('overdue-tasks').textContent = overdue;
}

// Render all charts
function renderCharts() {
    renderCompletionChart();
    renderProductivityChart();
    renderPriorityChart();
}

// Completion Ratio Pie Chart
function renderCompletionChart() {
    const completed = tasks.filter(task => task.status === 'completed').length;
    const pending = tasks.filter(task => task.status === 'pending').length;

    const ctx = document.getElementById('completion-chart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Completed', 'Pending'],
            datasets: [{
                data: [completed, pending],
                backgroundColor: [
                    'rgba(34, 197, 94, 0.8)', // Green for completed
                    'rgba(156, 163, 175, 0.8)' // Gray for pending
                ],
                borderColor: [
                    'rgba(34, 197, 94, 1)',
                    'rgba(156, 163, 175, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                }
            },
            elements: {
                arc: {
                    borderRadius: 4
                }
            }
        }
    });
}

// Productivity Trend Line Chart (Last 7 Days)
function renderProductivityChart() {
    const last7Days = getLast7Days();

    const completedPerDay = last7Days.map(day => {
        return tasks.filter(task =>
            task.status === 'completed' &&
            task.completedAt &&
            new Date(task.completedAt).toDateString() === day.toDateString()
        ).length;
    });

    const ctx = document.getElementById('productivity-chart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: last7Days.map(day => day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
            datasets: [{
                label: 'Tasks Completed',
                data: completedPerDay,
                borderColor: 'rgba(59, 130, 246, 1)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: 'rgba(59, 130, 246, 1)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            elements: {
                point: {
                    hoverBorderWidth: 3
                }
            }
        }
    });
}

// Task Distribution by Priority Bar Chart
function renderPriorityChart() {
    const priorityCount = {
        high: tasks.filter(task => task.priority === 'high').length,
        medium: tasks.filter(task => task.priority === 'medium').length,
        low: tasks.filter(task => task.priority === 'low').length
    };

    const ctx = document.getElementById('priority-chart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['High Priority', 'Medium Priority', 'Low Priority'],
            datasets: [{
                label: 'Number of Tasks',
                data: [priorityCount.high, priorityCount.medium, priorityCount.low],
                backgroundColor: [
                    'rgba(239, 68, 68, 0.8)', // Red for high
                    'rgba(245, 158, 11, 0.8)', // Orange for medium
                    'rgba(34, 197, 94, 0.8)' // Green for low
                ],
                borderColor: [
                    'rgba(239, 68, 68, 1)',
                    'rgba(245, 158, 11, 1)',
                    'rgba(34, 197, 94, 1)'
                ],
                borderWidth: 2,
                borderRadius: 6,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            elements: {
                bar: {
                    borderRadius: 6
                }
            }
        }
    });
}

// Helper function to get last 7 days
function getLast7Days() {
    const days = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        days.push(new Date(date.getFullYear(), date.getMonth(), date.getDate())); // Normalize to start of day
    }
    return days;
}

// Refresh analytics when tasks update (called from tasks.js if needed)
function refreshAnalytics() {
    loadAnalyticsTasks();
    updateStats();
    // Note: Charts would need to be destroyed and recreated, but for simplicity, we'll reload the page or find another way
    // In production, we'd destroy existing charts and recreate them
    location.reload(); // Simple solution for demo
}

// Event listeners
document.addEventListener('DOMContentLoaded', function () {
    initializeAnalytics();
});
