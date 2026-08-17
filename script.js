const CURRENT_STATE = initialize();


function initialize() {
    if (!localStorage.getItem("userDataTMBA")) {
        const INITIAL_STATE = {
            taskList: [
            ]
        };
        updateStorage(true, INITIAL_STATE);
        return INITIAL_STATE;
    } else {
        const INITIAL_STATE = JSON.parse(
            localStorage.getItem("userDataTMBA")
        );
        console.log(INITIAL_STATE);
        return INITIAL_STATE;
    }
}

function updateStorage(isInitial, initialStateVar) {
    if (isInitial) {
        localStorage.setItem("userDataTMBA", JSON.stringify(initialStateVar));
    } else {
        localStorage.setItem("userDataTMBA", JSON.stringify(CURRENT_STATE));
    }
    
}

function taskRender(condition) { // I'll do filters(conditions) later
    
    document.querySelector(".tasks").innerHTML = '';

    const allTasks = [];
    const length = CURRENT_STATE.taskList.length;

    for (let i = 0; i < length; i++) {

        const li = document.createElement('li');
        const container = document.createElement('div');
        const checkButton = document.createElement('input');

        const currentTask = CURRENT_STATE.taskList[i];
        checkButton.type = 'checkbox';
        checkButton.className = 'checkButton';
        checkButton.addEventListener('change', changeStatus) ;       

        if (CURRENT_STATE.taskList[i].isCompleted) {
            checkButton.setAttribute('checked', 'checked');
            container.setAttribute('class', 'completed');
        }

        li.dataset.id = currentTask.taskID;
        li.dataset.isCompleted = currentTask.isCompleted

        const deletionButton = document.createElement('button');
        deletionButton.className = 'deletionButton';
        deletionButton.addEventListener('click', deleteTask)
        deletionButton.textContent = '✕'

        const editionButton = document.createElement('button');
        editionButton.className = 'editionButton';
        editionButton.addEventListener('click', editTask)
        editionButton.textContent = '✎'

        const title = document.createElement('h3');
        title.textContent = `${currentTask.title}`;

        const description = document.createElement('p')
        description.textContent = `${currentTask.description}`;

        container.append(title, description)
        li.append(container, checkButton, editionButton,deletionButton)

        allTasks.push(li);
    }
    document.querySelector(".tasks").append(...allTasks)
}

class Task {
    constructor(title, description) {
        this.taskID = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.isCompleted = false;
    }
}

function createTask(event) {
    let taskName = document.querySelector('#taskTitle').value;
    let taskDescription = document.querySelector('#descriptionOfTask').value;
    const taskObj = new Task(taskName, taskDescription);
    CURRENT_STATE.taskList.push(taskObj);
    console.log(taskName, taskDescription);
    updateStorage();
    taskRender();
}

function changeStatus(event) {
    const taskID = event.target.parentElement.dataset.id;
    const taskIndex = CURRENT_STATE.taskList.findIndex((element) => element.taskID === taskID);
    CURRENT_STATE.taskList[taskIndex].isCompleted = !CURRENT_STATE.taskList[taskIndex].isCompleted;
    updateStorage()
    taskRender();
}

function deleteTask(event) {
    const taskID = event.target.parentElement.dataset.id;
    const taskIndex = CURRENT_STATE.taskList.findIndex((element) => element.taskID === taskID);
    CURRENT_STATE.taskList.splice(taskIndex, 1)
    updateStorage();
    taskRender();
}

function editTask(event) {
    const taskID = event.target.parentElement.dataset.id;
    const taskIndex = CURRENT_STATE.taskList.findIndex((element) => element.taskID === taskID);

    const li = event.target.parentElement;

    const oldh3 = li.querySelector('h3');
    const oldp = li.querySelector('p');

    const newTitle = document.createElement('input');
    newTitle.type = 'text';
    newTitle.value = oldh3.textContent;
    const newDescription = document.createElement('textarea');
    newDescription.textContent = oldp.textContent;
    
    oldh3.replaceWith(newTitle)
    oldp.replaceWith(newDescription)

    event.target.removeEventListener('click', editTask)
    event.target.addEventListener('click', () => {
        CURRENT_STATE.taskList[taskIndex].title = newTitle.value;
        CURRENT_STATE.taskList[taskIndex].description = newDescription.value;
        updateStorage();
        taskRender();
    });
}

const creationButton = document.querySelector('form');
creationButton.addEventListener('submit', createTask);

taskRender();
