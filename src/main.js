// eslint-disable-next-line no-unused-expressions
`use strict`;

const TRIP_EVENTS = 3;

// createTripInfoMain
import {createTripInfoMain} from './components/infoMain.js';
import {createTripInfoCost} from './components/infoCost.js';
import {createTripMenu} from './components/menu.js';
import {createTripFilters} from './components/filters.js';
import {createTripSort} from './components/sort.js';
import {createTripEditForm} from './components/editForm.js';
import {createTripDaysList} from './components/daysList.js';
import {createTripDay} from './components/day.js';
import {createTripEventsList} from './components/eventList.js';
import {createTripEvent} from './components/event.js';


const render = (parent, template, position = `beforeend`) => {
  parent.insertAdjacentHTML(position, template);
};

const header = document.querySelector(`.page-header`);
const headerTripMain = header.querySelector(`.trip-main`);

render(headerTripMain, createTripInfoMain(), `afterbegin`);

const headerTripInfo = header.querySelector(`.trip-info`);

render(headerTripInfo, createTripInfoCost()); // beforeend

const headerTripControls = header.querySelector(`.trip-controls`);

render(headerTripControls, createTripMenu()); // beforeend
render(headerTripControls, createTripFilters()); // beforeend

const mainTripEvents = document.querySelector(`.trip-events`);

render(mainTripEvents, createTripSort()); // beforeend
render(mainTripEvents, createTripEditForm()); // beforeend
render(mainTripEvents, createTripDaysList()); // beforeend

const mainTripDays = mainTripEvents.querySelector(`.trip-days`);

render(mainTripDays, createTripDay()); // beforeend

const mainTripDay = mainTripDays.querySelector(`.day`);

render(mainTripDay, createTripEventsList()); // beforeend

const mainTripEventsList = mainTripDay.querySelector(`.trip-events__list`);

for (let i = 0; i < TRIP_EVENTS; i++) {
  render(mainTripEventsList, createTripEvent()); // beforeend
}
