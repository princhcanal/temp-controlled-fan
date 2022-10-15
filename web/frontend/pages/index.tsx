import type { NextPage } from 'next';
import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../shared/providers/SocketProvider';

export enum FanSpeed {
  SPEED_0 = 'SPEED_0',
  SPEED_1 = 'SPEED_1',
  SPEED_2 = 'SPEED_2',
  SPEED_3 = 'SPEED_3',
}

const TEMP_THRESHOLD = 30;
const hotGradient =
  'bg-gradient-to-r from-red-800 via-yellow-600 to-yellow-500';
const coldGradient = 'bg-gradient-to-b from-sky-400 to-sky-200';

const Home: NextPage = () => {
  const socket = useContext(SocketContext);
  const [temperature, setTemperature] = useState<string>('');
  const [gradientClasses, setGradientClasses] = useState<string>(coldGradient);

  useEffect(() => {
    socket?.on('temperature', (temperature) => {
      setTemperature(temperature);
    });

    return () => {
      socket?.close();
    };
  }, [socket]);

  useEffect(() => {
    if (Number(temperature) > TEMP_THRESHOLD) {
      setGradientClasses(hotGradient);
    } else {
      setGradientClasses(coldGradient);
    }
  }, [temperature]);

  const setFanSpeed = (fanSpeed: FanSpeed) => {
    socket?.emit('fanSpeed', fanSpeed);
  };

  return (
    <div
      className={
        'flex items-center h-screen justify-evenly  ' + gradientClasses
      }
    >
      <h1 className='font-bold text-9xl drop-shadow-lg'>
        {temperature && <span>{temperature}&#8451;</span>}
      </h1>

      <div className='flex flex-col-reverse'>
        <button
          onClick={() => setFanSpeed(FanSpeed.SPEED_0)}
          style={{ cursor: 'pointer' }}
          className='text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
        >
          <span className='text-5xl font-bold'>OFF</span>
        </button>

        <button
          onClick={() => setFanSpeed(FanSpeed.SPEED_1)}
          style={{ cursor: 'pointer' }}
          className='text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
        >
          <span className='text-5xl font-bold'>1</span>
        </button>

        <button
          onClick={() => setFanSpeed(FanSpeed.SPEED_2)}
          style={{ cursor: 'pointer' }}
          className='text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
        >
          <span className='text-5xl font-bold'>2</span>
        </button>

        <button
          onClick={() => setFanSpeed(FanSpeed.SPEED_3)}
          style={{ cursor: 'pointer' }}
          className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
        >
          <span className='text-5xl font-bold'>3</span>
        </button>
      </div>
    </div>
  );
};

export default Home;
