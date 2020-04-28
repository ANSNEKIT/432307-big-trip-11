import AbstractComponent from './abstractComponent.js';
import {MONTH_NAMES} from '../const.js';
import {getDatePoint} from '../utils/common.js';


const createTripDay = (dateMillisecond, count) => {
  const date = new Date(dateMillisecond);
  const dayDate = getDatePoint(date);
  const month = MONTH_NAMES[date.getMonth()];
  const dayNumber = date.getDate();

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${count}</span>
        <time class="day__date" datetime="${dayDate}">${month} ${dayNumber}</time>
      </div>

      <ul class="trip-events__list"></ul>
    </li>`
  );
};

export default class Day extends AbstractComponent {
  constructor(dateMillisecond, count) {
    super();

    this._dateMillisecond = dateMillisecond;
    this._count = count;
  }

  getTemplate() {
    return createTripDay(this._dateMillisecond, this._count);
  }
}
