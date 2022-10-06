import type { NextPage } from 'next';
import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../shared/providers/SocketProvider';

export enum FanSpeed {
  SPEED_0 = 'SPEED_0',
  SPEED_1 = 'SPEED_1',
  SPEED_2 = 'SPEED_2',
  SPEED_3 = 'SPEED_3',
}

const Home: NextPage = () => {
  const socket = useContext(SocketContext);
  const [temperature, setTemperature] = useState<string>('');

  useEffect(() => {
    socket?.on('temperature', (temperature) => {
      setTemperature(temperature);
    });

    return () => {
      socket?.close();
    };
  }, [socket]);

  const setFanSpeed = (fanSpeed: FanSpeed) => {
    socket?.emit('fanSpeed', fanSpeed);
  };

  return (
    <div>
      <h1>Temperature: {temperature && <span>{temperature}&#8451;</span>}</h1>

      <button
        onClick={() => setFanSpeed(FanSpeed.SPEED_0)}
        style={{ cursor: 'pointer' }}
      >
        OFF
      </button>

      <button
        onClick={() => setFanSpeed(FanSpeed.SPEED_1)}
        style={{ cursor: 'pointer' }}
      >
        1
      </button>

      <button
        onClick={() => setFanSpeed(FanSpeed.SPEED_2)}
        style={{ cursor: 'pointer' }}
      >
        2
      </button>

      <button
        onClick={() => setFanSpeed(FanSpeed.SPEED_3)}
        style={{ cursor: 'pointer' }}
      >
        3
      </button>
    </div>
  );
};

export default Home;
