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

let questions = [
  {
    question: "Which HTML element is used to define the largest heading?",
    options: ["<heading>", "<h6>", "<h1>", "<head>"],
    answer: "<h1>"
  },
  {
    question: "Which CSS property controls the space inside an element's border?",
    options: ["margin", "padding", "gap", "spacing"],
    answer: "padding"
  }];
  
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
    currentIndex = 0;
    showScreen(quizScreen);
    renderQuestions();
};

function renderQuestions(){
    const currentQ = questions[currentIndex];

    //reset ui 
    optionsGridEl.innerHTML = "";
     
    questionNumberEl.textContent = `QUESTION ${currentIndex + 1}`;
    questionTextEl.textContent = currentQ.question;
    
    currentQ.options.forEach((optionText) => {
        const button = document.createElement("button");
        button.className = "option-btn";
        button.textContent = optionText;
        optionsGridEl.appendChild(button);
    });
}

startBtn.addEventListener("click", startQuiz);