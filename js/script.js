let firstPound = document.getElementById('pound');
let score = document.getElementById('score');
let question = document.getElementById('question');
let nextText = document.getElementById('next-test');
let timerElement = document.getElementById('timer');
let resultEnd = document.getElementById('result');
let navbar = document.getElementById('navbar');
let body = document.getElementById('body');
let usernameInput = document.getElementById('username');
//let username = usernameInput.value;
let resultBtn = document.getElementById('result-form');
let resultTable = document.getElementById('result_table');

let firstTest = document.getElementById('test-1');
let secondTest = document.getElementById('test-2');
let thirdTest = document.getElementById('test-3');

//let secondTestItems = document.querySelectorAll('.withA');

let allTests = [firstTest, secondTest, thirdTest];

let testIsFlex = [false, true, true];
let allQuestions = [
    {
        id : 0,
        questions: ["Перетащите всех обезьянок на пальмы", "Перетащите всех крокодилов в водоем"],
        readyQuestions: [false, false]
    },
    {
        id : 1,
        questions: ["Найдите все объекты на букву А", "Найдите все съедобные объекты"],
        readyQuestions: [false, false]
    },
    {
        id : 2,
        questions: ["Перенесите все слова, начинающиеся с гласной в красный контейнер, с согласной - в синий",
        "Перенесите все слова женского рода в красный контейнер, мужского - в синий"],
        readyQuestions: [false, false]
    }
];

//let allQuestions = ["Перетащите всех крокодилов в водоем", "Найдите все слова на букву А", "Перенесите все слова, начинающиеся с гласной в красный контейнер, с согласной - в синий"];
let currentTest = -1;
let cuurentLevel = 0;
let maxScoreOnTests = [[3,3],[5,6],[6,6]];
let testCounter = 0;
let result_value = 0;
let timerInterval;
let haveTime = true;
let playerResults = [0,0,0];
let currentScore = 0;
//let countUsers = localStorage.getItem('countUsers') || 0;


var usersResultsJSON = localStorage.getItem('userResults');
var usersResults = usersResultsJSON ? JSON.parse(usersResultsJSON) : [];


//Main part

//Открытие страницы, загрузка нового теста
window.onload = function() {
    setNewTest();
};

resultBtn.onclick = function() {
    let user1 = localStorage.getItem('currentUser');

    //localStorage.setItem('score', result_value);
    usersResults.push({ username: user1, result: result_value });


    var usersResultsJSON = JSON.stringify(usersResults);

    // Сохраняем строку JSON в localStorage
    localStorage.setItem('userResults', usersResultsJSON);

    localStorage.setItem('currentResult', result_value);
}


//Нажатие на кнопку - открытие следующего теста
nextText.onclick = function() {
    if (allQuestions[currentTest].readyQuestions[0] == false || 
        allQuestions[currentTest].readyQuestions[1] == false) {
            currentScore = 0;
            testLevel();
            if (currentTest == allTests.length - 1 && 
                (allQuestions[currentTest].readyQuestions[0] == true && 
                    allQuestions[currentTest].readyQuestions[1] == true)) {
                resultBtn.style.display = 'block';
                nextText.style.display = 'none';
                // let user1 = localStorage.getItem('currentUser');

                // //localStorage.setItem('score', result_value);
                // usersResults.push({ username: user1, result: result_value });


                // var usersResultsJSON = JSON.stringify(usersResults);

                // // Сохраняем строку JSON в localStorage
                // localStorage.setItem('userResults', usersResultsJSON);
            }
    } else {
        setNewTest();
    }
    // if (allQuestions[currentTest].readyQuestions[0] == true && 
    //     allQuestions[currentTest].readyQuestions[1] == true) {
    //     currentScore = 0;
    //     // if (currentTest == 0) {
    //     //     playerResults[currentTest] = result_value
    //     // } else if (currentTest > 0) {
    //     //     playerResults[currentTest] = result_value - playerResults[currentTest];
    //     // }
    //     setNewTest();

    //     // if (currentTest == allTests.length - 1) {
    //     //     //getResults();
    //     //     allTests[currentTest].style.display = 'none';
    //     //     navbar.style.display = 'none';
    //     // } else {
    //     //     setNewTest();
    //     //     if (currentTest == allTests.length) {
    //     //         resultBtn.style.display = 'block';
    //     //         result.innerHTML = `${username}`;
    //     //     }
    //     // }

    // }
    // else {
    //     currentScore = 0;
    //     testLevel();
    //     if (currentTest == allTests.length - 1 && 
    //         (allQuestions[currentTest].readyQuestions[0] == true && 
    //             allQuestions[currentTest].readyQuestions[1] == true)) {
    //         resultBtn.style.display = 'block';
    //         result.innerHTML = `${username}`;
    //     }
    // }
};

