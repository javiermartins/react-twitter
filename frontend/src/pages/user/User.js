import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import BasicLayout from "../../layout/BasicLayout/BasicLayout";
import "./User.scss";
import { useParams } from "react-router-dom";
import getUserApi from "../../api/user";
import getUser from "../../hooks/getUser";
import { toast } from "react-toastify";
import BannerAvatar from "../../components/User/BannerAvatar/BannerAvatar";
import InfoUser from "../../components/User/InfoUser/InfoUser";

export default function User(props) {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const loggedUser = getUser();

  useEffect(() => {
    getUserApi(id)
      .then((response) => {
        setUser(response);
        if (!response) {
          toast.error("El usuario no existe");
        }
      })
      .catch(() => {
        toast.error("El usuario no existe");
      });
  }, [useParams()]);

  return (
    <BasicLayout className="user">
      <div className="user__title">
        <h2>
          {user ? `${user.name} ${user.surnames}` : "Usuario no encontrado"}
        </h2>
      </div>
      <div>
        <BannerAvatar user={user} loggedUser={loggedUser} />
      </div>
      <div><InfoUser user={user} /></div>
      <div className="user__tweets">Lista de tweets</div>
    </BasicLayout>
  );
}
