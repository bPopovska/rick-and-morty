import React, { useEffect, useState } from "react";
import "./App.css";
import Character from "./Character";

const App: React.FC = () => {
  const [characters, setCharacters] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [locations, setLocations] = useState(null);
  const [episodes, setEpisodes] = useState(null);

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character/")
      .then(data => data.json())
      .then(jsonData => {
        console.log("BPO", jsonData);
        setCharacters(jsonData.results);
        const originUrls = jsonData.results
          .map(res => res.origin.url)
          .filter(e => !!e);
        const locationUrls = jsonData.results
          .map(res => res.location.url)
          .filter(e => !!e);
        const allUrlsToBeFetched = [...originUrls, ...locationUrls]
          .reduce(
            (unique, item) =>
              unique.includes(item) ? unique : [...unique, item],
            []
          )
          .filter(e => !!e);

        Promise.all(
          allUrlsToBeFetched.map(url =>
            fetch(url).then(data =>
              data.json().catch(error => console.log("error", error))
            )
          )
        ).then(results => {
          console.log(results);
          const mapOfResults = results.reduce((map: any, obj: any) => {
            map[obj.url] = obj;
            return map;
          }, {});
          setLocations(mapOfResults);
        });

        const allEpisodeUrls = jsonData.results
          .map(res => res.episode)
          .filter(e => !!e)
          .reduce(
            (unique, item) =>
              unique.includes(item) ? unique : [...unique, item],
            []
          );

        Promise.all(allEpisodeUrls.map(url => fetch(url).then(data => data.json()))).then(results => console.log(results));

        setLoaded(true);
      });
  }, []);

  return (
    <div className="App">
      {!loaded && "Loading"}
      {characters &&
        characters.map(character => (
          <Character
            key={character.id}
            {...character}
            location={locations && locations[character.location.url]}
            origin={locations && locations[character.origin.url]}
          />
        ))}
    </div>
  );
};

export default App;
