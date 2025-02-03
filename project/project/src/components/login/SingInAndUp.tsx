import { Box, Button, Grid2 } from "@mui/material";
import { useState } from "react";
import LoginRegisterWithApi from "./LoginRegisterWithApi";
import { observer } from "mobx-react"
import IsLoggedStore from "../global-state/mobX/LoginStore";
import LoginStore from "../global-state/mobX/LoginStore";

const topStyle = {
    position: 'absolute',
    top: '4%',
    right: '3%',
    color: 'rosybrown'
}

export default observer(() => {

    const [signInOrUp, setSignInOrUp] = useState<'login' | 'register' | null>(null);

    const HandleClick = (signInUp: 'login' | 'register') => {
        setSignInOrUp(signInUp);
        LoginStore.IsLogged = 'in';
    }

    return (<>

        <Box sx={topStyle}>
            <Grid2 container>
                {IsLoggedStore.IsLogged === 'before' ?
                    <>
                        <Box sx={{ display: 'flex', marginTop: '6vh' }}>
                            <Button style={{ color: 'rosybrown', border: '2px solid rosybrown' }} sx={{ marginLeft: '50px' }} variant="outlined" onClick={() => HandleClick('login')}>sign in</Button>
                            <Button style={{ color: 'rosybrown', border: '2px solid rosybrown' }} sx={{ marginLeft: '50px' }} variant="outlined" onClick={() => HandleClick('register')}>sign up</Button>
                        </Box>
                    </>
                    :
                    <LoginRegisterWithApi status={signInOrUp!} />
                }
            </Grid2>
        </Box >
    </>)
})