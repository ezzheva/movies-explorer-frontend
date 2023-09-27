import React from "react";
import "./MoreMovies.css";

function MoreMovies({ handleMoreButton }) {
  return (
    <section className="more-movies">
      <button
        className="more-movies__button"
        aria-label="button-more"
        type="button"
        handleMoreButton={handleMoreButton}
      >
        Ещё
      </button>
    </section>
  );
}

export default MoreMovies;
