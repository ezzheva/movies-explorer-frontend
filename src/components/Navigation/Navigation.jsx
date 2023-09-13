import React from "react";
import "./Navigation.css";
import { Link, useLocation } from "react-router-dom";

function Navigation() {
  const location = useLocation();
  const replaceColor = location.pathname !== "/";
  return (
    <>
      <nav className="header__movies">
        <Link
          to="/movies"
          className={`header__movies-link  ${
            replaceColor ? "header__movies-link_black" : ""
          }`}
        >
          Фильмы
        </Link>
        <Link
          to="/saved-movies"
          className={`header__movies-link  ${
            replaceColor ? "header__movies-link_black" : ""
          }`}
        >
          Сохранённые фильмы
        </Link>
      </nav>

      <Link
        to="/profile"
        className={`header__link header__movies header__link-profile ${
          replaceColor ? "header__link-profile_white" : ""
        }`}
      >
        Аккаунт
      </Link>
    </>
  );
}

export default Navigation;
