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

export { displayAllUsers };
