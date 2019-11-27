import React from "react";
import Location from "./Location";
import Episode from "./Episode";

const Character: React.FC = ({
  id,
  image,
  name,
  gender,
  species,
  status,
  location,
  origin,
  episodes
}: any) => {
  return (
    <div key={id}>
      <img src={image} alt={name} />
      <h1>Name: {name}</h1>
      <h2>Gender: {gender}</h2>
      <h2>Species: {species}</h2>
      <h2>Status: {status}</h2>
      <h2>Location details:</h2>
      {location ? <Location {...location} /> : "Unknown"}
      <h2>Origin details:</h2>
      {origin ? <Location {...origin} /> : "Unknown"}
      <h2>Stars in episodes:</h2>
      {episodes &&
        episodes.filter(e => !!e).map(ep => <Episode key={ep.id} {...ep} />)}
    </div>
  );
};

export default Character;
