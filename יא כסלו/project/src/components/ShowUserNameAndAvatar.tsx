import { Avatar, Box, Button, Grid2, Stack } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { useContext, useState } from "react";
import { userCotext } from "./HomePage";
import UpdateUser from "./UpdateUser";



const ShowUserNameAndAvatar = () => {

    const [update, setUpdate] = useState(false);
    const [user, userDispatch] = useContext(userCotext);

    const stringAvatar = (name: string) => {
        return {
            sx: {
                bgcolor: deepOrange[500],
            },
            children: `${name[0]}${name[name.lastIndexOf(' ') + 1]}`,
        };
    }

    return (
        <>
            <Stack direction="row" spacing={4}>
                <Avatar {...stringAvatar(user.firstName + ' ' + user.lastName)} />
                <h4 >  {user.firstName} {user.lastName}</h4>
            </Stack>

            <Grid2 container >
                <Grid2 size={4} >
                    <Button color="primary" variant="contained" onClick={() => setUpdate(!update)}>Update</Button>
                </Grid2>
            </Grid2>
           

            {update && 
                <UpdateUser />
            }
        </>
    )
}
export default ShowUserNameAndAvatar;