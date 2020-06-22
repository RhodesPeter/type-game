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
}

export { chat };
