import { createContext, useReducer } from "react";
import reducer from "../reducers/reducer";
import { IState,Action } from "../types/types";

const initialState:IState = {
    products:[],
    cart:[],
    user:null,
};

export const GlobalContext = createContext<{ state:IState; dispatch: React.Dispatch<Action>;}>({state : initialState , dispatch: ()=>{} });

export const GlobalProvider = ({children}) =>{
    const [state,dispatch] = useReducer(reducer,initialState);

    return (
        <GlobalContext.Provider value={{state,dispatch}}>
            {children}
        </GlobalContext.Provider>
    );
}


