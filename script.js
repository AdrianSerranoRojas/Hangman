//crono + displays
window.onload = init;


var mainChoose = document.getElementById("user-name-container")
var mainGame = document.getElementById("game-container")
var errors = document.getElementById("error")

function init(){
    document.querySelector("#start-button").addEventListener("click",crono);
    document.querySelector("#pause-button").addEventListener("click",stop);
    document.querySelector("#reset-button").addEventListener("click",reset);
    h = 0;
    m = 0;
    s = 0;
    document.getElementById("hms").innerHTML="00:00:00";

    if (localStorage.getItem(HISTORIC_KEY) !== null) {
        userHistoric = JSON.parse(localStorage.getItem(HISTORIC_KEY));
        console.log("YES");
        console.log(userHistoric)
        printScore();
        }
        else{
            console.log("NO!")
        }
}
//
function crono(){
    if (!userName.value == null || !userName.value.length==0 ){
        if (easyButton.checked || mediumButton.checked || hardButton.checked) {
            mainChoose.classList.add("notShow") //choose a user name page display none
            mainGame.classList.remove("notShow") //game display block
            document.querySelector("#start-button").removeEventListener("click",crono);
            writeSecs();
            id = setInterval(writeSecs,1000);
        }
        else {
            errors.textContent = "Select a difficulty"
        }
    }
    else {
        errors.textContent = "Write a name"
    }
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
//Objects

const HISTORIC_KEY = "historic";
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
    localStorage.setItem(HISTORIC_KEY, JSON.stringify(userHistoric));
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






//restart
let restartButton=document.getElementById("again-button")
restartButton.addEventListener("click",restartFun)
let buttons1=document.querySelectorAll(".buttons")

function restartFun(){
    reset();
    loseContainer.classList.add("notShow")
    winContainer.classList.add("notShow")
    mainChoose.classList.remove("notShow")
    wordSplit1.classList.add("invisible");
    wordSplit2.classList.add("invisible");
    wordSplit3.classList.add("invisible");
    wordSplit4.classList.add("invisible");
    wordSplit5.classList.add("invisible");
    wordSplit6.classList.add("invisible");
    wordSplit7.classList.add("invisible");
    wordSplit8.classList.add("invisible");
    wordSplit9.classList.add("invisible");
    wordSplit10.classList.add("invisible");
    easyButton.checked=false;
    mediumButton.checked=false;
    hardButton.checked=false;
    buttons1.forEach(btn=>{
        btn.classList.remove("invisible")
    })
    counterWin=0;
    contadorI=0;
    userName.value="";
    errors.textContent ="";
    hangmanPicturesSrc=hangmanPicturesArray[contadorI]
    hangmanPictures.src=hangmanPicturesSrc;
}


// const HISTORIC_KEY = "historic";

// let usersList = document.getElementById("historicList");
// let btnAdd = document.getElementById("btnAdd");

// let historicList = [];

// window.onload = (e) => {
//   initDOMRefs();
//   historicList = [];

//   if (localStorage.getItem(HISTORIC_KEY) !== null) {
//     historicList = JSON.parse(localStorage.getItem(HISTORIC_KEY));
//     updateList(historicList);
//   }
// };

// function initDOMRefs() {
//   usersList = document.getElementById("historicList");
//   btnAdd = document.getElementById("btnAdd");
//   btnAdd.addEventListener("click", (e) => {
//     addNewUser();
//   });
// }

// function createListElement({ username, score }) {
//   const newListItem = document.createElement("li");
//   newListItem.innerText = "Username: " + username + "\nScore: " + score;
//   usersList.appendChild(newListItem);
// }

// function updateList(items) {
//   usersList.innerHTML = null;
//   items.forEach((i) => {
//     createListElement({ username: i.username, score: i.score });
//   });
// }

// function addNewUser() {
//   const newUser = { username: "John", score: 100 };
//   historicList.push(newUser);
//   updateList(historicList);
//   localStorage.setItem(HISTORIC_KEY, JSON.stringify(historicList));
// }


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
var wordSplit6 = document.getElementById("word-guess-6")
var wordSplit7 = document.getElementById("word-guess-7")
var wordSplit8 = document.getElementById("word-guess-8")
var wordSplit9 = document.getElementById("word-guess-9")
var wordSplit10 = document.getElementById("word-guess-10")




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
    wordSplit6.textContent = wordSplit[5]
    wordSplit7.textContent = wordSplit[6]
    wordSplit8.textContent = wordSplit[7]
    wordSplit9.textContent = wordSplit[8]
    wordSplit10.textContent = wordSplit[9]
}
function gameMedium() {
    wordGame.textContent = (randomMedium)
    wordGame1=wordGame.textContent
    wordSplit = wordGame1.split("");
    wordSplit1.textContent = wordSplit[0]
    wordSplit2.textContent = wordSplit[1]
    wordSplit3.textContent = wordSplit[2]
    wordSplit4.textContent = wordSplit[3]
    wordSplit5.textContent = wordSplit[4]
    wordSplit6.textContent = wordSplit[5]
    wordSplit7.textContent = wordSplit[6]
    wordSplit8.textContent = wordSplit[7]
    wordSplit9.textContent = wordSplit[8]
    wordSplit10.textContent = wordSplit[9]
}
function gameHard() {
    wordGame.textContent = (randomHard)
    wordGame1=wordGame.textContent;
    wordSplit = wordGame1.split("");
    wordSplit1.textContent = wordSplit[0]
    wordSplit2.textContent = wordSplit[1]
    wordSplit3.textContent = wordSplit[2]
    wordSplit4.textContent = wordSplit[3]
    wordSplit5.textContent = wordSplit[4]
    wordSplit6.textContent = wordSplit[5]
    wordSplit7.textContent = wordSplit[6]
    wordSplit8.textContent = wordSplit[7]
    wordSplit9.textContent = wordSplit[8]
    wordSplit10.textContent = wordSplit[9]
}

