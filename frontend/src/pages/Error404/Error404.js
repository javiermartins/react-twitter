import React from "react";
import { Link } from "react-router-dom";
import "./Error404.scss";
import logoWhite from "../../assets/img/logo-white.png";
import error404 from "../../assets/img/error404.png";

export default function Error404() {
  return (
    <div className="error404">
      <img src={logoWhite} alt="twitter" />
      <img src={error404} alt="twitter" />
      <Link to="/">Volver al inicio</Link>
    </div>
  );
}
