import { useEffect, useRef, useState } from "react";
import "./App.css";
import { UsersLists } from "./components/UsersList";
import { User } from "./types";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState(false);
  const [sortByContry, setSortByContry] = useState(false);
  const originalUsers = useRef<User[]>([]);
  const toggleColors = () => {
    setShowColors(!showColors);
  };

  const toggleSortByCountry = () => {
    setSortByContry((prevState) => !prevState);
  };

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email);
    setUsers(filteredUsers);
    
  };

  const handleReset = () =>  {
    setUsers(originalUsers.current)

  }

  useEffect(() => {
    fetch("https://randomuser.me/api?results=100")
      .then(async (res) => await res.json())
      .then((res) => {
        setUsers(res.results);
        originalUsers.current = res.results;
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
        <button onClick={handleReset}>
          Resetear estado
        </button>
      </header>
      <main>
        <UsersLists
          deleteUser={handleDelete}
          showColors={showColors}
          users={sortedUsers}
        />
      </main>
    </>
  );
}

export default App;
