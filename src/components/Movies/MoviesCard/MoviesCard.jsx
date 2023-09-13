import React, { useState } from "react";
import "./MoviesCard.css";
import Movie from "../../image/movie.svg";
import { useLocation } from "react-router-dom";

function MoviesCard() {
  const [isLike, setIsLike] = useState(false);
  const location = useLocation();

  function hendleLike() {
    setIsLike(!isLike);
  }
  return (
    <li className="movie__blok">
      <img className="movie__img" src={Movie} alt="Картинка фильма" />
      <div className="movie__box">
        <div className="movie__container">
          <h2 className="movie__title">Бег это свобода</h2>
          <button
            type="button"
            className={`movie__like ${isLike ? "movie__like_active" : ""} ${
              location.pathname === "/saved-movies" ? "movie__del" : ""
            }`}
            aria-label="button"
            onClick={hendleLike}
          ></button>
        </div>
        <p className="movie__time">1ч&nbsp;42м</p>
      </div>
    </li>
  );
}

export default MoviesCard;
