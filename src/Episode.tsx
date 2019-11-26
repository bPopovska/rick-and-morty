import React from "react";
import "./App.css";

const Episode: React.FC = ({
  id,
  episode,
  name,
  air_date,
}: any) => {
  return (
    <div className="App" key={id}>
      <h5>{episode}: {name} ({air_date})</h5>
    </div>
  );
};

export default Episode;
