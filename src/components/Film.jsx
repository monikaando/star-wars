import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";

const Film = (props) => {
  const [film, setFilm] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(props.url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setFilm(data);
      })   
      .catch((error) => {
        setError(error.message);
      });;
  }, []);
  console.log(film);
  return (
    <div>
    <List>- {film?.title}</List>
    {error ? <p>{error}</p> : ""}
  </div>
  );
};

export default Film;

const List = styled.p`
  padding-left: 1.2rem;
`;