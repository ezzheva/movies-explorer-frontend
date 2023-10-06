import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import * as MainApi from "../../utils/MainApi";
import { useEffect, useState } from "react";
import { filterWord, filterShort } from "../../utils/filterMovies";

function SavedMovies({ loggedIn }) {
  const [isLoading, setIsLoading] = useState(true);
  const [saveMovies, setSaveMovies] = useState([]); //сохраненные фильмы

  const [isToggle, setIsToggle] = useState(false); // состояние чекбокса

  const [searchWord, setSearchWord] = useState("");
  const [errorSearch, setErrorSearch] = useState(""); // стейт-переменная для отображения ошибки

  useEffect(() => {
    setIsLoading(true);
    MainApi.getMovies()
      .then((res) => {
        setSaveMovies(res);
        localStorage.setItem("savedMovies", JSON.stringify(res));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  function handleDeleteMovie(movieId) {
    MainApi.deleteMovie(movieId)
      .then(() => {
        const findMovieById = saveMovies.filter(
          (movie) => movie._id !== movieId
        );
        setSaveMovies(findMovieById);
        localStorage.setItem(
          "savedMovies",
          JSON.stringify(saveMovies.filter((item) => item._id !== movieId))
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const storageSave = JSON.parse(localStorage.getItem("savedMovies")) || [];

  function handleSubmit() {
    if (storageSave) {
      const filteredMovies = filterWord(storageSave, searchWord);
      const filteredCheckbox = filterShort(filteredMovies, isToggle);
      setSaveMovies(filteredCheckbox);
      if (filteredCheckbox.length === 0) {
        setErrorSearch("Ничего не найдено");
      } else {
        setErrorSearch("");
      }
    }
  }

  //Функция для чекбокса
  function handleToggle(evt) {
    const checkbox = evt.target.checked;
    setIsToggle(checkbox);
    localStorage.setItem("checked", checkbox);
    const filteredMovies = filterWord(storageSave, searchWord);
    const filteredCheckbox = filterShort(filteredMovies, checkbox);
    setSaveMovies(filteredCheckbox);
    if (filteredCheckbox.length === 0) {
      setErrorSearch("Ничего не найдено");
    } else {
      setErrorSearch("");
    }
  }

  return (
    <>
      <Header loggedIn={!loggedIn} />
      <main className="main">
        <SearchForm
          onSubmit={handleSubmit}
          searchWord={searchWord}
          setSearchWord={setSearchWord}
          handleToggle={handleToggle}
        />
        <MoviesCardList
          movies={saveMovies}
          isLoading={isLoading}
          onDelete={handleDeleteMovie}
          errorSearch={errorSearch}
        />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
