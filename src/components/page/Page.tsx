import React, { ReactNode } from "react";
import classNames from "classnames";
import Loader from "../loader/Loader";

interface PageProps {
  title?: string;
  noCard?: boolean;
  children: ReactNode;
  isLoading?: boolean;
}

export const Page = ({ title, noCard, children, isLoading }: PageProps) => {
  return (
    <div className="container pt-3">
      {title && <h5>{title}</h5>}
      <div className={classNames({ "card bg-white shadow p-3": !noCard })}>
        {isLoading ? <Loader /> : children}
      </div>
    </div>
  );
};
