// script.js
// Section 1: TODOs
// TODO: Register submissions from the user on the form.
// TODO: Determine the value of the data submitted and add it to a JavaScript array called tasks.
// TODO: Call the render function to update the table with the new tasks.

// Section 2: App State Variables
let tasks = [];

// Section 3: Cached Element References
const taskForm = document.getElementById("taskForm");
const taskTable = document.getElementById("taskTable");

// Section 4: Functions and Event Listeners
// Function to handle form submissions
function handleSubmission(event) {
    event.preventDefault(); // this function stops our form from reloading the page
    // TODO: Get form input values
    const taskName = document.getElementById('taskName').value;
    const taskDescription = document.getElementById('taskDescription').value;
    const taskDeadline = document.getElementById('taskDeadline').value;
    
    // TODO: Validate input fields
    if (!taskName || !taskDeadline) {
        alert('Task name and deadline are required!');
        return;
    }
    
    // TODO: Update the tasks array
    tasks.push({ name: taskName, description: taskDescription, deadline: taskDeadline });
    
    // TODO: Call the render function
    render();
}

// Function to render tasks in the table
function render() {
    // TODO: Use array methods to create a new table row of data for each item in the array
    taskTable.innerHTML = tasks.map(task =>
        `
        <tr>
            <td>${task.name}</td>
            <td>${task.description}</td>
            <td>${task.deadline}</td>
            <td><button onclick="markTaskComplete(this)">Complete</button></td>
            <td><button onclick="removeTask(this)">Remove</button></td>
        </tr>
        `).join('');
}

// Function to initialize the table
function init() {
    taskTable.innerHTML = ''; // Clear the table
    tasks = []; // Reset the tasks array
    render(); // Call the render function
}

// Function to mark a task as complete
function markTaskComplete(button) {
    const row = button.parentNode.parentNode;
    const taskName = row.cells[0].textContent;
    const task = tasks.find(t => t.name === taskName);
    
    if (task) {
        task.completed = true;
        row.style.textDecoration = 'line-through';
        row.style.opacity = '0.6';
        button.textContent = 'Completed';
        button.disabled = true;
    }
}

// Function to remove a task
function removeTask(button) {
    const row = button.parentNode.parentNode;
    const taskName = row.cells[0].textContent;
    const taskIndex = tasks.findIndex(t => t.name === taskName);
    
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        render(); // Re-render the table
    }
}

// Event listener for form submission
taskForm.addEventListener('submit', handleSubmission);

// Call the init function to set up the initial state of the app
init();