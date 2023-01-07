import { map } from "lodash";
import React, { useEffect, useState } from "react";
import getUserApi from "../../api/user";
import "./ListTweets.scss";
import AvatarNoFound from "../../assets/img/avatar-no-found.png";
import { API_HOST, GETAVATAR } from "../../utils/constants";
import { Image } from "react-bootstrap";
import moment from "moment/moment";
import { replaceURLWithHTMLLinks } from "../../utils/functions";

export default function ListTweets(props) {
  const { tweets } = props;

  return (
    <div className="list-tweets">
      {map(tweets, (tweet, index) => (
        <Tweet key={index} tweet={tweet} />
      ))}
    </div>
  );
}

function Tweet(props) {
  const { tweet } = props;

  const [userInfo, setUserInfo] = useState(null);
  const [avatarUrl, setAvartarUrl] = useState(null);

  useEffect(() => {
    getUserApi(tweet.userId).then((response) => {
      setUserInfo(response);
      setAvartarUrl(
        response?.profilePicture
          ? API_HOST + GETAVATAR + "?idUser=" + response.id
          : AvatarNoFound
      );
    });
  }, [tweet]);

  return (
    <div className="tweet">
      <Image className="avatar" scr={avatarUrl} roundedCircle />
      <div>
        <div className="name">
          {userInfo?.name} {userInfo?.surnames}
          <span>{moment(tweet.date).calendar()}</span>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: replaceURLWithHTMLLinks(tweet.message),
          }}
        />
      </div>
    </div>
  );
}
