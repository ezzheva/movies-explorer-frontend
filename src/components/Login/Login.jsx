import React from "react";
import "./Login.css";
import AuthWithForm from "../AuthWithForm/AuthWithForm";

function Register() {
  return (
    <AuthWithForm
      nameForm="login"
      title="Рады видеть!"
      button="Войти"
      text="Ещё не зарегистрированы?"
      textLink="Регистрация"
      linkTo="/signup"
    >
      <label className="auth__label">
        E-mail
        <input
          className="auth__input"
          type="email"
          name="email"
          placeholder=""
          required
        />
      </label>
      <span className="auth__input-error email-error">
        Что-то пошло не так...
      </span>

      <label className="auth__label">
        Пароль
        <input
          className="auth__input"
          type="password"
          name="password"
          placeholder="Пароль"
          minLength="6"
          required
        />
      </label>
      <span className="auth__input-error password-error">
        Что-то пошло не так...
      </span>
    </AuthWithForm>
  );
}

export default Register;