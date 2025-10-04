const gameQuestions = [
  {
    text: "Which company developed JavaScript?",
    options: ["Netscape", "Microsoft", "Google", "Apple"],
    answer: "Netscape",
    hint: "Name of developer is Brendan Eich, and was developed in 1995",
    choice: "Its a single choice question"
  },
  {
    text: "Which symbol is used for comment single line of code in JavaScript?",
    options: ["//", "/* */", "#", "<!-- -->"],
    answer: "//",
    hint: "Two ways to comment in JS, one for single line code other for block of code",
    choice: "Its a multiple choice question"
  },
  {
    text: "Which method is used to parse a string to an integer?",
    options: ["Number()", "parseInt()", "parseFloat()", "toString()"],
    answer: "parseInt()",
    hint:"Converts a string to a number",
    choice: "Its a single choice question"
  },
  {
    text: "Which keyword declares a block-scoped variable?",
    options: ["var", "let", "const", "both let and const"],
    answer: "both let and const",
    hint: "Block scope variable means, they are only valid within the block, not outside of it.",
    choice: "Its a single choice question"
  },
  {
    text: "Which method is used to add an element to the end of an array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    answer: "push()",
    hint: "Name of the function makes sense of what it does.",
    choice: "Its a single choice question"
  },
  {
    text: "What does '===' mean in JavaScript?",
    options: ["Equal value", "Equal value and type", "Assignment", "Not equal"],
    answer: "Equal value and type",
    hint: "It is different from assignment (=) operator and shallow compare (==) operator.",
    choice: "Its a single choice question"
  },
  {
    text: "Which function is used to schedule code execution after a delay?",
    options: ["setTimeout()", "setInterval()", "setImmediate()", "delay()"],
    answer: "setTimeout()",
    hint: "It means that this inbuilt function makes the other function execute after a fixed period of time.",
    choice: "Its a single choice question"
  },
  {
    text: "Which operator is used for exponentiation?",
    options: ["^", "**", "%", "^^"],
    answer: "**",
    hint: "Exponentiation means raise to the power of eg 2(raise to power of)3 is 2x2x2=8",
    choice: "Its a single choice question"
  },
  {
    text: "How do you create an object in JavaScript?",
    options: ["{}", "[]", "()", "<>"],
    answer: "{}",
    hint: "How to intiate an object, like intiating a variable scope and variable name.",
    choice: "Its a multiple choice question"
  },
  {
    text: "Which method converts a JSON string into a JavaScript object?",
    options: ["JSON.stringify()", "JSON.parse()", "JSON.object()", "JSON.convert()"],
    answer: "JSON.parse()",
    hint: "Its a JS inbuilt function.",
    choice: "Its a single choice question"
  },
  {
    text: "What will typeof NaN return?",
    options: ["number", "NaN", "undefined", "object"],
    answer: "number",
    hint: "typeof inbuilt function returns the \"type\" of the argument",
    choice: "Its a single choice question"
  },
  {
    text: "Which loop is guaranteed to execute at least once?",
    options: ["for", "while", "do...while", "for...in"],
    answer: "do...while",
    hint: "Name of the loop is self explanatory.",
    choice: "Its a single choice question"
  },
  {
    text: "What is the output of '2' + 2 in JavaScript?",
    options: ["4", "'4'", "'22'", "Error"],
    answer: "'22'",
    hint: "Its an additon of string and a number, one variable auto converts to other.",
    choice: "Its a single choice question"
  },
  {
    text: "Which method removes the last element from an array?",
    options: ["pop()", "push()", "shift()", "unshift()"],
    answer: "pop()",
    hint: "Name of the function is self explanatory",
    choice: "Its a single choice question"
  },
  {
    text: "What is the default value of an uninitialized variable in JavaScript?",
    options: ["null", "undefined", "0", "NaN"],
    answer: "undefined",  
    hint: "Uninitialized means the the variable is not assingned any value while declaring it.",
    choice: "Its a single choice question"
  }
];

let mainContainer = document.getElementsByClassName("main-container")[0];
let NQbutton = document.getElementById("next-question");
let quizButton = document.getElementById("start-quiz");
let question = document.getElementById("question");
let qType = document.getElementById("question-type");
let options = document.getElementsByClassName("answers");
let qHint = document.getElementById("q-hint");
let gameScore = document.getElementById("game-score");
let QN = document.getElementById("question-number");
let scoreBoard = document.getElementsByClassName("score-circle")[0];
let quesNo = 0;
let score = 0;
let answerIndex;

window.onload = function(){
  let game = document.createElement("div");
  game.classList.add("start");

  console.log("Paged loaded");
  document.body.appendChild(game);

  let gameButton = document.createElement("button");
  gameButton.textContent = "Start Quiz";
  gameButton.classList.add("start-butt");
  gameButton.classList.add("begin-game");
  game.appendChild(gameButton);

  gameButton.onclick = ()=>{
    game.remove();
    startQuiz();
  }
};

