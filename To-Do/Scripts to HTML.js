//Получаем элементы: кнопка и секция для задач.
const buttNewTask = document.querySelector('#buttonNewTask');

const sectForTasks = document.querySelector('#sectTasks');

const sectForExtTask = document.querySelector('#sectExtendedTask')

//Счетчик задач
let taskNum=0;


//Обработчик события "Клик" по кнопке добавления задач.
buttNewTask.addEventListener('click', handleCreateNewTask);


//Функция создания нового таска. Если создание отменено - процесс останавливается. 
//Если текст не введен - строка пустая. Если текст введен - используется для названия таска.
//Элементу div присваивается id в соответствии с порядковым номером таска (смотри счетчик).
//Новый элемент вставляется вверх секции (выше других тасков).
function handleCreateNewTask () {

    document.querySelector('#nameTask').style.display = 'block';
    document.querySelector('#wrapper').style.filter = 'blur(2px)';
    document.querySelector('#wrapper').style.filter = 'brightness(30%)';

    let inputValue = document.querySelector('#textInput');

    document.querySelector('#cancelCreateNewTask').addEventListener('click', handleCancelTask);
    document.querySelector('#createNewTask').addEventListener('click', handleCreateTask);

    function handleCancelTask () {

        document.querySelector('#nameTask').style.display = 'none';
        document.querySelector('#wrapper').style.filter = 'blur(0px)';
        document.querySelector('#wrapper').style.filter = 'brightness(100%)';
        inputValue.value = ''
        stop();

    };

    function handleCreateTask () {
        taskNum=taskNum+1;

        let newDiv = document.createElement('div');
        newDiv.className = 'tasks'
        newDiv.id = 'task' + taskNum;
        newDiv.innerHTML = '<p>' + inputValue.value + '</p>';
        sectForTasks.prepend(newDiv);

        let taskDeadLine = document.createElement('div');
        taskDeadLine.id = 'deadlineTask ' + taskNum;
        taskDeadLine.innerHTML = '<input placeholder = "Deadline"></input>';
        sectForExtTask.prepend(taskDeadLine);

        document.querySelector('#nameTask').style.display = 'none';
        document.querySelector('#wrapper').style.filter = 'blur(0px)';
        document.querySelector('#wrapper').style.filter = 'brightness(100%)';

        inputValue.value = ''

    };

    /*if (inputValue.value == null) {
        stop();
    } else {

        
        taskNum=taskNum+1;

        let newDiv = document.createElement('div');
        newDiv.className = 'tasks'
        newDiv.id = 'task' + taskNum;
        newDiv.innerHTML = '<p>' + inputValue.value + '</p>';
        sectForTasks.prepend(newDiv);

        let taskDeadLine = document.createElement('div');
        taskDeadLine.id = 'deadlineTask ' + taskNum;
        taskDeadLine.innerHTML = '<input placeholder = "Deadline"></input>';
        sectForExtTask.prepend(taskDeadLine);

    };*/

};






