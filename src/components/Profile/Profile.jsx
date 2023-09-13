import React from "react";
import "./Profile.css";
import Header from "../Header/Header";
import { Link } from "react-router-dom";

function Profile() {
  return (
    <>
      <Header />
      <main>
        <section className="profile">
          <h1 className="profile__title">Привет, Виталий!</h1>
          <form className="profile__form">
            <label className="profile__label">
              <span className="profile__label-title">Имя</span>
              <input
                className="profile__input"
                type="text"
                name="name"
                placeholder="Имя"
                required
              ></input>
            </label>

            <label className="profile__label">
              <span className="profile__label-title">E-mail</span>
              <input
                className="profile__input"
                type="email"
                name="email"
                placeholder="Email"
                required
              ></input>
            </label>

            <div className="profile__button">
              <button className="profile__button-edit" type="button">
                Редактировать
              </button>
              <Link to="/" className="profile__link-exit">
                Выйти из&nbsp;аккаунта
              </Link>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}

export default Profile;
