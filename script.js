let CURRENT_STATE;

function updateStorage() {
    localStorage.setItem("userData", JSON.stringify(CURRENT_STATE));
}

function taskRender(condition) { // I'll do filters(conditions) later
    const allTasks = []
    const length = CURRENT_STATE.taskList.length;
    for (let i = 0; i < length; i++) {
        const currentTask = CURRENT_STATE.taskList[i]
        const li = document.createElement('li')
        li.dataset.id = i;
        li.dataset.isCompleted = currentTask.isCompleted
        const title = document.createElement('h3')
        title.textContent = `- ${currentTask.title}`;
        const description = document.createElement('p')
        description.textContent = `${currentTask.description}`;
        li.append(title, description)
        allTasks.push(li);
    }
    document.querySelector(".tasks").append(...allTasks)
}

if (localStorage.length === 0) {
    console.log('empty');
    CURRENT_STATE = {
        taskList: [
        ]
    }
    updateStorage();
} else {
    CURRENT_STATE = JSON.parse(
        localStorage.getItem("userData")
    );
    console.log(CURRENT_STATE);
}

class Task {
    constructor(title, description) {
        this.taskID = CURRENT_STATE.taskList.length;
        this.title = title;
        this.description = description;
        this.isCompleted = false;
    }
}

function createTask() {
    let taskName = document.querySelector("#taskTitle").value;
    let taskDescription = document.querySelector("#descriptionOfTask").value;
    const taskObj = new Task(taskName, taskDescription);
    CURRENT_STATE.taskList.push(taskObj);
    console.log(taskName, taskDescription);
    updateStorage();
    taskRender();
}

const creationButton = document.querySelector("#createNewTask");
creationButton.addEventListener("click", createTask);

taskRender();