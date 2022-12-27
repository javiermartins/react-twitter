import { size, values } from "lodash";
import { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import "./SignInForm.scss";
import { isEmailValid } from "../../utils/validations";
import { setTokenApi, signInApi } from "../../api/auth";

export default function SignInForm(props) {
  const { setCheckRefresh } = props;
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
      } else {
        setLoading(true);

        signInApi(formData)
          .then((response) => {
            if (response.message) {
              toast.warning(response.message);
            } else {
              setTokenApi(response.token);
              setCheckRefresh(true);
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
    <div className="sign-in-form">
      <h2>Iniciar sesión</h2>
      <Form onSubmit={onSubmit} onChange={changeForm}>
        <Form.Group>
          <Form.Control
            type="email"
            name="email"
            placeholder="Correo electrónico"
            defaultValue={formData.email}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            name="password"
            placeholder="Contraseña"
            defaultValue={formData.password}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {!loading ? "Iniciar sesión" : <Spinner animation="border" />}
        </Button>
      </Form>
    </div>
  );
}

function initialFormValue() {
  return {
    email: "",
    password: "",
  };
}
