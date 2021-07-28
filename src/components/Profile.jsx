import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Profile() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState({});
  const [films, setFilms] = useState([]);
  const [titles, setTitles] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`https://swapi.dev/api/people/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProfile(data);
        setFilms(data.films);
        setIsLoading(false);
      })
      .then(() => {
        films.map((item) => {
          return fetch(item)
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              setTitles(data.title);
              console.log(films);
              console.log(titles);
            });
        });
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, [id, films, titles]);

  return (
    <Wrapper>
      {isLoading && profile.length && films.length === 0 ? (
        <h3>Loading...</h3>
      ) : (
        <div>
          <h1>{profile.name}</h1>
          <ProfileData>
            <Card>
              <h5>Height: {profile.height}</h5>
            </Card>
            <Card>
              <h5>Eye color: {profile.eye_color}</h5>
            </Card>
            <Card>
              <h5>Birth date: {profile.birth_year}</h5>
            </Card>
            <Card>
              <h5>Hair color: {profile.hair_color}</h5>
            </Card>
          </ProfileData>
          {titles ? <h4>{titles.length} film(s)</h4> : null}
          {/* <FilmCard>
            {titles.map((item) => {
              return (
                <List key={item}>
                  <li>{item}</li>
                </List>
              );
            })}
          </FilmCard> */}
          <Link data-cy="link-home" to="/">
            <Button> Back to home...</Button>
          </Link>
        </div>
      )}
      {error ? <p>{error}</p> : ""}
    </Wrapper>
  );
}
const Wrapper = styled.section`
  margin: 2rem 3rem;
  padding-right: 15rem;
`;
const Button = styled.button`
  width: 10vw;
  padding: 0.5rem 0.2rem;
  margin: 2rem 0;
  background-color: #c9b568;
  border: 0.1rem solid black;
  border-radius: 0.2rem;
  cursor: pointer;
  @media only screen and (max-width: 525px) {
    width: 88vw;
  }
`;
const ProfileData = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const Card = styled.div`
  display: flex;
  justify-content: center;
  width: 15vw;
  background: #fffefc;
  border: 0.1rem solid black;
  border-radius: 0.2rem;
  line-height: 0;
  padding: 0.5rem 0;
  margin: 1rem 0;

  @media only screen and (max-width: 525px) {
    width: 80vw;
  }
`;
// const FilmCard = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 35vw;
//   background: #fffefc;
//   border: 0.1rem solid black;
//   border-radius: 0.2rem;
//   line-height: 0;
//   padding: 0.5rem 0;
//   margin: 1rem 0;

//   @media only screen and (max-width: 525px) {
//     width: 80vw;
//   }
// `;
// const List = styled.ul`
//   list-style-type: "- ";
//   padding-left: 1.2rem;
// `;
