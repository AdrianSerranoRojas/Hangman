//Start + displays
window.onload = init;
//main
var mainChoose = document.getElementById("user-name-container")
var mainGame = document.getElementById("game-container")
//User name
const userName=document.querySelector("#user-name-input");
var errors = document.getElementById("error")
var easyButton = document.getElementById("easy")
var mediumButton = document.getElementById("medium")
var hardButton = document.getElementById("hard")
easyButton.addEventListener("click", gameEasy)
mediumButton.addEventListener("click", gameMedium)
hardButton.addEventListener("click", gameHard)
//Game
var wordsEasy = ['Rock','King','Good'];
var wordsMedium = ['Space','Mouse','Pasta'];
var wordsHard = ['Nightmare','Keyboard','Potatoe'];
const fragment = document.createDocumentFragment()
let contadorI=0;
const hangmanPictures=document.querySelector("#hangman-pictures")
let hangmanPicturesArray=[
    "assets/hangman - 1.png",
    "assets/hangman - 2.png",
    "assets/hangman - 3.png",
    "assets/hangman - 4.png",
    "assets/hangman - 5.png",
    "assets/hangman - 6.png",
    "assets/hangman - 7.png"
]
let hangmanPicturesSrc=hangmanPicturesArray[contadorI]
hangmanPictures.src=hangmanPicturesSrc;
var buttons40 = document.getElementById("all-buttons")
let buttons1=document.getElementsByClassName("buttons")
let buttons = document.querySelectorAll("#all-buttons");
var wordGame = document.getElementById("word-guess");
var wordGame1="";
let wordSplit;
let wordSplitcontainer = document.querySelector("#word-split-container")
let wordSplitDiv = document.getElementsByClassName("underline")
//You loose you win
let loseMessage = document.getElementById("lose-message")
let counterWin = 0;
const winContainer = document.getElementById("youWinContainer")
const loseContainer = document.getElementById("youLoseContainer")
const displayBig = document.getElementById("display-big")
//User score
let userScoresListEasy = document.querySelector("#users-scores-list-easy")
let userScoresListMedium= document.querySelector("#users-scores-list-medium")
let userScoresListHard = document.querySelector("#users-scores-list-hard")
let clearHistory = document.getElementById("clear-button")
clearHistory.addEventListener("click", historyClearing)
const HISTORIC_KEY = "historic";
var userHistoric = [];
let userHistoricEasy = [];
let userHistoricMedium = [];
let userHistoricHard = [];
let userNameV;
let newUser;
let userStart;
let userDiff;


