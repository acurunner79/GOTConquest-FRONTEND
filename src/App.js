import Nav from './components/Nav';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useAppState } from './AppState.jsx';
import Home from './pages/Home';
import Auth from './pages/Auth';
import PlayerForm from './components/PlayerForm';
import './App.css';
import Dashboard from './pages/Dashboard';
import Footer from './components/Footer';
import React from 'react';


const App = () => {

  const navigate = useNavigate()

  const {state, dispatch} = useAppState()
  const { getPlayers } = state
  // console.log('app state', state)

  React.useState(() => {
    const auth = JSON.parse(window.localStorage.getItem("auth"))
    if (auth){
      dispatch({type: "auth", payload: auth})
      navigate("/dashboard")
    } else {
      navigate("/")
    }
  }, [navigate])

  return (
    <div className="App">
      <Nav />
      <Routes>
        {/* <Route path="/" element={<Nav />}/> */}
        <Route path="/home" element={<Home />}/>
        <Route path="/auth/:form" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard {...state}/>} />
        <Route path="/dashboard/:action" element={<PlayerForm {...getPlayers}/>}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
