var mainItemEl = document.createElement("main");
var bodyItemEl=document.getElementById('body');
var optionCounter=0;
var answerEl=document.getElementById('answer');
var timeEl=document.getElementById("time");
var score =0; 
var scoreBtnEl=document.getElementById("scorebtn")
var formEl=document.createElement("form");
var inputEl=document.createElement("input");

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

var time =50;



var finalscore=function(titleEl) {
    timeEl.style.display="none";
    scoreBtnEl.style.display="none";
    titleEl.textContent="All done!";
    mainItemEl.appendChild(titleEl);
    var textEl=document.createElement("h3");
    var nameEl =document.createElement("h3");
    textEl.textContent="Your final score is: "+ score;
    mainItemEl.appendChild(textEl);
    nameEl.textContent="Enter Name ";
    formEl.appendChild(nameEl);
    formEl.className="form";
    inputEl.setAttribute("type","text");
    inputEl.setAttribute("name","name");
    inputEl.setAttribute("placeholder","Name");
    formEl.appendChild(inputEl);
    formEl.innerHTML+='  <input type="submit" class="btn" value="Submit"></input>';
    mainItemEl.appendChild(formEl);
    formEl.addEventListener("submit", addName);
};

var addName = function(event) {
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='name']").value;
    if (!taskNameInput) alert("You need to fill in a name or initials!");
    else{
        localStorage.setItem(taskNameInput,score);
        var homeBtnEl=document.createElement("button");
        homeBtnEl.className="btn startbtn homebtn";
        homeBtnEl.textContent="Go Back";
        mainItemEl.appendChild(homeBtnEl);

    }
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
        time-=10;
    }
    answerEl.appendChild(lineEL);
    answerEl.appendChild(correct);
    optionCounter++;
    mainItemEl.removeEventListener("click",checkanswer);
    return;
};

var callTimer = function() {
    var startTime = setInterval(function() {
        time-=1;
        timeEl.textContent="Time: "+ time;
    },1000);
};

var question = function () {
    //start timer here 
    mainItemEl.innerHTML=' ';
    answerEl.innerHTML=' ';
    var titleEl=document.createElement("h2");
    if(optionCounter>=questionArr.length){
        score=time;
        finalscore(titleEl);
    }
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
    setTimeout(question,1000);
};


var reset = function() {
    mainItemEl.innerHTML= "<h1>Coding Quiz Challange</h1><p>Try to answer the following 5 questions as fast as possible</p><p>For each wrong answer, 10 secods would be deducted from your time</p><p>Time remaining at the end of 5 questions would be your score.</p><p>Good Luck!</p>";
    mainItemEl.className="firstpage";
    var startBtnEl=document.createElement("button");
    startBtnEl.textContent="Start Quiz";
    startBtnEl.className="btn startbtn";
    mainItemEl.appendChild(startBtnEl);
    bodyItemEl.appendChild(mainItemEl);
    startBtnEl.addEventListener("click",question);
    callTimer();
};


reset();