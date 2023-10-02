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
  onSubmit,
  isValid,
}) {
  return (
    <main>
      <section className="auth">
        <Link to="/" className="auth__logo" />
        <h1 className="auth__title">{title}</h1>
        <form className="auth__form" name={nameForm} onSubmit={onSubmit}>
          {children && <div className="auth__input-login">{children}</div>}

          <div className="auth__button">
            {onSubmit && (
              <button
                type="submit"
                className="auth__submit-button"
                aria-label="submit-button"
                disabled={!isValid}
              >
                {button}
              </button>
            )}
            <p className="auth__text">
              {text}
              <Link to={linkTo} className="auth__link">
                {textLink}
              </Link>
            </p>
          </div>
        </form>
      </section>
    </main>
  );
}

export default AuthWithForm;
