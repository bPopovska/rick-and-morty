import React, { useEffect, useState } from "react";
import "./App.css";
import Character from "./Character";

const App: React.FC = () => {
  const [page, setPage] = useState(1);
  const [pagerInfo, setPagerInfo] = useState(1);
  const [characters, setCharacters] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [locations, setLocations] = useState(null);
  const [episodes, setEpisodes] = useState(null);

  console.log(page);
  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
      .then(data => data.json())
      .then(jsonData => {
        setCharacters(jsonData.results);
        setPagerInfo(jsonData.info);
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
          .reduce((acc, item) => [...acc, ...item], [])
          .reduce(
            (unique, item) =>
              unique.includes(item) ? unique : [...unique, item],
            []
          );

        Promise.all(
          allEpisodeUrls.map(url => fetch(url).then(data => data.json()))
        ).then(results => {
          const mapOfResults = results.reduce((map: any, obj: any) => {
            map[obj.url] = obj;
            return map;
          }, {});
          setEpisodes(mapOfResults);
        });

        setLoaded(true);
      });
  }, [page]);

  return (
    <div className="App">
      {pagerInfo &&
        Array.from(Array(pagerInfo.pages).keys()).map(page => (
          <a href="#" key={page} onClick={() => setPage(page + 1)}>
            {page + 1}{" "}
          </a>
        ))}
      {!loaded && "Loading"}
      {characters &&
        characters.map(character => (
          <Character
            key={character.id}
            {...character}
            location={locations && character.location.url && locations[character.location.url]}
            origin={locations && character.origin.url && locations[character.origin.url]}
            episodes={
              episodes &&
              character.episode &&
              character.episode.map(episodeUrl => episodes[episodeUrl])
            }
          />
        ))}
    </div>
  );
};

export default App;
