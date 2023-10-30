import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import MoreMovies from "./MoreMovies/MoreMovies";
import * as MoviesApi from "../../utils/MoviesApi";
import { filterWord, filterShort } from "../../utils/filterMovies";
import * as MainApi from "../../utils/MainApi";

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

  const [isLoading, setIsLoading] = useState(false); //состояние запроса
  const [errorSearch, setErrorSearch] = useState(""); // переменная для отображения ошибки

  const [displayedMovies, setDisplayedMovies] = useState(0);

  const [saveMovies, setSaveMovies] = useState(
    JSON.parse(localStorage.getItem("savedMovies")) || []
  ); //сохраненные фильмы

  function handleSubmit() {
    const storage = localStorage.getItem("movies");
    if (storage) {
      const filteredMovies = filterWord(JSON.parse(storage), searchWord);
      const filteredCheckbox = filterShort(filteredMovies, isToggle);
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
          const filteredMovies = filterWord(res, searchWord);
          const filteredCheckbox = filterShort(filteredMovies, isToggle);
          setMovies(res);
          setFilterMovies(filteredCheckbox);

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
        })
        .finally(() => {
          setIsLoading(false);
        });

      MainApi.getMovies()
        .then((res) => {
          setSaveMovies(res);
          localStorage.setItem("savedMovies", JSON.stringify(res));
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setIsLoading(false));

      setDisplayedMovies(getInitialDisplayedMovies());
    }
  }

  const moviesSave = filterMovies.map((item) => {
    const isSaved =
      saveMovies.find((saveMovie) => saveMovie.movieId === item.id) !==
      undefined;
    return { ...item, isSaved };
  });

  //Функция для чекбокса
  function handleToggle(evt) {
    const checkbox = evt.target.checked;
    setIsToggle(checkbox);
    localStorage.setItem("checked", checkbox);
    const filteredMovies = filterWord(movies, searchWord);
    const filteredCheckbox = filterShort(filteredMovies, checkbox);
    setFilterMovies(filteredCheckbox);
    localStorage.setItem("filtermovies", JSON.stringify(filteredCheckbox));
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    setDisplayedMovies(getInitialDisplayedMovies());

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function handleResize() {
    setDisplayedMovies(getInitialDisplayedMovies());
  }

  function getInitialDisplayedMovies() {
    if (window.innerWidth >= 768) {
      return 16;
    } else if (window.innerWidth < 768 && window.innerWidth >= 600) {
      return 8;
    } else {
      return 5;
    }
  }

  function handleMoreButton() {
    const newDisplayedMovies =
      window.innerWidth >= 768 ? displayedMovies + 4 : displayedMovies + 2;

    if (newDisplayedMovies > filterMovies.length) {
      setDisplayedMovies(filterMovies.length);
    } else {
      setDisplayedMovies(newDisplayedMovies);
    }
  }

  const displayedMoviesList = moviesSave.slice(0, displayedMovies);

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
          movies={displayedMoviesList}
          isLoading={isLoading}
          errorSearch={errorSearch}
          saveMovies={saveMovies}
          setSaveMovies={setSaveMovies}
        />
        {displayedMovies < filterMovies.length && (
          <MoreMovies handleMoreButton={handleMoreButton} />
        )}
      </main>
      <Footer />
    </>
  );
}

export default Movies;
