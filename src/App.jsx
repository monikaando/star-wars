import "./App.css";
import { useState, useEffect } from "react";

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
    <div className="App">
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <div>
          <h4>
            {page - 1}/{pageCount}
          </h4>
          {allPeople.map((item) => (
            <div key={item.name}>{item.name}</div>
          ))}
          {page <= pageCount ? (
            <button onClick={loadMore}>Load More...</button>
          ) : (
            <button disabled>Load More...</button>
          )}
        </div>
      )}
      {error ? <p>{error}</p> : ""}
    </div>
  );
}

export default App;
