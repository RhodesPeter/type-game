const animalGame = (socket) => {
  document
    .querySelector('.game-inputs--animals')
    .addEventListener('submit', event => handleSubmitWord(event, socket));

  socket.on('animals result', function (result, word, username) {
    if (result === true) {
      const animalsList = document.querySelector('.animal-game__list');
      const liElement = document.createElement('li');
      const userSpan = document.createElement('span');
      liElement.classList.add('animal-game__list-item');
      userSpan.classList.add('animal-game__list-item-span');
      liElement.textContent = word;
      userSpan.textContent = username;
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

  socket.emit('submit word', { game: 'animal', word: word });

  testInput.value = '';
};

const addToScore = (username) => {
  const scoreSpan = document.querySelector(`[data-user-score=${username}]`);
  scoreSpan.textContent = Number(scoreSpan.textContent) + 1;
};

export { animalGame };
