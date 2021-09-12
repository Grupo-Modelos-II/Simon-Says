const orange = document.getElementById("0");
const violet = document.getElementById("1");
const blue = document.getElementById("2");
const green = document.getElementById("3");

const scoreLabel = document.getElementById("header-score");
const container = document.getElementById("element");


let sequence,playerSteps,clickeable,score,bestScore,colors,time,lenghtSequence;

function initVars(){
    sequence = [];
    playerSteps = [];
    clickeable = false;
    score = 0;
    bestScore = localStorage.getItem('score') || score;
    colors = {
        0:orange,
        1:violet,
        2:blue,
        3:green
    };
    time = localStorage.getItem('time') || 1000;
    lenghtSequence = 3;
}

function sleep(timeSleep){
    return new Promise(resolve => setTimeout(resolve,timeSleep));
}

function arrayEquals(a, b) {
    return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]);
}

function generateSequence(){ 
    playerSteps = [];
    for(let i = 0; i <= lenghtSequence; i++){
        sequence[i] = Math.floor(Math.random() * 4);
    }
}

function turnOffElement(color){
    color.classList.remove('light');
}

async function iluminateElement(color){
    await sleep(1000);
    color.classList.add('light');
    setTimeout(() => {
        turnOffElement(color);
    }, time);
}

function setBestScore(){
    if(score > bestScore){
        bestScore = score;
        localStorage.setItem('score', bestScore);
        scoreLabel.innerText = `Mejor Puntuación : ${bestScore}`;
    }
}

async function verifyGameStatus(){
    if(!arrayEquals(playerSteps,sequence)){
        openDialog(modalLose).then(() => {
            handleDetail('/');
        });
    }else{
        score += 10;
        lenghtSequence++;
        setBestScore();
        container.classList.add("game-won");
        await sleep(1000);
        container.classList.remove("game-won");
        startGame();
    }
}

async function handleClick(event){
    if(clickeable){
        event.target.classList.add('light');
        await sleep(250);
        event.target.classList.remove('light');
        if(playerSteps.length < sequence.length){
            playerSteps.push(parseInt(event.target.id));
            if(playerSteps.length === sequence.length){
                clickeable = false;
                handleClick(-1);
            }
        }
    }else{
        verifyGameStatus();
    }
}

function addListeners(){
    for(let index in colors){
        colors[index].addEventListener('click', handleClick);
    }
}

async function startGame(){
    generateSequence();
    for(let id of sequence){
        await iluminateElement(colors[id]);
        await sleep(time);
    }
    clickeable = true;
}


document.addEventListener('DOMContentLoaded',() => {
    initVars();
    scoreLabel.innerText = `Mejor Puntuación : ${bestScore}`;
    startGame();
    addListeners();
});





