// eslint-disable-next-line no-unused-expressions
`use strict`;

import InfoMainComponent from './components/info-main.js';
import InfoCostComponent from './components/info-cost.js';
import MenuComponent from './components/menu.js';
import FilterComponent from './components/filters.js';
import SortComponent from './components/sort.js';

import PointsModel from './models/points.js';

import TripController from './controllers/trip.js';

import {filters} from './mock/filters.js';
import {generateTripPoints} from './mock/trip-point.js';
import {getRandomInteger} from './utils/common.js';
import {render, renderPosition} from './utils/render.js';

const TRIP_EVENTS = 20;

const trips = generateTripPoints(TRIP_EVENTS);

const pointsModel = new PointsModel();
pointsModel.setPoints(trips);

const header = document.querySelector(`.page-header`);
const headerTripMain = header.querySelector(`.trip-main`);

render(headerTripMain, new InfoMainComponent(), renderPosition.AFTERBEGIN);

const headerTripInfo = header.querySelector(`.trip-info`);

render(headerTripInfo, new InfoCostComponent(getRandomInteger(100, 5000)), renderPosition.BEFOREEND);

const headerTripControls = header.querySelector(`.trip-controls`);

render(headerTripControls, new MenuComponent(), renderPosition.AFTERBEGIN);

render(headerTripControls, new FilterComponent(filters), renderPosition.AFTERBEGIN);

const mainTripEvents = document.querySelector(`.trip-events`);

render(mainTripEvents, new SortComponent(), renderPosition.AFTERBEGIN);

const daysController = new TripController(mainTripEvents, pointsModel);

daysController.render(trips);
