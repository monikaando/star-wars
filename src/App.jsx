import "./App.css";
import { useState, useEffect } from "react";
const url = "https://swapi.dev/api/people";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [allPeople, setAllPeople] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetch(url)
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
  return (
    <div className="App">
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <div>
          {allPeople.map((item) => (
            <div key={item.name}>{item.name}</div>
          ))}
        </div>
      )}
      {error ? <p>{error}</p> : ""}
    </div>
  );
}

export default App;
