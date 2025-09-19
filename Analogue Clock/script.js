let secs = document.getElementsByClassName("seconds")[0];
let date,hours,seconds,minutes;



function aClock(){
     date = new Date();
     hours = date.getHours();
     minutes = date.getMinutes();
     seconds = date.getSeconds();
    console.log(`${hours} : ${minutes} : ${seconds} `);

     let angle = seconds * 6;

    secs.style.transform = `rotate(${angle}deg) translateY(-15rem)`;
    // secs.style.transformOrigin = "bottom";
}

    setInterval(aClock,1000);


aClock();