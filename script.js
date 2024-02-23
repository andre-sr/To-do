//VARIABLES
const AddTaskButton = document.querySelector('#add-task-button')
const taskList = document.querySelector('#task-list')


let taskStorage = {
    tasks: {},
    addTask: function(id,taskTitle) {
        
        this.tasks[id] = {
            title: taskTitle
        }
    } 
}



//EVENTS
AddTaskButton.addEventListener('click', () => {
    addTask()
    eventListenerCreator()
})

//FUNCTIONS
const addTask = () => {
    const task = document.querySelectorAll('.task')

    const newTask = document.createElement('li')
    newTask.classList.add('task')
    newTask.id = `_${task.length}`
    const newInput = document.createElement('input')
    newInput.placeholder = 'Nova tarefa'
    newInput.classList.add('task-title')
    newInput.id = 'input-task-title'
    newInput.type = 'text'
    const newSpan = document.createElement('span')
    newSpan.classList.add('fa', 'fa-trash')
    newSpan.id = 'remove-task-button'

    newTask.appendChild(newInput)
    newTask.appendChild(newSpan)
    taskList.appendChild(newTask)
}

const eventListenerCreator = () => {
    const task = document.querySelectorAll('.task')

    if (task.length == 1) {
        const inputTaskTitleList = document.querySelectorAll('#input-task-title')
        const inputTaskTitle = inputTaskTitleList[0]
        const removeTaskButtonList = document.querySelectorAll('#remove-task-button')
        const removeTaskButton = removeTaskButtonList[0]

        inputTaskTitle.addEventListener('keypress', (event) => { //ADICIONA EVENTO AO INPUT DO TÍTULO DA TASK
            if (event.keyCode === 13 || event.keyCode === 9 ) {
                taskStorage.addTask(inputTaskTitle.parentNode.id,inputTaskTitle.value)
                giveToLocalStorage()
            }
        })

        removeTaskButton.addEventListener ('click', () => { //ADICIONA EVENTO AO SPAN
            removeTaskButton.parentNode.remove()
        })
    } else {
        for (i = 0; i < task.length; i++) {
            const inputTaskTitleList = document.querySelectorAll('#input-task-title')
            const inputTaskTitle = inputTaskTitleList[i]
            const removeTaskButtonList = document.querySelectorAll('#remove-task-button')
            const removeTaskButton = removeTaskButtonList[i]

            inputTaskTitle.addEventListener('keypress', (event) => { //ADICIONA EVENTO AO INPUT DO TÍTULO DA TASK
                if (event.keyCode === 13 || event.keyCode === 9 ) {
                    taskStorage.addTask(inputTaskTitle.parentNode.id,inputTaskTitle.value)
                    giveToLocalStorage()
                }
            })

            removeTaskButton.addEventListener ('click', () => { //ADICIONA EVENTO AO SPAN 
                removeTaskButton.parentNode.remove()
            })
        }
    }
}

const giveToLocalStorage = () => {
    localStorage.clear()
    let taskStorageStringifyded = JSON.stringify(taskStorage)
    localStorage.setItem('main', taskStorageStringifyded)
}

const takeFromLocalStorage = () => {
    let taskStorageStringifyded = localStorage.getItem('main')
    let taskStorageUnstringifyded = JSON.parse(taskStorageStringifyded)
    taskStorage = taskStorageUnstringifyded
}

function contarObjetosEmTasks(objeto) {
    if (objeto && objeto.tasks) {
      let contador = 0;
      for (let chave in objeto.tasks) {
        if (typeof objeto.tasks[chave] === 'object') {
          contador++;
        }
      }
      return contador;
    } else {
      return 0; // Retorna 0 se não houver a propriedade 'tasks' ou se 'tasks' for null/undefined
    }
  }

const constructor = () => {
    
    const tasksNumber = contarObjetosEmTasks(taskStorage)

    for (i = 0; i < tasksNumber; i++) {
        addTask()
    }
    eventListenerCreator()
    const taskTitleElement = document.querySelectorAll('#input-task-title')

    for (i = 0; i < tasksNumber; i++) {
        let ttt = taskStorage.tasks[`_${i}`]
        taskTitleElement[i].value = ttt.title
    }
}


//STUFF THAT SHOULD BE EXECUTEDED AS THE PAGE IS OPEN OR RELOAD
takeFromLocalStorage()
constructor()