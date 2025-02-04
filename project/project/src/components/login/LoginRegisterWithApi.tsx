import { Box, Button, Modal, TextField, Typography } from "@mui/material"
import { FormEvent, useContext, useRef, useState } from "react";
import axios from "axios";
import ShowUserNameAndAvatar from "./UserDetails";
import { observer } from "mobx-react";
import LoginStore from "../global-state/mobX/LoginStore";
import { UserContext } from "../UserContextReducer";

export const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid rosybrown',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    color: 'rosybrown'
};

export default observer(({ status }: { status: string }) => {

    const [openModal, setOpenModal] = useState(true);
    const [, userDispatch] = useContext(UserContext);

    const passwordRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {

            const res = await axios.post(`http://localhost:3000/api/user/${status}`, {
                email: emailRef.current!.value,
                password: passwordRef.current!.value
            });

            if (status == 'login')
                LoginStore.UserId = res.data.user.id;
            else
                LoginStore.UserId = res.data.userId;

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

            setOpenModal(!openModal);
            LoginStore.IsLogged = 'after';

        } catch (e: any) {

            if (e.status === 400 || e.status === 422 && status == 'register') {
                alert('user already sign up 🥲');
            }
            else if (e.status == 401 && status == 'login')
                alert('user is not register 🥲');
            LoginStore.IsLogged = 'before';
        }
    };

    return (<>

        <Modal open={openModal} >
            <Box sx={styleModal}>
                <form onSubmit={handleSubmit}>
                    <Typography variant="h5" sx={{ color: 'rosybrown', margin: '20px', fontWeight: 'bold', textAlign: 'center' }}>{status === 'login' ? "sign in" : "sign up"}</Typography>
                    <TextField label='userEmail' variant="filled" margin="normal" type="email" fullWidth inputRef={emailRef} required />
                    <TextField label='userPassword' variant="filled" margin="normal" type="password" fullWidth inputRef={passwordRef} required />
                    <Button sx={{ marginTop: '2px', backgroundColor: 'rosybrown' }} fullWidth variant="contained" type="submit">התחברות</Button>
                </form>
            </Box>
        </Modal>

        {!openModal && <ShowUserNameAndAvatar />}
    </>)
})
