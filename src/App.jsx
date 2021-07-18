import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [allPeople, setAllPeople] = useState([]);
  const [page, setPage] = useState(2);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetch("https://swapi.dev/api/people")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
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
          {allPeople.map((item) => (
            <div key={item.name}>{item.name}</div>
          ))}
          <button onClick={loadMore}>Load More...</button>
        </div>
      )}
      {error ? <p>{error}</p> : ""}
    </div>
  );
}

export default App;
