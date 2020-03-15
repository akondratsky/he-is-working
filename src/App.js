import React, { useEffect, useState } from 'react';
import './styles.css';
import yesImage from './yes.jpg';
import noImage from './no.jpg';

import differenceInMinutes from 'date-fns/differenceInMinutes';

const MAX_DIFFERENCE = 5; // if difference more than MAX_DIFFERENCE we thinking he is away

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isWorking, setIsWorking] = useState(false);

  useEffect(() => {
    const updateTimings = async () => {
      const {
        // serverRunTime,
        lastUpdateTime
      } = await fetch('https://arcane-fortress-59742.herokuapp.com/api/get')
        .then(res => res.json());
      
      if (!lastUpdateTime || differenceInMinutes(Date.now(), lastUpdateTime) > MAX_DIFFERENCE) {
        setIsWorking(false);
      } else {
        setIsWorking(true)
      }

      if (!isLoaded) setIsLoaded(true);
      setTimeout(updateTimings, 5000);
    }
    updateTimings();
  }, [isLoaded]);

  const wokingImageComponent = isWorking ?
    <img src={yesImage} alt="he is working"/>
    : <img src={noImage} alt="he is not working" />;

  return (
    <div className="app">
      { isLoaded ?
        wokingImageComponent
        : <p>loading status...</p>
      }
    </div>
  );
}

export default App;
