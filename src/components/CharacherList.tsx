import React, { useEffect, useState } from "react";
import "../App.css";
import Character from "./Character";
import Pager from "./Pager";
import { useParams } from "react-router-dom";

const CharacterList: React.FC = ({ pageOverride }) => {
  const { pageNr } = useParams();

  const initialPage = pageOverride || pageNr;
  const [pagerInfo, setPagerInfo] = useState(1);
  const [characters, setCharacters] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [locations, setLocations] = useState(null);
  const [episodes, setEpisodes] = useState(null);

  function getAllOriginUrls(data) {
    const originUrls = data.results.map(res => res.origin.url).filter(e => !!e);
    const locationUrls = data.results
      .map(res => res.location.url)
      .filter(e => !!e);
    const allUrlsToBeFetched = [...originUrls, ...locationUrls]
      .reduce(
        (unique, item) => (unique.includes(item) ? unique : [...unique, item]),
        []
      )
      .filter(e => !!e);
    return allUrlsToBeFetched;
  }

  function getAllEpisodesUrls(data) {
    const allEpisodeUrls = data.results
      .map(res => res.episode)
      .filter(e => !!e)
      .reduce((acc, item) => [...acc, ...item], [])
      .reduce(
        (unique, item) => (unique.includes(item) ? unique : [...unique, item]),
        []
      );
    return allEpisodeUrls;
  }

  useEffect(() => {
    initialPage &&
      fetch(`https://rickandmortyapi.com/api/character/?page=${initialPage}`)
        .then(data => {
          if (data.status === 200) return data.json();
          throw new Error("Status code " + data.status);
        })
        .then(jsonData => {
          setCharacters(jsonData.results);
          setPagerInfo(jsonData.info);

          const allLocationUrls = getAllOriginUrls(jsonData);

          Promise.all(
            allLocationUrls.map(url =>
              fetch(url).then(data =>
                data.json().catch(error => console.error("error", error))
              )
            )
          ).then(results => {
            const mapOfResults = results.reduce((map: any, obj: any) => {
              map[obj.url] = obj;
              return map;
            }, {});
            setLocations(mapOfResults);
          });

          const allEpisodesUrls = getAllEpisodesUrls(jsonData);
          Promise.all(
            allEpisodesUrls.map(url =>
              fetch(url).then(data =>
                data.json().catch(error => console.error("error", error))
              )
            )
          ).then(results => {
            const mapOfResults = results.reduce((map: any, obj: any) => {
              map[obj.url] = obj;
              return map;
            }, {});
            setEpisodes(mapOfResults);
          });

          setLoaded(true);
        })
        .catch(error => {
          setError(true);
          console.error("error", error);
        });
  }, [initialPage]);

  return (
    <div className="App">
      {!loaded && !error && "Loading"}
      {error && "Something went wrong, please try again"}
      {loaded && !error && pagerInfo && <Pager pages={pagerInfo.pages} />}
      {loaded &&
        !error &&
        characters &&
        characters.map(character => (
          <Character
            key={character.id}
            {...character}
            location={
              locations &&
              character.location.url &&
              locations[character.location.url]
            }
            origin={
              locations &&
              character.origin.url &&
              locations[character.origin.url]
            }
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

export default CharacterList;
