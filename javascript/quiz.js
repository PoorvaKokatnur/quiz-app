let quizData = [
    {
        question:"What is the captial of Italy",
        options:["Rome","Berlin","Madrid","Paris"],
        answer:"Rome"
    },
    {
        question:"What is the largest lake in the world?",
        options:["Caspian Sea","Baikal","Lake Superior","Ontario"],
        answer:"Baikal"
    },
    {
        question:"What is the captial of Japan",
        options:["Beijing","Tokyo","Seoul","Bangkok"],
        answer:"Tokyo"
    },
    {
        question:"Who wrote the novel “War and Peace”",
        options:["Anton Chekhov","Fyodor Dostoevsky","Leo Tolstoy","Ivan Turgenev"],
        answer:"Leo Tolstoy"
    },
    {
        question:" Which river is the longest in the world?",
        options:["Amazon","Mississippi","Nile","Yangtze"],
        answer:"Nile"
    },
    {
        question:"What gas is used to extinguish fires",
        options:["Oxygen","Nitrogen","Carbon dioxide","Hydrogen"],
        answer:"Nitrogen"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean","Indian Ocean","Southern Ocean","Pacific Ocean"],
        answer:"Pacific Ocean"
    },
    {
        question: "In which year did Christopher Columbus reach the Americas?",
        options: ["1492","1520","1607","1620"],
        answer:"1492"
    },
    {
        question:"Which of the following planets is not a gas giant?",
        options:["Mars","Jupiter","Saturn","Uranus"],
        answer:"Mars"
    }
]

let currentQuestionIndex=0;
let userAnswers=[];
let timeLeft = 59;
let timer;

const questionContainer=document.getElementById("question-container");
const optionsContainer=document.getElementById("options-container");
const nextButton=document.getElementById("next-btn");
const prevButton=document.getElementById("prev-btn");
const submitButton=document.getElementById("submit-btn");
const scoreContainer=document.getElementById("score-container");
const timerDisplay=document.getElementById("timer");


nextButton.addEventListener("click", ()=>loadNextQuestion());
submitButton.addEventListener("click",showQuizResults);
prevButton.addEventListener("click",loadPrevQuestion);


displayQuestion();
startTimer();

function updateTimer(){
    if(timeLeft>0){
        const seconds=timeLeft;
        const displaySeconds =seconds<10 ? `0${seconds}` : seconds;
        timerDisplay.textContent=displaySeconds;
        timeLeft--;
    }
    else{
        timerDisplay.textContent="00";
        showQuizResults();
    }

}

function startTimer(){
    updateTimer();
    timer=setInterval(updateTimer,1000);
   

}

function selectAnswer(answer){
    
    const optionButtons=document.querySelectorAll(".quiz-option");
    optionButtons.forEach((button)=>button.classList.remove("selected"));
    const selectedOption=optionsContainer.querySelector(`.quiz-option[data-option="${answer}"]`

    )
    selectedOption.classList.add("selected");
    userAnswers[currentQuestionIndex]=answer;
}

function displayQuestion(){
    const currentQuestion=quizData[currentQuestionIndex];
    questionContainer.textContent=currentQuestion.question;
    optionsContainer.innerHTML="";
    const optionLetters=["A","B","C","D"];

    currentQuestion.options.forEach((option,index)=>{
        const optionContainer=document.createElement("div");
        optionContainer.classList.add("quiz-card");

        const optionLabel=document.createElement("span");
        optionLabel.textContent=optionLetters[index];
        optionLabel.classList.add("option-label");

        optionContainer.appendChild(optionLabel);

        const optionButton=document.createElement("button");
        optionButton.textContent=option;
        optionButton.classList.add("quiz-option");

        optionContainer.appendChild(optionButton);

        optionButton.setAttribute("data-option",option);
        optionContainer.addEventListener("click",()=>selectAnswer(option));
        
        optionsContainer.appendChild(optionContainer);

    });
}



function loadNextQuestion(){
    if(currentQuestionIndex<quizData.length-1){
    currentQuestionIndex++;
    displayQuestion();
    }
    else{
        showQuizResults();
    }
}

function loadPrevQuestion(){
    if(currentQuestionIndex>0){
        currentQuestionIndex--;
        displayQuestion();
    }
}

function evaluateUserAnswer(){
    let score=0;
    quizData.forEach((question,index)=>{
        if(userAnswers[index] === question.answer){
            score+=10;
        }
    });
    return score;
}

function showQuizResults(){
    const userScore=evaluateUserAnswer();
    scoreContainer.textContent= `Your Score : ${userScore} out of ${quizData.length *10}`;
    timeLeft=0;
   
}


