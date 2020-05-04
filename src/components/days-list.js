import AbstractComponent from './abstract-component.js';

const createTripDaysList = () => {

  return (
    `<ul class="trip-days"></ul>`
  );
};

export default class DaysList extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return createTripDaysList();
  }
}
