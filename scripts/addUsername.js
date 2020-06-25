const addUsername = (socket) => {
  document
    .querySelector('.homepage__signin')
    .addEventListener('submit', (event) => {
      const usernameInput = document.querySelector('.homepage__name-input');

      event.preventDefault();

      if (usernameInput.value.length > 0) {
        const username = usernameInput.value.replace(' ', '-');
        socket.emit('add username', username);
        Cookies.set('username', username);
        usernameInput.value = '';
      }
    });
};

export { addUsername };
