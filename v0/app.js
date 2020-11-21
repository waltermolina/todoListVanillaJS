//Get our important DOM Objects
const addTaskBtn = document.querySelector("#addTaskBtn"); //Add Button

const tasksList = document.querySelector("#tasksList"); //Tasks List

addTaskBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const newTask = document.querySelector("#taskInput"); // New Task input
    if (newTask.value != "") {
        addTask(newTask.value);
        newTask.focus();
    }
});

tasksList.addEventListener("click", (e) => {
    if (e.target.classList.contains("deleteTaskBtn") || e.target.parentElement.classList.contains("deleteTaskBtn")) {
        const taskToDelete = e.target.closest("li");
        deleteTask(taskToDelete);
    }
});

function addTask(text) {
    const newTaskElement = document.createElement("li");
    newTaskElement.innerHTML =
        `
    <div>
        <input type="checkbox" value="">
        <p>${text}</p>
    </div>
    <button class="delete-btn deleteTaskBtn"><i class="mdi mdi-delete"></i></button>
    `;

    tasksList.prepend(newTaskElement); //This is a experimental feature
    /* Alternatives Element.insertAdjacentElement() and Element.insertAdjacentText() & */
    clearNewTaskInput();
    toggleEmptyListPlaceholder(!tasksList.hasChildNodes());
}

function clearNewTaskInput() {
    const newTask = document.querySelector("#taskInput"); // New Task input
    newTask.value = "";
}

function deleteTask(task) {
    task.remove();
    console.log(tasksList.hasChildNodes());
    toggleEmptyListPlaceholder(!tasksList.hasChildNodes());
}


function toggleEmptyListPlaceholder(value){
    console.log('value: ', value);
    const emptyListPlaceholder = document.getElementById("emptyListPlaceholder")
    if(value){
        emptyListPlaceholder.style.display = 'block';
    } else {
        emptyListPlaceholder.style.display = 'none';
    }

}