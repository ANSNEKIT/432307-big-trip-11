import {getRandomInteger, getRandomElem} from '../utils.js';

const tripPointTypes = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Transport`, `Drive`, `Flight`];

const tripTime = {
  beginTimes: `10:20`,
  endTimes: `18:40`,
  duration: ``,
};

/* const getDateTime = () => {
  const beginDate = new Date();
  const beginHours = beginDate.getHours();
  const beginMinuts = beginDate.getMinutes();

  const endTime = beginDate.getTime() + getRandomInteger(100000, 7 * 24 * 60 * 60 * 1000); // 48 hours = 173000000
  const endDate = new Date(endTime);
  const durationTime = endTime - beginDate.getTime();
  let resultStr = ``;
  console.log(beginDate);
  console.log(endDate);
  // console.log(durationTime);

  if (durationTime < 60 * 60 * 1000) {
    let minuts = Math.round(durationTime / (60 * 1000)); // Узнаем кол-во минут
    resultStr = `${minuts}M`;
    console.log(`minuts `, minuts);
  } else if (durationTime < 24 * 60 * 60 * 1000) {
    let hours = Math.round(durationTime / (60 * 60 * 1000)); // Узнаем кол-во часов
    let mod = durationTime - (hours * 60 * 60 * 1000); // Узнаем кол-во минут в остатке
    let minuts = Math.round(mod / (60 * 60 * 1000));
    resultStr = `${hours}H ${minuts}M`;
    console.log(`hours, minuts `, hours, minuts);
  } else {
    let days = Math.floor(durationTime / (24 * 60 * 60 * 1000));
    let mod = durationTime - (days * 24 * 60 * 60 * 1000); // Узнаем кол-во часов в остатке
    let hours = Math.round(mod / (60 * 60 * 1000));
    let mod2 = durationTime - (hours * 60 * 60 * 1000); // Узнаем кол-во минут в остатке
    let minuts = Math.round(mod2 / (60 * 60 * 1000));
    resultStr = `${hours}H ${minuts}M`;
    console.log(`days, hours, minuts `, days, hours, minuts);
  }
}; */

const tripEndPoints = [
  `Moscow`, `Saint Petersburg`, `Yekaterinburg`, `Volgograd`,
  `Samara`, `Chelyabinsk`, `Vladivostok`, `Yfa`, `Sochi`, `Vladivostok`
];

const offerCount = {
  MIN: 0,
  MAX: 5,
};

const price = {
  MIN: 10,
  MAX: 200,
};

const getTripOffers = (count) => {
  const offerCounts = getRandomInteger(count.MIN, count.MAX);

  let offers = [];

  for (let i = 0; i < offerCounts; i++) {
    offers
      .push({
        title: `offer title - ${Math.random()}`,
        price: getRandomInteger(price.MIN, price.MAX),
      });
  }

  return offers;
};

const tripText = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

const getTripText = (arrText) => {
  const randomCount = getRandomInteger(1, 5);
  let newArr = [];

  for (let i = 0; i < randomCount; i++) {
    newArr.push(getRandomElem(arrText));
  }

  return newArr.join(` `);
};

// const tripEndPointImage = `http://picsum.photos/248/152?r=${Math.random()}`;

const tripPhotoCount = {
  MIN: 0,
  MAX: 5,
};

const getPointImage = (objCount) => {
  const lengthPhoto = getRandomInteger(objCount.MIN, objCount.MAX);
  let photos = [];

  for (let i = 0; i < lengthPhoto; i++) {
    photos.push({
      src: `http://picsum.photos/248/152?r=${Math.random()}`,
      description: `alt-${i}`
    });
  }
  return photos;
};

const getTripPoint = () => {
  return {
    type: getRandomElem(tripPointTypes),
    city: getRandomElem(tripEndPoints),
    dateFrom: new Date(),
    dateTo: new Date(Date.now() + getRandomInteger(1, 24) * 60 * 60 * 1000),
    additional: getRandomInteger(0, 5),
    offers: getTripOffers(offerCount),
  };
};

const getTripDestination = () => {
  return {
    destination: {
      description: getTripText(tripText),
      image: getPointImage(tripPhotoCount),
    }
  };
};

const generateTripPoint = () => Object.assign({}, getTripPoint(), getTripDestination());

export {generateTripPoint};
