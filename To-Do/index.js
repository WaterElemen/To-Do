//Получаем элементы:
const wrapBody = document.querySelector('.wrapper'); //Обертка для секций тасков.
const buttNewTask = document.querySelector('.buttonNewTask'); //Кнопка добавить таск.
const sectForTasks = document.querySelector('.sectTasks'); //Секция для тасков.
const sectForExtTask = document.querySelector('.sectExtendedTask'); //Секция для расширенных тасков.
const extTaskDiv = document.querySelector('.extTask'); //Div элемент - Расширенный таск.
const extTaskDeadline = document.querySelector('.deadlineTaskInput'); //Расширенный таск - дедлайн.
const extTaskNote = document.querySelector('.noteTaskInput'); //Расширенный таск - заметка.
const modalWindowNewTask = document.querySelector('.modalWindowCreateTask'); //Модальное окно.
const buttCancelNewTask = document.querySelector('.cancelCreateNewTask'); //Модалка: кнопка создания таска.
const buttCreateNewTask = document.querySelector('.createNewTask'); //Модалка: кнопка отмены создания таска.
let taskNameInput = document.querySelector('.textInput'); //Модалка: поле ввода названия таски.

let taskStorageArr = []; //Массив для хранения информации о таске
let taskStorageIndex; //Индекс таска в массиве
let taskNum = 0; //Счетчик номера таска

//Фукнция открытия модального окна создания таска.
function handleOpenTaskNameForm () {
    modalWindowNewTask.classList.remove('hide');
    wrapBody.classList.add('blurWrap');
};

//Функция закрытия модального окна в случае отмены.
function handleCancelCreateNewTask () {
    taskNameInput.value = '';
    modalWindowNewTask.classList.add('hide');
    wrapBody.classList.remove('blurWrap');
};

//Функция создания таска.
function handleCreateNewTask () {

    const newTask = document.createElement('div');
    newTask.className = 'task';
    newTask.innerHTML = '<p class = "nameOfTask">' + taskNameInput.value + '</p>';
    sectForTasks.prepend(newTask);

    //Заносим в массив имя таска, а также дедлайн и заметку (по умолчанию пустые)
    taskStorageArr[taskNum] = {taskName : taskNameInput.value, taskDeadline : '', taskNotes : ''};
    
    taskNameInput.value = '';
    modalWindowNewTask.classList.add('hide');
    wrapBody.classList.remove('blurWrap');

    taskNum = taskNum + 1;

};


//Нахождение div элемента по нажатию
document.addEventListener('click', function(e){
    //раскрытие доп.настроек таска по нажатию на таск.
    if ((e.target.classList == 'task' || e.target.classList == 'nameOfTask') && extTaskDiv.classList.contains('hide')){

        let paramTaskName = e.target.textContent; //получаем имя таска

        //Находим индекс таска в массиве
        taskStorageArr.map(function(el, index){
            if(el.taskName === paramTaskName){
                taskStorageIndex = index;
            };
        });

        //Устанавливаем значения доп настроек исходя из данных в массиве
        extTaskDeadline.value = taskStorageArr[taskStorageIndex].taskDeadline;
        extTaskNote.value = taskStorageArr[taskStorageIndex].taskNotes;

        extTaskDiv.classList.remove('hide');

      /* также если при клике: div элемент, в котором хранятся доп настройки таска, не имеет класса hide; клик просходит не по элментам с данными классами,
      то данные в массив перезаписываются и модальное окно закрывается*/
    } else if (!extTaskDiv.classList.contains('hide') && !e.target.classList.contains('extTask') && !e.target.classList.contains('deadlineTaskInput') && !e.target.classList.contains('noteTaskInput')){
        taskStorageArr[taskStorageIndex].taskDeadline = extTaskDeadline.value;
        taskStorageArr[taskStorageIndex].taskNotes = extTaskNote.value;
        extTaskDiv.classList.add('hide');
        extTaskDeadline.value = '';
        extTaskNote.value = '';
        extTaskDiv.classList.add('hide');
    }
}); 

//Обработчики событий по клику на:
buttNewTask.addEventListener('click', handleOpenTaskNameForm); //кнопку добавления нового таска
buttCreateNewTask.addEventListener('click', handleCreateNewTask); //кнопку создания таска в модальном окне
buttCancelNewTask.addEventListener('click', handleCancelCreateNewTask); //кнопку отмены в модальном окне