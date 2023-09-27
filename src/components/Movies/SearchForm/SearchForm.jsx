import React, { useState } from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({
  searchWord,
  setSearchWord,
  onSubmit,
  handleToggle,
  isToggle,
}) {
  const [inputError, setInputError] = useState("");
  function handleChange(evt) {
    setSearchWord(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (searchWord.trim() === "") {
      setInputError("Введите ключевое слово");
    } else {
      onSubmit();
      setInputError("");
    }
  }

  return (
    <section className="search">
      <form className="search__form" onSubmit={handleSubmit} noValidate>
        <input
          className="search__input"
          name="search"
          type="text"
          placeholder="Фильм"
          required
          value={searchWord}
          onChange={handleChange}
        />
        <button className="search__button" type="submit" aria-label="Найти" />
      </form>
      {inputError && <span className="search__error">{inputError}</span>}
      <FilterCheckbox handleToggle={handleToggle} isToggle={isToggle} />
    </section>
  );
}
export default SearchForm;
