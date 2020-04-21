import {tripPointTypesMap} from '../mock/trip-point.js';
import {getTime, getDatePoint, getDuration, createElement} from '../utils.js';

const createOffersElem = (point) => {

  return (
    `<li class="event__offer">
      <span class="event__offer-title">${point.title}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${point.price}</span>
    </li>`
  );
};

const createTripEvent = (point) => {
  const offersElem = point.offers
  .filter((it, count) => {
    return count < 3;
  })
  .map((it) => {
    return createOffersElem(it);
  })
  .join(`\n`);

  const lowerPointType = point.type.toLowerCase();
  const pointType = tripPointTypesMap.get(point.type);
  const pointCity = point.city;
  const pointDateFrom = getDatePoint(point.dateFrom);
  const pointTimeFrom = getTime(point.dateFrom);
  const pointDateTo = getDatePoint(point.dateTo);
  const pointTimeTo = getTime(point.dateTo);
  const pointPrice = point.price;
  const pointDuration = getDuration(point.dateFrom, point.dateTo);

  return (
    `<li class="trip-events__item">
        <div class="event">
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${lowerPointType}.png" alt="Event type icon">
          </div>
          <h3 class="event__title">${pointType} ${pointCity}</h3>
  
          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time" datetime="${pointDateFrom}">${pointTimeFrom}</time>
              &mdash;
              <time class="event__end-time" datetime="${pointDateTo}">${pointTimeTo}</time>
            </p>
            <p class="event__duration">${pointDuration}</p>
          </div>
  
          <p class="event__price">
            &euro;&nbsp;<span class="event__price-value">${pointPrice}</span>
          </p>
  
          <h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">
            ${offersElem}
          </ul>
  
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </div>
      </li>`
  );
};

export default class Point {
  constructor(point) {
    this._point = point;
    this._element = null;
  }

  getTemplate() {
    return createTripEvent(this._point);
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
