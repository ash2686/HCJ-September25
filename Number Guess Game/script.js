let iNumber = document.getElementById("number");
let hint = document.getElementsByClassName("hint-text")[0];
let tryButton = document.getElementById("try-button");
let displayArea = document.getElementsByClassName("display-area")[0];
let startButton = document.getElementById("try");
let revealButton = document.getElementById("reveal");
let gStatus = document.getElementById("status");
let gHint = document.getElementById("game-hint");
let lGuess = document.getElementById("lguess");
let gCount = document.getElementById("count");
let randomNumber,gNumber,counter=0,tries=0;
let gNumbers = [];

window.onload = function(){
        iNumber.focus();
        revealButton.disabled = true;
        iNumber.disabled = true;
}

function newGame(){
    window.location.reload();
    startGame();
}


function startGame(){
    randomNumber = Math.ceil(Math.random()*100);
    console.log(randomNumber);
    revealButton.disabled = false;
    iNumber.disabled = false;
    iNumber.focus();
    gStatus.innerHTML = "NUMBER (1-100) loaded, Guess away!";
    gStatus.style.backgroundColor="rgb(122, 243, 122)";
    gHint.innerHTML = "Hint : Guess the NUMBER!"

    // hint.style.fontSize = "2rem";
    // tryButton.innerText = "Try!";
    revealButton.style.backgroundColor = "cyan";
    
    // displayArea.style.backgroundColor = "rgb(122, 243, 122)";
}

function revealGame(){
    revealButton.style.fontSize = "2rem";
    revealButton.innerHTML  = randomNumber;
    iNumber.focus();
}

iNumber.addEventListener("change",(e)=>{
    // console.log(typeof e.target.value);
    gNumber = Number(e.target.value);
    // console.log(typeof gNumber);
    // console.log(gNumber);
})

iNumber.addEventListener("keydown",(e)=>{

    if(e.key === "Enter"){
        // e.preventDefault();
         gNumber = Number(iNumber.value);
        tryGame();
    }
})

function tryGame(){
    // console.log(`Random number is ${randomNumber}`);
    // console.log(`Guessed number is ${gNumber}`);
        // console.log(typeof gNumber);
        gNumbers[counter] = gNumber;
        if(gNumber < randomNumber){
                gHint.innerHTML = "Hint : Original number is GREATER ( > ) then this GUESS";
                gHint.style.backgroundColor = "violet";
                iNumber.value = "";
                iNumber.focus();
        } 

        else if(gNumber > randomNumber){
                gHint.innerHTML = "Hint : Original number is SMALLER ( < ) then this GUESS";
                gHint.style.backgroundColor = "orange";
                iNumber.value = "";
                iNumber.focus();
        }

        lGuess.innerHTML +=  ` ${gNumbers[counter]} |`; 
                gCount.innerHTML = `Number of tries : ${counter+1}`;
                counter ++;

        if(gNumber === randomNumber){
            iNumber.value = `${gNumber}, You Got it!`;
            gHint.innerHTML = "Bingo!"
            gHint.style.backgroundColor = "rgba(181, 223, 242, 1)";
            iNumber.style.backgroundColor = "rgba(181, 223, 242, 1)";
            gStatus.innerHTML = "New Game!?";
            // startButton.addEventListener("click",()=>{
            //     newGame();
            // })
        }

}

console.log(gNumbers);