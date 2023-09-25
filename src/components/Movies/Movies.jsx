import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import MoreMovies from "./MoreMovies/MoreMovies";
import * as MoviesApi from "../../utils/MoviesApi";
import useForm from "../../hooks/useForm";

function Movies({ loggedIn }) {
  const { values, handleChange, errors, isValid, setValues } = useForm({}); //проверка валидации формы
  const [errorSearch, setErrorSearch] = useState(""); // стейт-переменная для отображения ошибки
  const [movies, setMovies] = useState([]); // стейт-переменная для хранения фильмов

  // function handleSabmit() {
  //   const filteredMovies = movies.filter((movies) => {
  //     return movies.nameRU.toLowerCase().includes(value.toLowerCase());
  //   });
  //   localStorage.setItem(JSON.stringify(filteredMovies));
  // }

  return (
    <>
      <Header loggedIn={!loggedIn} />
      <main className="main">
        <SearchForm
          onSubmit={handleSubmit}
          values={values}
          onChange={handleChange}
          isValid={isValid}
          errors={errors}
          isChecked={isChecked}
        />
        <MoviesCardList
          movies={movies}
          isLoading={isLoading}
          errorSearch={errorSearch}
        ></MoviesCardList>
        <MoreMovies />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
