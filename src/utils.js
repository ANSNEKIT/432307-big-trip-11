const randomInteger = (min, max) => Math.floor(min + Math.random() * (max - min));

const randomElem = (arr) => arr[randomInteger(0, arr.length)];

export {randomInteger, randomElem};
