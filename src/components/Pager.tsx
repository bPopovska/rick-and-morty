import React from "react";
import { Link } from "react-router-dom";

const Pager: React.FC = ({ pages, setPage }: any) => {
  return (
    <>
      {Array.from(Array(pages).keys()).map(page => (
        <Link key={page} to={`/${page + 1}`}>
          {page + 1}{" "}
        </Link>
      ))}
    </>
  );
};

export default Pager;
