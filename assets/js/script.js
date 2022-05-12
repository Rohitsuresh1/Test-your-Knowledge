var mainItemEl = document.createElement("main");
var bodyItemEl=document.getElementById('body');
var optionCounter=0;
var answerEl=document.getElementById('answer');
var timeEl=document.getElementById("time");
var score =0; 
var scoreBtnEl=document.getElementById("scorebtn")
var formEl=document.createElement("form");
var inputEl=document.createElement("input");
var timerOn=false;
var time =30;
var homeBtnEl=document.createElement("button");
homeBtnEl.setAttribute="id";
homeBtnEl.id="homebtn";
homeBtnEl.textContent="Go Back";



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

var deleteData = function(){
    localStorage.clear();
    scoreBoard();
};

var scoreBoard =function() {
    var savedTasks = localStorage.getItem("scores");
    var clearData=document.createElement("button");
    clearData.className="btn startbtn cleardata";
    clearData.textContent="Clear Score Board";
    homeBtnEl.className="btn startbtn";
    bodyItemEl.innerHTML=' ';
    mainItemEl.innerHTML= "<h1>Score Board</h1>";
    // if there are no tasks, set tasks to an empty array and return out of the function
    if (!savedTasks) {
        mainItemEl.innerHTML+= "<h3>Nothing to show!</h3>";
        bodyItemEl.appendChild(mainItemEl);
        bodyItemEl.appendChild(homeBtnEl);
        bodyItemEl.addEventListener("click", restart);
        return false;
    }
    // else, load up saved tasks
    savedTasks= JSON.parse(savedTasks);
    bodyItemEl.appendChild(mainItemEl);
    var displayNameEl=document.createElement("div");
    displayNameEl.className="name";
    // loop through savedTasks array
    for (var i = 0; i < savedTasks.length; i++) {
        displayNameEl.innerHTML+="<p class='nameline'>Name: <span class='ascouple'>"+savedTasks[i].nameInput+"</span></p><p class='scoreclass'> Score: <span class='ascouple2'>"+ savedTasks[i].saveScore+"</span></p><div><br></div>";
    }
    clearData.addEventListener("click",deleteData);
    bodyItemEl.appendChild(displayNameEl);
    console.log(bodyItemEl);
    bodyItemEl.appendChild(clearData);
    bodyItemEl.appendChild(homeBtnEl);
    bodyItemEl.addEventListener("click", restart);
};


var restart = function (event) {
    if(event.target.id=="scorebtn"){
        scoreBoard();
    } else if (event.target.id=="homebtn"){
        reset();
    }

};

var setTimer = function() {
    var startTime = setInterval(function() {
        
        if(time<=0){
            time=0;
            optionCounter=questionArr.length;
            clearInterval(startTime);
        } 
        timeEl.textContent="Time: "+ time;
        time-=1;
    },1000);
    timerOn=true;
};

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
        var data = [{
            nameInput: taskNameInput,
            saveScore: score
        }];
        var old = JSON.parse(localStorage.getItem("scores"));
        if(old===null)
         old=[];
        else {
            Array.prototype.push.apply(data,old);
            }
        var saveScore = localStorage.setItem("scores",JSON.stringify(data));
        var viewBtnEl = scoreBtnEl;
        viewBtnEl.style.display="block";
        viewBtnEl.textContent="View Scores";
        viewBtnEl.className+=(" startbtn viewbtn");
        mainItemEl.appendChild(viewBtnEl);
        
        mainItemEl.appendChild(homeBtnEl);
        mainItemEl.addEventListener("click", restart);
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

// var callTimer = function() {
   
// };

var question = function () {
    //start timer here 
    
    if(!timerOn){
        setTimer();
    }
    timeEl.style.display="block";
    mainItemEl.innerHTML=' ';
    answerEl.innerHTML=' ';
    var titleEl=document.createElement("h2");
    if(optionCounter>=questionArr.length||time<0){
        score=time+1;
        time=0;
        optionCounter=questionArr.length;
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
    setTimeout(question,2000);
};


var reset = function() {
    scoreBtnEl.className="btn viewscorebtn";
    scoreBtnEl.style.display="block";
    bodyItemEl.innerHTML=' ';
    formEl.innerHTML=' ';
    time=30;
    optionCounter=0;
    timerOn=false;
    homeBtnEl.className="btn startbtn homebtn";
    mainItemEl.innerHTML= "<h1>Coding Quiz Challenge</h1><div><br>Try to answer the following 4 questions as fast as possible</div><div><br>For each wrong answer, 10 seconds would be deducted from your time</div><div>Time remaining at the end of 4 questions would be your score.</div><div><br>You have 30 seconds.</div><div><br><br>Good Luck!</div>";
    mainItemEl.className="firstpage";
    var startBtnEl=document.createElement("button");
    startBtnEl.textContent="Start Quiz";
    startBtnEl.className="btn startbtn";
    mainItemEl.appendChild(startBtnEl);
    mainItemEl.appendChild(scoreBtnEl);
    bodyItemEl.appendChild(mainItemEl);
    startBtnEl.addEventListener("click",question);
    scoreBtnEl.addEventListener("click",scoreBoard);
};


reset();