import React from "react";
import "./Register.css";
import AuthWithForm from "../AuthWithForm/AuthWithForm";

function Register() {
  return (
    <AuthWithForm
      nameForm="register"
      title="Добро пожаловать!"
      button="Зарегистрироваться"
      text="Уже зарегистрированы?"
      textLink="Войти"
      linkTo="/signin"
    >
      <label className="auth__label">
        Имя
        <input
          className="auth__input"
          type="text"
          name="name"
          placeholder=""
          minLength="2"
          maxLength="30"
          required
        />
      </label>
      <span className="auth__input-error name-error">
        Что-то пошло не так...
      </span>

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
