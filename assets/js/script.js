var mainItemEl = document.createElement("main");
var bodyItemEl=document.querySelector('#body');
var questionArr = [
    {question: "What is your name?",
    op1: "1.",
    op2: "2.",
    op3: "3.",
    op4: "4.",
    correct: {
            op2: "2."
        }
    },
    {question: "What is your name2?",
    op1: "1.",
    op2: "2.",
    op3: "3.",
    op4: "4.",
    correct: {
            op2: "2."
        }
    },
    {question: "What is your name3?",
    op1: "1.",
    op2: "2.",
    op3: "3.",
    op4: "4.",
    correct: {
            op2: "2."
        }
    },
    {question: "What is your name4?",
    op1: "1.",
    op2: "2.",
    op3: "3.",
    op4: "4.",
    correct: {
            op2: "2."
        }
    },
    {question: "What is your name5?",
    op1: "1.",
    op2: "2.",
    op3: "3.",
    op4: "4.",
    correct: {
            op2: "2."
        }
}];

var questions = function () {
    //start timer here 
    for(i=0;i<questionArr.length;i++){
        mainItemEl.innerHTML=' ';
        var titleEl=document.createElement("h2");
        titleEl.className="pagecentre";
        titleEl.textContent=questionArr[i].question;
        mainItemEl.appendChild(titleEl);
        bodyItemEl.appendChild(mainItemEl);
    }
    
};


var reset = function() {
    
    mainItemEl.innerHTML= "<h1>Coding Quiz Challange</h1><p>Try to answer the following 5 questions as fast as possible</p><p>For each wrong answer, 10 secods would be deducted from your time</p><p>Time remaining at the end of 5 questions would be your score!</p>";
    mainItemEl.className="firstpage";
    var startBtnEl=document.createElement("button");
    startBtnEl.textContent="Start Quiz";
    startBtnEl.className="btn startbtn";
    mainItemEl.appendChild(startBtnEl);
    bodyItemEl.appendChild(mainItemEl);
    startBtnEl.addEventListener("click",questions);
};

reset();