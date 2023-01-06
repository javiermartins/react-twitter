import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import checkFollowApi, { followUserApi, unfollowUserApi } from "../../../api/follow";
import AvatarNoFound from "../../../assets/img/avatar-no-found.png";
import { API_HOST, GETAVATAR, GETBANNER } from "../../../utils/constants";
import ProfileModal from "../../Modal/ProfileModal/ProfileModal";
import EditProfileForm from "../EditProfileForm/EditProfileForm";
import "./BannerAvatar.scss";

export default function BannerAvatar(props) {
  const { user, loggedUser } = props;
  const [showModal, setShowModal] = useState(false);
  const [following, setFollowing] = useState(null);
  const [reloadFollow, setReloadFollow] = useState(false);

  const bannerUrl = user?.banner
    ? API_HOST + GETBANNER + "?idUser=" + user.id
    : null;
  const avatarUrl = user?.profilePicture
    ? API_HOST + GETAVATAR + "?idUser=" + user.id
    : AvatarNoFound;

  useEffect(() => {
    if (user) {
      checkFollowApi(user.id).then((response) => {
        if (response?.status) {
          setFollowing(true);
        } else {
          setFollowing(false);
        }
      });
    }
    setReloadFollow(false);
  }, [user, reloadFollow]);

  const onFollow = () => {
    followUserApi(user?.id).then((response) => {
      setReloadFollow(true);
    });
  };

  const onUnfollow = () => {
    unfollowUserApi(user?.id).then(() => {
      setReloadFollow(true);
    })
  } 

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
          {user.id == loggedUser.id && (
            <Button onClick={() => setShowModal(true)}>Editar perfil</Button>
          )}

          {user.id != loggedUser.id &&
            following !== null &&
            (following ? (
              <Button className="unfollow" onClick={onUnfollow}><span>Siguiendo</span></Button>
            ) : (
              <Button onClick={onFollow}>Seguir</Button>
            ))}
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
