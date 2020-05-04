import DaysListComponent from '../components/days-list.js';
import DayComponent from '../components/day.js';

import PointController from './point.js';

import {render, renderPosition} from '../utils/render.js';

/*
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
    // const eventsList = tripDay.getElement().querySelector(`.trip-events__list`);

    render(daysList.getElement(), tripDay, renderPosition.BEFOREEND);

    event.forEach((point) => {
      // renderEvent(eventsList, point);
    });

  });

};
*/


const renderPointsInDay = (eventsList, points, onDataChange) => {
  return points.map((point) => {
    const pointController = new PointController(eventsList, onDataChange);

    pointController.render(point);

    return pointController;
  });
};

export default class TripController {
  constructor(container) {
    this._container = container;

    this._days = new Map();
    this._count = 0;
    this._points = [];
    this._onDataChange = this._onDataChange.bind(this);
    this._showedPointControllers = [];
    this._daysListComponent = new DaysListComponent();
    this._dayComponent = null;
  }

  render(routeTrips) {
    routeTrips
    .slice()
    .sort((a, b) => (Date.parse(a.dateFrom) - Date.parse(b.dateFrom)))
    .forEach((it) => {
      const dateTime = Date.parse(it.dateFrom);
      const dateEqualHours = new Date(dateTime).setHours(12, 0, 0, 0);

      if (this._days.has(dateEqualHours)) {
        this._days.get(dateEqualHours).push(it);
      } else {
        this._days.set(dateEqualHours, [it]);
      }

      return this._days;
    });

    render(this._container, this._daysListComponent, renderPosition.BEFOREEND);

    this._renderDays(this._days);
  }

  _renderDays(days) {
    days.forEach((points, key) => {
      this._points = points;
      this._count++;

      this._dayComponent = new DayComponent(key, this._count);
      const eventsList = this._dayComponent.getElement().querySelector(`.trip-events__list`);

      render(this._daysListComponent.getElement(), this._dayComponent, renderPosition.BEFOREEND);

      const newPoints = renderPointsInDay(eventsList, this._points, this._onDataChange);

      this._showedPointControllers = this._showedPointControllers.concat(newPoints);

    });
  }

  _onDataChange(pointController, oldData, newData) {
    const index = this._points.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._points = [].concat(this._points.slice(0, index), newData, this._points.slice(index + 1));

    pointController.render(this._points[index]);
  }

}
