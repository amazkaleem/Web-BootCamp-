// Calculator Script
let buttonList = document.querySelectorAll(".calculator button");
let calcDisplay = document.querySelector(".calculator div");
let isClickedOnce = false;
let operatorCount = 0;
let numberCount = 0;

const clearCalc = () => {
    if (calcDisplay.innerText != "0") {
        calcDisplay.innerText = "0";
        isClickedOnce = false;
    }
};

const appendToCalc = (char) => {
    if (!isClickedOnce) {
        if (char != "*" && char != "/" && char != "+" && char != "-") {
            calcDisplay.innerText = '';
            calcDisplay.innerText = calcDisplay.innerText + char;
            numberCount += 1;
            isClickedOnce = true;
        }
    } else {
        if (char === "*" || char === "+" || char === "/" || char === "-") {
            if (operatorCount < numberCount) {
                calcDisplay.innerText = calcDisplay.innerText + char;
                operatorCount += 1;
            }
        } else {
            calcDisplay.innerText = calcDisplay.innerText + char;
            numberCount += 1;
        }
    }
};


const deleteLast = () => {
    if (calcDisplay.innerText != '') {
        if (calcDisplay.innerText.length > 1) {
            calcDisplay.innerText = calcDisplay.innerText.slice(0, -1);
        } else {
            calcDisplay.innerText = "0";
            isClickedOnce = false;
        }
    }
};

const calculateResult = () => {
    let lastChar = calcDisplay.innerText[calcDisplay.innerText.length - 1];

    while (lastChar === "/" || lastChar === "*" || lastChar === "+" || lastChar === "-") {
        calcDisplay.innerText = calcDisplay.innerText.slice(0, -1);
        lastChar = calcDisplay.innerText[calcDisplay.innerText.length - 1];
    }

    const result = eval(calcDisplay.innerText);

    calcDisplay.innerText = result;
};


//Weather App Script
let cityTag = document.querySelector(".weather-app input");
let getButton = document.querySelector(".weather-app button");

let cityName = "";
let displayInfo = document.querySelector("#weatherResult");
const apiKey = "db1b90cee33e2b4cec94b71e2a70ba1d";

cityTag.addEventListener("keydown", function(e) {
    if (e.key === "Enter") getWeather();
});

const getWeather = async () => {
    cityName = cityTag.value.trim(); //Trim cityName to avoid extra spaces
    if (cityName != "") {
        try {
            let baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
            let response = await fetch(baseURL);
            let data = await response.json();
            let temperature = data.main.temp;
            displayInfo.innerText = `Temperature of ${cityName} is ${temperature} Degree Celsius`;
        } catch {
            console.log("The URL gave nothing");
            displayInfo.innerText = "Please enter a valid city name(e.g, Islamabad)";
        }
    }
}


//Quiz App Script
//In the following script we use two important functions:
//Math.random() --> Generates a random number between 0(inclusive) and 1(exclusive)
//sort() --> sorts any array of elements, comparing each element based on their UTF-16 codes
//sort() has an optional compare function parameter that allow us to accurately sort numbers.
//It has the following syntax:
//function compareFunction(a, b) {
//      1. < 0...a comes first --> comment
//      2. == 0...no change --> comment
//      3. > 0...b comes first --> comment
//      return a - b --> code line
//}
//The spread operator '...' Take all the elements from an array(e.g, incorrect_answers) and spread them out into a new array to avoid nested arrays.


//The weird forms like &#039; inside data from the API are HTML character entities. For example, &#039; represents an apostrophe (').
// The Open Trivia DB API returns some special characters as HTML entities to ensure safe display in HTML.
// Why does this happen?

// The API encodes special characters (like quotes, ampersands, etc.) as HTML entities.
// When you set innerText or innerHTML with these strings, the entities are shown as-is unless decoded.
//Refer to decodeHTMLEntities() for the solution to this problem

let userManual = document.querySelector(".quiz-question");
let options = document.querySelector(".quiz-options");
let beforeButton = document.querySelector(".quiz-app #beforeQuiz");
let afterButtons = document.querySelectorAll(".quiz-app #afterQuiz");
let scoreElement = document.querySelector(".quiz-score");
let userScore = 0;
let questionCounter = 0;
let userAnswer = "";
let optionArray = [];
let questions = [];
let correctAnswers = [];
let shuffledAnswerOptions = [];


function decodeHTMLEntities(text) {
    const txt = document.createElement('textarea');
    txt.innerHTML = text;
    return txt.value;
}

