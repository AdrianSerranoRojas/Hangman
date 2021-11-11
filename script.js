//Start + displays
window.onload = init;


var mainChoose = document.getElementById("user-name-container")
var mainGame = document.getElementById("game-container")
var errors = document.getElementById("error")
var buttons40 = document.getElementById("all-buttons")

function init(){
    document.querySelector("#start-button").addEventListener("click",Start);
    // document.querySelector("#pause-button").addEventListener("click",stop);
    // document.querySelector("#reset-button").addEventListener("click",reset);
    h = 0;
    m = 0;
    s = 0;
    //document.getElementById("hms").innerHTML="00:00:00";
    loadLocalStorage();
}

function loadLocalStorage(){
    if (localStorage.getItem(HISTORIC_KEY) !== null) {
        userHistoric = JSON.parse(localStorage.getItem(HISTORIC_KEY));
        console.log("YES");
        console.log(userHistoric);
        updateList(userHistoric);
    }
    else{
        console.log("NO!")
    }
}

function Start(){
    if (validationStart()==true){
            mainChoose.classList.add("notShow") //choose a user name page display none
            mainGame.classList.remove("notShow") //game display block
            document.querySelector("#start-button").removeEventListener("click",Start);
            writeSecs();
            id = setInterval(writeSecs,1000);
            showDisplayScores();
            createButtons()
        }
}
function validationStart(){
    if (!userName.value == null || !userName.value.length==0 ){
        if (easyButton.checked || mediumButton.checked || hardButton.checked) {
            return true;
        }else {
            errors.textContent = "Select a difficulty"
        }
    }else {
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
    document.querySelector("#start-button").addEventListener("click",Start);

}
function reset(){
    clearInterval(id);
    h=0;m=0;s=0;
    document.querySelector("#start-button").addEventListener("click",Start);
}
function clearDisplayScores(){
    clearInterval(id);
    document.querySelector("#currently-playing-name").innerText=" ";
    document.getElementById("hms").innerHTML=" ";
}
function showDisplayScores(){
    document.querySelector("#currently-playing-name").innerText=userName.value;
    document.getElementById("hms").innerHTML="00:00:00";
}
//Objects

const HISTORIC_KEY = "historic";
var userHistoric = [];

const userName=document.querySelector("#user-name-input");
let userNameV;
let newUser;
let userStart;

function assignName(){
    userNameV=userName.value;
    userStart=document.getElementById("hms").innerHTML;
    createUser(userNameV,userStart);
    userHistoric.push(newUser);
    userScoreOr()
    updateList(userHistoric);
    saveLocalStorage()
}

function createUser(name = "default", score = "Currently playing...") {
    console.log(userHistoric)
        newUser = {
        name: name,
        score: score
    };
}

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

let userScoresList = document.querySelector("#users-scores-list")

function updateList(items) {
    userScoresList.innerHTML = null;
    items.forEach((i) => {
    createListElement({ name: i.name, score: i.score });
    });
}

function createListElement({ name, score }) {
    const newListItem = document.createElement("li");
    newListItem.innerHTML = "<div id='nameOfUser'>" + name + "</div>" + "<div id='nameOfScore'>" + score + "</div>";
    userScoresList.appendChild(newListItem);
}

function saveLocalStorage(){
    localStorage.setItem(HISTORIC_KEY, JSON.stringify(userHistoric));
}

let clearHistory = document.getElementById("clear-button")
clearHistory.addEventListener("click", historyClearing)

function historyClearing(){
    localStorage.clear()
    userScoresList.innerHTML = null;
}

let restartButtonWin = document.getElementById("again-button")
let restartButtonLose = document.getElementById("again-button-lose")
restartButtonWin.addEventListener("click",restartFun)
restartButtonLose.addEventListener("click",restartFun)
let buttons1=document.getElementsByClassName("buttons")

function restartFun(){
    reset();
    loseContainer.classList.add("notShow")
    winContainer.classList.add("notShow")
    mainChoose.classList.remove("notShow")
    easyButton.checked=false;
    mediumButton.checked=false;
    hardButton.checked=false;
    counterWin=0;
    contadorI=0;
    userName.value="";
    errors.textContent ="";
    hangmanPicturesSrc=hangmanPicturesArray[contadorI]
    hangmanPictures.src=hangmanPicturesSrc;
    wordSplit="";
}


//random words
var wordsEasy = [
    'Rock',
    'King',
    'Good'];


    //Medium
var wordsMedium = [
    'Space',
    'Mouse',
    'Pasta'];


    //Hard
var wordsHard = [
    'Nightmare',
    'Keyboard',
    'Potatoe'];


//Choose Difficulty
var easyButton = document.getElementById("easy")
var mediumButton = document.getElementById("medium")
var hardButton = document.getElementById("hard")

easyButton.addEventListener("click", gameEasy)
mediumButton.addEventListener("click", gameMedium)
hardButton.addEventListener("click", gameHard)

var wordGame = document.getElementById("word-guess")

var wordGame1="";
let wordSplit;
let wordSplitcontainer = document.querySelector("#word-split-container")
let wordSplitDiv = document.getElementsByClassName("underline")
let wordSplitI;
let wordSplitX;

function wordSplitFun(){
    wordSplit = wordGame1.split("");
for (i in wordSplit){
    wordSplitI = document.createElement("div")
    wordSplitI.classList.add("underline")
    wordSplitX = document.createElement("div")
    wordSplitX.classList.add("word-guess-c")
    wordSplitX.classList.add("invisible")
    wordSplitX.setAttribute("id","word-guess-"+i)
    wordSplitX.textContent=wordSplit[i]
    wordSplitI.appendChild(wordSplitX)
    wordSplitcontainer.appendChild(wordSplitI)
    }
}

function deleteWordSplitFun(){
    while (wordSplitDiv.length>=1) {
    wordSplitcontainer.removeChild(wordSplitcontainer.lastChild)
    }
}

function gameEasy() {
    deleteWordSplitFun()
    var randomEasy = wordsEasy[Math.floor(Math.random()*wordsEasy.length)];
    wordGame.textContent = (randomEasy)
    wordGame1 = wordGame.textContent
    wordSplitFun()
}
function gameMedium() {
    deleteWordSplitFun()
    var randomMedium = wordsMedium[Math.floor(Math.random()*wordsMedium.length)];
    wordGame.textContent = (randomMedium)
    wordGame1=wordGame.textContent
    wordSplitFun()
}
function gameHard() {
    deleteWordSplitFun()
    var randomHard = wordsHard[Math.floor(Math.random()*wordsHard.length)];
    wordGame.textContent = (randomHard)
    wordGame1=wordGame.textContent;
    wordSplitFun()
}
//counter to win or loose
let winMessage = document.getElementById("win-message")
let loseMessage = document.getElementById("lose-message")
let counterWin = 0;
const winContainer = document.getElementById("youWinContainer")
const loseContainer = document.getElementById("youLoseContainer")

function WinOrLooseFun(){
    if(counterWin>=wordSplit.length){
        mainGame.classList.add("notShow")
        winContainer.classList.remove("notShow")
        assignName();
        stop();
        removeButtons()
        deleteWordSplitFun()
        winMessage.innerHTML = userNameV + " you won in " + userStart
        clearDisplayScores()
    }
    if(contadorI>=6){
        mainGame.classList.add("notShow")
        loseContainer.classList.remove("notShow")
        removeButtons()
        deleteWordSplitFun()
        loseMessage.innerHTML = userNameV + " you lost in " + userStart
        clearDisplayScores()
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
                e.target.classList.add("invisible");
                console.log("yes")
                for (i in wordSplit){
                    if(wordSplit[i]==buttonValue||wordSplit[i]==buttonValue.toLowerCase()){
                            document.getElementById("word-guess-"+i).classList.remove("invisible");
                            counterWin++;
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
    contadorI++;
    hangmanPicturesSrc=hangmanPicturesArray[contadorI];
}


//CREATE BUTTONS
let btnbtn;

const fragment = document.createDocumentFragment()
const btnArray = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"]

function createButtons() {
    for (i in btnArray){
        let btnCreate = document.createElement("button");
        btnCreate.classList.add("buttons");
        btnCreate.setAttribute("id","button-"+btnArray[i]);
        btnCreate.textContent=btnArray[i];
        fragment.appendChild(btnCreate);
    }
buttons40.appendChild(fragment);
}
function removeButtons(){
    while(buttons1.length>=1){
    buttons40.removeChild(buttons40.lastChild)
    }
}


//NUMS PAD

        window.addEventListener("keydown", (e) => {
                if (
                e.key === "a" ||
                e.key === "b" ||
                e.key === "c" ||
                e.key === "d" ||
                e.key === "e" ||
                e.key === "f" ||
                e.key === "g" ||
                e.key === "h" ||
                e.key === "i" ||
                e.key === "j" ||
                e.key === "k" ||
                e.key === "l" ||
                e.key === "m" ||
                e.key === "n" ||
                e.key === "ñ" ||
                e.key === "o" ||
                e.key === "p" ||
                e.key === "q" ||
                e.key === "r" ||
                e.key === "s" ||
                e.key === "t" ||
                e.key === "u" ||
                e.key === "v" ||
                e.key === "w" ||
                e.key === "x" ||
                e.key === "y" ||
                e.key === "z"
                ) {
                clickButtonEl(e.key);
                }
        });

function clickButtonEl(key) {
    let buttons2= document.querySelectorAll(".buttons")
    buttons2.forEach((button) => {
            if (button.innerText == key.toUpperCase()) {
                button.click();
            }
    });
}