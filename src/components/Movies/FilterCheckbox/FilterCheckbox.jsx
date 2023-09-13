import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox() {
  return (
    <div className="filter-checkbox">
      <input className="filter-checkbox__input" type="checkbox" id="switch" />
      <label className="filter-checkbox__label" for="switch"></label>
      <p className="filter-checkbox__text">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;
