import React from "react";
import { useState, useEffect } from "react";

const Film = (props) => {
  const [film, setFilm] = useState({});

  useEffect(() => {
    fetch(props.url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setFilm(data);
      });
  }, []);
  console.log(film);
  return (
    <div>
      <p>{film.title}</p>
    </div>
  );
};

export default Film;
