import { Box, Button, Grid2 } from "@mui/material";
import { createContext, Dispatch, useState } from "react";
import LoginRegisterWithApi from "./LoginRegisterWithApi";
import { observer } from "mobx-react"
import IsLoggedStore from "../global-state/mobX/LoginStore";
import LoginStore from "../global-state/mobX/LoginStore";

const topStyle = {
    position: 'absolute',
    top: '4%',
    left: '3%'
}

export default observer(() => {

    const [signInOrUp, setSignInOrUp] = useState<'login' | 'register' | null>(null);

    const HandleClick = (signInUp: 'login' | 'register') => {
        setSignInOrUp(signInUp);
        LoginStore.isLogin = 'in';
    }

    return (<>

        <Box sx={topStyle}>
            <Grid2 container>
                    { IsLoggedStore.isLogin === 'before' ?
                        <> <Button sx={{marginTop:'25px', marginRight: '12px', color: 'white', border: '2px solid white' }} variant="outlined" onClick={() => HandleClick('login')}>sign in</Button>
                            <Button sx={{marginTop:'25px', color: 'white', border: '2px solid white' }} variant="outlined" onClick={() => HandleClick('register')}>sign up</Button></>
                        :
                        <LoginRegisterWithApi status={signInOrUp!} />
                    }
            </Grid2>
        </Box >
    </>)
})