import React from "react";
import "./App.css";
import Location from "./Location";

const Character: React.FC = ({
  id,
  image,
  name,
  gender,
  species,
  status,
  location,
  origin
}: any) => {
  return (
    <div className="App" key={id}>
      <img src={image} alt={name} />
      <h1>Name: {name}</h1>
      <h2>Gender: {gender}</h2>
      <h2>Species: {species}</h2>
      <h2>Status: {status}</h2>
      <h2>Location details:</h2>
      <Location {...location} />
      <h2>Origin details:</h2>
      <Location {...origin} />
    </div>
  );
};

export default Character;
