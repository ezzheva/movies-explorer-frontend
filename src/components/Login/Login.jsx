import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import "./Login.css";
import AuthWithForm from "../AuthWithForm/AuthWithForm";
import useForm from "../../hooks/useForm";
import { REGEX_EMAIL } from "../../utils/constants";

function Login({
  onLogin,
  loggedIn,
  isSuccessMessage,
  isLoading,
  setIsLoading,
}) {
  const { values, handleChange, setValues, errors, isValid } = useForm({
    email: "",
    password: "",
  });

  function handleSubmit(evt) {
    evt.preventDefault();
    setIsLoading(true); // Устанавливаем состояние загрузки в true
    onLogin(values).finally(() => {
      setIsLoading(false); // После завершения запроса устанавливаем состояние загрузки в false
    });
  }

  useEffect(() => {
    setValues({ email: "", password: "" });
  }, [setValues]);

  if (loggedIn) {
    return <Navigate to="/movies" />;
  }
  return (
    <AuthWithForm
      nameForm="login"
      title="Рады видеть!"
      button="Войти"
      text="Ещё не зарегистрированы?"
      textLink="Регистрация"
      linkTo="/signup"
      onSubmit={handleSubmit}
      isValid={isValid && !isLoading}
      isSuccessMessage={isSuccessMessage}
    >
      <label className="auth__label">
        E-mail
        <input
          className="auth__input"
          type="email"
          name="email"
          placeholder="Введите E-mail"
          required
          onChange={handleChange}
          value={values.email || ""}
          pattern={REGEX_EMAIL}
        />
        {!isValid && <span className="auth__input-error">{errors.email}</span>}
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
          onChange={handleChange}
          value={values.password || ""}
        />
        {!isValid && (
          <span className="auth__input-error">{errors.password}</span>
        )}
      </label>
    </AuthWithForm>
  );
}

export default Login;
