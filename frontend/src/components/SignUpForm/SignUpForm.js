import { size, values } from "lodash";
import React, { useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { signUpApi } from "../../api/auth";
import { isEmailValid } from "../../utils/validations";
import "./SignUpForm.scss";

export default function SignUpForm(props) {
  const { setShowModal } = props;
  const [formData, setFormData] = useState(initialFormValue());
  const [loading, setLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    let validCount = 0;
    values(formData).some((value) => {
      value && validCount++;
      return null;
    });

    if (validCount !== size(formData)) {
      toast.warning("Completa todos los campos");
    } else {
      if (!isEmailValid(formData.email)) {
        toast.warning("Email invalido");
      } else if (formData.password !== formData.repeatPassword) {
        toast.warning("Las contraseñas no son iguales");
      } else if (size(formData.password) < 6) {
        toast.warning("La contraseña debe ser de al menos 6 carácteres");
      } else {
        setLoading(true);
        signUpApi(formData)
          .then((response) => {
            if (response.code) {
              toast.warning(response.message);
            } else {
              toast.success("Te has registrado correctamente");
              setShowModal(false);
              setFormData(initialFormValue());
            }
          })
          .catch(() => {
            toast.error("Error del servidor");
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  };

  const changeForm = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="sign-up-form">
      <h2>Crea tu cuenta</h2>
      <Form onSubmit={onSubmit} onChange={changeForm}>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control
                type="text"
                placeholder="Nombre"
                name="name"
                defaultValue={formData.name}
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Apellidos"
                name="surnames"
                defaultValue={formData.surnames}
              />
            </Col>
          </Row>
        </Form.Group>

        <Form.Group>
          <Form.Control
            type="email"
            placeholder="Correo electrónico"
            name="email"
            defaultValue={formData.email}
          />
        </Form.Group>

        <Form.Group>
          <Row>
            <Col>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                name="password"
                defaultValue={formData.password}
              />
            </Col>
            <Col>
              <Form.Control
                type="password"
                placeholder="Repetir contraseña"
                name="repeatPassword"
                defaultValue={formData.repeatPassword}
              />
            </Col>
          </Row>
        </Form.Group>

        <Button variant="primary" type="submit">
          {!loading ? "Registrarse" : <Spinner animation="border" />}
        </Button>
      </Form>
    </div>
  );
}

function initialFormValue() {
  return {
    name: "",
    surnames: "",
    email: "",
    password: "",
    repeatPassword: "",
  };
}
