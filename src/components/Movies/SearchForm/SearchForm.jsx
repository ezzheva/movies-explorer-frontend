import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({
  onSubmit,
  values,
  onChange,
  isValid,
  errors,
  isChecked,
}) {
  // function handleChange(e) {
  //   setSearchQueryError (e.target.value);
  // }

  // function handleSubmit(evt) {
  //   evt.preventDefault();
  //   if (!searchQuery) {
  //     setSearchQueryError(true);
  //     setSearchError('');
  //     return;
  //   }
  //   onSearch();
  // }
  return (
    <section className="search">
      <form className="search__form" onSubmit={onSubmit}>
        <input
          className="search__input"
          name="search"
          type="text"
          placeholder="Фильм"
          required
          value={values.search || ""}
          onChange={onChange}
        />
        <button className="search__button" type="submit" aria-label="Найти" />
      </form>
      {!isValid && <span className="search__error">{errors.search}</span>}
      <FilterCheckbox isChecked={isChecked} />
    </section>
  );
}
export default SearchForm;
