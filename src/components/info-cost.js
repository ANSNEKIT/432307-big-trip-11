import AbstractComponent from './abstract-component.js';

const createTripInfoCost = (price) => {
  return (
    `<p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
      </p>`
  );
};

export default class InfoCost extends AbstractComponent {
  constructor(price) {
    super();

    this._price = price;
  }

  getTemplate() {
    return createTripInfoCost(this._price);
  }
}
