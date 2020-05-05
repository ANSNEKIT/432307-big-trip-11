import FilterComponent from '../components/filters.js';
import {FilterType} from '../const.js';
import {render, replace, renderPosition} from '../utils/render.js';
import {getPointsByFilter} from '../utils/filter.js';

export default class FilterController {
  constructor(container, pointModel) {
    this._container = container;
    this._pointModel = pointModel;

    this._activeFilterType = FilterType.EVERYTHING;
    this._filterComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._pointModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;
    const allPoints = this._pointModel.getPoints();
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        // count: getPointsByFilter(allPoints, filterType).length,
        checked: filterType === this._activeFilterType,
      };
    });

    const oldComponent = this._filterComponent;

    this._filterComponent = new FilterComponent(filters);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(container, this._filterComponent, renderPosition.BEFOREEND);
    }
  }

  _onFilterChange(filterType) {
    this._activeFilterType = filterType;
  }

  _onDataChange() {
    this.render();
  }
}