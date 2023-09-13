import React from "react";
import "./MoviesCardList.css";

function MoviesCardList({ children }) {
  return (
    <section className="movies">
      <ul className="movie">{children}</ul>
    </section>
  );
}

export default MoviesCardList;
