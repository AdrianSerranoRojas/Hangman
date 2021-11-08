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
var wordSplit1 = document.getElementById("word-guess-1")
var wordSplit2 = document.getElementById("word-guess-2")
var wordSplit3 = document.getElementById("word-guess-3")
var wordSplit4 = document.getElementById("word-guess-4")
var wordSplit5 = document.getElementById("word-guess-5")

var wordGame1="";
let wordSplit;
function gameEasy() {
    wordGame.textContent = (randomEasy)
    wordGame1 = wordGame.textContent
    wordSplit = wordGame1.split("");
    wordSplit1.textContent = wordSplit[0]
    wordSplit2.textContent = wordSplit[1]
    wordSplit3.textContent = wordSplit[2]
    wordSplit4.textContent = wordSplit[3]
    wordSplit5.textContent = wordSplit[4]
}
function gameMedium() {
    wordGame.textContent = (randomMedium)
    wordGame1=wordGame.textContent
    wordSplit = wordGame1.split("");
}
function gameHard() {
    wordGame.textContent = (randomHard)
    wordGame1=wordGame.textContent;
    wordSplit = wordGame1.split("");
}

//Buttons

buttons = document.querySelectorAll("#all-buttons");

buttons.forEach(btn => {
    btn.addEventListener("click",(e)=> {
        buttonValue=e.target.innerText;
        console.log(buttonValue)
        console.log(wordGame1)
        console.log(wordSplit)
        for (i in wordSplit){
            if(wordSplit[i]==buttonValue||wordSplit[i]==buttonValue.toLowerCase()){
                console.log("YES")
                e.target.classList.add("invisible");
                switch (i) {
                    case "0":
                        wordSplit1.classList.remove("invisible");
                        console.log(i);
                        break;
                    case "1":
                        wordSplit2.classList.remove("invisible");
                        console.log(i);
                        break;
                    case "2":
                        wordSplit3.classList.remove("invisible");
                        console.log(i);
                        break;
                    case "3":
                        wordSplit4.classList.remove("invisible");
                        console.log(i);
                        break;
                    case "4":
                        wordSplit5.classList.remove("invisible");
                        console.log(i);
                        break;
                    default:
                        break;
                }
               // return; lo quito por si se repite la letra
            }else{
                console.log("NOOO")
            }
        }
    })
});
//array de imagenes
const hangmanPictures=document.querySelector("#hangman-pictures")
let hangmanPicturesArray=["assets/hangman - 1.png","assets/hangman - 2.png"]
hangmanPictures.src="assets/hangman - 1.png"



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