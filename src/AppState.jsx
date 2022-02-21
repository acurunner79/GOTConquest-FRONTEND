import React from 'react'


////////////////////////////
// INITIAL STATE
////////////////////////////
const initialState = {
    url:'http://localhost:3000',
    id: null,
    token: null,
    username: null,
    players: null,
    new: {
        ingame_name: "",
        allegiance: "",
        keep_level: undefined,
        house_level: undefined,
        power_level: undefined, 
        building_power: undefined,
        research_power: undefined,
        troop_power: undefined,
        dragon_talent_power: undefined,
        armory_power: undefined
    },
    edit: {
        id: 0,
        ingame_name: "",
        allegiance: "",
        keep_level: 0,
        house_level: 0,
        power_level: 0,
        building_power: 0,
        research_power: 0,
        troop_power: 0,
        dragon_talent_power: 0,
        armory_power: 0
    }
}

////////////////////////////
// REDUCER
////////////////////////////
// Action = { type: "", payload: ---}
////////////////////////////
const reducer = (state, action) => {

    let newState;

    switch (action.type){
    
        case "auth":
            newState = { ...state, ...action.payload };
            // console.log('auth appstate', action);
            return newState;
            
        case "logout":
            newState = {...state, token: null, username: null}
            window.localStorage.removeItem("auth")
            window.localStorage.removeItem("getPlayers")
            return newState
            
        case "getPlayers":
            newState = {...state, players: action.payload}
            console.log('getPlayers appstate', action)
            return newState
            
        case "select":
            newState = {...state, edit: action.payload}
            // console.log('select appstate', state)
            return newState
            
            default:
                return state;
            }
        }
//////////////////////////
// APP CONTEXT
/////////////////////////
const AppContext = React.createContext(null)

export const AppState = (props) => {

    const [state, dispatch] = React.useReducer(reducer, initialState)

    return  <AppContext.Provider value={{ state, dispatch }}>{props.children}</AppContext.Provider>
}

////////////////////////
// useAppState Hook
///////////////////////
export const useAppState = () => {
    return React.useContext(AppContext)
}