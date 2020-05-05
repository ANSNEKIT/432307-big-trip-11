import {FilterType} from "../const.js";

export const getPointsByFilter = (points) => {
  return points;
};

const getFutureEvents = (points) => {
  return points.filter(({start}) => start.getTime() >= Date.now());
};

const getPastEvents = (points) => {
  return points.filter(({start}) => start.getTime() < Date.now());
};

const filterEvents = (points, filterType) => {
  switch (filterType) {
    case FilterType.EVERYTHING:
      return points;
    case FilterType.FUTURE:
      return getFutureEvents(points);
    case FilterType.PAST:
      return getPastEvents(points);
  }
};

export {filterEvents};
