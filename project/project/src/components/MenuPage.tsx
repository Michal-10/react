import { AppBar, Toolbar } from "@mui/material"
import { UserContextReducer } from "./UserContextReducer";


export default () => {
    return (<>
        <AppBar position="static" sx={{ boxShadow: 'none', paddingBottom: '25px', bgcolor: 'white', paddingRight: '5%' }}>
            <Toolbar sx={{ display: "flex", flexDirection: 'row-reverse', justifyContent: "space-between", }}>

                    <UserContextReducer />

            </Toolbar>
        </AppBar>
    </>)
}