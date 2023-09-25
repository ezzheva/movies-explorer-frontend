import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import * as MainApi from "../../utils/MainApi";
import useForm from "../../hooks/useForm";
import { REGEX_NAME, REGEX_EMAIL } from "../../utils/constants";

function Profile({ loggedIn, setLoggedIn, setCurrentUser }) {
  const navigate = useNavigate();
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, setValues } = useForm({
    name: "",
    email: "",
  });
  const [isSubmit, setIsSubmit] = useState(false); //кнопка редактирования
  const [isSuccessMessage, setIsSuccessMessage] = useState(false); //состояние ошибки

  /**показываем кнопку сохранить */
  function handleSaveButton(evt) {
    evt.preventDefault();
    setIsSubmit(true);
    setIsSuccessMessage(false);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    // if (values.email && values.name) {
    handleUpdateUser(values);
  }
  /**редактирование провиля */
  function handleUpdateUser(data) {
    const jwt = localStorage.getItem("token");
    MainApi.patchUserInfo(data, jwt)
      .then(() => {
        setCurrentUser({
          ...currentUser,
          name: data.name,
          email: data.email,
        });
        setIsSuccessMessage("Данные обновлены успешно!"); // Показать успешное сообщение
      })
      .catch((err) => {
        if (err.status === 409) {
          setIsSuccessMessage("При обновлении профиля произошла ошибка");
        } else {
          setIsSuccessMessage("Пользователь с таким email уже существует");
        }
      });
  }

  /**запрос прошел убираем кнопку */
  useEffect(() => {
    if (currentUser) {
      setValues(currentUser);
      setIsSubmit(false);
    }
  }, [currentUser, setValues]);

  /**удаляем токен, выходим из системы */
  function singOut() {
    localStorage.removeItem("token");
    navigate("/");
    setLoggedIn(false);
    setCurrentUser({});
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
                onChange={handleChange}
                pattern={REGEX_NAME}
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
                onChange={handleChange}
                pattern={REGEX_EMAIL}
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
                  >
                    Редактировать
                  </button>
                  <Link to="/" className="profile__link-exit" onClick={singOut}>
                    Выйти из&nbsp;аккаунта
                  </Link>
                </>
              )}

              {isSubmit && (
                <button className="profile__button-save" type="submit">
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
