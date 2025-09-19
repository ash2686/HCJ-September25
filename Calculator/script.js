let result = document.getElementsByClassName("calc-result")[0];
let keys = document.getElementsByClassName("keys");
let num1,num2,operand, answer;


       for (let i=0;i<keys.length;i++){
        keys[i].addEventListener("click",()=>{
            // console.log(keys[i]);
           result.innerHTML += keys[i].innerHTML;
           if(keys[i].innerHTML==="c"){
            result.innerHTML="";           
           }

           if(keys[i].innerHTML==="+"||keys[i].innerHTML==="-"||keys[i].innerHTML==="x"||keys[i].innerHTML==="/"){
            // console.log(result.innerHTML);
              if(keys[i].innerHTML==="+"){
                operand = "+"
              } else if(keys[i].innerHTML==="-"){
                operand = "-";
             }else if(keys[i].innerHTML==="x"){
                operand = "*";
             }else{
                operand ='/';
             }
            
            num1 = Number(result.innerHTML.slice(0,-1));
            // console.log(`first operand is - ${num1}`);
            result.innerHTML = "";
         }

           if(keys[i].innerHTML === "=" ){
                    num2 = Number(result.innerHTML.slice(0,-1));
                    console.log(`first number is - ${num1}`)
                    console.log(`second number is - ${num2}`)

                    switch(operand){
                        case '+' : answer = num1 + num2; break;
                        case '-' : answer = num1 - num2; break;
                        case '*' : answer = num1 * num2; break;
                        case '/' : answer = num1 / num2; break;
                        default : answer = 'error'; break;
                    }

                result.innerHTML =  answer;  
                
                

           }
        })
    }



