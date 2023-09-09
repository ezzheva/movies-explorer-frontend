import React from "react";
import "./Navigation.css";
import { Link, useLocation } from "react-router-dom";

function Navigation() {
  const location = useLocation();
  const replaceColor = location.pathname !== "/";
  return (
    <>
      <nav className="nav__menu">
        <ul className="nav__movies">
          <li>
            <Link
              to="/movies"
              className={`nav__link  ${replaceColor ? "nav__link_black" : ""}`}
            >
              Фильмы
            </Link>
          </li>
          <li>
            <Link
              to="/saved-movies"
              className={`nav__link  ${replaceColor ? "nav__link_black" : ""}`}
            >
              Сохранённые фильмы
            </Link>
          </li>
        </ul>
        <Link
          to="/profile"
          className={`nav__link nav__link-profile ${
            replaceColor ? "nav__link-profile_white" : ""
          }`}
        >
          Аккаунт
        </Link>
      </nav>
    </>
  );
}

export default Navigation;
