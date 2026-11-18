const heroScreen = document.getElementById("hero");
const quizScreen = document.getElementById("quiz-screen");
const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");

const questionNumberEl = document.getElementById("question-number");
const scoreDisplayEl = document.getElementById("score-display");
const timerDisplayEl = document.getElementById("timer-display");
const questionTextEl = document.getElementById("question-text");
const feedbackTextEl = document.getElementById("feedback-text");
const optionsGridEl = document.getElementById("options-grid");

let questions = [];
let currentIndex = 0;
let score = 0;
let timerInterval = null;
let timeLeft = 60;


function showScreen(screenToShow){
    [heroScreen, quizScreen].forEach((screen) => {
        screen.classList.remove("active");
    });

    screenToShow.classList.add("active");
}

function startQuiz(){
    showScreen(quizScreen);
}
startBtn.addEventListener("click", startQuiz);