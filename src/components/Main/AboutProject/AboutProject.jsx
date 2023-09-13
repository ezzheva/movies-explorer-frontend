import React from "react";
import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="about" id="about">
      <h3 className="about__title">О проекте</h3>
      <ul className="about__box">
        <li className="about__box-info">
          <h2 className="about__box-title">
            Дипломный проект включал 5 этапов
          </h2>
          <p className="about__box-subtitle">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и&nbsp;финальные доработки.
          </p>
        </li>
        <li className="about__box-info">
          <h2 className="about__box-title">
            На выполнение диплома ушло 5 недель
          </h2>
          <p className="about__box-subtitle">
            У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые
            нужно было соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <div className="about__develop">
        <div className="about__develop-container">
          <p className="about__develop-week">1 неделя</p>
          <p className="about__develop-week">4 недели</p>
        </div>
        <div className="about__develop-container">
          <p className="about__develop-text">Back-end</p>
          <p className="about__develop-text">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
