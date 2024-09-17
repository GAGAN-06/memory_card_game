const images = [
    "https://images.unsplash.com/photo-1626808642875-0aa545482dfb",
    "https://images.unsplash.com/photo-1546842931-886c185b4c8c",
    "https://images.unsplash.com/photo-1520763185298-1b434c919102",
    "https://images.unsplash.com/photo-1442458017215-285b83f65851",
    "https://images.unsplash.com/photo-1496483648148-47c686dc86a8",
    "https://images.unsplash.com/photo-1591181520189-abcb0735c65d",
];

let shuffledImages = [...images, ...images].sort(() => Math.random() - 0.5);

let firstCard = null;
let secondCard = null;
let lockBoard = false;

const gameBoard = document.querySelector('.game-board');

function createCard(imageUrl) {
    const card = document.createElement('div');
    card.classList.add('card', 'hidden');
    card.dataset.image = imageUrl;

    const imgElement = document.createElement('img');
    imgElement.src = imageUrl;
    card.appendChild(imgElement);

    card.addEventListener('click', () => flipCard(card));

    return card;
}

function renderBoard() {
    shuffledImages.forEach(image => {
        const card = createCard(image);
        gameBoard.appendChild(card);
    });
}

function flipCard(card) {
    if (lockBoard) return;
    if (card === firstCard) return;

    card.classList.remove('hidden');
    card.querySelector('img').style.display = 'block';

    if (!firstCard) {
        firstCard = card;
        return;
    }

    secondCard = card;
    checkForMatch();
}

function checkForMatch() {
    lockBoard = true;

    if (firstCard.dataset.image === secondCard.dataset.image) {
        disableCards();
    } else {
        setTimeout(unflipCards, 1000);
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    firstCard.classList.add('matched');
    secondCard.classList.add('matched');

    resetBoard();
}

function unflipCards() {
    firstCard.classList.add('hidden');
    secondCard.classList.add('hidden');

    firstCard.querySelector('img').style.display = 'none';
    secondCard.querySelector('img').style.display = 'none';

    resetBoard();
}

function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

renderBoard();
