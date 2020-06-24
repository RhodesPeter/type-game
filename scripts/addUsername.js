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

export { addUsername };
