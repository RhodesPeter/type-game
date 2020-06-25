const { animalList } = require('./animal-list');

const animalGame = (io, userWord, username) => {
  if (animalList.includes(userWord)) {
    io.emit('animals result', true, userWord, username);
  } else {
    io.emit('animals result', false, userWord);
  }
};

module.exports = { animalGame };
