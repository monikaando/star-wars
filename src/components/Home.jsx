import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [allPeople, setAllPeople] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://swapi.dev/api/people?page=${page}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPageCount(Math.ceil(data.count / 10));
        setAllPeople((old) => [...old, ...data.results]);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, [page]);

  const loadMore = () => {
    setPage(page + 1);
  };
  // throw new Error("my error");
  return (
    <Wrapper>
      {isLoading && allPeople.length === 0 ? (
        <h3>Loading...</h3>
      ) : (
        <Catalog>
          <Title>Star Wars Catalog</Title>
          <CatalogItems>
            <CardList>
              {allPeople.map((item) => {
                const elementList = item.url.split("/");
                const id = elementList[elementList.length - 2];
                return (
                  <Link to={`/profile/${id}`} key={id}>
                    <Card key={item.name} data-cy={`card-${id}`}>
                      <h4 data-cy={`card-${id}-name`}>{item.name}</h4>
                      <h5>Height: {item.height} cm</h5>
                      <h5>Birth year: {item.birth_year}</h5>
                      <h5>{item.films.length} Films</h5>
                    </Card>
                  </Link>
                );
              })}
            </CardList>
            {page <= pageCount ? (
              <Button onClick={loadMore}>Load More...</Button>
            ) : (
              <Button disabled>Load More...</Button>
            )}
          </CatalogItems>
        </Catalog>
      )}
      {error ? <p>{error}</p> : ""}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0;
`;
const Catalog = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.h2`
  font-weight: bold;
  color: #c9b568;
`;
const CatalogItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CardList = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;
const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 25vw;
  padding-left: 2rem;
  background: #fffefc;
  border: 0.1rem solid black;
  border-radius: 0.2rem;
  line-height: 0;
  margin: 1rem 0;
  @media only screen and (max-width: 525px) {
    width: 80vw;
  }
`;
const Button = styled.button`
  width: 28vw;
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

export default Home;
