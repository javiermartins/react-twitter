import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import addTweetApi from "../../../api/tweet";
import "./TweetModal.scss";

export default function TweetModal(props) {
  const { show, setShow } = props;
  const [message, setMessage] = useState("");
  const limitMessage = 280;

  const onSubmit = (e) => {
    e.preventDefault();

    if (message.length > 0 && message.length <= limitMessage) {
      addTweetApi(message)
        .then((response) => {
          if (response?.code >= 200 && response?.code < 300) {
            setShow(false);
            toast.success(response.message);
            window.location.reload();
          }
        })
        .catch(() => {
          toast.warning("Error al publicar el tweet");
        });
    }
  };

  return (
    <Modal
      className="tweet-modal"
      show={show}
      onHide={() => setShow(false)}
      centered
      size="lg"
    >
      <Modal.Header>
        <Modal.Title>
          <FontAwesomeIcon icon={faClose} onClick={() => setShow(false)} />
          <h2>Twittear</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Control
            as="textarea"
            rows="6"
            placeholder="¿Que estás pensando?"
            onChange={(e) => setMessage(e.target.value)}
          />
          <span
            className={classNames("count", {
              error: message.length > limitMessage,
            })}
          >
            {message.length} / {limitMessage}
          </span>
          <Button
            type="submit"
            disabled={message.length > limitMessage || message.length < 1}
          >
            Twittear
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
