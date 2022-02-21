import React, { useState, useEffect } from 'react'
import { useAppState } from '../AppState.jsx'
import { useParams, useNavigate } from 'react-router-dom'
import '../styles/form.css'

const PlayerForm = () => {
    
    const { state, dispatch } = useAppState()
    // console.log('player form state', state)
    const { token } = state
    console.log('PlayerForm state = ', state)
    

    const match = useParams()
    const navigate = useNavigate()

    // console.log('match', match.action)

    const [formData, setFormData] = useState(state[match.action])

    const actions = {
        new:  async () => {
            return fetch(state.url + "/players/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "bearer " + token
                },
                body: JSON.stringify(formData),
            }).then((response) => response.json())
        },
        edit:  async () => {
            return fetch(state.url + "/players/" + state.edit.id, {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "bearer " + token
                },
                body: JSON.stringify(formData),
            }).then((response) => response.json())
        }
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        actions[match.action]()
        .then((players) => {
            navigate("/dashboard",{getPlayers: state.players})
            console.log('data from handleSubmit = ', players)
        });
    }

  return (
    <div className="user-card">
        <form onSubmit={handleSubmit}>
        <h2>HOUSE</h2>
        <input className="form-input"
                type="text"
                name="ingame_name"
                placeholder='In-game name'
                value={formData.ingame_name}
                onChange={handleChange}
                />
            <input className="form-input"
                type="text"
                name="allegiance"
                placeholder='Allegiance'
                value={formData.allegiance}
                onChange={handleChange}
                />
            <input className="form-input"
                type="text"
                name="keep_level"
                placeholder='Keep level'
                value={formData.keep_level}
                onChange={handleChange}
                />
            <input className="form-input"
                type="text"
                name="house_level"
                placeholder='House level'
                value={formData.house_level}
                onChange={handleChange}
                />
            <input className="form-input"
                type="text"
                name="power_level"
                placeholder='Power level'
                value={formData.power_level}
                onChange={handleChange}
                />
                <br />
                <h2>POWER</h2>
            <input className="form-input"
                type="text"
                name="building_power"
                placeholder='Building power'
                value={formData.building_power}
                onChange={handleChange}
                />
            <input className="form-input"
                type="text"
                name="research_power"
                placeholder='Research power'
                value={formData.research_power}
                onChange={handleChange}
                />
            <input className="form-input"
                type="text"
                name="troop_power"
                placeholder='Troop power'
                value={formData.troop_power}
                onChange={handleChange}
                />
            <input className="form-input"
                type="text"
                name="dragon_talent_power"
                placeholder='Dragon talent power'
                value={formData.dragon_talent_power}
                onChange={handleChange}
                />
            <input className="form-input"
                type="text"
                name="armory_power"
                placeholder='Armory power'
                value={formData.armory_power}
                onChange={handleChange}
                />
                <br/>
            <input className="button" type="submit" value={match.action}/>
        </form>
    </div>
  )
}

export default PlayerForm