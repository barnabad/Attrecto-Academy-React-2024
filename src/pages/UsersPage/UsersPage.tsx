import React, { useCallback, useEffect, useState } from "react";

import { Page } from "../../components/page/Page";
import { UserModel } from "../../models/user.model";
import { userService } from "../../services/user.service";
import { Button } from "../../components/button/Button";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGrip,
  faGripVertical,
  faList,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import classes from "./UsersPage.module.scss";
import TableView from "../../components/table-view/TableView";

const UsersPage = () => {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [isTableView, setIsTableView] = useState(true);
  const navigate = useNavigate();

  const fetchUsers = useCallback(async () => {
    setUsers(await userService.getUsers());
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const goToUserPage = () => {
    navigate("/user");
  };

  const handleDeleteUser = async (id: string | number) => {
    await userService.deleteUser(id);

    fetchUsers();
  };

  return (
    <Page title="Users">
      <div className="row">
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex gap-1 align-items-start">
          <Button color="primary" className="w-100 mb-3" onClick={goToUserPage}>
            Create User
          </Button>
          <Button onClick={() => setIsTableView(true)}>
            <FontAwesomeIcon
              icon={faList}
              size="xl"
              color={isTableView ? "blue" : "black"}
            />
          </Button>
          <Button onClick={() => setIsTableView(false)}>
            <FontAwesomeIcon
              icon={faGripVertical}
              size="xl"
              color={!isTableView ? "blue" : "black"}
            />
          </Button>
        </div>
      </div>
      {isTableView ? (
        <TableView users={users} handleDeleteUser={handleDeleteUser} />
      ) : (
        <div className="row">
          {users.map(({ id, name, image }) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 my-1">
              <Link
                to={`/user/${id}`}
                className={classNames("card", classes.UserCard)}
              >
                <img
                  src={image}
                  alt={`user #${id}`}
                  className={classNames("card-img-top", classes.UserImage)}
                />
                <div className="card-body">
                  <h5>{name}</h5>
                </div>
                <Button
                  className={classes.DeleteIcon}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDeleteUser(id);
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </Page>
  );
};

export default UsersPage;
