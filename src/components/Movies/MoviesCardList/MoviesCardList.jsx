import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../../Preloader/Preloader";

function MoviesCardList({
  movies,
  isLoading,
  errorSearch,
  saveMovies,
  setSaveMovies,
  onDelete,
}) {
  const moviesElements = movies.map((movie) => (
    <MoviesCard
      key={movie.id || movie._id}
      movie={movie}
      saveMovies={saveMovies}
      setSaveMovies={setSaveMovies}
      onDelete={onDelete}
    />
  ));

  return (
    <section className="movies">
      <span className="movies__error">{errorSearch}</span>
      {isLoading ? <Preloader /> : <ul className="movie">{moviesElements}</ul>}
    </section>
  );
}

export default MoviesCardList;
