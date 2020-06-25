const animalGame = (socket) => {
  document
    .querySelector('.game-inputs--animals')
    .addEventListener('submit', event => handleSubmitWord(event, socket));

  socket.on('animals result', function (result, word, username) {
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

      addToScore(username);
    } else {
      console.log(false);
      console.log(word);
    }
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

const addToScore = (username) => {
  const scoreSpan = document.querySelector(`[data-user-score=${username}]`);
  scoreSpan.textContent = Number(scoreSpan.textContent) + 1;
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

export { animalGame };
