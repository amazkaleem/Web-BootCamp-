// Calculator functionality (THIS CODE DOES NOT WORK!)
let calcDisplay = document.getElementById('calcDisplay');
let currentInput = '0';
let operator = null;
let previousInput = null;
let waitingForOperand = false;

function updateCalcDisplay() {
    calcDisplay.textContent = currentInput;
}

function appendToCalc(value) {
    if (waitingForOperand) {
        currentInput = value;
        waitingForOperand = false;
    } else {
        currentInput = currentInput === '0' ? value : currentInput + value;
    }
    updateCalcDisplay();
}

function clearCalc() {
    currentInput = '0';
    operator = null;
    previousInput = null;
    waitingForOperand = false;
    updateCalcDisplay();
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1) || '0';
    updateCalcDisplay();
}

function calculateResult() {
    if (operator && previousInput !== null && !waitingForOperand) {
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        let result;

        switch (operator) {
            case '+': result = prev + current; break;
            case '-': result = prev - current; break;
            case '*': result = prev * current; break;
            case '/': result = prev / current; break;
            default: return;
        }

        currentInput = result.toString();
        operator = null;
        previousInput = null;
        waitingForOperand = true;
        updateCalcDisplay();
    }
}

// Weather App functionality
function getWeather() {
    const city = document.getElementById('cityInput').value;
    const weatherResult = document.getElementById('weatherResult');
    
    if (!city) {
        weatherResult.innerHTML = 'Please enter a city name';
        return;
    }

    // Mock weather data (in a real app, you'd use an API like OpenWeatherMap)
    const mockWeatherData = {
        'london': { temp: 15, description: 'Cloudy', humidity: 65 },
        'new york': { temp: 22, description: 'Sunny', humidity: 45 },
        'tokyo': { temp: 18, description: 'Rainy', humidity: 80 },
        'paris': { temp: 12, description: 'Overcast', humidity: 70 },
        'sydney': { temp: 25, description: 'Clear', humidity: 40 }
    };

    const weather = mockWeatherData[city.toLowerCase()] || { temp: 20, description: 'Clear', humidity: 50 };
    
    weatherResult.innerHTML = `
        <div>
            <h3>${city}</h3>
            <p>Temperature: ${weather.temp}°C</p>
            <p>Description: ${weather.description}</p>
            <p>Humidity: ${weather.humidity}%</p>
        </div>
    `;
}

// Quiz App functionality
const quizQuestions = [
    { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink Text Markup Language"], correct: 0 },
    { question: "Which CSS property controls text size?", options: ["font-weight", "text-size", "font-size", "text-style"], correct: 2 },
    { question: "What does JS stand for?", options: ["Java Source", "JavaScript", "Just Script", "Java Standard"], correct: 1 },
    { question: "Which HTML tag is used for the largest heading?", options: ["<h6>", "<h1>", "<heading>", "<header>"], correct: 1 },
    { question: "What is the correct CSS syntax?", options: ["body {color: black;}", "{body;color:black;}", "body:color=black;", "{body:color=black;}"], correct: 0 }
];

let currentQuestionIndex = 0;
let quizScore = 0;
let selectedAnswer = null;

function displayQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    document.getElementById('quizQuestion').textContent = question.question;
    
    const optionsContainer = document.getElementById('quizOptions');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'quiz-option';
        optionDiv.textContent = option;
        optionDiv.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(optionDiv);
    });
}

function selectAnswer(index) {
    selectedAnswer = index;
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(option => option.classList.remove('selected'));
    options[index].classList.add('selected');
}

function submitAnswer() {
    if (selectedAnswer === null) {
        alert('Please select an answer!');
        return;
    }
    
    if (selectedAnswer === quizQuestions[currentQuestionIndex].correct) {
        quizScore++;
    }
    
    updateQuizScore();
    selectedAnswer = null;
}

function nextQuestion() {
    if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        currentQuestionIndex = 0;
        displayQuestion();
    }
}

function updateQuizScore() {
    document.getElementById('quizScore').textContent = `Score: ${quizScore}/${currentQuestionIndex + 1}`;
}

// Countdown Timer functionality
let countdownInterval;
let totalSeconds = 0;

function startCountdown() {
    const hours = parseInt(document.getElementById('hoursInput').value) || 0;
    const minutes = parseInt(document.getElementById('minutesInput').value) || 0;
    const seconds = parseInt(document.getElementById('secondsInput').value) || 0;
    
    totalSeconds = hours * 3600 + minutes * 60 + seconds;
    
    if (totalSeconds <= 0) {
        alert('Please enter a valid time!');
        return;
    }

    countdownInterval = setInterval(() => {
        if (totalSeconds <= 0) {
            clearInterval(countdownInterval);
            alert('Time\'s up!');
            return;
        }
        
        totalSeconds--;
        updateCountdownDisplay();
    }, 1000);
}

function stopCountdown() {
    clearInterval(countdownInterval);
}

function resetCountdown() {
    clearInterval(countdownInterval);
    totalSeconds = 0;
    updateCountdownDisplay();
    document.getElementById('hoursInput').value = '';
    document.getElementById('minutesInput').value = '';
    document.getElementById('secondsInput').value = '';
}

function updateCountdownDisplay() {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    document.getElementById('countdownDisplay').textContent = 
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Drag and Drop functionality
let draggedElement = null;

function addDragItem() {
    const input = document.getElementById('newItemInput');
    const text = input.value.trim();
    
    if (!text) return;
    
    const dragList = document.getElementById('dragList');
    const newItem = document.createElement('div');
    newItem.className = 'drag-item';
    newItem.textContent = text;
    newItem.draggable = true;
    
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
            e.target.classList.remove('dragging');
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

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.drag-item:not(.dragging)')];
    
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

// Initialize first quiz question
displayQuestion();
updateCountdownDisplay();