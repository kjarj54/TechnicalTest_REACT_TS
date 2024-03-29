import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import { UsersLists } from "./components/UsersList";
import { User } from "./types";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState(false);
  const [sortByContry, setSortByContry] = useState(false);
  const [filteredCountry, setFilteredCountry] = useState<string | null>(null);
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

  const handleReset = () => {
    setUsers(originalUsers.current);
  };

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

  const filteredUsers =useMemo(() =>{
   return typeof filteredCountry === "string" && filteredCountry.length > 0
      ? users.filter((user) => {
          return user.location.country
            .toLowerCase()
            .includes(filteredCountry.toLowerCase());
        })
      : users;
  }, [users, filteredCountry])

  const sortedUsers = useMemo(() => {
    return sortByContry
      ? filteredUsers.toSorted((a, b) =>
          a.location.country.localeCompare(b.location.country)
        )
      : filteredUsers;
  }, [filteredUsers, sortByContry]);

  return (
    <>
      <h1>Prueba técnica</h1>
      <header>
        <button onClick={toggleColors}>Colorear Filas</button>
        <button onClick={toggleSortByCountry}>
          {sortByContry ? "No ordenar por pais" : "Ordenar por pais"}
        </button>
        <button onClick={handleReset}>Resetear estado</button>
        <input
          placeholder="Filtra por pais"
          onChange={(e) => {
            setFilteredCountry(e.target.value);
          }}
        />
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
