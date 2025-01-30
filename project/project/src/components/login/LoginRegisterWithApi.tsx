import { Box, Button, Modal, TextField, Typography } from "@mui/material"
import { FormEvent, useContext, useRef, useState } from "react";
import axios from "axios";
import ShowUserNameAndAvatar from "./ShowUserNameAndAvatar";
import { userContext } from "../MenuPage";
import { observer } from "mobx-react";
import LoginStore from "../global-state/mobX/LoginStore";

export const styleModal = {
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
    pb: 3
};
// export const UserIdContext = createContext<number>(-1);

export default observer(({ status }: { status: string }) => {

    const [openModal, setOpenModal] = useState(true);
    // const [showBtnOrModal, setShowBtnOrModal] = useContext(isLoginContext);
    // const showBtnOrModal = IsLoggedStore.getIsLogged;
    // const [userID, setUserID] = useState<number>(-1);
    const [user, userDispatch] = useContext(userContext);

    const passwordRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            console.log(status);
            console.log("------1");

            const res = await axios.post(`http://localhost:3000/api/user/${status}`, {
                email: emailRef.current!.value,
                password: passwordRef.current!.value
            });
            console.log("----2");

            if (status == 'login')
                // setUserID(res.data.user.id);
                LoginStore.userId = res.data.user.id;
            else
                // setUserID(res.data.userId);
                LoginStore.userId = res.data.userId;


            console.log(res);
            console.log("-----3");

            userDispatch({

                type: "CREATE",
                data: {
                    password: passwordRef.current?.value || "",
                    email: emailRef.current?.value || "",
                    lastName: status == 'login' ? res.data.user.lastName : '',
                    firstName: status == 'login' ? res.data.user.firstName : '',
                    address: status == 'login' ? res.data.user.address : '',
                    phone: status == 'login' ? res.data.user.phone : '',
                },
            });
            console.log("rrrrrrrrrrrrrrrrrr");
            console.log(user);
            
            
            console.log("----4");

            setOpenModal(!openModal); // סגור את המודאל אחרי התחברות
            LoginStore.isLogin = 'after';
        } catch (e: any) {

            if (e.status === 422 && status == 'register') {
                alert('user already sign up 🥲');
            }
            else if (e.status == 401 && status == 'login')
                alert('user is not register 🥲');
            // setShowBtnOrModal(false);
            LoginStore.isLogin = 'before';
        }
    };
    return (<>

        <Modal open={openModal} >
            <Box sx={styleModal}>
                <form onSubmit={handleSubmit}>
                    <Typography variant="h5" sx={{ color: '#193137', margin: '20px', fontWeight: 'bold', textAlign: 'center' }}>{status === 'login' ? "sign in" : "sign up"}</Typography>
                    <TextField label='userEmail' variant="filled" margin="normal" type="email" fullWidth inputRef={emailRef} required />
                    <TextField label='userPassword' variant="filled" margin="normal" type="password" fullWidth inputRef={passwordRef} required />
                    <Button sx={{ marginTop: '2px' }} color="info" fullWidth variant="contained" type="submit">התחברות</Button>
                </form>
            </Box>
        </Modal>

        {!openModal && <ShowUserNameAndAvatar />}
    </>)
})
