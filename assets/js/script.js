var mainItemEl = document.createElement("main");
var bodyItemEl=document.getElementById('body');
var optionCounter=0;
var answerEl=document.getElementById('answer');

const questionArr = [
    {question: "Commonly used data types DO NOT Include",
    answers: [
        {Text: '1. Strings', correct : false},
        {Text: '2. Boolean', correct : false},
        {Text: '3. Alerts', correct : true},
        {Text: '4. Numbers', correct : false}
        ]
    },
    {question: "Condition in an if/else statement is enclosed with ___?",
    answers: [
        {Text: '1. Semicolon', correct : false},
        {Text: '2. Parenthesis', correct : true},
        {Text: '3. Comma', correct : false},
        {Text: '4. Curly brackets', correct : false}
        ]
    },
    {question: "Arrays in javascript can be used to store?",
    answers: [
        {Text: '1. Numbers and arrays', correct : false},
        {Text: '2. Other Arrays', correct : false},
        {Text: '3. Booleans', correct : false},
        {Text: '4. All of the above', correct : true}
        ]
    },
    {question: "Which of the following is a good tool to debug errors?",
    answers: [
        {Text: '1. console.log()', correct : true},
        {Text: '2. for loops', correct : false},
        {Text: '3. if statements', correct : false},
        {Text: '4. terminal/bash', correct : false}
        ]
}];

var finalscore=function() {

};

var checkanswer = function(event) {
    var targetEl = event.target;
    var targetId = targetEl.id;
    var correct= document.createElement("h3");
    var lineEL=document.createElement("hr");
    
    if(questionArr[optionCounter].answers[targetId].correct){
        correct.className="right";
        correct.textContent="Correct!";
    } else {
        correct.className="wrong";
        correct.textContent="Wrong!";
    }
    answerEl.appendChild(lineEL);
    answerEl.appendChild(correct);
    optionCounter++;
    mainItemEl.removeEventListener("click",checkanswer);
    return;
};

var question = function () {
    //start timer here 
    mainItemEl.innerHTML=' ';
    answerEl.innerHTML=' ';
    var titleEl=document.createElement("h2");
    // mainItemEl.className="pagecentre";
    if(optionCounter>=questionArr.length)
     finalscore();
    titleEl.textContent=questionArr[optionCounter].question;
    mainItemEl.appendChild(titleEl);
    for(n=0;n<4;n++){
    var choice=document.createElement("button");
    choice.className="btn choice";
    choice.textContent=questionArr[optionCounter].answers[n].Text;
    choice.setAttribute="id";
    choice.id=n;
    mainItemEl.appendChild(choice);
    };
    mainItemEl.addEventListener("click",checkanswer);
    setTimeout(question,4000);
};


var reset = function() {
    
    mainItemEl.innerHTML= "<h1>Coding Quiz Challange</h1><p>Try to answer the following 5 questions as fast as possible</p><p>For each wrong answer, 10 secods would be deducted from your time</p><p>Time remaining at the end of 5 questions would be your score!</p>";
    mainItemEl.className="firstpage";
    var startBtnEl=document.createElement("button");
    startBtnEl.textContent="Start Quiz";
    startBtnEl.className="btn startbtn";
    mainItemEl.appendChild(startBtnEl);
    bodyItemEl.appendChild(mainItemEl);
    startBtnEl.addEventListener("click",question);
};

reset();