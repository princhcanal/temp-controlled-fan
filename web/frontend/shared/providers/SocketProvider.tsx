import { createContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

export const SocketContext = createContext<Socket | undefined>(undefined);

export const SocketProvider = ({
  children,
}: React.PropsWithChildren<unknown>) => {
  const [socket, setSocket] = useState<Socket | undefined>();

  useEffect(() => {
    const socketURL = 'http://localhost:5001';
    const newSocket = io(socketURL);

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [setSocket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
