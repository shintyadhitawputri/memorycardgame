const cards = document.querySelectorAll(".card");
const timeTag = document.querySelector(".time b");
const flipsTag = document.querySelector(".flips b");
const refreshBtn = document.querySelector(".details button");
const remainLeft = document.querySelector(".remaining b");

let maxTime = 59;
let timeLeft = maxTime;
let flips = 0;
let matchedCard = 0;
let disablePlay = false;
let enablePlay = false;
let cardOne, cardTwo, timer;

window.addEventListener('load', function() {
    setTimeout(function() {
      document.getElementById('loading-text').classList.add('loaded');
      document.getElementById('loading-text').style.display = 'none';
    }, 1450); 
  });
  

function gameTimer() {
    if(timeLeft <= 0) {
        return clearInterval(timer);
    }
    timeLeft--;
    timeTag.innerText = timeLeft;
}

function cardFlipped({target: cardClicked}) {
    if(!enablePlay) {
        enablePlay = true;
        timer = setInterval(gameTimer, 1000);
    }
    if(cardClicked !== cardOne && !disablePlay && timeLeft > 0) {
        flips++;
        flipsTag.innerText = flips;
        cardClicked.classList.add("flip");
        if(!cardOne) {
            return cardOne = cardClicked;
        }
        cardTwo = cardClicked;
        disablePlay = true;
        let pictCardOne = cardOne.querySelector(".opencard img").src;
        let pictCardTwo = cardTwo.querySelector(".opencard img").src;
        foundMatch(pictCardOne, pictCardTwo);
    }
}

function foundMatch(img1, img2) {
    if(img1 === img2) {
        matchedCard++;
        remainLeft.textContent = 6 - matchedCard;
        if(matchedCard == 8 && timeLeft > 0) {
            return clearInterval(timer);
        }
        cardOne.removeEventListener("click", cardFlipped);
        cardTwo.removeEventListener("click", cardFlipped);
        cardOne = cardTwo = "";
        return disablePlay = false;
    }

    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disablePlay = false;
    }, 1200);
}

function randomCard() {
    timeLeft = maxTime;
    flips = matchedCard = 0;
    cardOne = cardTwo = "";
    clearInterval(timer);
    timeTag.innerText = timeLeft;
    flipsTag.innerText = flips;
    disablePlay = enablePlay = false;

    let arrCard = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arrCard.sort(() => Math.random() > 0.5 ? 1 : -1);

    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".opencard img");
        setTimeout(() => {
            imgTag.src = `img/icons${arrCard[index]}.png`;
        }, 500);
        card.addEventListener("click", cardFlipped);
    });
}

randomCard();

refreshBtn.addEventListener("click", randomCard);

cards.forEach(card => {
    card.addEventListener("click", cardFlipped);
});