import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
  return (
    <section className="search">
      <form className="search__form">
        <input className="search__input" placeholder="Фильм" required />
        <button className="search__button" type="submit" aria-label="Найти" />
      </form>
      <FilterCheckbox />
    </section>
  );
}
export default SearchForm;
