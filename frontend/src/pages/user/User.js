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
import { getTweetsApi } from "../../api/tweet";
import ListTweets from "../../components/ListTweets/ListTweets";

export default function User(props) {
  const { setCheckRefresh } = props;
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [tweets, setTweets] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingTweets, setLoadingTweets] = useState(false);
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

  useEffect(() => {
    getTweetsApi(id, 1)
      .then((response) => {
        setTweets(response);
      })
      .catch(() => {
        setTweets([]);
      });
  }, [useParams()]);

  const moreTweets = () => {
    var pageTemp = page + 1;
    setLoadingTweets(true);

    getTweetsApi(id, pageTemp).then((response) => {
      if (!response) {
        setLoadingTweets(0);
      } else {
        setTweets([...tweets, ...response]);
        setPage(pageTemp);
        setLoadingTweets(false);
      }
    });
  };

  return (
    <BasicLayout className="user" setCheckRefresh={setCheckRefresh}>
      <div className="user__title">
        <h2>
          {user ? `${user.name} ${user.surnames}` : "Usuario no encontrado"}
        </h2>
      </div>
      <div>
        <BannerAvatar user={user} loggedUser={loggedUser} />
      </div>
      <div>
        <InfoUser user={user} />
      </div>
      <div className="user__tweets">
        <h3>Tweets</h3>
        {tweets && <ListTweets tweets={tweets} />}
        <Button onClick={moreTweets}>
          {!loadingTweets ? (
            loadingTweets !== 0 && "Obtener más tweets"
          ) : (
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          )}
        </Button>
      </div>
    </BasicLayout>
  );
}