function getRandomArray() {
  let arr = [0, 1, 2, 3];

  for (let i = arr.length - 1; i > 0; i--) {
    // pick a random index from 0..i
    let j = Math.floor(Math.random() * (i + 1));
    // swap arr[i] and arr[j]
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

function startQuiz(){
   loadQuestion(quesNo);  
      quizButton.disabled = "true";

}

function nextQuestion(){

  qHint.textContent = "Click - for - Hint";
  qHint.disabled = false;
  scoreBoard.style.backgroundColor = "transparent";

  if(quesNo === 13){
      NQbutton.textContent="Last Question";
  }

  if(quesNo === 14){
    NQbutton.textContent="ScoreCard"
  }
  
   for(let k=0;k<options.length;k++){
                if(options[k].classList.contains("correct"))
               options[k].classList.remove("correct");

                if(options[k].classList.contains("wrong"))
               options[k].classList.remove("wrong");

                if(options[k].classList.contains("nope"))
                  options[k].classList.remove("nope");

                if(options[k].classList.contains("yayy"))
                  options[k].classList.remove("yayy");
    }
 quesNo+=1;
 if(quesNo>14){
  finalScreen(quesNo,score);
 }
 loadQuestion(quesNo);
 console.log(score);
console.log("quesNo variable value is - " + quesNo);
 
}

    for(let i=0;i<options.length;i++){
            
            options[i].addEventListener("click", () => {    
                NQbutton.disabled = false;  
                qHint.disabled = true;          
          
                    if(quesNo === 14){
                      NQbutton.textContent = "ScoreCard!";
                    }
                    for( let k =0;k<options.length;k++){
                       if(options[k].textContent === gameQuestions[quesNo].answer){
                          answerIndex = k;
                          console.log(answerIndex);
                       }
                      //  option[k].disabled = true;
                    }
                   if(options[i].textContent === gameQuestions[quesNo].answer){
                      options[i].classList.add("correct");
                      options[i].classList.add("yayy");
                      scoreBoard.style.backgroundColor = "rgba(0, 128, 0, 0.8)";
                      setTimeout(()=>{
                        scoreBoard.style.backgroundColor = "rgba(0, 128, 0, 0.8)";
                        scoreBoard.style.backgroundColor = "transparent";
                      },1000);
                      
                      score++;
                   }else{
                    options[i].classList.add("wrong");
                    options[i].classList.add("nope");
                    options[answerIndex].classList.add("correct");
                    scoreBoard.style.backgroundColor = "rgba(255, 0, 0, 0.8)";
                    setTimeout(()=>{
                       scoreBoard.style.backgroundColor = "transparent";
                    },1000)
                    
                    score = score;
                   }
                 if(options[i].classList.contains("correct")){
                  let lockedAnswer = options[i].textContent;   
                  

                }
            });

         
          }

function loadQuestion(questionNumber){
  let randOptions = getRandomArray();
  // console.log(randOptions)
 let qString = `Question ${questionNumber+1} - `;
    question.textContent = qString + gameQuestions[questionNumber].text;
    for(let i=0;i<options.length;i++){
      options[i].textContent = gameQuestions[questionNumber].options[randOptions[i]];
    } 

  qHint.onclick = ()=>{
    if (qHint.textContent === "Click - for - Hint") {
    qHint.classList.remove("qhintbg");
    qHint.style.fontSize = "1.2rem";
    qHint.textContent = gameQuestions[questionNumber].hint;
  } else {
    qHint.textContent = "Click - for - Hint";
    qHint.classList.add("qhintbg");
    qHint.style.fontSize = "1.2rem";
  }
  }
  
  qHint.classList.add("qhintbg"); 
  QN.textContent = questionNumber; 
  gameScore.textContent = score;

NQbutton.disabled = true;

}

function finalScreen(q,s){
  mainContainer.remove();
  // mainContainer.style.backgroundImage ="linear-gradient(to right, red,blue,green,yellow,orange)";
  let finalScreen = document.createElement("div");

  finalScreen.classList.add("final");
  document.body.appendChild(finalScreen);
  let finalScore = document.createElement("div");
  finalScore.classList.add("final-score");
  finalScreen.appendChild(finalScore);
  let finalTextTop = document.createElement("h1");
  let finalTextMiddle = document.createElement("p");
  let finalTextBottom = document.createElement("h1")

  finalTextMiddle.classList.add("final-score-text");
  finalScore.appendChild(finalTextTop);
  finalScore.appendChild(finalTextMiddle);
  finalScore.appendChild(finalTextBottom);

  finalTextTop.textContent = `${s} Correct`;
  finalTextBottom.textContent = `${q} Questions`;
  finalTextMiddle.textContent = "FINAL SCORE"
  finalScreen.style.fontSize = "5rem";
  // mainContainer.textContent = `You got ${s} correct of ${q} questions`;

  finalScore.onclick = ()=>{
    // window.onload();
    finalScreen.remove();
    document.body.appendChild(mainContainer);
    window.onload();
    startQuiz();
  }
}