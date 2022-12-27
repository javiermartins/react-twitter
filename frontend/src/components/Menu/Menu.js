import {
  faHome,
  faPowerOff,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { logoutApi } from "../../api/auth";
import logoWhite from "../../assets/img/logo-white.png";
import "./Menu.scss";

export default function Menu(props) {
  const { setCheckRefresh } = props;

  const logout = () => {
    logoutApi();
    setCheckRefresh(true);
  };

  return (
    <div className="menu">
      <img src={logoWhite} alt="" className="logo" />
      <Link to="/">
        <FontAwesomeIcon icon={faHome} /> Inicio
      </Link>
      <Link to="/users">
        <FontAwesomeIcon icon={faUsers} /> Usuarios
      </Link>
      <Link to="/profile">
        <FontAwesomeIcon icon={faUser} /> Perfil
      </Link>
      <Link to="" onClick={logout}>
        <FontAwesomeIcon icon={faPowerOff} /> Cerrar sesión
      </Link>

      <Button>Twittear</Button>
    </div>
  );
}
