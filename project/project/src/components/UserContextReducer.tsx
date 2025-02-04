import { createContext, Dispatch, useReducer } from "react";
import { User } from "../types/UserType";
import SingInAndUp from "./login/SingInAndUp";

type action = {
    type: 'DELETE' | 'CREATE' | 'UPDATE',
    data: Partial<User>
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
        default: return state;
    }
}

export const UserContext = createContext<[User, Dispatch<action>]>([{} as User, () => { }]);

export const UserContextReducer = () => {

    const [user, usersDispatch] = useReducer(userReducer, {} as User);

    return (<>
        <UserContext value={[user, usersDispatch]}>
            <SingInAndUp />
        </UserContext>

    </>);
};