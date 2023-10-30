import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox({ isToggle, handleToggle }) {
  return (
    <div className="filter-checkbox">
      <input
        className="filter-checkbox__input"
        type="checkbox"
        id="switch"
        onChange={handleToggle}
        checked={isToggle}
      />
      <label className="filter-checkbox__label" htmlFor="switch"></label>
      <p className="filter-checkbox__text">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;
