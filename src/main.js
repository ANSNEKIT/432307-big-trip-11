// eslint-disable-next-line no-unused-expressions
`use strict`;

import InfoMainComponent from './components/info-main.js';
import InfoCostComponent from './components/info-cost.js';
import MenuComponent from './components/menu.js';
import FilterComponent from './components/filters.js';
import SortComponent from './components/sort.js';

import DaysListComponent from './components/days-list.js';
import DayComponent from './components/day.js';
import PointComponent from './components/event.js';
import EditFormComponent from './components/edit-form.js';

import {filters} from './mock/filters.js';
import {generateTripPoints} from './mock/trip-point.js';
import {render, renderPosition} from './utils.js';

const TRIP_EVENTS = 20;

const trips = generateTripPoints(TRIP_EVENTS);

const header = document.querySelector(`.page-header`);
const headerTripMain = header.querySelector(`.trip-main`);

render(headerTripMain, new InfoMainComponent().getElement(), renderPosition.AFTERBEGIN);

const headerTripInfo = header.querySelector(`.trip-info`);

render(headerTripInfo, new InfoCostComponent().getElement(), renderPosition.BEFOREEND);

const headerTripControls = header.querySelector(`.trip-controls`);

render(headerTripControls, new MenuComponent().getElement(), renderPosition.AFTERBEGIN);

render(headerTripControls, new FilterComponent(filters).getElement(), renderPosition.AFTERBEGIN);

const mainTripEvents = document.querySelector(`.trip-events`);

render(mainTripEvents, new SortComponent().getElement(), renderPosition.AFTERBEGIN);

const renderTripDays = (tripsArr) => {
  const daysMap = new Map();

  tripsArr
  .slice()
  .sort((a, b) => (Date.parse(a.dateFrom) - Date.parse(b.dateFrom)))
  .forEach((it) => {
    const dateTime = Date.parse(it.dateFrom);
    const dateEqualHours = new Date(dateTime).setHours(12, 0, 0, 0);

    if (daysMap.has(dateEqualHours)) {
      daysMap.get(dateEqualHours).push(it);

    } else {
      const newArr = [];

      newArr.push(it);

      daysMap.set(dateEqualHours, newArr);
    }

    return daysMap;

  });

  const daysList = new DaysListComponent();

  render(mainTripEvents, daysList.getElement(), renderPosition.BEFOREEND);

  // console.log(daysMap);

  let count = 0;

  daysMap.forEach((day, key) => {
    count++;

    const tripDay = new DayComponent(key, count);
    const eventsList = tripDay.getElement().querySelector(`.trip-events__list`);
    // const points = day;

    render(daysList.getElement(), tripDay.getElement(), renderPosition.BEFOREEND);

    day.map((point) => {
      const onRollupBtn = () => {
        eventsList.replaceChild(editFormComponent.getElement(), pointComponent.getElement());
      };

      const onEditFormSubmit = (evt) => {
        evt.preventDefault();
        eventsList.replaceChild(pointComponent.getElement(), editFormComponent.getElement());
      };

      const pointComponent = new PointComponent(point);
      const rollupBtn = pointComponent.getElement().querySelector(`.event__rollup-btn`);
      rollupBtn.addEventListener(`click`, onRollupBtn);

      const editFormComponent = new EditFormComponent(point);
      const editForm = editFormComponent.getElement().querySelector(`form.event--edit`);
      editForm.addEventListener(`submit`, onEditFormSubmit);

      return render(eventsList, pointComponent.getElement(), renderPosition.BEFOREEND);
    });

  });

};

renderTripDays(trips);
