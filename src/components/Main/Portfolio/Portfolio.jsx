import React from "react";
import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__links">
        <li className="portfolio__link-item">
          <a
            href="https://ezzheva.github.io/how-to-learn"
            target="_blank"
            className="portfolio__link"
            rel="noreferrer"
          >
            Статичный сайт
          </a>
        </li>
        <li className="portfolio__link-item">
          <a
            href="https://ezzheva.github.io/russian-travel"
            target="_blank"
            className="portfolio__link"
            rel="noreferrer"
          >
            Адаптивный сайт
          </a>
        </li>
        <li className="portfolio__link-item">
          <a
            href="https://mesto.ezzheva.nomoreparties.co"
            target="_blank"
            className="portfolio__link"
            rel="noreferrer"
          >
            Одностраничное приложение
          </a>
        </li>
      </ul>
    </section>
  );
}
export default Portfolio;
