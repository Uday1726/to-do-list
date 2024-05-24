document.getElementById('addTaskBtn').addEventListener('click', addTask);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const reminderInput = document.getElementById('reminderInput');

    if (taskInput.value.trim() === '') {
        alert('Please enter a task.');
        return;
    }

    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');

    const taskDetails = document.createElement('div');
    taskDetails.className = 'task-details';

    const taskText = document.createElement('span');
    taskText.textContent = Task: ${taskInput.value};
    taskDetails.appendChild(taskText);

    const taskReminder = document.createElement('span');
    const reminderValue = reminderInput.value ? Reminder: ${formatDateTime(reminderInput.value)} : 'No Reminder';
    taskReminder.textContent = reminderValue;
    taskDetails.appendChild(taskReminder);

    li.appendChild(taskDetails);

    const buttons = document.createElement('div');
    buttons.className = 'buttons';

    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Completed';
    completeBtn.addEventListener('click', () => {
        li.classList.toggle('completed');
    });
    buttons.appendChild(completeBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        taskList.removeChild(li);
    });
    buttons.appendChild(deleteBtn);

    li.appendChild(buttons);
    taskList.appendChild(li);

    if (reminderInput.value) {
        scheduleReminder(taskInput.value, reminderInput.value);
    }

    taskInput.value = '';
    reminderInput.value = '';
}

function formatDateTime(dateTime) {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    };
    return new Date(dateTime).toLocaleDateString(undefined, options);
}

function scheduleReminder(task, reminderDateTime) {
    const reminderTime = new Date(reminderDateTime).getTime();
    const currentTime = new Date().getTime();
    const delay = reminderTime - currentTime;

    if (delay > 0) {
        setTimeout(() => {
            notifyUser(task);
        }, delay);
    }
}

function notifyUser(task) {
    if (Notification.permission === 'granted') {
        new Notification('Task Reminder', {
            body: Reminder: ${task},
        });
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                new Notification('Task Reminder', {
                    body: Reminder: ${task},
                });
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (Notification.permission !== 'granted') {
        Notification.requestPermission();
    }
});
