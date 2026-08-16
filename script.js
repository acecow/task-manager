const CURRENT_STATE = initialize();
function initialize() {
    if (localStorage.length === 0) {
    const INITIAL_STATE = {
        taskList: [
        ]
    }
    localStorage.setItem("userData", JSON.stringify(INITIAL_STATE));
    return INITIAL_STATE
} else {
    const INITIAL_STATE = JSON.parse(
        localStorage.getItem("userData")
    );
    console.log(INITIAL_STATE);
    return INITIAL_STATE
}
}



function updateStorage() {
    localStorage.setItem("userData", JSON.stringify(CURRENT_STATE));
}

function taskRender(condition) { // I'll do filters(conditions) later
    
    document.querySelector(".tasks").innerHTML = ''

    const allTasks = []
    const length = CURRENT_STATE.taskList.length;

    for (let i = 0; i < length; i++) {

        const li = document.createElement('li')
        const container = document.createElement('div')
        const completeBox = document.createElement('input')

        const currentTask = CURRENT_STATE.taskList[i]
        completeBox.type = 'checkbox'
        completeBox.className = 'checkButton'
        completeBox.addEventListener('change', changeStatus)        

        if (CURRENT_STATE.taskList[i].isCompleted) {
            completeBox.setAttribute('checked', 'checked')
            container.setAttribute('class', 'completed')
        }

        li.dataset.id = currentTask.taskID;
        li.dataset.isCompleted = currentTask.isCompleted

        const deleteButton = document.createElement('button')

        const title = document.createElement('h3')
        title.textContent = `- ${currentTask.title}`;

        const description = document.createElement('p')
        description.textContent = `${currentTask.description}`;

        container.append(title, description)
        li.append(container, completeBox)

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

const creationButton = document.querySelector('form');
creationButton.addEventListener('submit', createTask);

taskRender();
