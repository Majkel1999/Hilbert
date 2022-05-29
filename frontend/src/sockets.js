/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable react/prop-types */
import { createContext } from 'react';
// import io from 'socket.io-client';
import { uuid } from './utils/utils';

// import { useDispatch } from 'react-redux';
import { WS_URL } from './constants/apiUrls';

const WebSocketContext = createContext(null);

export { WebSocketContext };

export const WebSocketActions = {
  FILE_ADDED: 'File added',
  FILE_REMOVED: 'File removed',
  MODEL_TRAINING: 'Model training',
  PROJECT_DELETED: 'Project deleted',
};

let subscribers = [];
let connection;

function initialize(projectId) {
  if (connection) return;

  connection = new WebSocket(`${process.env.REACT_APP_WS}${WS_URL(projectId)}`);

  connection.onmessage = (e) => {
    const message = JSON.parse(e.data);

    subscribers
      .filter((subscriber) => subscriber.action === message.action)
      .forEach((subscriber) => subscriber.callback(message.payload));
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

// export default ({ children, projectId }) => {
//   let ws;

//   const dispatch = useDispatch();

//   //   const sendMessage = (roomId, message) => {
//   //     const payload = {
//   //       roomId: roomId,

//   //       data: message,
//   //     };

//   //     socket.emit('event://send-message', JSON.stringify(payload));

//   //     dispatch(updateChatLog(payload));
//   //   };

//   const socket = io.connect(WS_URL(projectId));

//   socket.on('event://get-message', (msg) => {
//     const payload = JSON.parse(msg);

//     // dispatch(updateChatLog(payload));
//   });

//   ws = {
//     socket,

//     // sendMessage,
//   };

//   return (
//     <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
//   );
// };

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
