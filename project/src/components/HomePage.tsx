import { Box, Button, Grid2, Modal, TextField } from "@mui/material"
import { createContext, Dispatch, FormEvent, useReducer, useRef, useState } from "react";
import { User } from "../types/UserType";
import ShowUserNameAndAvatar from "./ShowUserNameAndAvatar";


type partUser = Partial<User>;

type action = {
    type: 'DELETE'|'CREATE'|'UPDATE',
    data: partUser
}



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const userReducer = (state: User, action: action): User => {
    switch (action.type) {
        case 'CREATE':
            return {
                ...state,...action.data
                // password: action.data.password ?? state.password,
                // email: action.data.email ?? state.email,
                // firstName: 'M',
                // lastName: 'M'
            }
        case 'UPDATE':
            return {
                ...state,...action.data
                // password: action.data.password ?? state.password,
                // email: action.data.email ?? state.email,
                // firstName: action.data.firstName ?? state.firstName,
                // lastName: action.data.lastName ?? state.lastName,
                // phone: action.data.phone ?? state.phone,
                // address: action.data.address ?? state.address,
            };
        // case 'DELETE':
        default: return state;
    }
}

// type UserContextType = [User, Dispatch<action>]
// export const userCotext = createContext<UserContextType>([{} as User, () => { }]);
export const userCotext = createContext<[User, Dispatch<action>]>([{} as User, () => { }]);


const HomePage = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [open, setOpen] = useState(false);
    const [user, userDispatch] = useReducer(userReducer, {} as User);

    const PasswordRef = useRef<HTMLInputElement>(null)
    const nameRef = useRef<HTMLInputElement>(null)

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        setIsLogin(true);
        userDispatch({
            type: "CREATE",
            data: {
                password: PasswordRef.current?.value || "",
                firstName: nameRef.current?.value || "",
                lastName: ' ',
                address: '',
                phone: '',
                email: ''
            },
        });
        setOpen(false); // סגור את המודאל אחרי התחברות
    };

    return (<>
        {!isLogin &&
            <Box component="section" sx={{ fontSize: '20px', fontWeight: 'bold', p: 1, border: '2px dashed grey' }}>
                Home
            </Box>
        }
        
        <Grid2 container>
            <userCotext.Provider value={[user, userDispatch]}>
                {!isLogin ?
                    <Button color="primary" variant="contained" onClick={() => setOpen(!open)}>Login</Button>
                    : <ShowUserNameAndAvatar/>
                }
            </userCotext.Provider>
        </Grid2>

        <Modal open={open} onClose={() => setOpen(false)}>
            <Box sx={style}>
                <form onSubmit={handleSubmit}>
                    <TextField label='userName' inputRef={nameRef} />
                    <br />
                    <TextField label='userPassword' inputRef={PasswordRef} />
                    <Button type="submit">התחברות</Button>
                </form>
            </Box>
        </Modal>
    </>)

    {/* <Modal open={open} onClose={() => setOpen(false)}>
                <Box sx={style}>
                    <TextField label='firstName' />
                    <TextField label='lastName' />
                    <TextField label='passward' />
                    <TextField label='email' />
                    <TextField label='addres' />
                    <TextField label='phone' />
                    <Button onClick={() => {
                        setOpen(false); setIsLogin(true)
                    }}>Login</Button>
                </Box>
            </Modal>  */}
}
export default HomePage;