//counter to win or loose
let counterWin = 0;
const winContainer = document.getElementById("youWinContainer")
const loseContainer = document.getElementById("youLoseContainer")
function WinOrLooseFun(){
    if(counterWin>=wordSplit.length){
        mainGame.classList.add("notShow")
        winContainer.classList.remove("notShow")
        assignName();
        stop();
    }
    if(contadorI>=6){
        mainGame.classList.add("notShow")
        loseContainer.classList.remove("notShow")
    }
    return;
}


//Buttons

let buttons = document.querySelectorAll("#all-buttons");

buttons.forEach(btn => {
    btn.addEventListener("click",(e)=> {
        if (e.target.matches(".buttons")){
            buttonValue=e.target.innerText;
            console.log(wordSplit)
            if(wordSplit.includes(buttonValue)||wordSplit.includes(buttonValue.toLowerCase())){
                //hangmanPictures.src=hangmanPicturesSrc;
                e.target.classList.add("invisible");
                console.log("yes")
                for (i in wordSplit){
                    if(wordSplit[i]==buttonValue||wordSplit[i]==buttonValue.toLowerCase()){
                        //e.target.classList.add("invisible");
                        switch (i) {
                            case "0":
                                wordSplit1.classList.remove("invisible");
                                counterWin++;
                                break;
                            case "1":
                                wordSplit2.classList.remove("invisible");
                                counterWin++;
                                break;
                            case "2":
                                wordSplit3.classList.remove("invisible");
                                counterWin++;
                                break;
                            case "3":
                                wordSplit4.classList.remove("invisible");
                                counterWin++;
                                break;
                            case "4":
                                wordSplit5.classList.remove("invisible");
                                counterWin++;
                                break;
                            case "5":
                                wordSplit2.classList.remove("invisible");
                                counterWin++;
                                break
                            case "6":
                                wordSplit2.classList.remove("invisible");
                                counterWin++;
                                break
                            case "7":
                                wordSplit2.classList.remove("invisible");
                                counterWin++;
                                break
                            case "8":
                                wordSplit2.classList.remove("invisible");
                                counterWin++;
                                break
                            case "9":
                                wordSplit2.classList.remove("invisible");
                                counterWin++;
                                break
                            case "10":
                                wordSplit2.classList.remove("invisible");
                                counterWin++;
                                break
                            default:
                                break;
                        }
                       // return; lo quito por si se repite la letra
                    }
                }
            }else{
                e.target.classList.add("invisible");
                hangmanPicturesArraySum()
                hangmanPictures.src=hangmanPicturesSrc;
            }
        }
        WinOrLooseFun()
    })
});
//array de imagenes
let contadorI=0;
const hangmanPictures=document.querySelector("#hangman-pictures")
let hangmanPicturesArray=["assets/hangman - 1.png","assets/hangman - 2.png","assets/hangman - 3.png","assets/hangman - 4.png","assets/hangman - 5.png","assets/hangman - 6.png","assets/hangman - 7.png"]
let hangmanPicturesSrc=hangmanPicturesArray[contadorI]
hangmanPictures.src=hangmanPicturesSrc;
function hangmanPicturesArraySum(){
    console.log("no")
    contadorI++;
    hangmanPicturesSrc=hangmanPicturesArray[contadorI];
}
