import {getRandomInteger, getRandomElem} from '../utils.js';

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
      src: `http://picsum.photos/248/152?r=${Math.random() * 10}`,
      description: `alt-${i}`
    });
  }
  return photos;
};

const getTripDestination = () => {
  return {
    destination: {
      description: getTripText(tripText),
      image: getPointImage(tripPhotoCount),
    }
  };
};

export {getTripDestination};
