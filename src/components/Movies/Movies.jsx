import React, { useContext, useEffect, useState } from "react";
import Header from "../Header/Header";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import MoreMovies from "./MoreMovies/MoreMovies";
import * as MoviesApi from "../../utils/MoviesApi";
import { filterWordMovies, filterShortMovies } from "../../utils/filterMovies";

function Movies({ loggedIn }) {
  const [movies, setMovies] = useState(
    JSON.parse(localStorage.getItem("movies")) || []
  ); //все фильмы
  const [filterMovies, setFilterMovies] = useState(
    JSON.parse(localStorage.getItem("filtermovies")) || []
  );

  const [isToggle, setIsToggle] = useState(
    JSON.parse(localStorage.getItem("checked")) || false
  ); // состояние чекбокса

  const [searchWord, setSearchWord] = useState(
    localStorage.getItem("searchWord") || ""
  );

  // const [savedMovies, setSavedMovies] = useState([]); //ссохраненные фильны

  const [isLoading, setIsLoading] = useState(false); //состояние запроса
  const [errorSearch, setErrorSearch] = useState(""); // стейт-переменная для отображения ошибки




  function handleSubmit() {
    const storage = localStorage.getItem("movies");
    if (storage) {
      const filteredMovies = filterWordMovies(JSON.parse(storage), searchWord);
      const filteredCheckbox = filterShortMovies(filteredMovies, isToggle);

      localStorage.setItem("searchWord", searchWord);
      localStorage.setItem("filtermovies", JSON.stringify(filteredCheckbox));
      setFilterMovies(filteredCheckbox);
      if (filteredCheckbox.length === 0) {
        setErrorSearch("Ничего не найдено");
      } else {
        setErrorSearch("");
      }
    } else {
      setIsLoading(true);
      MoviesApi.getInitialMovies()
        .then((res) => {
          const filteredMovies = filterWordMovies(res, searchWord);
          const filteredCheckbox = filterShortMovies(filteredMovies, isToggle);
          setMovies(res);
          setFilterMovies(filteredCheckbox);
          // Сохраняем фильмы в localStorage
          localStorage.setItem("movies", JSON.stringify(res));
          localStorage.setItem(
            "filtermovies",
            JSON.stringify(filteredCheckbox)
          );
          localStorage.setItem("checked", isToggle);
          localStorage.setItem("searchWord", searchWord);
          if (filteredCheckbox.length === 0) {
            setErrorSearch("Ничего не найдено");
          } else {
            setErrorSearch("");
          }
        })
        .catch((err) => {
          setErrorSearch(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
          );
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  //Функция для чекбокса
  function handleToggle(evt) {
    const checkbox = evt.target.checked;
    setIsToggle(checkbox);
    localStorage.setItem("checked", checkbox);
    const filteredCheckbox = filterShortMovies(movies, checkbox);
    setFilterMovies(filteredCheckbox);
    localStorage.setItem("filtermovies", JSON.stringify(filteredCheckbox));
  }

  //Функция, определяющая сколько карточек отобразить
  // function getFilmsToShow() {
  //   return window.innerWidth >= 550 ? 12 : 5;
  // }

  //Функция, которая добавляет поределённое количество фильмов к найденным фильмам
  // function handleMoreFilms() {
  //   const newFilmsToShow =
  //     window.innerWidth >= 550 ? filmsToShow + 3 : filmsToShow + 2;
  //   setFilmsToShow(newFilmsToShow);
  // }

  return (
    <>
      <Header loggedIn={!loggedIn} />
      <main className="main">
        <SearchForm
          onSubmit={handleSubmit}
          searchWord={searchWord}
          setSearchWord={setSearchWord}
          handleToggle={handleToggle}
          isToggle={isToggle}
        />
        <MoviesCardList
          movies={filterMovies}
          isLoading={isLoading}
          errorSearch={errorSearch}
        />
         <MoreMovies />
        {/* {!error &&
          filteredMovies.length !== 0 &&
          visibleMoviesCount < filteredMovies.length && (
            <MoviesMoreButton
              windowWidth={windowWidth}
              setVisibleMoviesCount={setVisibleMoviesCount}
            />
          )} */}
      </main>
      <Footer />
    </>
  );
}

export default Movies;