function init(){
    document.querySelector("#start-button").addEventListener("click",Start);
    h = 0;
    m = 0;
    s = 0;
    loadLocalStorage();
}
function loadLocalStorage(){
    if (localStorage.getItem(HISTORIC_KEY) !== null) {
        userHistoric = JSON.parse(localStorage.getItem(HISTORIC_KEY));
        filterDifficult();
        updateListEasy(userHistoricEasy);
        updateListMedium(userHistoricMedium);
        updateListHard(userHistoricHard);
    }
}
function filterDifficult(){
    userHistoricEasy = userHistoric.filter(item => {
        return item.difficult === "easy"
    })
    userHistoricMedium = userHistoric.filter(item => {
        return item.difficult === "medium"
    })
    userHistoricHard = userHistoric.filter(item => {
        return item.difficult === "hard"
    })
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
    if ( /[a-zA-Z\d]{1,15}$/.test(userName.value) ){
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
    document.querySelector("#currently-playing-name").innerText="";
    document.getElementById("hms").innerHTML=" ";
}
function showDisplayScores(){
    document.querySelector("#currently-playing-name").innerText=userName.value + " is currently playing";
    document.getElementById("hms").innerHTML="00:00:00";
}
//Objects
function assignName(){
    userNameV=userName.value;
    userStart=document.getElementById("hms").innerHTML;
    createUser(userNameV,userStart,userDiff);
    userHistoric.push(newUser);
    userScoreOr()
    filterDifficult()
    updateListEasy(userHistoricEasy);
    updateListMedium(userHistoricMedium)
    updateListHard(userHistoricHard)
    saveLocalStorage()
}
function createUser(name = "default", score = "Currently playing...", difficult = "default") {
        newUser = {
        name: name,
        score: score,
        difficult: difficult
    };
}
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
function updateListEasy(items) {
    userScoresListEasy.innerHTML = null;
    items.forEach((i) => {
    createListElementEasy({ name: i.name, score: i.score, difficult: i.difficult });
    });
}
function updateListMedium(items) {
    userScoresListMedium.innerHTML = null;
    items.forEach((i) => {
    createListElementMedium({ name: i.name, score: i.score, difficult: i.difficult });
    });
}
function updateListHard(items) {
    userScoresListHard.innerHTML = null;
    items.forEach((i) => {
    createListElementHard({ name: i.name, score: i.score, difficult: i.difficult });
    });
}
function createListElementEasy({ name, score }) {
    const newListItem = document.createElement("li");
    newListItem.innerHTML = "<div id='nameOfUser'>" + name + "</div>" + "<div id='nameOfScore'>" + score + "</div>";
    userScoresListEasy.appendChild(newListItem);
}
function createListElementMedium({ name, score }) {
    const newListItem = document.createElement("li");
    newListItem.innerHTML = "<div id='nameOfUser'>" + name + "</div>" + "<div id='nameOfScore'>" + score + "</div>";
    userScoresListMedium.appendChild(newListItem);
}
function createListElementHard({ name, score }) {
    const newListItem = document.createElement("li");
    newListItem.innerHTML = "<div id='nameOfUser'>" + name + "</div>" + "<div id='nameOfScore'>" + score + "</div>";
    userScoresListHard.appendChild(newListItem);
}
function saveLocalStorage(){
    localStorage.setItem(HISTORIC_KEY, JSON.stringify(userHistoric));
}
function historyClearing(){
    localStorage.clear()
    userScoresListEasy.innerHTML = null;
    userScoresListMedium.innerHTML = null;
    userScoresListHard.innerHTML = null;
}
//restart game
function restartFun(){
    reset();
    clearDisplayBig()
    loseContainer.classList.add("notShow")
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
    'Good',
    "Baby",
    "Blue",
    "Bomb",
    "call",
    "card",
    "exit",
    "fish",
    "game",
    "hear",
    "life",
    "menu",
    "pain",
    "tank",
    "zero"
];

    //Medium
var wordsMedium = [
    'Space',
    'Mouse',
    'Pasta',
    'seven',
    'world',
    'happy',
    'green',
    'party',
    'piano',
    'sugar',
    'earth',
    'house',
    'dream',
    'river',
    'woman',
    'mouth'
];

    //Hard
var wordsHard = [
    'Nightmare',
    'Keyboard',
    'Potatoe',
    'ability',
    'compare',
    'culture',
    'mission',
    'criminal',
    'document',
    'memorial',
    'survival',
    'vertical',
    'accept',
    'garden',
    'prison'
];

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
    let wordSplitI = document.createElement("div")
    wordSplitI.classList.add("underline")
    let wordSplitX = document.createElement("div")
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
    userDiff = "easy";
}
function gameMedium() {
    deleteWordSplitFun()
    var randomMedium = wordsMedium[Math.floor(Math.random()*wordsMedium.length)];
    wordGame.textContent = (randomMedium)
    wordGame1=wordGame.textContent
    wordSplitFun()
    userDiff = "medium";
}
function gameHard() {
    deleteWordSplitFun()
    var randomHard = wordsHard[Math.floor(Math.random()*wordsHard.length)];
    wordGame.textContent = (randomHard)
    wordGame1=wordGame.textContent;
    wordSplitFun()
    userDiff = "hard";
}
function WinOrLooseFun(){
    if(counterWin>=wordSplit.length){
        mainGame.classList.add("notShow")
        assignName();
        stop();
        removeButtons()
        deleteWordSplitFun()
        clearDisplayScores()
        createYouWinPage()
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
function hangmanPicturesArraySum(){
    contadorI++;
    hangmanPicturesSrc=hangmanPicturesArray[contadorI];
}
//create elements
function createButtons() {
    const fragment = document.createDocumentFragment()
    const btnArray = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
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
function createYouWinPage(){
    let divContainer = document.createElement("div");
    divContainer.setAttribute("id","youWinContainer");
    displayBig.appendChild(divContainer);

    let h1YouWin = document.createElement("h1");
    h1YouWin.setAttribute("id","you-won");
    h1YouWin.textContent = "You won!! 🎉🥳"
    divContainer.appendChild(h1YouWin);

    let h2YouWin = document.createElement("h2");
    h2YouWin.setAttribute("id","win-message");
    h2YouWin.innerHTML = userNameV + " you won in " + userStart
    divContainer.appendChild(h2YouWin);

    let buttonYouWin = document.createElement("button");
    buttonYouWin.setAttribute("id","again-button");
    buttonYouWin.textContent = "Play again";
    divContainer.appendChild(buttonYouWin);

    let restartButtonWin = document.getElementById("again-button")
    let restartButtonLose = document.getElementById("again-button-lose")
    restartButtonWin.addEventListener("click",restartFun)
    restartButtonLose.addEventListener("click",restartFun)
}
function clearDisplayBig(){
        document.getElementById("display-big").removeChild(document.getElementById("display-big").lastChild)
}
//buttons
buttons.forEach(btn => {
    btn.addEventListener("click",(e)=> {
        if (e.target.matches(".buttons")){
            buttonValue=e.target.innerText;
            if(wordSplit.includes(buttonValue)||wordSplit.includes(buttonValue.toLowerCase())){
                e.target.classList.add("invisible");

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