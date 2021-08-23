const newTask = document.querySelector("#taskInput");

//Método para crear una tarea.
function addTask(id, task) {
    const newTaskElement = document.createElement("li");
    newTaskElement.setAttribute("data-task-id", id); //id único en cada tarea
    newTaskElement.innerHTML =
        `
        <div>
            <input class="updateTask" type="checkbox" value="" >
            <p>${task}</p>
        </div>
        <div class="buttons">
            <button class="action-btn shareTaskBtn"><i class="mdi mdi-share"></i></button>
            <button class="action-btn deleteTaskBtn"><i class="mdi mdi-delete"></i></button>
        </div>
        `;

    tasksList.prepend(newTaskElement); //característica experimental
    /* Alternativas Element.insertAdjacentElement() y Element.insertAdjacentText() & */
    clearNewTaskInput();
}

//Método para eliminar una tarea
function deleteTask(id) {
    document.querySelector(`[data-task-id="${id}"]`).remove(); //busca por data id y elimina
}

//Método para borrar taskInput
function clearNewTaskInput() {
    newTask.value = "";
}

//Registramos Objetos del DOM que nos interea manipular
const addTaskBtn = document.querySelector("#addTaskBtn"); //Botón Add

const tasksList = document.querySelector("#tasksList"); //Lista de Tareas (ol)


//Agregamos evento click en addTask Button
addTaskBtn.addEventListener("click", function (e) {
    e.preventDefault();

    if (newTask.value != "") {
        let id = new Date().getTime();
        addTask(id, newTask.value); //Creamos el objeto del DOM para esta tarea
        newTask.focus(); //Recuperamos el foco en el input
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
});

const shareButton = document.querySelector("#shareBtn"); //Tasks List

function shareTask(id) {

    const taskElement = document.querySelector(`[data-task-id="${id}"]`);

    const text = taskElement.querySelector("p").textContent

    if (!("share" in navigator)) {
        alert('Web Share API not supported.');
        return;
    }

    navigator.share({
        title: 'Te comparto una tarea de mi lista',
        text: text,
        url: document.URL
    })
    .then(
        () => console.log('Compartido!')
    )
    .catch(
        error => console.log('Error sharing:', error)
    );
}

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

//Lanzar la app
window.onload = function () {
    newTask.focus();
};
