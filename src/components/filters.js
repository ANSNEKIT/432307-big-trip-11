import AbstractComponent from './abstract-component.js';

const FILTER_ID_PREFIX = `filter-`;

const getFilterNameById = (id) => {
  return id.substring(FILTER_ID_PREFIX.length);
};

const generateFilterMarkup = (filter) => {
  const {name, isChecked} = filter;
  const filterTitle = name.toUpperCase();

  return (
    `<div class="trip-filters__filter">
      <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" ${isChecked ? `checked` : ``}>
      <label class="trip-filters__filter-label" for="filter-${name}">${filterTitle}</label>
    </div>`
  );
};


const createTripFilters = (filters) => {
  const filtersMarkup = filters.map((it) => generateFilterMarkup(it, it.checked)).join(`\n`);
  return (
    `<form class="trip-filters" action="#" method="get">
        ${filtersMarkup}

        <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
  }

  getTemplate() {
    return createTripFilters(this._filters);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      const filterName = getFilterNameById(evt.target.id);
      handler(filterName);
    });
  }
}
