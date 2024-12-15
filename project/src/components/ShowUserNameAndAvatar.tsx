import { Avatar, Button, Stack } from "@mui/material";
import { createContext, Dispatch, useContext, useState } from "react";
import { userCotext } from "./HomePage";
import UpdateUser from "./UpdateUser";

export const setUpdateClose = createContext<[boolean, Dispatch<boolean>]>([false, () => { }])

const ShowUserNameAndAvatar = () => {

    const [update, setUpdate] = useState(false);
    const [user, userDispatch] = useContext(userCotext);

    function stringToColor(string: string) {
        console.log(string);

        let hash = 0;
        let i;

        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        return color;
    }

    const stringAvatar = (name: string) => {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name[0]}${name[name.indexOf(' ') + 1]}`,
        };
    }

    return (
        <>
            <Stack direction="column" spacing={2}>
                <Stack direction="row" spacing={4}>
                    <Avatar {...stringAvatar(user.firstName + ' ' + user.lastName)} />
                    <h4 >  {user.firstName} {user.lastName}</h4>
                </Stack>
                <Button sx={{ height: 30, 
                              width: 80, 
                              fontSize: 12}} 
                              color="primary" variant="outlined" onClick={() => setUpdate(!update)}>Update
                </Button>
            </Stack>
            <setUpdateClose.Provider value={[update, setUpdate]}>
                {update &&
                    <UpdateUser />
                }
            </setUpdateClose.Provider>
        </>
    )
}
export default ShowUserNameAndAvatar;