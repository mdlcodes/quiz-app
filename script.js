const heroScreen = document.getElementById("hero");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
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
        return;
    }
    score = 0;
    updateScoreUI();
    currentIndex = 0;
    showScreen(quizScreen);
    renderQuestions();
};

function updateScoreUI(){
    scoreDisplayEl.textContent = `Score: ${score}`;
}

function formatTime(seconds){
    const mins = String(Math.floor(seconds/60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`
}
function startTime(){
    clearInterval(timerInterval);
    timeLeft = 60;
    timerDisplayEl.textContent = formatTime(timeLeft);
    timerDisplayEl.classList.remove("warning");

    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplayEl.textContent = formatTime(timeLeft);

        if(timeLeft <= 0){
            clearInterval(timerInterval);
            handleTimeout();
        }
    }, 1000);
}

function handleTimeout(){
    score = Math.max(0, score -1);
    updateScoreUI();
    nextQuestion();
}

function renderQuestions(){
    const currentQ = questions[currentIndex];

    nextBtn.disabled = true;
    nextBtn.textContent = currentIndex === questions.length - 1? "Finish":"Next";
    //reset ui 
    optionsGridEl.innerHTML = "";
    feedbackTextEl.className = "feedback-text";
    feedbackTextEl.textContent = "";
     
    questionNumberEl.textContent = `QUESTION ${currentIndex + 1}`;

    questionTextEl.textContent = currentQ.question;
    
    currentQ.options.forEach((optionText) => {
        const button = document.createElement("button");
        button.className = "option-btn";
        button.textContent = optionText;
        button.addEventListener("click", () => 
            answerChecker(button, optionText)
        )
        optionsGridEl.appendChild(button);
    });

    startTime();
}

function answerChecker(selectedBtn, selectedOpt){
    clearInterval(timerInterval);
    const currentQ = questions[currentIndex];
    const isCorrect = selectedOpt == currentQ.answer;
    const allButtons = optionsGridEl.querySelectorAll(".option-btn");

    allButtons.forEach((btn) => {
        btn.disabled = true;
        if(btn.textContent === currentQ.answer){
            btn.classList.add("correct");
        }else if(btn === selectedBtn && !isCorrect){
            btn.classList.add("wrong");
        }else{
            btn.classList.add("dimmed");
        }
    })

    if(isCorrect){
        score++;
        updateScoreUI();
        feedbackTextEl.textContent = "Correct! Great Job!";
        feedbackTextEl.classList.add("show", "correct");
    }else{
        feedbackTextEl.textContent = `Incorrect! the correct answer is ${currentQ.answer}`;
        feedbackTextEl.classList.add("show", "wrong");
    }
    nextBtn.disabled = false;
}

function nextQuestion(){
    clearInterval(timerInterval);
    currentIndex++;
    if(currentIndex < questions.length){
        renderQuestions();
    }else{
        showResult();
    }
}

function showResult(){
    clearInterval(timerInterval);
    showScreen(resultScreen);
}
startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
loadQuestions();

