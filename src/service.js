import differenceInMinutes from 'date-fns/differenceInMinutes';

const MAX_DIFFERENCE = 5; // if difference more than MAX_DIFFERENCE we thinking he is away

export const getIsWorking = async () => {
    const {
        // serverRunTime,
        lastUpdateTime
      } = await fetch('https://arcane-fortress-59742.herokuapp.com/api/get')
        .then(res => res.json());
      
      if (!lastUpdateTime || differenceInMinutes(Date.now(), lastUpdateTime) > MAX_DIFFERENCE) {
        return false;
      } else {
        return true;
      }
}