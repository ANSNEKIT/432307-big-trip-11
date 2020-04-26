import {getTripDestination} from './trip-destination.js';
import {getRandomInteger, getRandomElem} from '../utils.js';

const tripPointTypes = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];

const tripPointTypesMap = new Map([
  [`Taxi`, `Taxi to`],
  [`Bus`, `Bus to`],
  [`Train`, `Train to`],
  [`Ship`, `Ship to`],
  [`Transport`, `Transport to`],
  [`Drive`, `Drive to`],
  [`Flight`, `Flight to`],
  [`Check-in`, `Check-in in`],
  [`Sightseeing`, `Sightseeing in`],
  [`Restaurant`, `Restaurant in`],
]);

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
        title: `offer title${Math.floor(Math.random() * 100)}`,
        price: getRandomInteger(price.MIN, price.MAX),
      });
  }

  return offers;
};

const getTripPoint = () => {
  return {
    type: getRandomElem(tripPointTypes),
    city: getRandomElem(tripEndPoints),
    dateFrom: `${new Date(Date.now() - getRandomInteger(10000000, 3 * 24 * 60 * 60 * 1000))}`,
    dateTo: `${new Date(Date.now() + getRandomInteger(1, 2 * 24 * 60 * 60 * 1000))}`,
    additional: getRandomInteger(0, 5),
    price: getRandomInteger(0, 100),
    offers: getTripOffers(offerCount),
  };
};

const generateTripPoint = () => Object.assign({}, getTripPoint(), getTripDestination());

const generateTripPoints = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateTripPoint);
};

export {
  tripPointTypes,
  tripPointTypesMap,
  tripEndPoints,
  generateTripPoint,
  generateTripPoints
};
