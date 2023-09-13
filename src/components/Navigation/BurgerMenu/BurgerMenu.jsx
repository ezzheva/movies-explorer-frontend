import React, { useState } from "react";
import "./BurgerMenu.css";
import { Link, useLocation } from "react-router-dom";
import IconProfile from "../../image/icon__COLOR_icon-main.svg";

function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  /**открытие бургер меню */
  function hendleMenu() {
    setIsOpen(!isOpen);
  }
  /** проверка активность страницы на которой находимся */
  function activeLink(currentPath, targetPath) {
    return currentPath === targetPath ? "header__burger-link_active" : "";
  }

  return (
    <>
      {!isOpen ? (
        <button
          className={`header__burger-button ${
            location.pathname !== "/" ? "header__burger-button_black" : ""
          }`}
          type="button"
          aria-label="Открыть меню"
          onClick={hendleMenu}
        />
      ) : (
        <>
          <div className="header__burger-overlay">
            <nav className="header__burger-box">
              <ul className="header__burger-links">
                <li>
                  <Link
                    to="/"
                    className={`header__burger-link ${activeLink(
                      location.pathname,
                      "/"
                    )}`}
                  >
                    Главная
                  </Link>
                </li>
                <li>
                  <Link
                    to="/movies"
                    className={`header__burger-link ${activeLink(
                      location.pathname,
                      "/movies"
                    )}`}
                  >
                    Фильмы
                  </Link>
                </li>
                <li>
                  <Link
                    to="/saved-movies"
                    className={`header__burger-link ${activeLink(
                      location.pathname,
                      "/saved-movies"
                    )}`}
                  >
                    Сохранённые фильмы
                  </Link>
                </li>
              </ul>
              <button
                className="header__burger-close"
                type="button"
                aria-label="Закрыть меню"
                onClick={hendleMenu}
              />

              <Link to="/profile" className="header__burger-link-profile">
                Аккаунт
                <div className="header__burger-link-profile-img">
                  <img src={IconProfile} alt="Иконка профиля" />
                </div>
              </Link>
            </nav>
          </div>
        </>
      )}
    </>
  );
}

export default BurgerMenu;
