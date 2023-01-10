import React, { useEffect, useState } from "react";
import { Card, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import getUserApi from "../../api/user";
import AvatarNoFound from "../../assets/img/avatar-no-found.png";
import { API_HOST, GETAVATAR } from "../../utils/constants";

export default function User(props) {
  const { user } = props;
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    getUserApi(user.id).then((response) => {
      setUserInfo(response);
    });
  }, [user]);

  const navigate = useNavigate();
  const viewProfile = () => {
    navigate(`/${user.id}`);
  }

  return (
    <div>
      <div onClick={viewProfile} className="list-users__user">
        <div className="user">
          <Image
            width={64}
            height={64}
            roundedCircle
            className="mr-3 avatar"
            src={
              userInfo?.avatar
                ? API_HOST + GETAVATAR + "?idUser=" + user.id
                : AvatarNoFound
            }
            alt={user.name + " " + user.surnames}
          />
          <div>
            <div className="name">
              {userInfo?.name} {userInfo?.surnames}
            </div>
            <div>{userInfo?.biography}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
