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
        {!loggedIn ? (
          <nav className="header__blok">
            <Link to="/signup" className="header__link header__link_register">
              Регистрация
            </Link>
            <Link to="/signin" className="header__link header__link_login">
              Войти
            </Link>
          </nav>
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
