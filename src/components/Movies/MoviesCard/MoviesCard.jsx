import React, { useState } from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import * as MainApi from "../../../utils/MainApi";

function MoviesCard({ movie, saveMovies, setSaveMovies, onDelete }) {
  const srcImg = movie.image.url
    ? `https://api.nomoreparties.co/${movie.image.url}`
    : movie.image;

  const [saveBtn, setSaveBtn] = useState(movie.isSaved);
  const location = useLocation();
  const deleteBtn = location.pathname === "/saved-movies";

  function handleClick() {
    if (!deleteBtn) {
      if (saveBtn) {
        handleDeleteMovie(movie);
      } else {
        handleSaveMovie(movie);
      }
    } else {
      onDelete(movie._id);
    }
  }

  function handleSaveMovie(movie) {
    setSaveBtn(false);
    return MainApi.addSavedMovies({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `https://api.nomoreparties.co/${movie.image.url}`,
      trailerLink: movie.trailerLink,
      thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    })
      .then((movie) => {
        setSaveBtn(true);
        setSaveMovies([movie, ...saveMovies]);
        localStorage.setItem(
          "savedMovies",
          JSON.stringify([movie, ...saveMovies])
        );
      })
      .catch((err) => {
        setSaveBtn(false);
        console.error(err);
      });
  }

  function handleDeleteMovie(movie) {
    setSaveBtn(true);
    const findMovie = saveMovies.find((i) => i.movieId === movie.id);
    const movieId = findMovie._id;
    MainApi.deleteMovie(movieId)
      .then(() => {
        setSaveBtn(false);
        setSaveMovies((movie) => movie.filter((m) => m._id !== movieId));
        localStorage.setItem(
          "savedMovies",
          JSON.stringify(saveMovies.filter((item) => item._id !== movieId))
        );
      })
      .catch((err) => {
        console.error(err);
        setSaveBtn(true);
      });
  }

  const formatDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours > 0 ? hours + "ч " : "0ч "}${
      minutes > 0 ? minutes + "м" : "0м"
    }`;
  };
  return (
    <li className="movie__blok">
      <a href={movie.trailerLink} terget="_blank" rel="noreferrer">
        <img className="movie__img" src={srcImg} alt={movie.nameRU} />
      </a>
      <div className="movie__box">
        <div className="movie__container">
          <h2 className="movie__title">{movie.nameRU}</h2>
          <button
            type="button"
            className={`movie__like ${saveBtn ? "movie__like_active" : ""} ${
              location.pathname === "/saved-movies" ? "movie__del" : ""
            }`}
            aria-label="Сохранить фильм в избранное"
            onClick={handleClick}
          ></button>
        </div>
        <p className="movie__time">{formatDuration(movie.duration)}</p>
      </div>
    </li>
  );
}

export default MoviesCard;
