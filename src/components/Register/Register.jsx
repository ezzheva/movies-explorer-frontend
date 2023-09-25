import React, { useEffect } from "react";
import "./Register.css";
import AuthWithForm from "../AuthWithForm/AuthWithForm";
import useForm from "../../hooks/useForm";

function Register({ onRegister, loggedIn }) {
  const { values, handleChange, setValues } = useForm({
    name: "",
    email: "",
    password: "",
  });

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(values);
  }

  useEffect(() => {
    setValues({ name: "", email: "", password: "" });
  }, [setValues]);

  return (
    <AuthWithForm
      nameForm="register"
      title="Добро пожаловать!"
      button="Зарегистрироваться"
      text="Уже зарегистрированы?"
      textLink="Войти"
      linkTo="/signin"
      onSubmit={handleSubmit}
    >
      <label className="auth__label">
        Имя
        <input
          className="auth__input"
          type="text"
          name="name"
          placeholder="Имя"
          minLength="2"
          maxLength="30"
          required
          value={values.name || ""}
          onChange={handleChange}
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
          placeholder="E-mail"
          required
          value={values.email || ""}
          onChange={handleChange}
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
          minLength="4"
          maxLength="30"
          required
          value={values.password || ""}
          onChange={handleChange}
        />
      </label>
      <span className="auth__input-error password-error">
        Что-то пошло не так...
      </span>
    </AuthWithForm>
  );
}

export default Register;
