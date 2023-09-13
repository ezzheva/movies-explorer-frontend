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
          placeholder="E-mail"
          required
        />
        <span className="auth__input-error email-error">
          Что-то пошло не так...
        </span>
      </label>

      <label className="auth__label">
        Пароль
        <input
          className="auth__input"
          type="password"
          name="password"
          placeholder="Пароль"
          minLength="4"
          maxLength="30"
          required
        />
        <span className="auth__input-error password-error">
          Что-то пошло не так...
        </span>
      </label>
    </AuthWithForm>
  );
}

export default Register;
