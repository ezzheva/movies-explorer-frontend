import React from "react";
import "./AboutMe.css";
import MePhoto from "../../image/me_photo.jpg";

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__info">
        <div className="about-me__box ">
          <p className="about-me__box-name">Ирина</p>
          <p className="about-me__box-jop">
            Фронтенд-разработчик, 33&nbsp;года
          </p>
          <p className="about-me__box-about">
            Я проживаю в г. Москва, люблю этот город так же, как и заниматься
            frontent&minus;разработкой. После курса планирую полностью,
            посвяться себя любимому занятию. Никогда не сижу на месте, нравиться
            развиваться, общаться, узнавать что-то новое. Уменя есть любимая
            семья, с которой легко можно отправиться в парк, на горнолыжный
            склон, или посетить интересный музей динозавров.
          </p>
          <a
            href="https://github.com/ezzheva"
            className="about-me__link"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <img src={MePhoto} alt="моя фотография" className="about-me__img" />
      </div>
    </section>
  );
}

export default AboutMe;
