import {
  faCalendarDays,
  faLink,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./InfoUser.scss";
import localization from "moment/locale/es";
import moment from "moment/moment";

export default function InfoUser(props) {
  const { user } = props;

  return (
    <div className="info-user">
      <h2 className="name">
        {user?.name} {user?.surnames}
      </h2>
      <p className="email">{user?.email}</p>
      {user?.biography && <div className="biography">{user.biography}</div>}

      <div className="more-info">
        {user?.location && (
          <p>
            <FontAwesomeIcon icon={faLocationDot} />
            {user.location}
          </p>
        )}
        {user?.webSite && (
          <a
            href={user.webSite}
            alt={user.webSite}
            target="_blank"
            rel="noopener noref"
          >
            <FontAwesomeIcon icon={faLink} />
            {user.webSite}
          </a>
        )}
        {user?.birthDate && (
          <p>
            <FontAwesomeIcon icon={faCalendarDays} />
            {moment(user.birthDate).locale("es", localization).format("LL")}
          </p>
        )}
      </div>
    </div>
  );
}
