const animalGame = (socket) => {
  document
    .querySelector('.game-inputs--animals')
    .addEventListener('submit', event => handleSubmitWord(event, socket));

  document.querySelector('.restart-btn').addEventListener('click', () => restartGame(socket));

  socket.on('animals result', (result, word, username) => {
    if (result === true) {
      const animalsList = document.querySelector('.animal-game__list');
      const liElement = document.createElement('li');
      const userSpan = document.createElement('span');
      const animalWordSpan = document.createElement('span');
      liElement.classList.add('animal-game__list-item');
      userSpan.classList.add('animal-game__list-item-span');
      animalWordSpan.classList.add('animal-game__animal-word-span');
      animalWordSpan.textContent = word;
      userSpan.textContent = username;
      liElement.append(animalWordSpan);
      liElement.append(userSpan);
      animalsList.append(liElement);

      addToScore(socket, username);
    } else {
      const input = document.querySelector('.game-inputs__text-input');
      input.setAttribute(
        "style",
        "box-shadow: inset 0 0 32px tomato, 0 5px 10px 0 rgba(0, 0, 0, 0.2);"
      );

      setTimeout(() => {
        input.setAttribute("style", "box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.2);")
      }, 300);
    }
  });

  socket.on('game over', (username) => {
    const gameInputSection = document.querySelector('.game-inputs');
    gameInputSection.innerHTML = '';
    gameInputSection.insertAdjacentHTML('afterbegin', `<h1 class="game-inputs__winning-message">${username} wins!</h1>`)

    highlightWinningAnswers(username);

    document.querySelector('.restart-btn').classList.remove('opacity-zero');
  });

  socket.on('start new game', () => {
    location.reload();
  });
};

const handleSubmitWord = (event, socket) => {
  event.preventDefault();

  const testInput = event.target.querySelector('.game-inputs__text-input');
  const word = testInput.value.toLowerCase();

  const currentWordsElements = [...document.querySelectorAll('.animal-game__animal-word-span')];
  const currentWords = currentWordsElements.map(el => el.textContent);

  if (!currentWords.includes(word)) {
    socket.emit('submit word', { game: 'animal', word: word });
  } else {
    highlightExistingWord(currentWordsElements, word);
  }

  testInput.value = '';
};

const addToScore = (socket, username) => {
  const scoreSpan = document.querySelector(`[data-user-score=${username}]`);
  const newScore = Number(scoreSpan.textContent) + 1;
  scoreSpan.textContent = newScore;

  if (newScore === 5) { // change to 10
    socket.emit('user won', username);
  }
};

const highlightExistingWord = (currentWordsElements, word) => {
  const matchingWordElement = currentWordsElements.filter(currentWord => currentWord.textContent === word);
  const parentCard = matchingWordElement[0].parentElement;
  parentCard.setAttribute(
    "style",
    "transition: transform 0.2s linear; transform: scale(1.15); color: tomato"
  );

  setTimeout(() => {
    parentCard.setAttribute(
      "style",
      "transition: transform 0.2s linear, color 0.2s linear; transform: scale(1); color: black"
    );
  }, 200)
};

const highlightWinningAnswers = (username) => {
  const winningCards = [...document
    .querySelectorAll('.animal-game__list-item-span')]
    .filter(card => card.textContent === username);

  winningCards.forEach(card => {
    card.parentElement.setAttribute(
      "style",
      "transition: transform 0.2s linear, color 0.2s linear; transform: scale(1.07);"
    );

    card.setAttribute(
      "style",
      "transition: color 0.2s linear; color: blue; border-color: blue"
    );
  });
};

const restartGame = (socket) => {
  socket.emit('restart game');
};

export { animalGame };
