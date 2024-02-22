//VARIABLES
const AddTaskButton = document.querySelector('#add-task-button')
const taskList = document.querySelector('#task-list')



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
    const newSpan = document.createElement('span')
    newSpan.classList.add('fa', 'fa-traash')
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

        inputTaskTitle.addEventListener('keypress', (event) => {
            if (event.keyCode === '13') {
                console.log('corintas1!')
            }
            
        })
    } else {
        for (i = 0; i < task.length; i++) {
            const inputTaskTitleList = document.querySelectorAll('#input-task-title')
            const inputTaskTitle = inputTaskTitleList[i]


            inputTaskTitle.addEventListener('keypress', (event) => {
                if (event.keyCode === '13') {
                    console.log('corintias2!')
                }
            })
        }
    }
}


//STUFF THAT SHOULD EXECUTEDED AS THE PAGE IS OPEN OR RELOAD