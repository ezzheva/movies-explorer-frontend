import React, { useState } from "react";
import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import BurgerMenu from "../Navigation/BurgerMenu/BurgerMenu";

function Header() {
  /**статус входа */
  const [loggedIn, setLoggedIn] = useState(false);
  const location = useLocation();

  return (
    <header className="Header">
      <div
        className={`header ${location.pathname !== "/" ? "header_white" : ""}`}
      >
        <Link className="header__logo" to="/" />
        {loggedIn ? (
          <ul className="header__blok">
            <li>
              <Link to="/signup" className="header__link header__link_register">
                Регистация
              </Link>
            </li>
            <li>
              <Link to="/signin" className="header__link header__link_login">
                Войти
              </Link>
            </li>
          </ul>
        ) : (
          <>
            <Navigation />
            <BurgerMenu />
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
