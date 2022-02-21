import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppState } from '../AppState.jsx'
import '../styles/nav.css'

const Nav = () => {

    const {state, dispatch} = useAppState()

    const navigate = useNavigate()

  return (
    <header>
        <nav id="navbar">
            <img id="main-logo" src='https://res.cloudinary.com/acurunner79/image/upload/v1643590482/got-horiz-fc_neoi5g.png' alt="got-logo"/>
            <ul id="links-container">
                <Link to="/home">
                    <li>Home</li>
                </Link>

                {!state.token ? (
                    <ul id="links-container">
                        <Link to="/auth/signup">
                            <li>Sign Up</li>
                        </Link>
                        <Link to="/auth/login">
                            <li>Login</li>
                        </Link>
                    </ul>
                ) : null}

                <Link to="/dashboard">
                    <li>Dashboard</li>
                </Link>
                <Link to="/preferences">
                    <li>Preferences</li>
                </Link>
                <Link to="/stats">
                    <li>Statistics</li>
                </Link>
                {state.token ? <div onClick={() => { 
                    dispatch({type: "logout"})
                    navigate("/")}}>
                    <li>Logout</li>
                </div> : null}
            </ul>
            <img id="top-border-img" src='https://res.cloudinary.com/acurunner79/image/upload/v1643593202/edge_ne3zh7.png' alt="border" />
        </nav>
    </header>
  )
}

export default Nav