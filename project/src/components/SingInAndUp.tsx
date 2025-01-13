import { Box, Button, Grid2 } from "@mui/material";
import { createContext, Dispatch, useState } from "react";
import LoginRegisterWithApi from "./LoginRegisterWithApi";



const topStyle = {
    position: 'absolute',
    top: '4%',
    left: '3%'
}

export const isLoginContext = createContext<[boolean, Dispatch<boolean>]>([true, () => { }]);

export default () => {

    const [isLogin, setIsLogin] = useState(false);
    const [signInOrUp, setSignInOrUp] = useState<'login' | 'register' | null>(null);

    const HandleClick = (signInUp: 'login' | 'register') => {
        setSignInOrUp(signInUp);
        setIsLogin(!isLogin);
    }

    return (<>

        <Box sx={topStyle}>
            <Grid2 container>
                <isLoginContext.Provider value={[isLogin, setIsLogin]}>

                    {!isLogin ?
                        <> <Button sx={{ marginRight: '8px', color: 'white', border: '2px solid white' }} variant="outlined" onClick={() => HandleClick('login')}>sign in</Button>
                            <Button sx={{ color: 'white', border: '2px solid white' }} variant="outlined" onClick={() => HandleClick('register')}>sign up</Button></>
                        :
                        <LoginRegisterWithApi signInOrUp={signInOrUp!} />
                    }
                </isLoginContext.Provider>
            </Grid2>
        </Box >


    </>)
}