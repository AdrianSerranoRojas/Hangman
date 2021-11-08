//crono + displays
window.onload = init;

var mainChoose = document.getElementById("user-name-container")
var mainGame = document.getElementById("game-container")

function init(){
    document.querySelector("#start-button").addEventListener("click",crono);
    document.querySelector("#pause-button").addEventListener("click",stop);
    document.querySelector("#reset-button").addEventListener("click",reset);
    h = 0;
    m = 0;
    s = 0;
    document.getElementById("hms").innerHTML="00:00:00";
}
function crono(){
    writeSecs();
    id = setInterval(writeSecs,1000);
    mainChoose.classList.add("notShow") //choose a user name page display none
    mainGame.classList.remove("notShow") //game display block
    document.querySelector("#start-button").removeEventListener("click",crono);
}
function writeSecs(){
    var hAux, mAux, sAux;
    s++;
    if (s>59){m++;s=0;}
    if (m>59){h++;m=0;}
    if (h>24){h=0;}

    if (s<10){sAux="0"+s;}else{sAux=s;}
    if (m<10){mAux="0"+m;}else{mAux=m;}
    if (h<10){hAux="0"+h;}else{hAux=h;}

    document.getElementById("hms").innerHTML = hAux + ":" + mAux + ":" + sAux;
}
function stop(){
    clearInterval(id);
    document.querySelector("#start-button").addEventListener("click",crono);

}
function reset(){
    clearInterval(id);
    document.getElementById("hms").innerHTML="00:00:00";
    h=0;m=0;s=0;
    document.querySelector("#start-button").addEventListener("click",crono);
}


//random words

    //Easy
var wordsEasy = ['Rock',
    'King',
    'Good'];
var randomEasy = wordsEasy[Math.floor(Math.random()*wordsEasy.length)];

    //Medium
var wordsMedium = [
    'Space',
    'Mouse',
    'Pasta'];
var randomMedium = wordsMedium[Math.floor(Math.random()*wordsMedium.length)];

    //Hard
var wordsHard = [
    'Nightmare',
    'Keyboard',
    'Potatoe'];
var randomHard = wordsHard[Math.floor(Math.random()*wordsHard.length)];

//Choose Difficulty
var easyButton = document.getElementById("easy")
var mediumButton = document.getElementById("medium")
var hardButton = document.getElementById("hard")

easyButton.addEventListener("click", gameEasy)
mediumButton.addEventListener("click", gameMedium)
hardButton.addEventListener("click", gameHard)

var wordGame = document.getElementById("word-guess")
function gameEasy() {
    wordGame = wordGame.textContent = (randomEasy)
}
function gameMedium() {
    wordGame = wordGame.textContent = (randomMedium)
}
function gameHard() {
    wordGame = wordGame.textContent = (randomHard)
}

//string into letters



// Add event buttons



//Objects
var userHistoric = [];
//const HISTORIC_KEY = "myhistorickey";


const userName=document.querySelector("#user-name-input");
let userNameV;
let newUser;
const newUserI=document.querySelector("#pause-button").addEventListener("click",assignName);

function assignName(){
    userNameV=userName.value;
    userCrono=document.getElementById("hms").innerHTML;
    createUser(userNameV,userCrono);
    userHistoric.push(newUser);
}
function createUser(name = "default", score = "defaultScore") {
    console.log(userHistoric)
        newUser = {
        name: name,
        score: score
    };
}
//const newUser = createUser();





//userHistoric.push(newUser);

