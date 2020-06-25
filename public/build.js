(function () {
  'use strict';

  const chat = () => {
    const socket = io();

    document.querySelector('.chat__form').addEventListener('submit', function (e) {
      e.preventDefault(); // prevents page reloading
      const textInput = document.querySelector('.chat__text-input');

      if (textInput.value.length > 0) {
        socket.emit('chat message', textInput.value);
        textInput.value = '';
        return false;
      }
    });

    socket.on('chat message', function (msg) {
      const liElement = document.createElement('li');
      const messageContainer = document.querySelector('.chat__messages');

      liElement.textContent = `${!!msg.username ? `${msg.username}: ` : ''}${msg.message}`;

      messageContainer.append(liElement);
      messageContainer.scrollTop = messageContainer.scrollHeight;
    });

    socket.on('connected users', function (users) {
      const usersList = document.querySelector('.chat__users-list');

      usersList.innerHTML = '';

      users.forEach(user => {
        const liElement = document.createElement('li');
        liElement.classList.add('chat__user-list-item');
        liElement.textContent = user;
        usersList.append(liElement);
      });
    });

    document.querySelector('.chat__username').addEventListener('submit', function (e) {
      e.preventDefault(); // prevents page reloading

      console.log('username submitted');

      const usernameInput = document.querySelector('.chat__username-input');

      if (usernameInput.value.length > 0) {
        socket.emit('add username', usernameInput.value);
        usernameInput.value = '';
      }
    });
  };

  const addUsername = (socket) => {
    document
      .querySelector('.homepage__signin')
      .addEventListener('submit', (event) => {
        const usernameInput = document.querySelector('.homepage__name-input');

        event.preventDefault();

        if (usernameInput.value.length > 0) {
          socket.emit('add username', usernameInput.value);
          Cookies.set('username', usernameInput.value);
          usernameInput.value = '';
        }
      });
  };

  const displayAllUsers = (socket) => {
    socket.on('connected users', function (users) {
      const usersList = document.querySelector('.players__ul');

      if (!usersList) return;

      usersList.innerHTML = '';

      users.forEach(user => {
        const liElement = document.createElement('li');
        liElement.classList.add('players__list-item');
        liElement.textContent = user;
        usersList.append(liElement);
      });
    });
  };

  const startGame = (socket) => {
    document
      .querySelector('.homepage__start-game-btn')
      .addEventListener('click', () => socket.emit('start game'));

    socket.on('direct to play route', function (usernames) {
      const queryString = usernames
        .map((name, index) => `user ${index + 1}=${name}`)
        .join('&');

      const encodedQueryString = encodeURI(queryString);

      window.location.href = `/play?${encodedQueryString}`;
    });
  };

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
        console.log(false);
        console.log(word);
      }
    });

    socket.on('game over', (username) => {
      const gameInputSection = document.querySelector('.game-inputs');
      gameInputSection.innerHTML = '';
      gameInputSection.insertAdjacentHTML('afterbegin', `<h1 class="game-inputs__winning-message">${username} wins!</h1>`);

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
    }, 200);
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

  const socket = io();

  if (document.querySelector('.chat')) {
    chat();
  }

  if (document.querySelector('.play')) ;

  if (document.querySelector('.animal-game')) {
    animalGame(socket);
  }

  if (document.querySelector('.homepage__signin')) {
    displayAllUsers(socket);
    addUsername(socket);
    startGame(socket);
  }

}());
