import React, { useEffect, useState } from 'react'
import { useNavigate, Outlet} from 'react-router-dom'
import { useAppState } from '../AppState.jsx'
import '../styles/basicStyles.css'

const Dashboard = () => {

  const {state, dispatch} = useAppState()
  console.log('dashboard state = ', state)
  
  const {token, url, players, username } = state

  const [isPlayersFetch, setIsPlayersFetch] = useState(false)
  const navigate = useNavigate()
  
  const getPlayers = async () => {
    const response = await fetch(url + "/players/", {
      method: "GET",
      headers: {
       Authorization: "bearer " + token
      }
    })
    const fetchedPlayers = await response.json()
    dispatch({type: "getPlayers", payload: fetchedPlayers})
    setIsPlayersFetch(true)
    console.log('getPlayers fetch', fetchedPlayers)
  }
  
  useEffect(() => {
    getPlayers()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loaded = () => {
    console.log('loaded players array', players)
    return (
      <>
        <h1>{username}'s Player Info</h1>
        <button onClick={() => {
          navigate("/dashboard/new", {...getPlayers})
        }}>New Player</button>
      <Outlet />
        {players.map((player) => (
          <div key={player.id} className="basic-info-card">
          <ul>
            <h1>HOUSE</h1>
            <li>In Game Name: {player.ingame_name}</li>
            <li>Allegiance: {player.allegiance}</li>
            <li>Keep Level: {player.keep_level}</li>
            <li>House Level: {player.house_level}</li>
            <li>Power Level: {player.power_level}</li>
            <h1>POWER</h1>
            <li>Building Power: {player.building_power || "Not applicable or provided"}</li>
            <li>Research Power: {player.research_power}</li>
            <li>Troop Power: {player.troop_power}</li>
            <li>Dragon Talent Power: {player.dragon_talent_power}</li>
            <li>Armory Power: {player.armory_power}</li>
            </ul>
            <button onClick={() => {
              dispatch({type: "select", payload:  player})
              navigate("/dashboard/edit")
            }}>Edit Player</button>
            <button onClick={() => {
              fetch(url + "/players/" + player.id, {
                method: "delete",
                headers: {
                  Authorization: "bearer " + token,
                },
              }).then(() => getPlayers())
            }}>Delete Player</button>
            </div>
        ))}
      </>
    )
  }
  
  const loading = () => {

    return( 
      <>
        <h1>Loading {username}'s' info...</h1>
      </>
    )
  }


  return isPlayersFetch ? loaded() : loading()
}

export default Dashboard