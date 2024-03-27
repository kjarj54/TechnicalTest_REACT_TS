import { useEffect, useState } from 'react'
import './App.css'



function App() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
    .then(async res => await res.json())
    .then(res =>{
      setUsers(res.results)
    })
  },[])

  return (
    <>
      <h1>Prueba técnica</h1>  
      {
        JSON.stringify(users)
      }      
    </>
  )
}

export default App
