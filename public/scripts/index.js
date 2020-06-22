var socket = io();

document.querySelector('.chat__form').addEventListener('submit', function (e) {
  e.preventDefault(); // prevents page reloading
  var textInput = document.querySelector('.chat__text-input');

  if (textInput.value.length > 0) {
    socket.emit('chat message', textInput.value);
    textInput.value = '';
    return false;
  }
});

socket.on('chat message', function (msg) {
  var liElement = document.createElement('li');
  var messageContainer = document.querySelector('.chat__messages');

  liElement.textContent = `${!!msg.username ? `${msg.username}: ` : ''}${msg.message}`;

  messageContainer.append(liElement);
  messageContainer.scrollTop = messageContainer.scrollHeight;
});

socket.on('connected users', function (users) {
  var usersList = document.querySelector('.chat__users-list');

  usersList.innerHTML = '';

  users.forEach(user => {
    var liElement = document.createElement('li');
    liElement.classList.add('chat__user-list-item');
    liElement.textContent = user;
    usersList.append(liElement);
  });
});

document.querySelector('.chat__username').addEventListener('submit', function (e) {
  e.preventDefault(); // prevents page reloading

  console.log('username submitted');

  var usernameInput = document.querySelector('.chat__username-input');

  if (usernameInput.value.length > 0) {
    socket.emit('add username', usernameInput.value);
    usernameInput.value = '';
  }
});