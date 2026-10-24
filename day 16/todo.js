/*  TODO LIST - IN MEMORY */

/*  TASK ARRAY */
// Tasks are stored only in memory.
// No localStorage or database is used.

let tasks = [];

/*  DOM ELEMENTS */
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const emptyMessage = document.getElementById("emptyMessage");
const clearAllBtn = document.getElementById("clearAllBtn");

/*  RENDER TASKS */
function renderTasks() {
    // Clear existing list
    taskList.innerHTML = "";
    // Check if there are no tasks
    if (tasks.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }

    // Create HTML for every task
    tasks.forEach(function (task) {
        const li = document.createElement("li");
        li.className = "task-item";
        li.dataset.id = task.id;
        const span = document.createElement("span");
        span.className = "task-text";
        span.textContent = task.text;
        const button = document.createElement("button");
        button.className = "delete-btn";
        button.dataset.action = "delete";
        button.setAttribute("aria-label", "Delete task");
        button.textContent = "×";
        li.appendChild(span);
        li.appendChild(button);
        taskList.appendChild(li);
    });

    // Update task count
    updateTaskCount();
}

/*  UPDATE TASK COUNT */
function updateTaskCount() {
    const count = tasks.length;
    if (count === 1) {
        taskCount.textContent = "1 Task";
    } else {
        taskCount.textContent = `${count} Tasks`;
    }
}

/*  ADD TASK */
function addTask() {
    const taskText = taskInput.value.trim();
    // Prevent empty tasks
    if (taskText === "") {
        alert("Please enter a task.");
        taskInput.focus();
        return;
    }

    // Create a new task
    const newTask = {
        id: Date.now(),
        text: taskText
    };

    // Add task to array
    tasks.push(newTask);

    // Clear input
    taskInput.value = "";

    // Render updated list
    renderTasks();

    // Focus input
    taskInput.focus();
}

/*  DELETE TASK */
function deleteTask(taskId) {
    tasks = tasks.filter(function (task) {
        return task.id !== taskId;
    });

    // Re-render after deleting
    renderTasks();
}

/*  EVENT DELEGATION */
taskList.addEventListener("click", function (event) {
    // Check whether clicked element is delete button
    const deleteButton = event.target.closest(
        '[data-action="delete"]'
    );

    if (!deleteButton) {
        return;
    }

    // Find parent task item
    const taskItem = deleteButton.closest(".task-item");

    // Get task ID
    const taskId = Number(taskItem.dataset.id);

    // Delete task
    deleteTask(taskId);
});

/*  ADD TASK BUTTON EVENT */
addTaskBtn.addEventListener("click", function () {
    addTask();

});

/*  ENTER KEY SUPPORT */
taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }

});

/* CLEAR ALL TASKS */
clearAllBtn.addEventListener("click", function () {
    if (tasks.length === 0) {
        return;
    }

    const confirmClear = confirm(
        "Are you sure you want to delete all tasks?"
    );

    if (confirmClear) {
        tasks = [];
        renderTasks();

    }
});

/*  INITIAL RENDER */
renderTasks();