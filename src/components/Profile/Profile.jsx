import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import * as MainApi from "../../utils/MainApi";
import useForm from "../../hooks/useForm";
import { REGEX_NAME, REGEX_EMAIL } from "../../utils/constants";

function Profile({
  loggedIn,
  setLoggedIn,
  setCurrentUser,
  isSuccessMessage,
  setIsSuccessMessage,
  isLoading,
  setIsLoading,
}) {
  const navigate = useNavigate();
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, setValues } = useForm({
    name: "",
    email: "",
  });
  const [isSubmit, setIsSubmit] = useState(false); //кнопка редактирования
  const [isNameChanged, setIsNameChanged] = useState(false); //состояние изменения имени
  const [isEmailChanged, setIsEmailChanged] = useState(false); //состояние изменения email

  /**показываем кнопку сохранить */
  function handleSaveButton(evt) {
    evt.preventDefault();
    setIsSubmit(true);
    setIsSuccessMessage("");
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    setIsLoading(true);
    handleUpdateUser(values);
  }

  /**редактирование провиля */
  function handleUpdateUser(data) {
    const jwt = localStorage.getItem("token");
    MainApi.patchUserInfo(data, jwt)
      .then(() => {
        setCurrentUser(data);
        setIsSuccessMessage("Данные обновлены успешно!");
      })
      .catch((err) => {
        if (err === 409) {
          setIsSuccessMessage("При обновлении профиля произошла ошибка");
        } else {
          setIsSuccessMessage("Пользователь с таким email уже существует");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  /**запрос прошел убираем кнопку */
  useEffect(() => {
    setValues(currentUser);
    setIsSubmit(false);
    setIsNameChanged(false);
    setIsEmailChanged(false);
    setIsSuccessMessage("");
  }, [currentUser, setValues]);

  /**удаляем токен, выходим из системы */
  function singOut() {
    localStorage.clear();
    navigate("/");
    setLoggedIn(false);
    setCurrentUser({});
  }

  function handleChangeInput(evt) {
    handleChange(evt);
    setIsSuccessMessage("");

    if (evt.target.name === "name" && evt.target.value !== currentUser.name) {
      setIsNameChanged(true);
    } else if (
      evt.target.name === "email" &&
      evt.target.value !== currentUser.email
    ) {
      setIsEmailChanged(true);
    } else {
      setIsNameChanged(false);
      setIsEmailChanged(false);
    }
  }
  return (
    <>
      <Header loggedIn={!loggedIn} />
      <main>
        <section className="profile">
          <h1 className="profile__title">Привет, {currentUser.name}!</h1>
          <form className="profile__form" onSubmit={handleSubmit}>
            <label className="profile__label">
              <span className="profile__label-title">Имя</span>
              <input
                className="profile__input"
                type="text"
                name="name"
                placeholder="Имя"
                minLength="2"
                maxLength="40"
                required
                value={values.name || ""}
                onChange={handleChangeInput}
                pattern={REGEX_NAME}
                disabled={!isSubmit || isLoading}
              ></input>
            </label>
            {!isValid && <span className="profile__error">{errors.name}</span>}

            <label className="profile__label">
              <span className="profile__label-title">E-mail</span>
              <input
                className="profile__input"
                type="email"
                name="email"
                placeholder="Email"
                minLength="2"
                maxLength="40"
                required
                value={values.email || ""}
                onChange={handleChangeInput}
                pattern={REGEX_EMAIL}
                disabled={!isSubmit || isLoading}
              ></input>
            </label>
            {!isValid && <span className="profile__error">{errors.email}</span>}

            <div className="profile__button-box">
              <span className="profile__error">{isSuccessMessage}</span>

              {!isSubmit && (
                <>
                  <button
                    className="profile__button-edit"
                    type="button"
                    onClick={handleSaveButton}
                    disabled={isLoading}
                  >
                    Редактировать
                  </button>
                  <Link to="/" className="profile__link-exit" onClick={singOut}>
                    Выйти из&nbsp;аккаунта
                  </Link>
                </>
              )}

              {isSubmit && (
                <button
                  className="profile__button-save"
                  type="submit"
                  disabled={
                    !isValid ||
                    (!isNameChanged && !isEmailChanged) ||
                    isSuccessMessage
                  }
                >
                  Сохранить
                </button>
              )}
            </div>
          </form>
        </section>
      </main>
    </>
  );
}

export default Profile;
