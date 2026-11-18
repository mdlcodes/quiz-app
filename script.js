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

async function loadQuestions(){
    try{
        const response = await fetch("questions.json");
        if(!response.ok) throw new Error("Failed to load questions.json");
        questions = await response.json();
    }catch(error){
        console.error(error);
        questionTextEl.textContent = "Error loading questions"
    }
}
function showScreen(screenToShow){
    [heroScreen, quizScreen].forEach((screen) => {
        screen.classList.remove("active");
    });

    screenToShow.classList.add("active");
}

function startQuiz(){

    if(questions.length === 0){
        alert("Questions are still loading")
    }
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
loadQuestions();