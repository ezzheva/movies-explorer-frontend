import React, { useState } from "react";
import "./MoviesCard.css";
//import Movie from "../../image/movie.svg";
import { useLocation } from "react-router-dom";
// import { MOVIES_URL } from "../../../utils/MoviesApi";

function MoviesCard({ movie }) {
  const srcImg = movie.image.url;
  const [isLike, setIsLike] = useState(false);
  const location = useLocation();

  function hendleLike() {
    setIsLike(!isLike);
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
      <a href={movie.trailer} terget="_blank" rel="noreferrer">
        <img
          className="movie__img"
          src={`https://api.nomoreparties.co/${srcImg}`}
          alt={movie.nameRU}
        />
      </a>
      <div className="movie__box">
        <div className="movie__container">
          <h2 className="movie__title">{movie.nameRU}</h2>
          <button
            type="button"
            className={`movie__like ${isLike ? "movie__like_active" : ""} ${
              location.pathname === "/saved-movies" ? "movie__del" : ""
            }`}
            aria-label="button"
            onClick={hendleLike}
          ></button>
        </div>
        <p className="movie__time">{formatDuration(movie.duration)}</p>
      </div>
    </li>
  );
}

export default MoviesCard;
