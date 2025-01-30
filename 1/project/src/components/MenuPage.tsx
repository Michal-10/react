import { AppBar, Toolbar } from "@mui/material"
import { createContext, Dispatch, useReducer } from "react";
import { User } from "../types/UserType";
import SingInAndUp from "./SingInAndUp";
import { RouterProvider } from "react-router";
import { router } from "../routers";



type partUser = Partial<User>;//user - nullable

type action = {
    type: 'DELETE' | 'CREATE' | 'UPDATE',
    data: partUser
}

const userReducer = (state: User, action: action): User => {

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

export const userCotext = createContext<[User, Dispatch<action>]>([{} as User, () => { }]);

export default () => {
    const [user, userDispatch] = useReducer(userReducer, {} as User);

    return (<>

        <AppBar position="static" sx={{ paddingTop: '1.5%', paddingBottom: '0.5%', height: '4%', bgcolor: "blue" }}>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <userCotext.Provider value={[user, userDispatch]}>
                    <SingInAndUp />
                </userCotext.Provider>
                <RouterProvider router={router} />
            </Toolbar>
        </AppBar>

    </>)
}