//Загрузка нового теста
function setNewTest() {

    //Переходим на следующий тест
    currentTest++;
    let currentTestObj = allTests[currentTest];
    //let isFlex = testIsFlex[currentTest]; 
    //let currentQuestion = allQuestions[currentTest];

    //Делаем все тесты скрытыми
    for ( let i = 0; i < allTests.length; i++) {
        allTests[i].style.display = 'none';
    }

    //Делаем текущий тест видимым, если требуется flex
    //if (isFlex) {
        currentTestObj.style.display = 'flex';
    // } else {
    //     currentTestObj.style.display = 'block';
    // }

    testLevel();

    //Помещаем актуальный вопрос
    //question.innerText = currentQuestion;

    //Помещаем текущее количество очков
    result.innerText = result_value;
};

function testLevel() {
    //Устанавливаем таймер
    timerElement.style.color = 'black';
    timerElement.innerText = '10';
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
    
    //У игрока еще есть время
    haveTime = true;

    //Погасим кнопку
    nextText.disabled = true;

    let level = getRandomZeroOrOne();
    if (allQuestions[currentTest].readyQuestions[level] == true) {
        level = (level - 1) * (-1);
    }

    cuurentLevel = level;

    let currentQuestion = allQuestions[currentTest].questions[level];
    question.innerText = currentQuestion;

    allQuestions[currentTest].readyQuestions[level] = true;

    if (currentTest == 2 && 
    (allQuestions[currentTest].readyQuestions[0] == true || allQuestions[currentTest].readyQuestions[1] == true)) {
        thirdTest.innerHTML= ` <div class="section" id="section-1" ondragstart="dragStart(event)" ondragover="dragOver(event)" ondrop="dragDropWord(event)">
            
        </div>
        <div class="section" id="section-2">
            <img id="game" class="test-3-item red_0 red_1" src="./img/test3/game.png">
            <img id="chocolate" class="test-3-item blue_0 blue_1" src="./img/test3/chocolate.png">
            <img id="hedgehog" class="test-3-item red_0 blue_1" src="./img/test3/hedgehog.png">
            <img id="hot" class="test-3-item blue_0 red_1" src="./img/test3/hot.png">
            <img id="iod" class="test-3-item blue_0 blue_1" src="./img/test3/iod.png">
            <img id="island" class="test-3-item red_0 blue_1" src="./img/test3/island.png">
            <img id="mouse" class="test-3-item blue_0 red_1" src="./img/test3/mouse.png">
            <img id="ula" class="test-3-item red_0 red_1" src="./img/test3/ula.png">
        </div>
        <div class="section" id="section-3" ondragstart="dragStart(event)" ondragover="dragOver(event)" ondrop="dragDropWord(event)">
            
        </div>`;
    }

}

//Обновление таймера
function updateTimer() {
    let time = parseInt(timerElement.innerText);

    // Уменьшаем значение таймера на 1
    time -= 1;
    timerElement.innerText = time;

    // Проверяем, если время истекло, останавливаем таймер
    if (time <= 0) {
      clearInterval(timerInterval);
      nextText.disabled = false;
      timerElement.innerText = 'Время вышло!';
      timerElement.style.color = '#b61d1d';

      //Также меняем значение флага на false, чтобы более не прибавлять очки 
      haveTime = false;
    }
};

// function getResults() {
//     resultEnd.style.display = 'block';
//     nextText.style.display = 'none';
//     body.style.backgroundColor = 'rgb(45, 45, 45)';
//     resultEnd.innerText = "Твой результат: " + result_value;
// };

//Добавление очков и изменение значения кнопки
function addScopeCount() {
    if (haveTime){
        result_value++;
        score.innerText = result_value;
        // if (currentTest == 0) {
        //     if (result_value == maxScoreOnTests[currentTest]) {
        //         nextTestActive();
        //     }
        // } else if (currentTest > 0) {
        //     if (result_value-playerResults[currentTest - 1] == maxScoreOnTests[currentTest]) {
        //         nextTestActive();
        //     }
        // }
        currentScore++;
        if (currentScore == maxScoreOnTests[currentTest][cuurentLevel]) {
            nextTestActive();
        }
    }
};

function nextTestActive() {
    nextText.disabled = false;
};


//Перенос элементов 

