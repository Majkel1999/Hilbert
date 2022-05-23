/* eslint-disable react/prop-types */
import { createContext } from 'react';
import io from 'socket.io-client';

import { useDispatch } from 'react-redux';
import { WS_URL } from './constants/apiUrls';

// import { updateChatLog } from './actions';

const WebSocketContext = createContext(null);

export { WebSocketContext };

export const WebSocketActions = {
  FILE_ADDED: 'File added',
  FILE_REMOVED: 'File removed',
  MODEL_TRAINING: 'Model training',
  PROJECT_DELETED: 'Project deleted',
};

export default ({ children }) => {
  let socket;

  let ws;

  const dispatch = useDispatch();

  //   const sendMessage = (roomId, message) => {
  //     const payload = {
  //       roomId: roomId,

  //       data: message,
  //     };

  //     socket.emit('event://send-message', JSON.stringify(payload));

  //     dispatch(updateChatLog(payload));
  //   };

  if (!socket) {
    socket = io.connect(WS_URL);

    socket.on('event://get-message', (msg) => {
      const payload = JSON.parse(msg);

      // dispatch(updateChatLog(payload));
    });

    ws = {
      socket,

      // sendMessage,
    };
  }

  return (
    <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
  );
};
