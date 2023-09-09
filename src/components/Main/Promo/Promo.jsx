import React from "react";
import "./Promo.css";

function Promo() {
  return (
    <section className="promo">
      <div className="promo__box">
        <div className="promo__text">
          <h1 className="promo__title">
            Учебный проект студента факультета Веб&minus;разработки.
          </h1>
          <p className="promo__subtitle">
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
        </div>
        <div className="promo__img"></div>
      </div>
      <a href="#about" className="promo__link-button">
        Узнать больше
      </a>
    </section>
  );
}
export default Promo;
