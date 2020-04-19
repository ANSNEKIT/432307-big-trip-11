// eslint-disable-next-line no-unused-expressions
`use strict`;

// createTripInfoMain
import {createTripInfoMain} from './components/info-main.js';
import {createTripInfoCost} from './components/info-cost.js';
import {createTripMenu} from './components/menu.js';
import {createTripFilters} from './components/filters.js';
import {createTripSort} from './components/sort.js';
// import {createTripEditForm} from './components/edit-form.js';
import {createTripDaysList} from './components/days-list.js';
// import {createTripDay} from './components/day.js';
// import {createTripEventsList} from './components/event-list.js';
// import {createTripEvent} from './components/event.js';
import {filters} from './mock/filters.js';
import {generateTripPoints} from './mock/trip-point.js';
// import {getDuration} from './utils.js';

const TRIP_EVENTS = 6;

const trips = generateTripPoints(TRIP_EVENTS);
const days = new Map();

trips.slice()
    .sort((a, b) => (Date.parse(a.dateFrom) - Date.parse(b.dateFrom)))
    .forEach((it) => {
      const dateTime = Date.parse(it.dateFrom);
      const dateEqualHours = new Date(dateTime).setHours(12, 0, 0, 0);

      if (days.has(dateEqualHours)) {
        days.get(dateEqualHours).push(it);

      } else {
        const newArr = [];

        newArr.push(it);

        days.set(dateEqualHours, newArr);
      }

    });

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
render(mainTripEvents, createTripDaysList(days));

// const mainTripDays = mainTripEvents.querySelector(`.trip-days`);
// const mainTripEventsList = mainTripDays.querySelector(`.trip-events__list`);

// const mainTripDay = mainTripDays.querySelectorAll(`.day`);

// const mainTripFirstEventsList = mainTripDays.querySelector(`.trip-events__list`);

// render(mainTripFirstEventsList, createTripEditForm(trips[0]));

// console.log(`days `, days);

// for (const oneEventList of mainTripEventsList) {
//   days.forEach((day) => {
//     day.forEach((point) => render(oneEventList, createTripEvent(point)));
//   });
// }