const getQuiz = async () => {
    // Show loading message and hide all buttons
    userManual.innerText = "Loading Quiz...";
    afterButtons.forEach((button) => {
        button.style.display = "none";
    });
    beforeButton.style.display = "none";

    try {
        const URL = "https://opentdb.com/api.php?amount=10&type=multiple";
        let response = await fetch(URL);
        let data = await response.json();

        // Show buttons after data is fetched
        afterButtons.forEach((button) => {
            button.style.display = "inline";
        });

        // Extract questions and correct answers
        questions = data.results.map(item => item.question);
        correctAnswers = data.results.map(item => item.correct_answer);

        function shuffleArray(array) {
            return array.sort(() => Math.random() - 0.5);
        }

        shuffledAnswerOptions = data.results.map(item => {
            const options = [item.correct_answer, ...item.incorrect_answers];
            return shuffleArray(options);
        });
        nextQuestion();
    } catch {
        console.log("There was an error fetching data");
        userManual.innerText = "An error occurred while generating quiz. Please try again later";
    }
}

const resetQuiz = () => {
    if (questionCounter === 10) {
        userManual.innerText = "The quiz has finished. If you want a retake, click 'Start Quiz!' below";
         // Clear previous options
        options.innerHTML = "";
        optionArray.length = 0;
        userScore = 0;
        questionCounter = 0;
        userAnswer = "";
        shuffledAnswerOptions.length = 0;
        questions.length = 0;
        correctAnswers.length = 0;
        afterButtons.forEach((button) => {
            button.style.display = "none";
        })
        beforeButton.style.display = "inline";
    }
}

const nextQuestion = () => {
    if (questionCounter >= 10) {
        resetQuiz();
        return;
    }

    // Clear previous options
    options.innerHTML = "";
    optionArray.length = 0;

    // Load next question and options
    userManual.innerText = decodeHTMLEntities(questions[questionCounter]);
    for (let j = 0; j < 4; j++) {
        optionArray[j] = document.createElement("div");
        optionArray[j].innerText = decodeHTMLEntities(shuffledAnswerOptions[questionCounter][j]);
        optionArray[j].className = "quiz-option";
        optionArray[j].addEventListener("click", function() {
            // Remove 'selected' from all options
            optionArray.forEach(opt => opt.classList.remove("selected"));
            // Add 'selected' to the clicked option
            optionArray[j].classList.add("selected");
            userAnswer = optionArray[j].innerText;
        });
        options.append(optionArray[j]);
    }

    questionCounter++;
}

const submitAnswer = () => {
    if (userAnswer === correctAnswers[questionCounter - 1]) {
        userScore++;
        scoreElement.innerText = `${userScore}/10`;
    }
    
    options.innerHTML = "";
    optionArray.length = 0; //Emptying the array

    if (questionCounter === 10) {
        userManual.innerText = "The quiz has finished. If you want a retake, click 'Start Quiz!' below";
        userScore = 0;
        questionCounter = 0;
        userAnswer = "";
        shuffledAnswerOptions = [];
        questions = [];
        correctAnswers = [];
        afterButtons.forEach((button) => {
            button.style.display = "none";
        })
        beforeButton.style.display = "inline";
        return;
    } else {
        nextQuestion();
    }
}


//Countdown Timer Script
//Some important functions used within the following code are:
//String() --> takes a number as a parameter and returns a string
//padStart() --> pads a string from the start. It pads a string with another string (multiple times) until it reaches a given length.
//setInterval() --> calls a function at specified intervals (in milliseconds).The setInterval() method continues calling the function until clearInterval() is called, or the window is closed.

let timer = document.querySelectorAll(".countdown-inputs input");
let display = document.querySelector(".countdown-display");
let hours = display.textContent.slice(0, -6);
let minutes = display.textContent.substring(3, 5);
let seconds = display.textContent.substring(6, 8);
let intervalId = null; // to store setInterval reference

timer.forEach((input) => {
    input.addEventListener("blur", function() {
        if (input.id === "hoursInput") {
            let hourValue = parseInt(input.value);
            if (hourValue >= parseInt(input.min) && hourValue <= parseInt(input.max)) {
                hours = String(hourValue).padStart(2, "0");
                display.textContent = hours + ":" + minutes + ":" + seconds;
            } else if (hourValue < parseInt(input.min)) {
                hours = "00";
                display.textContent = hours + ":" + minutes + ":" + seconds;
            } else {
                hours = "23";
                display.textContent = hours + ":" + minutes + ":" + seconds;
            }
        } else if (input.id === "minutesInput") {
             let minuteValue = parseInt(input.value);
             if (minuteValue >= parseInt(input.min) && minuteValue <= parseInt(input.max)) {
                minutes = String(minuteValue).padStart(2, "0");
                display.textContent = hours + ":" + minutes + ":" + seconds;
            } else if (minuteValue < parseInt(input.min)) {
                minutes = "00";
                display.textContent = hours + ":" + minutes + ":" + seconds;
            } else {
                minutes = "59";
                display.textContent = hours + ":" + minutes + ":" + seconds;
            }
        } else if (input.id === "secondsInput") {
            let secondsValue = parseInt(input.value);
             if (secondsValue >= parseInt(input.min) && secondsValue <= parseInt(input.max)) {
                seconds = String(secondsValue).padStart(2, "0");
                display.textContent = hours + ":" + minutes + ":" + seconds;
            } else if (secondsValue < parseInt(input.min)) {
                seconds = "00";
                display.textContent = hours + ":" + minutes + ":" + seconds;
            } else {
                seconds = "59";
                display.textContent = hours + ":" + minutes + ":" + seconds;
            }
        }
    })
})

