import React from "react";
import "./MoreMovies.css";

function MoreMovies() {
  return (
    <section className="more-movies">
      <button
        className="more-movies__button"
        aria-label="button-more"
        type="button"
      >
        Ещё
      </button>
    </section>
  );
}

export default MoreMovies;
