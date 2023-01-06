import React, { useCallback, useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import "./EditProfileForm.scss";
import DatePicker from "react-datepicker";
import es from "date-fns/locale/es";
import { useDropzone } from "react-dropzone";
import { API_HOST, GETAVATAR, GETBANNER } from "../../../utils/constants";
import { Camera } from "../../../utils/Icons";
import {
  modifyProfileApi,
  uploadAvatarApi,
  uploadBannerApi,
} from "../../../api/user";
import { toast } from "react-toastify";

export default function EditProfileForm(props) {
  const { user, setShowModal } = props;
  const [formData, setFormData] = useState(initialValues(user));
  const [bannerUrl, setBannerUrl] = useState(
    user?.banner ? API_HOST + GETBANNER + "?idUser=" + user.id : null
  );
  const [bannerFile, setBannerFile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(
    user?.banner ? API_HOST + GETAVATAR + "?idUser=" + user.id : null
  );
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const onDropBanner = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    setBannerUrl(URL.createObjectURL(file));
    setBannerFile(file);
  });

  const {
    getRootProps: getRootBannerProps,
    getInputProps: getInputBannerProps,
  } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop: onDropBanner,
  });

  const onDropAvatar = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    setAvatarUrl(URL.createObjectURL(file));
    setAvatarFile(file);
  });

  const {
    getRootProps: getRootAvatarProps,
    getInputProps: getInputAvatarProps,
  } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop: onDropAvatar,
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (bannerFile) {
      await uploadBannerApi(bannerFile).catch((e) => {
        toast.error("Error al subir el banner");
      });
    }
    if (avatarFile) {
      await uploadAvatarApi(avatarFile).catch((e) => {
        toast.error("Error al subir el avatar");
      });
    }

    await modifyProfileApi(formData)
      .then(() => {
        setShowModal(false);
      })
      .catch(() => {
        toast.error("Error al actualizar los datos");
      });

    setLoading(false);
    window.location.reload();
  };

  const changeForm = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="edit-profile-form">
      <div
        className="banner"
        style={{ backgroundImage: `url('${bannerUrl}')` }}
        {...getRootBannerProps()}
      >
        <input {...getInputBannerProps()} />
        <div className="camera-container">
          <Camera />
        </div>
      </div>
      <div
        className="avatar"
        style={{ backgroundImage: `url('${avatarUrl}')` }}
        {...getRootAvatarProps()}
      >
        <input {...getInputAvatarProps()} />
        <div className="camera-container">
          <Camera />
        </div>
      </div>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control
                type="text"
                placeholder="Nombre"
                name="name"
                defaultValue={formData.name}
                onChange={changeForm}
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Apellidos"
                name="surnames"
                defaultValue={formData.surnames}
                onChange={changeForm}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Form.Control
            as="textarea"
            placeholder="Agrega tu biografía"
            type="text"
            name="biography"
            defaultValue={formData.biography}
            onChange={changeForm}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Sitio web"
            name="webSite"
            defaultValue={formData.webSite}
            onChange={changeForm}
          />
        </Form.Group>

        <Form.Group>
          <DatePicker
            placeholder="Fecha de nacimiento"
            locale={es}
            selected={new Date(formData.birthDate)}
            onChange={(date) => setFormData({ ...formData, birthDate: date })}
          />
        </Form.Group>

        <Button className="btn-submit" variant="primary" type="submit">
          {loading && <Spinner animation="border" size="sm" />} Actualizar
        </Button>
      </Form>
    </div>
  );
}

function initialValues(user) {
  return {
    name: user.name || "",
    surnames: user.surnames || "",
    biography: user.biography || "",
    location: user.location || "",
    webSite: user.webSite || "",
    birthDate: user.birthDate || "",
  };
}
