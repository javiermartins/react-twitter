import {
  faHome,
  faPowerOff,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { logoutApi } from "../../api/auth";
import logoWhite from "../../assets/img/logo-white.png";
import getUser from "../../hooks/getUser";
import TweetModal from "../Modal/TweetModal/TweetModal";
import "./Menu.scss";

export default function Menu(props) {
  const { setCheckRefresh } = props;
  const [showModal, setShowModal] = useState(false);
  const user = getUser();

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
      <Link to={`/${user?.id}`}>
        <FontAwesomeIcon icon={faUser} /> Perfil
      </Link>
      <Link to="" onClick={logout}>
        <FontAwesomeIcon icon={faPowerOff} /> Cerrar sesión
      </Link>

      <Button onClick={() => setShowModal(true)}>Twittear</Button>

      <TweetModal show={showModal} setShow={setShowModal}></TweetModal>
    </div>
  );
}
