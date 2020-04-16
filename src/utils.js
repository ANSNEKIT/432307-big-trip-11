const getRandomInteger = (min, max) => Math.floor(min + Math.random() * (max - min));

const getRandomElem = (arr) => arr[getRandomInteger(0, arr.length)];

export {getRandomInteger, getRandomElem};
