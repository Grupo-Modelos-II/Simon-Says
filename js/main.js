const orange = document.getElementById("0");
const violet = document.getElementById("1");
const blue = document.getElementById("2");
const green = document.getElementById("3");

const scoreLabel = document.getElementById("header-score");
const container = document.getElementById("element");

httpClient.addHeader({name: 'Authorization', value: `Bearer ${localStorage.getItem('token')}`});


let sequence,playerSteps,clickeable,score,userName,bestScore,colors,time,lenghtSequence;

async function initVars(){
    sequence = [];
    playerSteps = [];
    clickeable = false;
    score = 0;
    const {state, data: {userData: {name, max_score}}} = await httpClient.get('/player/');
    bestScore = state ? max_score : 0;
    userName = state ? name : 'Guest';
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

async function setBestScore(){
    if(score > bestScore){
        bestScore = score;
        const response = await httpClient.put('/player/', {max_score: bestScore});
        scoreLabel.innerText = `¡Hola ${userName}! Mejor Puntuación: ${bestScore}`;
    }
}

async function verifyGameStatus(){
    if(!arrayEquals(playerSteps,sequence)){
        container.classList.add("game-lose");
        await sleep(1000);
        container.classList.remove("game-lose");
        openDialog(modalLose).then(() => {
            handleDetail('/');
        });
    }else{
        score += 10;
        lenghtSequence++;
        await setBestScore();
        container.classList.add("game-won");
        await sleep(1000);
        container.classList.remove("game-won");
        startGame();
    }
}

async function handleClick(event){
    if(clickeable){
        if(playerSteps.length < sequence.length){
            playerSteps.push(parseInt(event.target.id));
            if(playerSteps.length === sequence.length){
                handleClick(-1);
            }
            event.target.classList.add('light');
            await sleep(250);
            event.target.classList.remove('light');
        }else{
            clickeable = false;
            verifyGameStatus();
        }
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


document.addEventListener('DOMContentLoaded',async () => {
    await initVars();
    scoreLabel.innerText = `¡Hola ${userName}! Mejor Puntuación: ${bestScore}`;
    startGame();
    addListeners();
});