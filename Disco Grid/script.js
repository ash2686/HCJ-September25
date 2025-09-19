const colors = [
  "red",
  "green",
  "blue",
  "yellow",
  "orange",
  "purple",
  "pink",
  "brown",
  "black",
  "white",
  "gray",
  "cyan",
  "magenta",
  "lime",
  "teal",
  "navy",
  "maroon",
  "olive",
  "gold",
  "silver"
];

// let colors = ["grey","red"];

let gridColors = document.getElementsByClassName("grid-column");

let randomNumber = ()=>{
  let num = Math.ceil(Math.random()*(colors.length));
  return num;
};
console.log(randomNumber());

function colorGenerator(){
    for(let i=0;i<gridColors.length;i++){
        gridColors[i].style.backgroundColor = colors[randomNumber()-1];
    }
}
setInterval(colorGenerator,100);