import { AppBar, Toolbar } from "@mui/material"
import { createContext, Dispatch, useReducer } from "react";
import { User } from "../../types/UserType";
import SingInAndUp from "./SingInAndUp";

type action = {
    type: 'DELETE' | 'CREATE' | 'UPDATE',
    data: Partial<User>
}

const userReducer = (state: User, action: action): User => {

    console.log("-----userReducer---" + action.type);
    console.log(state);

    switch (action.type) {
        case 'CREATE':
            return {
                ...state, ...action.data
            }
        case 'UPDATE':
            return {
                ...state, ...action.data
            };
        // case 'DELETE':
        default: return state;
    }
}

export const userContext = createContext<[User, Dispatch<action>]>([{} as User, () => { }]);

export default () => {
    const [user, userDispatch] = useReducer(userReducer, {} as User);

    return (<>
        <AppBar position="static" sx={{boxShadow: 'none', paddingBottom: '25px', bgcolor: 'white', paddingRight: '5%' }}>
            <Toolbar sx={{display: "flex", flexDirection: 'row-reverse', justifyContent: "space-between" , }}>
                <userContext.Provider value={[user, userDispatch]}>

                    <SingInAndUp />

                </userContext.Provider>
            </Toolbar>
        </AppBar>
    </>)
}