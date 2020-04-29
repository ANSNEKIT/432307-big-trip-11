import DaysListComponent from '../components/days-list.js';
import DayComponent from '../components/day.js';
import PointComponent from '../components/event.js';
import EditFormComponent from '../components/edit-form.js';

import {render, renderPosition, replace, remove} from '../utils/render.js';

const renderEvent = (container, point) => {
  const replaceTaskToEdit = () => {
    replace(editFormComponent, pointComponent);
  };

  const replaceEditToTask = () => {
    replace(pointComponent, editFormComponent);
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToTask();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const pointComponent = new PointComponent(point);
  pointComponent.setDownButtonClickHandler(() => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const editFormComponent = new EditFormComponent(point);
  editFormComponent.setSubmitHandler((evt) => {
    evt.preventDefault();
    replaceEditToTask();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  editFormComponent.setDeleteClickhandler(() => {
    remove(editFormComponent);
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  editFormComponent.setUpClickhandler(() => {
    replaceEditToTask();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(container, pointComponent, renderPosition.BEFOREEND);
};

const renderTripDays = (container, routePoints) => {
  const days = new Map();

  routePoints.slice()
  .sort((a, b) => (Date.parse(a.dateFrom) - Date.parse(b.dateFrom)))
  .forEach((it) => {
    const dateTime = Date.parse(it.dateFrom);
    const dateEqualHours = new Date(dateTime).setHours(12, 0, 0, 0);

    if (days.has(dateEqualHours)) {
      days.get(dateEqualHours).push(it);

    } else {
      days.set(dateEqualHours, [it]);
    }

    return days;
  });

  const daysList = new DaysListComponent();

  render(container, daysList, renderPosition.BEFOREEND);

  let count = 0;
  days.forEach((event, key) => {
    count++;

    const tripDay = new DayComponent(key, count);
    const eventsList = tripDay.getElement().querySelector(`.trip-events__list`);

    render(daysList.getElement(), tripDay, renderPosition.BEFOREEND);

    event.forEach((point) => {
      renderEvent(eventsList, point);
    });

  });

};

export default class TripController {
  constructor(container) {
    this.container = container;
  }

  render(points) {
    renderTripDays(this.container, points);
  }
}
