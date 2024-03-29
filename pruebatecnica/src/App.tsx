import { useEffect, useState } from "react";
import "./App.css";
import { UsersLists } from "./components/UsersList";
import { User } from "./types";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState(false);
  const [sortByContry, setSortByContry] = useState(false);
  const toggleColors = () => {
    setShowColors(!showColors);
  };
  const toggleSortByCountry = () => {
    setSortByContry((prevState) => !prevState);
  };
  useEffect(() => {
    fetch("https://randomuser.me/api?results=100")
      .then(async (res) => await res.json())
      .then((res) => {
        setUsers(res.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const sortedUsers = sortByContry
    ? users.toSorted((a, b) => {
        return a.location.country.localeCompare(b.location.country);
      })
    : users;
  return (
    <>
      <h1>Prueba técnica</h1>
      <header>
        <button onClick={toggleColors}>Colorear Filas</button>
        <button onClick={toggleSortByCountry}>
          {sortByContry ? "No ordenar por pais" : "Ordenar por pais"}
        </button>
      </header>
      <main>
        <UsersLists showColors={showColors} users={sortedUsers} />
      </main>
    </>
  );
}

export default App;
