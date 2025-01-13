import { Avatar, Box, Button, Stack } from "@mui/material";
import { createContext, Dispatch, useContext, useState } from "react";
import UpdateUser from "./UpdateUser";
import { userCotext } from "./MenuPage";
export const setUpdateClose = createContext<[boolean, Dispatch<boolean>]>([false, () => { }])

const ShowUserNameAndAvatar = () => {

    const [update, setUpdate] = useState(false);
    const [user, userDispatch] = useContext(userCotext);

    function stringToColor(string: string) {

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
        
        let x = name === undefined || name == ' ' ? '?' : `${name[0]}${name[name.indexOf(' ') + 1]}`;

        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            // children: child == '' || child == 'undefined' ? '?' : child,
            children: x
        };
    }

    return (
        <>
            {/* <Link to="/Home"  style={{border:'2px solid white', color:'white',paddingRight:'10px', left:'3%'}}>logout</Link>  */}
            <Button sx={{ marginRight: '10px', padding: '3px', color: 'white', borderRadius: '3px', border: '2px solid white' }} variant="outlined" >logout</Button>

            <Box /*sx={{ position: 'absolute', top: '4%', left: '3%' }}*/>
                <Stack direction="row" spacing={2}>
                    <Avatar style={{marginLeft:'8px'}} {...stringAvatar(user.firstName + ' ' + user.lastName)} />
                    <Box sx={{ fontWeight: 'bolder', whiteSpace: 'nowrap', fontSize: '20px', paddingTop: '5px' }}>  {user.firstName} {user.lastName}</Box>
                    <Button sx={{ marginRight: '10px', padding: '3px', color: 'white', borderRadius: '3px', border: '2px solid white' }} variant="outlined" onClick={() => setUpdate(!update)}>Update
                    </Button>
                </Stack>
            </Box>

            <setUpdateClose.Provider value={[update, setUpdate]}>
                {update &&
                    <UpdateUser />
                }
            </setUpdateClose.Provider>


        </>
    )
}
export default ShowUserNameAndAvatar;