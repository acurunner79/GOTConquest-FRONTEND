import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppState } from '../AppState.jsx'
import IconButton from "@material-ui/core/IconButton";
// import InputLabel from "@material-ui/core/InputLabel";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import '../styles/form.css'

const Auth = () => {
  
    const match = useParams()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    const [userData, setUserData] = useState(null)

    const { state, dispatch } = useAppState()
    // console.log('auth dispatch', useAppState)
    
    useEffect(() => {
        if (userData) {
            // console.log('user data', userData)
            const { token, user } = userData
            dispatch({ type: "auth", payload: { token, username: user.username, id: user.id}})
            window.localStorage.setItem(
                "auth", 
                JSON.stringify({ token, username: user.username})
            )
            navigate("/dashboard", {state: token})
            // console.log('token', token)
        }
    })
    
    
    const actions = {
        signup: async () => {
            return fetch(state.url + "/users", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            }).then((response) => response.json())
        },
        login: async () => {
            return fetch(state.url + "/login", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
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
        actions[match.form]()
        .then((data) => {setUserData(data)
            console.log('data', data)
        });
    }

    // console.log('type', type)
  return (
    <div className="user-card">
        <h1>{match.form}</h1>
        <div>
            <form onSubmit={handleSubmit} className="form-container">
                <p>Username</p>
                <input className='form-input'
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                />
                <p>Password</p>
                <input className='form-input'
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />
                {/* <InputAdornment>
                    <IconButton>Show Password</IconButton>
                </InputAdornment> */}
                <input className="button"type="submit" value={match.form}/>
            </form>
        </div>
    </div>
  )
}

export default Auth