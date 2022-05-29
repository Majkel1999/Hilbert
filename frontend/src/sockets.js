/* eslint-disable prefer-promise-reject-errors */
import { uuid } from './utils/utils';

import { WS_URL } from './constants/apiUrls';

export const WebSocketActions = {
  FILE_ADDED: 'FileAdded',
  FILE_REMOVED: 'FileRemoved',
  MODEL_TRAINING: 'ModelTraining',
  PROJECT_DELETED: 'ProjectDeleted',
};

let subscribers = [];
let connection;

function initialize(projectId) {
  if (connection) return;

  connection = new WebSocket(`${process.env.REACT_APP_WS}${WS_URL(projectId)}`);

  connection.onmessage = (e) => {
    const message = JSON.parse(JSON.parse(e.data));

    subscribers
      .filter((subscriber) => subscriber.action === message.event)
      .forEach((subscriber) => subscriber.callback(message.projectId));
  };

  // For Debugging
  connection.onopen = (e) => console.log('Opened WS connection ...', e);
  connection.onclose = (e) => console.log('Closed WS connection ...', e);
  connection.onerror = (e) => console.log('Error in WS connection ...', e);
}

const SOCKETS = {
  subscribe: (item) => {
    const key = uuid();
    subscribers.push({ ...item, key });
    return key;
  },
  unsubscribe: (key) => {
    subscribers = subscribers.filter((subscriber) => subscriber.key !== key);
  },
  send(payloadObj) {
    return new Promise((res, rej) => {
      if (connection.readyState > 1)
        rej('Unable to send data (wrong state)', connection.readyState);
      connection.send(JSON.stringify(payloadObj));
      res();
    });
  },
  initialize,
  WebSocketActions,
};

Object.freeze(SOCKETS);

export default SOCKETS;

// USAGE
// nazwaFunkcjiZUnsubsribe(){
// if (payload.id === id) {
// jakas akcja
// SOCKETS.UNSUBSRCIBE(NAZWA AKCJA)
// }
// }

// this.nazwaAkcjaSocketow = SOCKETS.subscribe({
//   action: SOCKETS.nazwaAkcjaSocketow,
//   callback: nazwaFunkcjiZUnsubsribe,
// });
