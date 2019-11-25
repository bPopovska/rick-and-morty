import React from "react";
import "./App.css";

const Location: React.FC = ({ id, name, type, dimension, residents }: any) => {
  return (
    <div className="App" key={id}>
      <h3>Name: {name}</h3>
      <h4>Type: {type}</h4>
      <h4>Dimension: {dimension}</h4>
      <h4>Nr. of residents: {residents ? residents.length : 0}</h4>
    </div>
  );
};

export default Location;
