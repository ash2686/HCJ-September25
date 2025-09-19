let bg = document.getElementsByClassName("main-container")[0];

function party(){
    let colors = ['red','blue','green','orange','yellow','purple','cyan','brown','bisque'];

   let number = Math.floor(Math.random()*colors.length);
   console.log(number);

    bg.style.backgroundColor = colors[number];
  
}

function cta(){
setInterval(party,100);
}