let clockFace = document.getElementById("clock-face");
let loggedTime = document.getElementById("logged-time");
let backGround = document.getElementsByClassName("main-container")[0];
let startTime = null;
let timer = null;
let hours = 0,mins = 0,secs =0;
let elapsedTime=0,timeLog=0;


clockFace.innerHTML = "00:00:00";

function formatClock(x){
    if(x<10){
        x = "0" + x;
        return x;
    }
    else{
        return x;
    }
}

function startClock(){
    secs +=1;

    if(secs>59){
        secs = 0;
        mins +=1;
    }

    if(mins>59){
        hours +=1;
    }

    clockFace.innerHTML = `${formatClock(hours)}:${formatClock(mins)}:${formatClock(secs)}`;
}

function funcStart(){
        clearInterval(timer);
 backGround.style.backgroundColor = "rgba(0, 128, 0,.3)";
 timer = setInterval(startClock,1000)
}

function funcStop(){
    backGround.style.backgroundColor = "rgba(255, 0, 0,.3)";
    clearInterval(timer);
}

function funcReset(){
    backGround.style.backgroundColor = "transparent";
    clearInterval(timer);
    clockFace.innerHTML = "00:00:00";
    loggedTime.innerHTML = "Logged time - | ";
    secs= 0;
    mins= 0;
    hours= 0;
}

function funcLog(){
    backGround.style.backgroundColor = "rgba(0, 0, 255,.3)";
    setTimeout(()=>{backGround.style.backgroundColor = "rgba(0, 128, 0,.3)";},100)
    elapsedSecs = (secs + mins*60 + hours*60);
    timeLog = elapsedSecs - timeLog;
    loggedTime.innerHTML += ` ${timeLog} secs | `;
    timeLog = elapsedSecs;

    console.log("time logged is - ",timeLog);
    console.log("elapsed time is - ",elapsedSecs);
}

