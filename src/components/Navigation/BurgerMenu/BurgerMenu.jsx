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
    return currentPath === targetPath ? "burger__link_active" : "";
  }

  return (
    <>
      {!isOpen ? (
        <button
          className={`burger__button ${
            location.pathname !== "/" ? "burger__button_black" : ""
          }`}
          type="button"
          aria-label="Открыть меню"
          onClick={hendleMenu}
        />
      ) : (
        <>
          <div className="burger__overlay">
            <nav className="burger__box">
              <ul className="burger__links">
                <li>
                  <Link
                    to="/"
                    className={`burger__link ${activeLink(
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
                    className={`burger__link ${activeLink(
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
                    className={`burger__link ${activeLink(
                      location.pathname,
                      "/saved-movies"
                    )}`}
                  >
                    Сохранённые фильмы
                  </Link>
                </li>
              </ul>
              <button
                className="burger__close"
                type="button"
                aria-label="Закрыть меню"
                onClick={hendleMenu}
              />

              <Link to="/profile" className=" burger__link-profile">
                Аккаунт
                <div className="burger__link-profile-img">
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
