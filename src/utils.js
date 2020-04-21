const getRandomInteger = (min, max) => Math.floor(min + Math.random() * (max - min));

const getRandomElem = (arr) => arr[getRandomInteger(0, arr.length)];

const getTime = (datetime) => {
  const date = new Date(datetime);

  return (
    `${date.getHours()}:${date.getMinutes() < 10 ?
      0 + `` + date.getMinutes() : date.getMinutes()}`
  );
};

const getDatePoint = (datetime) => {
  const date = new Date(datetime);

  return (`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`);
};

const getDuration = (beginDate, endDate) => {
  const beginDat = new Date(beginDate);
  const endDat = new Date(endDate);

  const durationTime = endDat.getTime() - beginDat.getTime();

  const isCorrectDate = (endDat.getTime() - beginDat.getTime()) > 0;

  let resultStr = ``;

  if (isCorrectDate) {
    if (durationTime < 60 * 60 * 1000) {
      let minuts = Math.round(durationTime / (60 * 1000)); // Узнаем кол-во минут

      resultStr = `${minuts}M`;
    } else if (durationTime > 60 * 60 * 1000 && durationTime < 24 * 60 * 60 * 1000) {
      let hours = Math.round(durationTime / (60 * 60 * 1000)); // Узнаем кол-во часов
      let mod = durationTime - (hours * 60 * 60 * 1000); // Узнаем кол-во минут в остатке
      let minuts = Math.round(mod / (60 * 60 * 1000));

      resultStr = `${hours}H ${minuts}M`;
    } else if (durationTime > 24 * 60 * 60 * 1000) {
      let days = Math.floor(durationTime / (24 * 60 * 60 * 1000));
      let mod = durationTime - (days * 24 * 60 * 60 * 1000); // Узнаем кол-во часов в остатке
      let hours = Math.round(mod / (60 * 60 * 1000));
      let mod2 = durationTime - (hours * 60 * 60 * 1000); // Узнаем кол-во минут в остатке
      let minuts = Math.round(mod2 / (60 * 60 * 1000));

      resultStr = `${days}D ${hours}H ${minuts}M`;
    }
  }

  return resultStr;
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};


export {getRandomInteger, getRandomElem, getTime, getDatePoint, getDuration, createElement};
