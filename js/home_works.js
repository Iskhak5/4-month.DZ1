// ==========================
// GMAIL CHECKER (RegExp)
// ==========================

const gmailInput = document.querySelector('#gmail_input');
const gmailButton = document.querySelector('#gmail_button');
const gmailResult = document.querySelector('#gmail_result');

const gmailRegExp = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

gmailButton.onclick = () => {
    if (gmailRegExp.test(gmailInput.value.trim())) {
        gmailResult.textContent = 'VALID GMAIL ';
        gmailResult.style.color = 'green';
    } else {
        gmailResult.textContent = 'INVALID GMAIL ';
        gmailResult.style.color = 'red';
    }
};

// ==========================
// MOVE BLOCK (RECURSION)
// ==========================

const parentBlock = document.querySelector('.parent_block');
const childBlock = document.querySelector('.child_block');

let positionX = 0;
let positionY = 0;
let direction = 'right';

const moveBlock = () => {
    const parentWidth = parentBlock.clientWidth - childBlock.clientWidth;
    const parentHeight = parentBlock.clientHeight - childBlock.clientHeight;

    if (direction === 'right') {
        positionX++;
        if (positionX >= parentWidth) direction = 'down';
    } else if (direction === 'down') {
        positionY++;
        if (positionY >= parentHeight) direction = 'left';
    } else if (direction === 'left') {
        positionX--;
        if (positionX <= 0) direction = 'up';
    } else if (direction === 'up') {
        positionY--;
        if (positionY <= 0) return; // стоп после полного круга
    }

    childBlock.style.left = `${positionX}px`;
    childBlock.style.top = `${positionY}px`;

    requestAnimationFrame(moveBlock);
};

moveBlock();

// ==========================
// STOPWATCH
// ==========================

const secondsBlock = document.querySelector('#seconds');
const startBtn = document.querySelector('#start');
const stopBtn = document.querySelector('#stop');
const resetBtn = document.querySelector('#reset');

let seconds = 0;
let interval = null;

const startTimer = () => {
    if (interval) return; // защита от повторного запуска
    interval = setInterval(() => {
        seconds++;
        secondsBlock.textContent = seconds;
    }, 1000);
};

const stopTimer = () => {
    clearInterval(interval);
    interval = null;
};

const resetTimer = () => {
    stopTimer();
    seconds = 0;
    secondsBlock.textContent = seconds;
};

startBtn.onclick = startTimer;
stopBtn.onclick = stopTimer;
resetBtn.onclick = resetTimer;

// ==========================
// CHARACTERS (fetch JSON)
// ==========================

const charactersList = document.querySelector('.characters-list');

fetch('../data/characters.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(person => {
            const card = document.createElement('div');
            card.className = 'character-card';

            card.innerHTML = `
                <div class="character-photo">
                    <img src="${person.person_photo}" alt="${person.name}">
                </div>
                <h4>${person.name}</h4>
                <p>Age: ${person.age}</p>
            `;

            charactersList.append(card);
        });
    })
    .catch(error => console.error('Characters error:', error));

// ==========================
// XMLHttpRequest (bio.json)
// ==========================

const request = new XMLHttpRequest();
request.open('GET', '../data/bio.json');
request.setRequestHeader('Content-Type', 'application/json');
request.send();

request.onload = () => {
    if (request.status === 200) {
        console.log('BIO DATA:', JSON.parse(request.response));
    } else {
        console.error('BIO ERROR');
    }
};
