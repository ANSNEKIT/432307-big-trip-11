import {createTripDay} from './day.js';

const createTripDaysList = (tripDayMap) => {
  let tripDay = [];
  let count = 0;

  tripDayMap.forEach((element, key) => {
    count++;
    tripDay += createTripDay(key, count, element);
  });

  return (
    `<ul class="trip-days">
      ${tripDay}
    </ul>`
  );
};

export {createTripDaysList};
