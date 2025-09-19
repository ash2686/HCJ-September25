let iNumber = document.getElementById("g-number");
let pCurrent = document.getElementById("c-table");
let pPrev = document.getElementById("p-table");
let pNext = document.getElementById("n-table");
let currentDisplay = document.getElementsByClassName("current-display")[0];
let prevDisplay = document.getElementsByClassName("prev-display")[0];
let nextDisplay = document.getElementsByClassName("next-display")[0];
let generateButton = document.getElementsByClassName("generate-table")[0];
let mNumber,clearTime;
let timers = [];  // store all timeouts

function addTimer(id) {
  timers.push(id);
}

function stopTimers() {
  timers.forEach(clearTimeout);
  timers = [];
}

window.onload = function (){
    console.log("Windows loaded!");
    iNumber.focus();
    
    // generateButton.disabled = true;
    
}

iNumber.addEventListener("change", (e)=>{
    console.log(e.target.value);
    mNumber = e.target.value;
    // generateButton.disabled = false;
    displayTable();
})


function displayTable(){
        pCurrent.innerHTML = `${mNumber}'s multiplication table is `;
        currentDisplay.innerHTML = " ";
        for (let i=1;i<=10;i++){

          clearTime = setTimeout(()=>{displayLineC(i)},300*i);
          addTimer(clearTime);
            // let mLine = document.createElement('p');
            // mLine.innerHTML = `${mNumber} multiplied by ${i} equals to - ${mNumber*i}`;
            // currentDisplay.appendChild(mLine);
            // mLine.style.borderBottom = "1px solid black";
        }

}

function previousTable(){
        let prevNum = mNumber -1;
        pPrev.innerHTML = `${prevNum}'s multiplication table is `;
        prevDisplay.innerHTML = " ";

        for(let j = 1;j<=10;j++){
            clearTime = setTimeout(()=>{displayLineP(j,prevNum)},300*j);
            addTimer(clearTime);

            // let mLine = document.createElement("p");
            // mLine.innerHTML = `${prevNum} multiplied by ${j} equals to - ${prevNum*j}`;
            // prevDisplay.appendChild(mLine);
            // mLine.style.borderBottom = "1px solid black";
        }

}

function nextTable(){
    mNumber = Number(mNumber);
    let nextNum = mNumber + 1;
    pNext.innerHTML = `${nextNum}'s multiplication table is `;
    nextDisplay.innerHTML = " ";

    for(let k = 1;k<=10;k++){
               clearTime =  setTimeout(()=>{displayLineN(k,nextNum)},300*k);
               addTimer(clearTime);
        // let mLine = document.createElement("p");
        // mLine.innerHTML = `${nextNum} multiplied by ${k} equals to - ${nextNum*k}`;
        // nextDisplay.appendChild(mLine);       
        //             mLine.style.borderBottom = "1px solid black"; 
    }
}


function displayLineC(x){
         let mLine = document.createElement('p');
            // mLine.innerHTML = `${mNumber} multiplied by ${x} equals to : ${mNumber*x}`;
            mLine.innerHTML = `${mNumber} x ${x} = ${mNumber*x}`;
            
            currentDisplay.appendChild(mLine);
            mLine.style.borderBottom = "1px solid black";

            if(x==10){
                previousTable();
            }
}

function displayLineP(x,y){

       let mLine = document.createElement("p");
            mLine.innerHTML = `${y} multiplied by ${x} equals to : ${y*x}`;
            prevDisplay.appendChild(mLine);
            mLine.style.borderBottom = "1px solid black";

            if(x==10){
                nextTable();
            }

}

function displayLineN(x,y){

        let mLine = document.createElement("p");
        // mLine.innerHTML = `${y} multiplied by ${x} equals to : ${y*x}`;
        mLine.innerHTML = `${y} into ${x} is ${y*x}`;
        nextDisplay.appendChild(mLine);       
                    mLine.style.borderBottom = "1px solid black"; 

}


function generateTable(){
    displayTable();
}

function clearGame(){
    currentDisplay.innerHTML = "";
    prevDisplay.innerHTML = "";
    nextDisplay.innerHTML = "";
    pCurrent.innerHTML = "Previous number";
    pPrev.innerHTML = "Enter a number";
    pNext.innerHTML = "Next number";
    iNumber.value = "";
    iNumber.focus();

stopTimers();
    // alert("I am here!")
}