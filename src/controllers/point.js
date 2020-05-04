import PointComponent from '../components/event.js';
import EditFormComponent from '../components/edit-form.js';

import {render, renderPosition, replace, remove} from '../utils/render.js';

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class PointController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;

    this._pointComponent = null;
    this._editFormComponent = null;

    this._mode = Mode.DEFAULT;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(point) {
    this._pointComponent = new PointComponent(point);
    this._editFormComponent = new EditFormComponent(point);

    this._pointComponent.setMoreInfoButtonClickHandler(() => {
      this._showMoreInfo();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._editFormComponent.setSubmitFormHandler((evt) => {
      evt.preventDefault();
      this._replaceEditToTask();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });

    /* this._editFormComponent.setDeleteClickhandler(() => {
      remove(this._editFormComponent);
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }); */

    this._editFormComponent.setUpClickhandler(() => {
      this._replaceEditToTask();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });

    this._editFormComponent.setFavoritesButtonClickHandler(() => {
      this._onDataChange(this, point, Object.assign({}, point, {
        isFavorite: !point.isFavorite,
      }));
    });

    render(this._container, this._pointComponent, renderPosition.BEFOREEND);
  }

  _replaceTaskToEdit() {
    replace(this._editFormComponent, this._pointComponent);
  }

  _replaceEditToTask() {
    replace(this._pointComponent, this._editFormComponent);
  }

  _showMoreInfo() {
    this._onDataChange();
    replace(this._editFormComponent, this._pointComponent);
    this._mode = Mode.EDIT;
  }

  _hideMoreInfo() {
    replace(this._pointComponent, this._editFormComponent);
    this._mode = Mode.DEFAULT;
  }

  /* _onEscKeyDowm(evt) {
    if (evt.key === `Escape`) {
      this._hideMoreInfo();
      document.removeEventListener(`keydown`, this._onEscKeyDowm);
    }
  } */

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._replaceEditToTask();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._hideMoreInfo();
    }
  }


}
