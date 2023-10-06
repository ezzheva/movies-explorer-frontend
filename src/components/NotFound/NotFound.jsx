import React from "react";
import "./NotFound.css";

function NotFound({ onBackPage }) {
  return (
    <section className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__subtitle">Страница не найдена</p>
      <button className="not-found__button" type="button" onClick={onBackPage}>
        Назад
      </button>
    </section>
  );
}

export default NotFound;
