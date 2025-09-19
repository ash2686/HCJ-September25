let displayArea = document.getElementsByClassName("display-area")[0];
let date,hours,minutes,seconds,clockInterval;

// displayArea.innerHTML = "00:00:00";


function mainClock(){
date = new Date();
     hours = date.getHours();
     minutes = date.getMinutes();
     seconds = date.getSeconds();
}

function formatClock(value){
        return value < 10 ? "0" + value : value;
}
// console.log(date);
// console.log(hours)
// console.log(minutes)
// console.log(seconds)


function clockStart(){
      clearInterval(clockInterval);
     mainClock();

     if(hours<10){
      hours =formatClock(hours);
     }

       if(minutes<10){
          minutes = formatClock(minutes);
     }

       if(seconds<10){
        seconds = formatClock(seconds);
     }
     displayArea.innerHTML = `${hours} : ${minutes} : ${seconds}`;
     
    clockInterval = setInterval(clockStart,1000);
}


function ampm(){
     clearInterval(clockInterval);
    mainClock();

  
     

     if(hours<=12){     
        if(hours<10){
      hours = formatClock(hours);
     }

       if(minutes<10){
         minutes =   formatClock(minutes);
     }

       if(seconds<10){
       seconds = formatClock(seconds);
     }  
         displayArea.innerHTML = `${hours} : ${minutes} : ${seconds} AM` ;
     }else if(hours>12){
      hours = hours - 12;
        if(hours<10){
      hours = formatClock(hours);
     }

       if(minutes<10){
         minutes =   formatClock(minutes);
     }

       if(seconds<10){
       seconds = formatClock(seconds);
     }
      displayArea.innerHTML = `${hours} : ${minutes} : ${seconds} PM` ;
     }


   clockInterval = setInterval(ampm,1000);


}

clockStart();