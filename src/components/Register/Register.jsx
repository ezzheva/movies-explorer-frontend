import React, { useEffect } from "react";
import "./Register.css";
import AuthWithForm from "../AuthWithForm/AuthWithForm";
import useForm from "../../hooks/useForm";
import { REGEX_NAME, REGEX_EMAIL } from "../../utils/constants";

function Register({ onRegister }) {
  const { values, handleChange, setValues, errors, isValid } = useForm({
    name: "",
    email: "",
    password: "",
  });

  function handleSubmit(evt) {
    evt.preventDefault();
    if (values.name && values.email && values.password) {
      onRegister(values);
    }
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
          placeholder="Введите Имя"
          minLength="2"
          maxLength="30"
          required
          value={values.name || ""}
          onChange={handleChange}
          pattern={REGEX_NAME}
        />
      </label>
      {!isValid && <span className="auth__input-error">{errors.name}</span>}

      <label className="auth__label">
        E-mail
        <input
          className="auth__input"
          type="email"
          name="Введите email"
          placeholder="E-mail"
          required
          value={values.email || ""}
          onChange={handleChange}
          pattern={REGEX_EMAIL}
        />
      </label>
      {!isValid && <span className="auth__input-error">{errors.email}</span>}

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
      {!isValid && <span className="auth__input-error">{errors.password}</span>}
    </AuthWithForm>
  );
}

export default Register;
