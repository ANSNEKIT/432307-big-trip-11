import AbstractComponent from './abstractComponent.js';

const createTripDaysList = () => {

  return (
    `<ul class="trip-days"></ul>`
  );
};

export default class DaysList extends AbstractComponent {
  constructor(dayMap) {
    super();

    this._dayMap = dayMap;
  }

  getTemplate() {
    return createTripDaysList(this._dayMap);
  }
}
