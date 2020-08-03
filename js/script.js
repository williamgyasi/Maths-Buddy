const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('login-container');

signUpButton.addEventListener('click', () => {
    console.log("Adad")
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

var playing =false;
var player_scores=0;
var action;
var correctAnswer;
var answerposition

//DOM STRINGS
const DOMSTRINGS={
    startbutton:"startreset",
    scorestring:"scorevalue",
    countdown:"timeremaining",
    countdownvalue:"timeremainingvalue",
    questionplaceholder:"question",
    answerplaceholder:"box",
    correct:"correct",
    wrong:"wrong",
    showhint:"showhint"
    
};

//VARIABLES
const DOMVALUES={
    score:document.getElementById(DOMSTRINGS.scorestring).textContent,
    countdownvalue:document.getElementById(DOMSTRINGS.countdownvalue).innerHTML
}


document.getElementById(DOMSTRINGS.startbutton).onclick = function () {
    if(playing==true){
        location.reload();
    }
    else{
        playing=true
        player_scores=0;
        document.getElementById(DOMSTRINGS.scorestring).innerHTML=player_scores;
        //Start countdown
        document.getElementById(DOMSTRINGS.countdown).style.display="block";
        //Change to reset


        document.getElementById(DOMSTRINGS.startbutton).innerHTML="Reset";

        startCountDown()

        generateQA()
    }
}

for(let i =1; i<5;i++){
    document.getElementById(`box${i}`).onclick=function(event){
        if(playing==true){
            const boxvalue=this.innerHTML
            if(Number(boxvalue)===correctAnswer){
                //Correct Answer
                player_scores++
                update(DOMSTRINGS.scorestring,player_scores)
                hide(DOMSTRINGS.wrong)
                show(DOMSTRINGS.correct)
                const hideCorrect =setTimeout(function(){
                    hide(DOMSTRINGS.correct)
                    
                },1000)
                generateQA()
                
    
            }
            else{
                show(DOMSTRINGS.wrong)
                hide(DOMSTRINGS.correct)
                const hideWrong =setTimeout(function(){
                    hide(DOMSTRINGS.wrong)
                },1000)
    
            }
        }
        
    
    }
}

//SHOW HINT
document.getElementById(DOMSTRINGS.showhint).onclick(function(event){
    if(playing==true){
        document.getElementById(`box${answerposition}`).style.backgroundColor="green"
        player_scores--
        update(DOMSTRINGS.scorestring,player_scores)
        generateQA()
    }
   
    
})



//FUNCTIONS
function startCountDown(){
    let countdown=Number(DOMVALUES.countdownvalue);
    action=setInterval(function(){
        countdown -=1;
        document.getElementById(DOMSTRINGS.countdownvalue).innerHTML=countdown;
        if(countdown==0){
            clearInterval(action);
            alert('Your Game is over')
            hide(DOMSTRINGS.countdown);
            playing=false;
            //Change to reset
        document.getElementById(DOMSTRINGS.startbutton).innerHTML="Start";
        }
       
    },1000)
}

function generateQA(){
    reset()
    //Multiplication
    var x=1+ Math.round(Math.random()*9);
    var y=1+ Math.round(Math.random()*9);
    correctAnswer = x*y;
    document.getElementById(DOMSTRINGS.questionplaceholder).innerHTML=x+"x"+y;
    answerposition=1+ Math.round(Math.random()*3);
    document.getElementById(`box${answerposition}`).innerHTML=correctAnswer;

    //FILL OTHER BOXES
    var answers=[correctAnswer];
    for(let i=1;i<5;i++){
        if(i !==answerposition){
            var wronganswer; 
            do{
                wronganswer=(1+Math.round(Math.random()*9)) * (1+Math.round(Math.random()*9));
            }while(answers.indexOf(wronganswer)>-1)

            document.getElementById(`box${i}`).innerHTML=wronganswer;
            answers.push(wronganswer)
           
        }
    }

    //Check Co


    





}


function hide(ID){
    document.getElementById(ID).style.display="none";
}
function show(ID){
    document.getElementById(ID).style.display="block"
}

function update(ID,value){
    document.getElementById(ID).innerHTML=value
}
function reset(){
    for(let i =1;i<5;i++){
        document.querySelector(`#box${i}`).style.backgroundColor="rgb(4, 45, 156);"
    }
}

// class Question{
//     constructor(x,y,correctanswer,operation){
//         this.x=x;
//         this.y=y;
//         this.correctanswer=correctanswer
//         this.operation=operation

//     }
            
// }




/***********************************************************************************/
/****************************BUTTON ANIMATION***************************************/