function dragEnd() {
    // Удаляем элемент, который мы уже переснесли с его предыдущего места
    draggableElement = null;
};

  
//Без обработки этого действия наши перетаскиваемые элементы не появятся в "новом" блоке
function dragOver(event) {
    // Отменяем действия браузера по умолчанию
    event.preventDefault();
};

//Drop с фиксацией позиции за мышкой
function dragDrop_0(event) {
    // Отменяем действия браузера по умолчанию
    event.preventDefault();
    
    // Если элемент, который мы "роняем" это наш переносимый элемент
    if (draggableElement) {
        draggableElement.style.left = event.pageX - 100 + 'px';
        draggableElement.style.top = event.pageY - 100 + 'px';

      //Добавляем элемент в новый блок
      firstPound.appendChild(draggableElement);
    }

    if (draggableElement.classList.contains('monkey') && cuurentLevel == 0
    && !(draggableElement.classList.contains('ready'))) {
        draggableElement.classList.add('ready');
        addScopeCount();
    }
};

//Drop с фиксацией позиции за мышкой
function dragDrop_1(event) {
    // Отменяем действия браузера по умолчанию
    event.preventDefault();
    
    // Если элемент, который мы "роняем" это наш переносимый элемент
    if (draggableElement) {
        draggableElement.style.left = event.pageX - 100 + 'px';
        draggableElement.style.top = event.pageY - 100 + 'px';

      //Добавляем элемент в новый блок
      firstPound.appendChild(draggableElement);
    }

    if (draggableElement.classList.contains('croco') && cuurentLevel == 1
    && !(draggableElement.classList.contains('ready'))) {
        draggableElement.classList.add('ready');
        addScopeCount();
    }
};

function dragStart(event) {
    // Получаем элемент, который будем перетаскивать
    draggableElement = event.target;
    event.dataTransfer.setData('text/plain', draggableElement.textContent);
};

//Тест 2

//Как только контент загрузился добавляем для всех элементов второго теста исчезновение после клика
document.addEventListener('DOMContentLoaded', function() {
    // var elements = document.querySelectorAll('img.test-2-item');
    //     elements.forEach(function(element) {
    //         element.addEventListener('click', function() {
    //         //element.classList.add('one_click');
    //         //element.style.display = "none";
    //     });
    // });
    
    //Добавляем очки при нажатии на объект с классом withA
    var elements = document.querySelectorAll('img.withA');
    elements.forEach(function(element) {
        element.addEventListener('click', function() {
            if (!(element.classList.contains('one_click_0')) && cuurentLevel == 0) {       
                element.classList.add('one_click_0');
                addScopeCount();
            }
        });
    });

    var elements = document.querySelectorAll('img.food');
    elements.forEach(function(element) {
        element.addEventListener('click', function() {
            if (!(element.classList.contains('one_click_1')) && cuurentLevel == 1) {
                element.classList.add('one_click_1');
                addScopeCount();
            }
        });
    });
});


//Тест 3

function dragEndWord() {
    //draggableElement.classList.add('ready_' + cuurentLevel);
}

//Drop элемента с проверкой контейнера
function dragDropWord(event) {
    // Отменяем действия браузера по умолчанию
    event.preventDefault();

    //Флаг для проверки правильности соотнесения слова-контейнера
    let right = true;

    // Если элемент, который мы "роняем" это наш переносимый элемент
    if (draggableElement) {

        if (cuurentLevel == 0 && (!(draggableElement.classList.contains('ready_0')))) {

            if (draggableElement.classList.contains('red_0') &&
            event.target.id == 'section-1') {

                draggableElement.classList.add('ready_' + cuurentLevel);
                event.target.appendChild(draggableElement);
                addScopeCount();
                dragEndWord();

            } else if (draggableElement.classList.contains('blue_0') &&
            event.target.id == 'section-3') {

                draggableElement.classList.add('ready_' + cuurentLevel);
                event.target.appendChild(draggableElement);
                addScopeCount();
                dragEndWord();

            }

        } else if (cuurentLevel == 1 && (!(draggableElement.classList.contains('ready_1')))){

            if (draggableElement.classList.contains('red_1') &&
            event.target.id == 'section-1') {

                draggableElement.classList.add('ready_' + cuurentLevel);
                event.target.appendChild(draggableElement);
                addScopeCount();
                dragEndWord();

            } else if (draggableElement.classList.contains('blue_1') &&
            event.target.id == 'section-3') {

                draggableElement.classList.add('ready_' + cuurentLevel);
                event.target.appendChild(draggableElement);
                addScopeCount();
                dragEndWord();

            }

        }
    }
};

function getRandomZeroOrOne() {
    return Math.round(Math.random());
}

