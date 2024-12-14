/* 
Комментарии лучше всего писать перед описываемой строкой, а не в конце, например:

//Обертка для секций тасков.
const wrapBody = document.querySelector('.wrapper'); 

Почему:
1. У всех ширина экрана разная, и принято ограничивать длину строки 120 символами, чтобы не приходилось скроллить по горизонтали
2. Когда читаешь код, ты читаешь его сверху-вниз. Сначала видишь коммент, а потом сам код, так обычно воспринимается проще
*/
//Получаем элементы:
const wrapBody = document.querySelector(".wrapper"); //Обертка для секций тасков.
/*
Сокращение butt не общепринятое, стоит использовать только общепринятые сокращения.
Для button принято сокращение btn.
Аналогично для sect, но в случае с sect лучше писать полностью
*/
const buttNewTask = document.querySelector(".buttonNewTask"); //Кнопка добавить таск.
const sectForTasks = document.querySelector(".sectTasks"); //Секция для тасков.
const sectForExtTask = document.querySelector(".sectExtendedTask"); //Секция для расширенных тасков.
const extTaskDiv = document.querySelector(".extTask"); //Div элемент - Расширенный таск.
const extTaskDeadline = document.querySelector(".deadlineTaskInput"); //Расширенный таск - дедлайн.
const extTaskNote = document.querySelector(".noteTaskInput"); //Расширенный таск - заметка.
const modalWindowNewTask = document.querySelector(".modalWindowCreateTask"); //Модальное окно.
const buttCancelNewTask = document.querySelector(".cancelCreateNewTask"); //Модалка: кнопка создания таска.
const buttCreateNewTask = document.querySelector(".createNewTask"); //Модалка: кнопка отмены создания таска.
// Лучше const taskNameInput, переменная не перезаписывается
let taskNameInput = document.querySelector(".textInput"); //Модалка: поле ввода названия таски.
// Лучше const taskStorageArr, переменная не перезаписывается
let taskStorageArr = []; //Массив для хранения информации о таске
let taskStorageIndex; //Индекс таска в массиве
let taskNum = 0; //Счетчик номера таска

//Фукнция открытия модального окна создания таска.
function handleOpenTaskNameForm() {
  modalWindowNewTask.classList.remove("hide");
  /* 
    Лучше не блюрить wrapper целиком, а создать обертку на весь экран вокруг модалки,
    которая будет открываться вместе с модалкой. Эта штука называется оверлей.
    Сделать его полупрозрачным (с затемнением) и блюрить уже его.
    */
  wrapBody.classList.add("blurWrap");
}

//Функция закрытия модального окна в случае отмены.
/*
Лучше переименовать как handleCloseCreateNewTaskModal, так как суть функции в том, чтобы закрыть модалку.
А затем использовать эту функцию для закрытия в handleCreateNewTask. Таким образом, избавимся 
от дублирования кода закрытия модалки
*/
function handleCancelCreateNewTask() {
  /*
    Очищать инпут лучше после создания таски, а не при каждом закрытии. Пользователь, например, может захотеть позже
    добавить таску, а если чистить при каждом закрытии, то будем заставлять пользователя вводить заново каждый раз.
    Очищаться только после создания - это стандартное поведение подобных форм добавления
    */
  taskNameInput.value = "";
  modalWindowNewTask.classList.add("hide");
  wrapBody.classList.remove("blurWrap");
}

//Функция создания таска.
function handleCreateNewTask() {
  /* 
    Настоятельно рекомендую использовать template для создания элемента задачи
    https://doka.guide/html/template/
    */
  const newTask = document.createElement("div");
  newTask.className = "task";
  newTask.innerHTML = '<p class = "nameOfTask">' + taskNameInput.value + "</p>";
  sectForTasks.prepend(newTask);

  //Заносим в массив имя таска, а также дедлайн и заметку (по умолчанию пустые)
  /*
  Круто, что теперь таски хранятся в виде массива объектов. К этому и нужно было прийти, красава!

  taskNum используется чисто для создания задач. Лучше убрать эту переменную и использовать метод push.
  Так избавимся от не особо нужной переменной, а при чтении кода будем сразу понимать, что элемент добавляется
  в конец
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push
  */
  taskStorageArr[taskNum] = {
    taskName: taskNameInput.value,
    taskDeadline: "",
    taskNotes: "",
  };

  taskNameInput.value = "";
  modalWindowNewTask.classList.add("hide");
  wrapBody.classList.remove("blurWrap");

  taskNum = taskNum + 1;
}

//Нахождение div элемента по нажатию
/*
Тут ты используешь делегирование событий https://learn.javascript.ru/event-delegation
Штука прикольная, но в данном случае ее не нужно использовать, так как появляются сложные условные конструкции => усложняется код

В данном случае, лучше для каждого действия создать соответствующие функци:
1) Открыть доп настройки
2) Скрыть доп настройки
3) Сохранить доп настройки

Затем, установить функции в качестве обработчиков на соответствующие элементы.
Дам подсказку - обработчик открытия доп настроек нужно будет устанавливать в функции handleCreateNewTask
*/
document.addEventListener("click", function (e) {
  //раскрытие доп.настроек таска по нажатию на таск.
  if (
    (e.target.classList == "task" || e.target.classList == "nameOfTask") &&
    extTaskDiv.classList.contains("hide")
  ) {
    let paramTaskName = e.target.textContent; //получаем имя таска

    //Находим индекс таска в массиве
    /* 
    Для поиска индекса есть более подходящий и оптимальный метод findIndex
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex

    А вообще, здесь еще лучше будет использовать метод find
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
    */
    taskStorageArr.map(function (el, index) {
      if (el.taskName === paramTaskName) {
        taskStorageIndex = index;
      }
    });

    //Устанавливаем значения доп настроек исходя из данных в массиве
    extTaskDeadline.value = taskStorageArr[taskStorageIndex].taskDeadline;
    extTaskNote.value = taskStorageArr[taskStorageIndex].taskNotes;

    extTaskDiv.classList.remove("hide");

    /* также если при клике: div элемент, в котором хранятся доп настройки таска, не имеет класса hide; клик просходит не по элментам с данными классами,
      то данные в массив перезаписываются и модальное окно закрывается*/
  } else if (
    !extTaskDiv.classList.contains("hide") &&
    !e.target.classList.contains("extTask") &&
    !e.target.classList.contains("deadlineTaskInput") &&
    !e.target.classList.contains("noteTaskInput")
  ) {
    taskStorageArr[taskStorageIndex].taskDeadline = extTaskDeadline.value;
    taskStorageArr[taskStorageIndex].taskNotes = extTaskNote.value;
    extTaskDiv.classList.add("hide");
    extTaskDeadline.value = "";
    extTaskNote.value = "";
    // дублирование, посмотри на 3 строки выше
    extTaskDiv.classList.add("hide");
  }
});

/*
Правильно, что устанавливаешь обработчики в конце!
*/
//Обработчики событий по клику на:
buttNewTask.addEventListener("click", handleOpenTaskNameForm); //кнопку добавления нового таска
buttCreateNewTask.addEventListener("click", handleCreateNewTask); //кнопку создания таска в модальном окне
buttCancelNewTask.addEventListener("click", handleCancelCreateNewTask); //кнопку отмены в модальном окне
