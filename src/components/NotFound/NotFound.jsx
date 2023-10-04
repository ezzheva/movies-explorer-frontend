import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  const navigate = useNavigate();

  function goBackPage(evt) {
    evt.preventDefault();
    navigate(-1);
  }

  return (
    <section className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__subtitle">Страница не найдена</p>
      <Link to="" className="not-found__button" onClick={goBackPage}>
        Назад
      </Link>
    </section>
  );
}

export default NotFound;
