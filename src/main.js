// eslint-disable-next-line no-unused-expressions
`use strict`;

// createTripInfoMain
import {createTripInfoMain} from './components/info-main.js';
import {createTripInfoCost} from './components/info-cost.js';
import {createTripMenu} from './components/menu.js';
import {createTripFilters} from './components/filters.js';
import {createTripSort} from './components/sort.js';
import {createTripEditForm} from './components/edit-form.js';
import {createTripDaysList} from './components/days-list.js';
import {createTripDay} from './components/day.js';
import {createTripEventsList} from './components/event-list.js';
import {createTripEvent} from './components/event.js';
import {filters} from './mock/filters.js';
import {generateTripPoints} from './mock/trip-point.js';
// import {getDuration} from './utils.js';

const TRIP_EVENTS = 20;

const trips = generateTripPoints(TRIP_EVENTS);

const render = (parent, template, position = `beforeend`) => {
  parent.insertAdjacentHTML(position, template);
};

const header = document.querySelector(`.page-header`);
const headerTripMain = header.querySelector(`.trip-main`);

render(headerTripMain, createTripInfoMain(), `afterbegin`);

const headerTripInfo = header.querySelector(`.trip-info`);

render(headerTripInfo, createTripInfoCost());

const headerTripControls = header.querySelector(`.trip-controls`);

render(headerTripControls, createTripMenu());
render(headerTripControls, createTripFilters(filters));

const mainTripEvents = document.querySelector(`.trip-events`);

render(mainTripEvents, createTripSort());
render(mainTripEvents, createTripDaysList());

const mainTripDays = mainTripEvents.querySelector(`.trip-days`);

render(mainTripDays, createTripDay());

const mainTripDay = mainTripDays.querySelector(`.day`);

render(mainTripDay, createTripEventsList());

const mainTripEventsList = mainTripDay.querySelector(`.trip-events__list`);

render(mainTripEventsList, createTripEditForm(trips[0]));

for (let i = 1; i < TRIP_EVENTS; i++) {
  render(mainTripEventsList, createTripEvent(trips[i]));
}
