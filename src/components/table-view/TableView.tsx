import React from "react";
import { UserModel } from "../../models/user.model";
import classes from "./TableView.module.scss";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { Button } from "../button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface TableViewProps {
  users: UserModel[];
  handleDeleteUser: (id: number | string) => void;
}

const TableView = ({ users, handleDeleteUser }: TableViewProps) => {
  const navigate = useNavigate();

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th className="" scope="col">
            #
          </th>
          <th className="" scope="col">
            Image
          </th>
          <th className="" scope="col">
            Name
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr
            key={user.id}
            className={classNames(classes.Row)}
            onClick={() => navigate(`/user/${user.id}`)}
          >
            <td className="align-middle">{user.id}</td>
            <td className="align-middle">
              <div className={classNames(classes.ImageContainer)}>
                <img
                  src={user.image}
                  alt={`User #${user.id}`}
                  className={classNames(classes.Image)}
                />
              </div>
            </td>
            <td className="align-middle">
              <div className="d-flex justify-content-between align-items-center">
                <span>{user.name}</span>
                <Button
                  className={classes.DeleteIcon}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDeleteUser(user.id);
                  }}
                >
                  <FontAwesomeIcon color="red" icon={faTrash} />
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableView;
