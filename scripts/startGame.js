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


export { startGame };
