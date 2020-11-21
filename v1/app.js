//Lista de Tareas
let tasks = [];
let geo = {
    lat: null,
    lon: null
}

//Método para recuperar lista de tareas desde LocalStorage
function getTasksFromStorage() {
    if ('localStorage' in window || 'sessionStorage' in window) {
        return JSON.parse(localStorage.getItem("tasks")) || [];
    } else {
        return []
    }
}

function setTasksInStorage() {
    if ('localStorage' in window || 'sessionStorage' in window) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
        console.log("Saved!");
    } else {
        alert("LocalStorage not supported!");
    }
}

function getGeoLocation() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            (location) => {
                geo.lat = location.coords.latitude;
                geo.lon = location.coords.longitude;
            },
            (err) => {
                console.warn(err);
                geo.lat = null;
                geo.lon = null;
            }
        );
    } else {
        return null;
    }

}

//Método para crear una tarea.
function addTask(task) {
    const newTaskElement = document.createElement("li");
    newTaskElement.setAttribute("data-task-id", task.taskId); //Set unique id
    newTaskElement.innerHTML =
        `
    <div>
        <input class="updateTask" type="checkbox" value="" ${task.done ? ' checked ' : ''}>
        <p>${task.taskName}</p>
    </div>
    <div class="buttons">
        <button class="action-btn shareTaskBtn"><i class="mdi mdi-share"></i></button>
        <button class="action-btn deleteTaskBtn"><i class="mdi mdi-delete"></i></button>
    </div>
    `;

    tasksList.prepend(newTaskElement); //This is a experimental feature
    /* Alternatives Element.insertAdjacentElement() and Element.insertAdjacentText() & */
    clearNewTaskInput();
    toggleEmptyListPlaceholder();
}

//Método para actualizar una tarea
function updateTask(taskId) {
    tasks[tasks.findIndex(t => t.taskId == taskId)].done = document.querySelector('[data-task-id="1605922113826"]').children[0].children[0].checked;
    setTasksInStorage();
}

//Método para eliminar una tarea
function deleteTask(taskId) {
    document.querySelector(`[data-task-id="${taskId}"]`).remove();
    tasks = tasks.filter(t => t.taskId != taskId);
    setTasksInStorage();
    toggleEmptyListPlaceholder();
}

//Método para borrar taskInput
function clearNewTaskInput() {
    const newTask = document.querySelector("#taskInput"); // New Task input
    newTask.value = "";
}

//Método para mostrar el cartel de lista de tareas vacía
function toggleEmptyListPlaceholder() {
    const emptyListPlaceholder = document.getElementById("emptyListPlaceholder")
    if (tasks.length === 0) {
        emptyListPlaceholder.style.display = 'block';
    } else {
        emptyListPlaceholder.style.display = 'none';
    }

}

//Registramos Objetos del DOM que nos interea manipular
const addTaskBtn = document.querySelector("#addTaskBtn"); //Add Button

const tasksList = document.querySelector("#tasksList"); //Tasks List

//Agregamos evento click en addTask Button
addTaskBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const newTask = document.querySelector("#taskInput"); // New Task input
    if (newTask.value != "") {

        //Construimos nuestro objeto temporal para almacenar la tarea
        const theNewTask = {
            taskId: new Date().getTime(),
            taskName: newTask.value,
            done: false,
            geo: geo
        }

        tasks.push(theNewTask); //Registramos la tarea en nuestra lista de tareas

        setTasksInStorage(); //Registramos el cambio en Storage

        addTask(theNewTask); //Creamos el objeto del DOM para esta tarea
        newTask.focus(); //Recuperamos el foto en el input
    }
});

//Agregamos evento click en tasksList
tasksList.addEventListener("click", (e) => {
    
    const taskToSelect = e.target.closest("li").getAttribute("data-task-id");

    if (e.target.classList.contains("deleteTaskBtn") || e.target.parentElement.classList.contains("deleteTaskBtn")) {
        deleteTask(taskToSelect);
    }

    if (e.target.classList.contains("shareTaskBtn") || e.target.parentElement.classList.contains("shareTaskBtn")) {
        shareTask(taskToSelect);
    }

    if (e.target.classList.contains("updateTask") || e.target.parentElement.classList.contains("updateTask")) {
        updateTask(taskToSelect);
    }
});

const shareButton = document.querySelector("#shareBtn"); //Tasks List

function shareTask(taskId) {
    if (!("share" in navigator)) {
        alert('Web Share API not supported.');
        return;
    }

    const sharedTask = tasks.filter(t => t.taskId == taskId)[0];
    navigator.share({
        title: 'Te comparto una tarea de mi lista',
        text: `${sharedTask.done ? 'Terminada' : 'Pendiente'}: ${sharedTask.taskName} (#${sharedTask.taskId})`,
        url: ''
    })
        .then(() => console.log('Compartido!'))
        .catch(error => console.log('Error sharing:', error));
}

//Launch the app
window.onload = function () {
    tasks = getTasksFromStorage();

    tasks.map((task) => {
        addTask(task);
    });

    toggleEmptyListPlaceholder();
    getGeoLocation();
    newTask.focus();
};
