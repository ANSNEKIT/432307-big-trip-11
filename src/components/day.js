import {getDatePoint} from '../utils.js';
import {MONTH_NAMES} from '../const.js';
import {createTripEventsList} from './event-list.js';


const createTripDay = (dateMillisecond, count, element) => {
  const markupEventList = createTripEventsList(count, element);

  const date = new Date(dateMillisecond);

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${count}</span>
        <time class="day__date" datetime="${getDatePoint(date)}">${MONTH_NAMES[date.getMonth()]} ${date.getDate()}</time>
      </div>

      ${markupEventList}
    </li>`
  );
};

export {createTripDay};
