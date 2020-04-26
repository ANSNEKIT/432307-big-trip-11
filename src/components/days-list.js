// import Day, {createTripDay} from './day.js';
import {createElement} from '../utils.js';

const createTripDaysList = () => {

  return (
    `<ul class="trip-days"></ul>`
  );
};

export default class DaysList {
  constructor(dayMap) {
    this._dayMap = dayMap;
    this._element = null;
  }

  getTemplate() {
    return createTripDaysList(this._dayMap);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
