import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  const navigate = useNavigate();

  function goBackPage() {
    navigate(-1);
  }

  return (
    <section className="not-found">
      <h3 className="not-found__title">404</h3>
      <p className="not-found__subtitle">Страница не найдена</p>
      <button
        className="not-found__button"
        type="botton"
        aria-label=""
        onClick={goBackPage}
      >
        Назад
      </button>
    </section>
  );
}

export default NotFound;
