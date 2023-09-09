import React from "react";
import "./AuthWithForm.css";
import { Link } from "react-router-dom";

function AuthWithForm({
  children,
  nameForm,
  title,
  button,
  text,
  textLink,
  linkTo,
}) {
  return (
    <section className="auth">
      <Link to="/" className="auth__logo" />
      <h1 className="auth__title">{title}</h1>
      <form className="auth__form" name={nameForm}>
        {children}

        <div className="auth__button">
          <button
            type="submit"
            className="auth__submit-button"
            aria-label="submit-button"
          >
            {button}
          </button>
          <p className="auth__text">
            {text}
            <Link to={linkTo} className="auth__text_link">
              {textLink}
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
}

export default AuthWithForm;
