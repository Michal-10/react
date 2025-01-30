import { AppBar, Button, Toolbar } from "@mui/material"
import { act, createContext, Dispatch, useReducer } from "react";
import { User } from "../types/UserType";
import SingInAndUp from "./login/SingInAndUp";
import { RouterProvider } from "react-router";
import { router } from "../routers";
import { Provider } from "react-redux";
import store from "./global-state/redux/store/store";
import { RecipeList } from "./recipes/RecipesList";
import { BrowserRouter } from "react-router";

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
        <AppBar position="static" sx={{ paddingBottom: '25px' }}
        // sx={{ paddingTop: '1.5%', paddingBottom: '0.5%', height: '4%', bgcolor: "blue" }}
        >
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <userContext.Provider value={[user, userDispatch]}>

                    <SingInAndUp />

                </userContext.Provider>
            </Toolbar>
        </AppBar>
        <RouterProvider router={router} />


    </>)
}