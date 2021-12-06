import React, { useState, useEffect } from "react";
import instance from "./axios";
import "./Row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

function Row({ title, fetchUrl, isLargeRow }) {
  const imgBaseUrl = "http://image.tmdb.org/t/p/original";
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const request = await instance.get(fetchUrl);
      setMovies(request.data.results);
    };
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      origin: `${window.location.origin}`,
      host: `${window.location.protocol}`,
    },
  };

  //  _onReady(event) {
  //     // access to player in all event handlers via event.target
  //     event.target.pauseVideo();
  //   };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || movie?.title || movie?.original_name || "")
        .then((url) => {
          console.log(url);
          console.log(movie?.name);
          const urlLink = new URL(url);
          const urlSearch = urlLink.search;
          const urlParams = new URLSearchParams(urlSearch);
          setTrailerUrl(JSON.stringify(urlParams.get("v")));
          console.log(trailerUrl);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies
          ? movies.map((movie) => (
              <img
                onClick={() => handleClick(movie)}
                key={movie.id}
                src={`${imgBaseUrl}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
                className={`row__poster ${isLargeRow && "row__poster--large"}`}
              />
            ))
          : "No movies to render"}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
