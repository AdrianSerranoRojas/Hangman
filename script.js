//crono
window.onload = init;

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

// Add event buttons

var allButtons = document.querySelectorAll("#all-buttons")
console.log(allButtons)
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
    printScore();
}
function createUser(name = "default", score = "Currently playing...") {
    console.log(userHistoric)
        newUser = {
        name: name,
        score: score
    };
}
//const newUser = createUser();

//RANKING

let ranking1=document.querySelector("#ranking-1");
let ranking2=document.querySelector("#ranking-2");
let ranking3=document.querySelector("#ranking-3");
let ranking4=document.querySelector("#ranking-4");

let ranking1Time=document.querySelector("#ranking-1-time");
let ranking2Time=document.querySelector("#ranking-2-time");
let ranking3Time=document.querySelector("#ranking-3-time");
let ranking4Time=document.querySelector("#ranking-4-time");


function printScore(){
    userScoreOr();
    ranking1.innerText=userHistoric[0].name;
    ranking1Time.innerText=userHistoric[0].score;
    ranking2.innerText=userHistoric[1].name;
    ranking2Time.innerText=userHistoric[1].score;
    ranking3.innerText=userHistoric[2].name;
    ranking3Time.innerText=userHistoric[2].score;
    ranking4.innerText=userHistoric[3].name;
    ranking4Time.innerText=userHistoric[3].score;
}


//userHistoric.push(newUser);

//if (firstName.value == null || firstName.value.length==0|| /^\s+$/.test(firstName.value) ||!(/^[a-zA-Z\s]{0,20}$/.test(firstName.value)))

// ordenar array

userHistoric= [
    {
        name:"Adri" ,
        score:"10:00:00"
    },
    {
        name:"Juan" ,
        score:"10:00:00"
    },
    {
        name:"Pepe" ,
        score:"10:00:00"
    },
    {
        name:"Pepe" ,
        score:"10:00:00"
    }
]

let  userHistoricOr;
function userScoreOr(){
    userHistoricOr = userHistoric.sort(function (a, b) {
        if (a.score > b.score) {
        return 1;
        }
        if (a.score < b.score) {
        return -1;
        }
        // a must be equal to b
        return 0;
    });
}
