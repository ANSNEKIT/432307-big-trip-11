import PointComponent from '../components/event.js';
import EditFormComponent from '../components/edit-form.js';

import {render, renderPosition, replace} from '../utils/render.js';

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class PointController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._pointComponent = null;
    this._editFormComponent = null;

    this._mode = Mode.DEFAULT;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(point) {
    const oldPointComponent = this._pointComponent;
    const oldEditFormComponent = this._editFormComponent;

    this._pointComponent = new PointComponent(point);
    this._editFormComponent = new EditFormComponent(point);

    this._pointComponent.setMoreInfoButtonClickHandler(() => {
      this._showMoreInfo();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._editFormComponent.setSubmitFormHandler((evt) => {
      evt.preventDefault();
      this._hideMoreInfo();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });

    /* this._editFormComponent.setDeleteClickhandler(() => {
      remove(this._editFormComponent);
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }); */

    this._editFormComponent.setUpClickhandler(() => {
      this._hideMoreInfo();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });

    this._editFormComponent.setFavoritesButtonClickHandler(() => {
      this._onDataChange(this, point, Object.assign({}, point, {
        isFavorite: !point.isFavorite,
      }));
    });

    this._editFormComponent.setTypeEventHandler((evt) => {
      const label = evt.target.value;
      point.type = label;
      this._editFormComponent.rerender();
    });

    this._editFormComponent.setCityHandler((evt) => {
      const city = evt.target.value;
      point.city = city;
      this._editFormComponent.rerender();
    });

    if (oldEditFormComponent && oldPointComponent) {
      replace(this._pointComponent, oldPointComponent);
      replace(this._editFormComponent, oldEditFormComponent);
    } else {
      render(this._container, this._pointComponent, renderPosition.BEFOREEND);
    }

    // render(this._container, this._pointComponent, renderPosition.BEFOREEND);
  }

  /* _replaceTaskToEdit() {
    replace(this._editFormComponent, this._pointComponent);
  }

  _replaceEditToTask() {
    replace(this._pointComponent, this._editFormComponent);
  } */

  _showMoreInfo() {
    this._onViewChange();
    replace(this._editFormComponent, this._pointComponent);
    this._mode = Mode.EDIT;
  }

  _hideMoreInfo() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    // this._editFormComponent.render();
    replace(this._pointComponent, this._editFormComponent);
    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape`) {
      this._hideMoreInfo();
      document.removeEventListener(`keydown`, this._onEscKeyDowm);
    }
  }

  /* _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._replaceEditToTask();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  } */

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._hideMoreInfo();
    }
  }


}
