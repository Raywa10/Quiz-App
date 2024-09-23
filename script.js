const questions=[
    {
        question:  "which is the largest animal in the world?",
        answers: [
            {text:"Shark", correct: false},
            {text:"Blue whale", correct: true},
            {text:"Elephant", correct: false},
            {text:"Giraffe", correct: false},

        ]
    },
    {
        question:  "which is the smallest country in the world?",
        answers: [
            {text:"Vatican City", correct: true},
            {text:"Bhutan", correct: false},
            {text:"Nepal", correct: false},
            {text:"Sri Lanka", correct: false},

        ]

    },
    { 
        question:  "which is the largest desert in the world?",
        answers: [
        {text:"Kalahari", correct: false},
        {text:"Gobi", correct: false},
        {text:"Sahara", correct: false},
        {text:"Antarctica", correct: true},

    ]

    },
    {
        question:  "which is the smallest continent  in the world?",
        answers: [
        {text:"Asia", correct: false},
        {text:"Australia", correct: true},
        {text:"Arctic", correct: false},
        {text:"Africa", correct: false},

    ]

    }
];
const questionElement= document.getElementById("question");
const answerButtons= document.getElementById("answer-buttons");
const nextButton= document.getElementById("next-btn");

let currentQuestionIndex =0;//This initializes a variable
let score=0;// This initializes a variable score to 0. This variable keeps track of which question the quiz is currently on. At the start of the quiz, this value is set to 0, meaning the quiz begins with the first question.



function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML ="Next";
    showQuestion();
}
 function showQuestion(){
    resetState();//this will reset the previous question & answer
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex +1;// question number
    questionElement.innerHTML =questionNo + "."+ currentQuestion.question;


    //---------For showing answers--------------------
    
    
    currentQuestion.answers.forEach(answer =>{
        const button =document.createElement("button");
        button.innerHTML =answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;// it will add t/f in this dataset correct
        }
        button.addEventListener("click", selectAnswer);// ads the click function 
    });
 }
//------------Remove all the previous answers---------//
function resetState(){
    nextButton.style.display="none";//Hide the "Next" button by setting its display style to 'none'
  while(answerButtons.firstChild){// Remove all child elements (buttons) in answer-buttons
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct =="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++// it will increase the score by 1
 }else{
    selectedBtn.classList.add("incorrect");
 }
 //--------- handle the behaviour after the user selects an answer//
  Array.from(answerButtons.children).forEach(button =>{
    if(button.dataset.correct ==="true"){
        button.classList.add("correct");
    }
    button.disabled = true; //This disables the button after an answer is selected, preventing the user from clicking any of the answer buttons again
  });
  nextButton.style.display ="block";//"Next" button becomes visible.

}
function  showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display ="Block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length)
{
    handleNextButton();
}else{
    startQuiz();
}
});
 startQuiz();