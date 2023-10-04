import React, { useEffect, useState } from "react";
import "./Register.css";
import AuthWithForm from "../AuthWithForm/AuthWithForm";
import useForm from "../../hooks/useForm";
import { REGEX_NAME, REGEX_EMAIL } from "../../utils/constants";

function Register({ onRegister, isSuccessMessage, setIsSuccessMessage }) {
  const { values, handleChange, setValues, errors, isValid } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false); // Состояние для отслеживания загрузки данных

  function handleSubmit(evt) {
    evt.preventDefault();
    setIsLoading(true); // Устанавливаем состояние загрузки в true
    onRegister(values).finally(() => {
      setIsLoading(false); // После завершения запроса устанавливаем состояние загрузки в false
    });
  }

  // function handleSubmit(evt) {
  //   evt.preventDefault();
  //   onRegister(values);
  // }

  useEffect(() => {
    setValues({ name: "", email: "", password: "" });
  }, [setValues]);

  function handleChangeInput(evt) {
    handleChange(evt);
    setIsSuccessMessage("");
  }

  return (
    <AuthWithForm
      nameForm="register"
      title="Добро пожаловать!"
      button="Зарегистрироваться"
      text="Уже зарегистрированы?"
      textLink="Войти"
      linkTo="/signin"
      onSubmit={handleSubmit}
      isValid={isValid && !isLoading}
      isSuccessMessage={isSuccessMessage}
    >
      <label className="auth__label">
        Имя
        <input
          className="auth__input"
          type="text"
          name="name"
          placeholder="Введите Имя"
          minLength="2"
          maxLength="40"
          required
          value={values.name || ""}
          onChange={handleChangeInput}
          pattern={REGEX_NAME}
        />
      </label>
      {!isValid && <span className="auth__input-error">{errors.name}</span>}

      <label className="auth__label">
        E-mail
        <input
          className="auth__input"
          type="email"
          name="email"
          placeholder="Введите E-mail"
          required
          value={values.email || ""}
          onChange={handleChangeInput}
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
