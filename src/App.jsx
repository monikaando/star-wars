import { useState, useEffect } from "react";
import styled from "styled-components";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [allPeople, setAllPeople] = useState([]);
  const [page, setPage] = useState(2);
  const [pageCount, setPageCount] = useState(0);

  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetch("https://swapi.dev/api/people")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPageCount(Math.ceil(data.count / 10));
        setAllPeople(data.results);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  const getPeoplePerPage = () => {
    setIsLoading(true);
    fetch(`https://swapi.dev/api/people/?page=${page}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAllPeople((old) => [...old, ...data.results]);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  const loadMore = () => {
    setPage(page + 1);
    getPeoplePerPage();
  };
  return (
    <Wrapper>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <Catalog>
          <Title>Star Wars Catalog</Title>

          <Cards>
            {allPeople.map((item) => (
              <Card key={item.name}>
                <h4>{item.name}</h4> <h5>Height: {item.height} cm</h5>
                <h5>Birth year: {item.birth_year}</h5>
                <h5>{item.films.length} Films</h5>
              </Card>
            ))}
          </Cards>
          {page <= pageCount ? (
            <Button onClick={loadMore}>Load More...</Button>
          ) : (
            <Button disabled>Load More...</Button>
          )}
        </Catalog>
      )}
      {error ? <p>{error}</p> : ""}
    </Wrapper>
  );
}
const Wrapper = styled.section`
  display:flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
font-weight:bold;
color: #c9b568;
`;
const Catalog = styled.div`
display:flex;
flex-direction:column;
align-items: center;
`;
const Cards = styled.div`
display:flex;
justify-content: center;
flex-wrap: wrap;
`;
const Card = styled.div`
display:flex;
flex-direction: column;
width: 25vw;
margin: 2rem;
padding-left: 2rem;
background: #fefefb;
border: 0.1rem solid black;
border-radius: 0.2rem;
line-height:0;
`;
const Button = styled.button`
width: 15vw;
padding:0.5rem 0.2rem;
background-color:#c9b568;
border: 0.1rem solid black;
border-radius: 0.2rem;
`;
export default App;
