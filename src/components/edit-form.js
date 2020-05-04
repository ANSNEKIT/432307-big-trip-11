import AbstractSmartComponent from "./abstract-smart-component.js";
import {tripPointTypes, tripEndPoints} from '../mock/trip-point.js';
import {getTime, getDatePoint} from '../utils/common.js';

const group = [`Transfer`, `Activity`];

const createType = (groupType, type, id = 1) => {
  const typeLower = type.toLowerCase();

  return (
    `<fieldset class="event__type-group">
      <legend class="visually-hidden">${groupType}</legend>
      <div class="event__type-item">
        <input 
          id="event-type-${typeLower}-${id}" 
          class="event__type-input  visually-hidden" 
          type="radio" 
          name="event-type" 
          value="${typeLower}">

        <label 
          class="event__type-label  event__type-label--${typeLower}" 
          for="event-type-${typeLower}-${id}">${type}</label>
      </div>
    </fieldset>`
  );
};

const createDestinationList = (city) => {
  return (
    `<option value="${city}"></option>`
  );
};

const createOfferButton = (offer) => {
  const offerTitleWord = offer.title.slice(6);

  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerTitleWord}-1" type="checkbox" name="event-offer-${offerTitleWord}" checked="">
      <label class="event__offer-label" for="event-offer-${offerTitleWord}-1">
        <span class="event__offer-title">${offer.title}</span>
        +
        €&nbsp;<span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`
  );
};

const createDestinationImage = (it) => {
  return `<img class="event__photo" src="${it.src}" alt="${it.description}"></img>`;
};

const createTripEditForm = (point) => {
  const typeItemTransfer = tripPointTypes.slice(0, 7).map((it) => createType(group[0], it)).join(`\n`);
  const typeItemActivity = tripPointTypes.slice(7).map((it) => createType(group[1], it)).join(`\n`);
  const destinationList = tripEndPoints.map((it) => createDestinationList(it)).join(`\n`);
  const offerButton = point.offers.map((it) => createOfferButton(it)).join(`\n`);
  const destinationPhoto = point.destination.image.map((it) => createDestinationImage(it));

  const typeLower = point.type.toLowerCase();
  const dateFrom = getDatePoint(point.dateFrom);
  const TimeFrom = getTime(point.dateFrom);
  const dateTo = getDatePoint(point.dateTo);
  const TimeTo = getTime(point.dateTo);
  const isFavorite = true;

  return (
    `<li class="trip-events__item">
      <form class="event  event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${typeLower}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              ${typeItemTransfer}
              ${typeItemActivity}
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${point.type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${point.city}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${destinationList}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">
              From
            </label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom} ${TimeFrom}">
            —
            <label class="visually-hidden" for="event-end-time-1">
              To
            </label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo} ${TimeTo}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">${point.price}</span>
              €
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${point.price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>

          <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``}>
          <label class="event__favorite-btn" for="event-favorite-1">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
            </svg>
          </label>

          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>

        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
            ${offerButton}
            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${point.destination.description}</p>

            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${destinationPhoto}
              </div>
            </div>
          </section>
        </section>

      </form>
    </li>`
  );
};

export default class EditForm extends AbstractSmartComponent {
  constructor(point) {
    super();

    this._point = point;
    this._submitHandler = null;
    this._favoriteHandler = null;

    // this._subscribeOnEvents();
  }

  getTemplate() {
    return createTripEditForm(this._point);
  }

  setSubmitFormHandler(handler) {
    this.getElement()
    .querySelector(`form`)
    .addEventListener(`submit`, handler);

    this._submitHandler = handler;
  }

  /* setDeleteClickhandler(handler) {
    this.getElement()
    .querySelector(`.event__reset-btn`)
    .addEventListener(`click`, handler);
  } */

  setUpClickhandler(handler) {
    this.getElement()
    .querySelector(`.event__rollup-btn`)
    .addEventListener(`click`, handler);

    this.setUpHandler = handler;
  }

  setFavoritesButtonClickHandler(handler) {
    this.getElement()
    .querySelector(`#event-favorite-1`)
    .addEventListener(`click`, handler);

    this._favoriteHandler = handler;
  }

  setTypeEventHandler(handler) {
    this.getElement()
    .querySelector(`.event__type-list`)
    .addEventListener(`change`, handler);

    this._typeEventHandler = handler;
  }

  setCityHandler(handler) {
    this.getElement()
    .querySelector(`.event__field-group`)
    .addEventListener(`change`, handler);

    this._typeCityHandler = handler;
  }

  recoveryListeners() {
    this.setFavoritesButtonClickHandler(this._favoriteHandler);
    this.setSubmitFormHandler(this._sumbitHandler);
    this.setUpClickhandler(this._setUpHandler);
    this.setTypeEventHandler(this._typeEventHandler);
    this.setCityHandler(this._typeCityHandler);
  }

  rerender() {
    super.rerender();
  }

}
