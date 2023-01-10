import { isEmpty } from "lodash";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Spinner } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { getUsersApi } from "../../api/follow";
import ListUsers from "../../components/ListUsers/ListUsers";
import BasicLayout from "../../layout/BasicLayout/BasicLayout";
import "./Users.scss";

export default function Users(props) {
  const { search } = useLocation();
  let navigate = useNavigate();
  const { setRefreshCheckLogin } = props;
  const [users, setUsers] = useState(null);
  const params = useUsersQuery(search);
  const [typeUser, setTypeUser] = useState(params.type || "follow");
  const [btnLoading, setBtnLoading] = useState(false);

  const [onSearch] = useDebounce((value) => {
    setUsers(null);
    navigate({
      search: queryString.stringify({
        ...params,
        search: value,
        page: 1,
      }),
    });
  }, 200);

  useEffect(() => {
    getUsersApi(queryString.stringify(params))
      .then((response) => {
        if (params.page == 1) {
          if (isEmpty(response)) {
            setUsers([]);
          } else {
            setUsers(response);
          }
        } else {
          if (!response) {
            setBtnLoading(0);
          } else {
            setUsers([...users, ...response]);
            setBtnLoading(false);
          }
        }
      })
      .catch(() => {
        setUsers([]);
      });
  }, [search]);

  const changeType = (type) => {
    setUsers(null);
    if (type === "new") {
      setTypeUser("new");
    } else {
      setTypeUser("follow");
    }
    navigate({
      search: queryString.stringify({ type: type, page: 1, search: "" }),
    });
  };

  const moreData = () => {
    setBtnLoading(true);
    const newPage = parseInt(params.page) + 1;
    navigate({
      search: queryString.stringify({ ...params, page: newPage }),
    });
  };

  return (
    <BasicLayout
      className="users"
      title="Usuarios"
      setRefreshCheckLogin={setRefreshCheckLogin}
    >
      <div className="users__title">
        <h2>Usuarios</h2>
        <input
          type="text"
          placeholder="Buscar usuario"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <ButtonGroup className="users__options">
        <Button
          className={typeUser === "follow" && "active"}
          onClick={() => changeType("follow")}
        >
          Siguiendo
        </Button>
        <Button
          className={typeUser === "new" && "active"}
          onClick={() => changeType("new")}
        >
          Nuevos
        </Button>
      </ButtonGroup>
      {!users ? (
        <div className="users__loading">
          <Spinner animation="border" variant="info" />
          Buscando usuarios
        </div>
      ) : (
        <>
          <ListUsers users={users} />
          <Button onClick={moreData} className="load-more">
            {!btnLoading ? (
              btnLoading !== 0 && "Cargar más usuarios"
            ) : (
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                aria-hidden="true"
              />
            )}
          </Button>
        </>
      )}
    </BasicLayout>
  );
}

function useUsersQuery(params) {
  const { page = 1, type = "follow", search = "" } = queryString.parse(params);

  return { page, type, search };
}
