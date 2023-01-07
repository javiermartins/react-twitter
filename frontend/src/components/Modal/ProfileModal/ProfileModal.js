import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Modal } from "react-bootstrap";

import "./ProfileModal.scss";

export default function ProfileModal(props) {
  const { show, setShow, children } = props;

  return (
    <Modal
      className="profile-modal"
      show={show}
      onHide={() => setShow(false)}
      centered
      size="lg"
    >
      <Modal.Header>
        <Modal.Title>
          <FontAwesomeIcon icon={faClose} onClick={() => setShow(false)} />
          <h2>Editar perfil</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}
