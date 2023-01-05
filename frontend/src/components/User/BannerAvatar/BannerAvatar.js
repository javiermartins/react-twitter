import React, { useState } from "react";
import { Button } from "react-bootstrap";
import AvatarNoFound from "../../../assets/img/avatar-no-found.png";
import { API_HOST, GETAVATAR, GETBANNER } from "../../../utils/constants";
import ProfileModal from "../../Modal/ProfileModal/ProfileModal";
import EditProfileForm from "../EditProfileForm/EditProfileForm";
import "./BannerAvatar.scss";

export default function BannerAvatar(props) {
  const { user, loggedUser } = props;
  const [showModal, setShowModal] = useState(false);

  const bannerUrl = user?.banner
    ? API_HOST + GETBANNER + "?idUser=" + user.id
    : null;
  const avatarUrl = user?.profilePicture
    ? API_HOST + GETAVATAR + "?idUser=" + user.id
    : AvatarNoFound;

  return (
    <div
      className="banner-avatar"
      style={{ backgroundImage: `url('${bannerUrl}')` }}
    >
      <div
        className="avatar"
        style={{ backgroundImage: `url('${avatarUrl}')` }}
      />
      {user && (
        <div className="options">
          {user.id == loggedUser.id && <Button onClick={() => setShowModal(true)}>Editar perfil</Button>}

          {user.id != loggedUser.id && <Button>Seguir</Button>}
        </div>
      )}

      <ProfileModal
        show={showModal}
        setShow={setShowModal}
        title="Editar perfil"
      >
        <EditProfileForm user={user} setShowModal={setShowModal} />
      </ProfileModal>
    </div>
  );
}
