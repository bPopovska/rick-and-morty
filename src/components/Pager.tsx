import React from "react";

const Pager: React.FC = ({ pages, setPage }: any) => {
  return (
    <>
      {Array.from(Array(pages).keys()).map(page => (
        <a href="#" key={page} onClick={() => setPage(page + 1)}>
          {page + 1}{" "}
        </a>
      ))}
    </>
  );
};

export default Pager;
