const startGame = (socket) => {
  document
    .querySelector('.homepage__start-game-btn')
    .addEventListener('click', () => socket.emit('start game', 'peter and other names here'));

  socket.on('direct to play route', function (msg) {
    window.location.href = '/play';
  });
};


export { startGame };
