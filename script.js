//VARIABLES
const AddTaskButton = document.querySelector('#add-task-button')
const taskList = document.querySelector('#task-list')
const removeAllTasksButton = document.querySelector('#remove-all-tasks')


let taskStorage = {}

//EVENTS
AddTaskButton.addEventListener('click', () => {
    addTask()
    eventListenerCreator()
})

removeAllTasksButton.addEventListener('click', () => {
    const tasksNumber = contarObjetosEmTasks(taskStorage)
    
    for (i = 0; i < tasksNumber; i++) {
        const removeTaskButtonList = document.querySelectorAll('#remove-task-button')
        const removeTaskButton = removeTaskButtonList[i]
        removeTask(removeTaskButton)
    }
})

//FUNCTIONS
    function addTaskStorage(id,taskTitle) { 
        taskStorage[id] = {
            title: taskTitle
        }
    } 

const taskStorageOrganize = () => {
    const tasksNumber = contarObjetosEmTasks(taskStorage)
    
    for (i = 0; i < tasksNumber; i++) {
        console.log('flamengo')
        if (!taskStorage[`_${i}`]) {
            console.log('lituano')
            taskStorage[`_${i}`] = taskStorage[`_${i+1}`]
            delete taskStorage[`_${i+1}`]
            i = 0
        }
        
    }
    
}

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
                addTaskStorage(inputTaskTitle.parentNode.id,inputTaskTitle.value)
                giveToLocalStorage()
            }
        })

        removeTaskButton.addEventListener ('click', () => { //ADICIONA EVENTO AO SPAN
            removeTask(removeTaskButton)
        })
    } else {
        for (i = 0; i < task.length; i++) {
            const inputTaskTitleList = document.querySelectorAll('#input-task-title')
            const inputTaskTitle = inputTaskTitleList[i]
            const removeTaskButtonList = document.querySelectorAll('#remove-task-button')
            const removeTaskButton = removeTaskButtonList[i]

            inputTaskTitle.addEventListener('keypress', (event) => { //ADICIONA EVENTO AO INPUT DO TÍTULO DA TASK
                if (event.keyCode === 13 || event.keyCode === 9 ) {
                    addTaskStorage(inputTaskTitle.parentNode.id,inputTaskTitle.value)
                    giveToLocalStorage()
                }
            })

            removeTaskButton.addEventListener ('click', () => { //ADICIONA EVENTO AO SPAN 
                removeTask(removeTaskButton)
            })
        }
    }
}

const removeTask = (removeTaskButton) => {
    removeTaskButton.parentNode.remove()
    const tasksElementID = removeTaskButton.parentNode.id
    delete taskStorage[tasksElementID]
    taskStorageOrganize()
    giveToLocalStorage()
}

const giveToLocalStorage = () => {
    localStorage.clear()
    
    let taskStorageStringifyded = JSON.stringify(taskStorage)
    localStorage.setItem('main', taskStorageStringifyded)
}

const takeFromLocalStorage = () => {
    let taskStorageStringifyded = localStorage.getItem('main')
   // const tasksNumber = contarObjetosEmTasks(taskStorage)
    
    let taskStorageUnstringifyded = JSON.parse(taskStorageStringifyded)
    taskStorage = taskStorageUnstringifyded
}

function contarObjetosEmTasks(objeto) {
    if (objeto) {
      let contador = 0;
      for (let chave in objeto) {
        if (typeof objeto[chave] === 'object') {
          contador++;
        }
      }
      return contador;
    } else {
      return 0; 
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
        let idTaskStorage = taskStorage[`_${i}`]
        taskTitleElement[i].value = idTaskStorage.title
    }
}

function testMainLocalStorage () {
    const mainLocalStorage = localStorage.getItem('main')

    if (mainLocalStorage == null) {
        localStorage.setItem('main', '{"_0":{"title":""}}')
    }
}

//STUFF THAT SHOULD BE EXECUTEDED AS THE PAGE IS OPEN OR RELOAD
testMainLocalStorage()
takeFromLocalStorage()
constructor()
