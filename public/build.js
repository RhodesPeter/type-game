(function () {
  'use strict';

  const addUsername = (socket) => {
    document
      .querySelector('.homepage__signin')
      .addEventListener('submit', (event) => {
        const usernameInput = document.querySelector('.homepage__name-input');

        event.preventDefault();

        if (usernameInput.value.length > 0) {
          socket.emit('add username', usernameInput.value);
          Cookies.set('username', usernameInput.value);
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
      .addEventListener('click', () => socket.emit('start game', 'peter and other names here'));

    socket.on('direct to play route', function (msg) {
      window.location.href = '/play';
    });
  };

  const socket = io();

  // if (document.querySelector('.chat')) chat();
  if (document.querySelector('.play')) ;
  if (document.querySelector('.homepage__signin')) {
    displayAllUsers(socket);
    addUsername(socket);
    startGame(socket);
  }

}());
