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
let parentTag = document.querySelector(".weather-app");

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

//Countdown Timer Script
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
        } else {
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




