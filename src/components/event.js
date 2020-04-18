import {tripPointTypesMap} from '../mock/trip-point.js';
import {getTime, getDatePoint, getDuration} from '../utils.js';

const createOffersElem = (pointObj) => {
  return (
    `<li class="event__offer">
      <span class="event__offer-title">${pointObj.title}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${pointObj.price}</span>
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

  return (
    `<li class="trip-events__item">
        <div class="event">
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${point.type.toLowerCase()}.png" alt="Event type icon">
          </div>
          <h3 class="event__title">${tripPointTypesMap.get(point.type)} ${point.city}</h3>
  
          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time" datetime="${getDatePoint(point.dateFrom)}">${getTime(point.dateFrom)}</time>
              &mdash;
              <time class="event__end-time" datetime="${getDatePoint(point.dateTo)}">${getTime(point.dateTo)}</time>
            </p>
            <p class="event__duration">${getDuration(point.dateFrom, point.dateTo)}</p>
          </div>
  
          <p class="event__price">
            &euro;&nbsp;<span class="event__price-value">${point.price}</span>
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

export {createTripEvent};
