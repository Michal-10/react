import { Avatar, Box, Button, Stack } from "@mui/material";
import { useContext, useState } from "react";
import { userContext } from "../MenuPage";
import UpdateUser from "./UpdateUser";
import { Link } from "react-router";

const ShowUserNameAndAvatar = () => {

    const [update, setUpdate] = useState(false);
    const [user, userDispatch] = useContext(userContext);

    function stringToColor(string: string) {
        console.log("dfg-bnhm");
        
        console.log(user);
        
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
        
        if (name == "" || name== undefined) {
            return {
                sx: {
                    bgcolor: 'black',
                },
                children: `?`
            };
        }
        else {
            return {
                sx: {
                    bgcolor: stringToColor(name),
                },
                children: `${name.split(' ')[0][0]}`
            }
        };
    }

    return (
        <>
        <Link to="/Home" style={{ marginRight: '10px', padding: '3px', color: 'white', borderRadius: '3px', border: '2px solid white' }} >LogOut</Link>

            <Box >
                <Stack direction="row" spacing={2}>
                {/* <Avatar style={{ marginLeft: '8px' }} {...stringAvatar(user.firstName)} > */}
                            {/* {(user.firstName ? user.firstName[0] : '')} */}
                        {/* </Avatar> */}
                    <Avatar style={{ marginLeft: '8px' }} {...stringAvatar(user.firstName)} />
                    <Box sx={{ fontWeight: 'bolder', whiteSpace: 'nowrap', fontSize: '20px', paddingTop: '5px' }}>  {user.firstName} {user.lastName}</Box>
                    <Button sx={{ marginRight: '10px', padding: '3px', color: 'white', borderRadius: '3px', border: '2px solid white' }} variant="outlined" onClick={() => setUpdate(!update)}>Update
                    </Button>
                </Stack>
            </Box>

            {update && <UpdateUser close={update} setClose={setUpdate} />}
        </>
    )
}
export default ShowUserNameAndAvatar;