function startCountdown() {
    // Prevent multiple timers
    if (intervalId !== null) return;

    intervalId = setInterval(() => {
        let [h, m, s] = display.textContent.split(":").map(Number);

        if (h === 0 && m === 0 && s === 0) {
            clearInterval(intervalId);
            intervalId = null;
            return;
        }

        if (s > 0) {
            s--;
        } else {
            if (m > 0) {
                m--;
                s = 59;
            } else {
                if (h > 0) {
                    h--;
                    m = 59;
                    s = 59;
                }
            }
        }

        // Format to always be 2 digits
        hours = String(h).padStart(2, "0");
        minutes = String(m).padStart(2, "0");
        seconds = String(s).padStart(2, "0");

        display.textContent = `${hours}:${minutes}:${seconds}`;
    }, 1000);
}

function stopCountdown() {
    clearInterval(intervalId);
    intervalId = null;
}

function resetCountdown() {
    stopCountdown();

    // Reset inputs to "00"
    timer.forEach((input) => {
        input.value = "00";
    });

    hours = "00";
    minutes = "00";
    seconds = "00";
    display.textContent = `${hours}:${minutes}:${seconds}`;
}

timer.forEach((input) => {
    input.addEventListener("focus", stopCountdown); // Auto-stop on interaction
});

// Drag and Drop functionality
// 1. 'dragstart'   - Fired when the user starts dragging a draggable element. Used to mark the element as being dragged.
// 2. 'dragend'     - Fired when the drag operation ends (drop or cancel). Used to clean up any drag-related styles.
// 3. 'dragover' - Fired when a dragged element is over a valid drop target. Used to allow dropping by calling preventDefault().
// 4. 'dragleave' - Fired when a dragged element leaves a valid drop target. Used to remove visual cues for dropping.
// 5. 'drop' - Fired when a dragged element is dropped on a valid drop target. Used to insert the dragged element at the new position.
// 6. 'DOMContentLoaded' - Fired when the initial HTML document has been completely loaded and parsed. Used to initialize the drag-and-drop event listeners.
let draggedElement = null;

function addDragItem() {
    const input = document.getElementById('newItemInput');
    const text = input.value.trim();
    
    if (!text) return;
    
    const dragList = document.getElementById('dragList');
    const newItem = document.createElement('div');
    newItem.className = 'drag-item';
    newItem.textContent = text;
    newItem.draggable = true; //MDN Docs: The draggable property of the HTMLElement interface gets and sets a Boolean primitive indicating if the element is draggable. It reflects the value of the draggable HTML global attribute.
    
    dragList.appendChild(newItem);
    input.value = '';
}

// Initialize drag and drop
document.addEventListener('DOMContentLoaded', function() {
    const dragList = document.getElementById('dragList');
    
    dragList.addEventListener('dragstart', function(e) {
        if (e.target.classList.contains('drag-item')) {
            draggedElement = e.target;
            e.target.classList.add('dragging');
        }
    });

    dragList.addEventListener('dragend', function(e) {
        if (e.target.classList.contains('drag-item')) {
            e.target.classList.remove('dragging'); //By default, most elements in the browser do not allow dropping. Calling e.preventDefault() on the 'dragover' event tells the browser that the current element (here, dragList) is a valid drop target, enabling the drop operation.
        }
    });

    dragList.addEventListener('dragover', function(e) {
        e.preventDefault();
        dragList.classList.add('drag-over');
    });

    dragList.addEventListener('dragleave', function(e) {
        dragList.classList.remove('drag-over');
    });

    dragList.addEventListener('drop', function(e) {
        e.preventDefault();
        dragList.classList.remove('drag-over');
        

        //The clientY property returns the vertical client coordinate of the mouse pointer when a mouse event occurs. The clientY property is read-only.
        //getDragAfterElement(dragList, e.clientY) checks all the items in the list (except the one being dragged) and finds the first item that is below the mouse cursor (e.clientY).
        // It returns the element after which the dragged item should be placed.
        // If afterElement is null, the dragged item is appended to the end of the list. Otherwise, it is inserted before afterElement.
        if (draggedElement) {
            const afterElement = getDragAfterElement(dragList, e.clientY);
            if (afterElement == null) {
                dragList.appendChild(draggedElement);
            } else {
                dragList.insertBefore(draggedElement, afterElement);
            }
        }
    });
});


//getDragAfterElement(container, y) does:

// 1.Looks at all draggable items except the one being dragged.

// 2.Compares the current cursor y position to each item’s center.

// 3.Finds the closest element below the cursor to insert the dragged item before.

// 4.Returns that element (or undefined if it's going to the end).

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.drag-item:not(.dragging)')];


    // The Element.getBoundingClientRect() method returns a DOMRect object providing information about the size of an element and its position relative to the viewport.
    //Refere to "getBoundingClientRect() return object" for more insight
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}
