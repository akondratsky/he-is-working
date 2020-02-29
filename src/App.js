import React, { useEffect, useState } from 'react';
import './styles.css';

import formatDate from 'date-fns/lightFormat';
import differenceInMinutes from 'date-fns/differenceInMinutes';

const App = () => {
  const [serverRunTime, setServerRunTime] = useState(0);
  const [lastUpdateTime, setLastUpdateTime] = useState(0);

  useEffect(() => {
    const updateTimings = async () => {
      const {
        serverRunTime,
        lastUpdateTime
      } = await fetch('https://arcane-fortress-59742.herokuapp.com/api/get')
        .then(res => res.json());
      setServerRunTime(serverRunTime);
      setLastUpdateTime(lastUpdateTime);
      setTimeout(updateTimings, 5000);
    }
    updateTimings();
  }, []);

  return (
    <div className="app">
      { serverRunTime && 
        <p>
          <span className="text-muted">Server was runned: </span>
          {formatDate(serverRunTime, 'HH:mm dd.MM.yyyy')}
        </p>
      }
      { lastUpdateTime &&
        <p>
          <span className="text-muted">Minutes from last update: </span>
          {differenceInMinutes(Date.now(), lastUpdateTime)}
        </p>
      }
    </div>
  );
}

export default App;
