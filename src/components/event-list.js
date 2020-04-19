import {createTripEditForm} from './edit-form.js';
import {createTripEvent} from './event.js';


const createTripEventsList = (count, points) => {
  const isCount = count === 1;
  const tripEventFirst = createTripEditForm(points[0]);
  const tripEvent = isCount ?
    points.slice(1).map((it) => createTripEvent(it)).join(`\n`) :
    points.map((it) => createTripEvent(it)).join(`\n`);

  return (
    `<ul class="trip-events__list">
      ${isCount ? tripEventFirst : ``}
      ${tripEvent}
    </ul>`
  );
};

export {createTripEventsList};
