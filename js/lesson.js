// ==========================
// TAB SLIDER (как на уроке)
// ==========================

const tabContents = document.querySelectorAll('.tab_content_block');
const tabItems = document.querySelectorAll('.tab_content_item');

const hideTabContent = () => {
    tabContents.forEach(item => item.style.display = 'none');
    tabItems.forEach(item => item.classList.remove('tab_content_item_active'));
};

const showTabContent = (i = 0) => {
    tabContents[i].style.display = 'flex';
    tabItems[i].classList.add('tab_content_item_active');
};

hideTabContent();
showTabContent();

tabItems.forEach((item, index) => {
    item.onclick = () => {
        hideTabContent();
        showTabContent(index);
    };
});

// ==========================
// CONVERTER (SOM / USD / EUR)
// ==========================

const somInput = document.querySelector('#som');
const usdInput = document.querySelector('#usd');
const eurInput = document.querySelector('#eur');

const rates = {
    usd: 87.38,
    eur: 95.2
};

const convert = (element, target1, target2, rate1, rate2) => {
    element.oninput = () => {
        if (element.value === '') {
            target1.value = '';
            target2.value = '';
            return;
        }
        target1.value = (element.value / rate1).toFixed(2);
        target2.value = (element.value / rate2).toFixed(2);
    };
};

convert(somInput, usdInput, eurInput, rates.usd, rates.eur);

usdInput.oninput = () => {
    if (usdInput.value === '') {
        somInput.value = '';
        eurInput.value = '';
        return;
    }
    somInput.value = (usdInput.value * rates.usd).toFixed(2);
    eurInput.value = (somInput.value / rates.eur).toFixed(2);
};

eurInput.oninput = () => {
    if (eurInput.value === '') {
        somInput.value = '';
        usdInput.value = '';
        return;
    }
    somInput.value = (eurInput.value * rates.eur).toFixed(2);
    usdInput.value = (somInput.value / rates.usd).toFixed(2);
};

// ==========================
// CARD SWITCHER (1–200)
// ==========================

const card = document.querySelector('.card');
const btnPrev = document.querySelector('#btn-prev');
const btnNext = document.querySelector('#btn-next');

let cardId = 1;
const MAX_ID = 200;

const loadCard = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(response => response.json())
        .then(data => {
            card.innerHTML = `
                <p>${data.title}</p>
                <span>${data.id}</span>
            `;
        })
        .catch(() => {
            card.textContent = 'Error loading card';
        });
};

loadCard(cardId);

btnNext.onclick = () => {
    cardId < MAX_ID ? cardId++ : cardId = 1;
    loadCard(cardId);
};

btnPrev.onclick = () => {
    cardId > 1 ? cardId-- : cardId = MAX_ID;
    loadCard(cardId);
};

// ==========================
// FETCH POSTS (console only)
// ==========================

fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => {
        console.log('POSTS:', data);
    })
    .catch(error => console.error('POSTS ERROR:', error));
