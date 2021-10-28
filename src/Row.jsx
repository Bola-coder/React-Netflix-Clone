import React, { useState, useEffect } from "react";
import instance from "./axios";
import "./Row.css";

function Row({ title, fetchUrl, isLargeRow }) {
  const imgBaseUrl = "http://image.tmdb.org/t/p/original";
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const request = await instance.get(fetchUrl);
      setMovies(request.data.results);
    };
    fetchData();
  }, [fetchUrl]);
  //   console.log(movies);
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies
          ? movies.map((movie) => (
              <img
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
    </div>
  );
}

export default Row;
