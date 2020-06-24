import { chat } from './chat';
import { connectUser } from './connectUser';
import { addUsername } from './addUsername';
import { displayAllUsers } from './displayAllUsers';

const socket = io();

// if (document.querySelector('.chat')) chat();
// if (document.querySelector('.play')) connectUser(socket);
if (document.querySelector('.homepage__signin')) {
  displayAllUsers(socket);
  addUsername(socket);
}
