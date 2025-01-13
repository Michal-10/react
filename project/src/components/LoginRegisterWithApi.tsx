import { Box, Button, Modal, TextField, Typography } from "@mui/material"
import { createContext, FormEvent, useContext, useRef, useState } from "react";
import { isLoginContext } from "./SingInAndUp";
import axios from "axios";
import ShowUserNameAndAvatar from "./ShowUserNameAndAvatar";
import { userCotext } from "./MenuPage";

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
export const UserIdContext = createContext<number>(-1);

export default ({ signInOrUp }: { signInOrUp: string }) => {

    const [openModal, setOpenModal] = useState(true);
    const [showBtnOrModal, setShowBtnOrModal] = useContext(isLoginContext);
    const [userID, setUserID] = useState<number>(-1);
    const [user, userDispatch] = useContext(userCotext);


    const passwordRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {

            const res = await axios.post(`http://localhost:3000/api/user/${signInOrUp}`, {
                email: emailRef.current!.value,
                password: passwordRef.current!.value
            });

            if (signInOrUp == 'login')
                setUserID(res.data.user.id);
            else
                setUserID(res.data.userId);

            userDispatch({
                type: "CREATE",
                data: {
                    password: passwordRef.current?.value || "",
                    email: emailRef.current?.value || "",
                    lastName: signInOrUp == 'login' ? res.data.user.lastName : '',
                    address: signInOrUp == 'login' ? res.data.user.address : '',
                    phone: signInOrUp == 'login' ? res.data.user.phone : '',
                    firstName: signInOrUp == 'login' ? res.data.user.firstName : ''
                },
            });
            setOpenModal(!openModal); // סגור את המודאל אחרי התחברות

        } catch (e: any) {
            if (e.status === 422 && signInOrUp == 'register') {
                alert('user already sign up 🥲');
            }
            if (e.status == 401 && signInOrUp == 'login')
                alert('user is not register 🥲');
            setShowBtnOrModal(false);

        } finally {
            emailRef.current!.value = ''
            passwordRef.current!.value = ''
        }
    };

    return (<>

        <Modal open={openModal} >
            <Box sx={styleModal}>
                <form onSubmit={handleSubmit}>
                    {signInOrUp === 'login' ?
                        <Typography variant="h5" sx={{ color: '#193137', margin: '20px', fontWeight: 'bold', textAlign: 'center' }}>sign in</Typography> :
                        <Typography variant="h5" sx={{ color: '#193137', margin: '20px', fontWeight: 'bold', textAlign: 'center' }}>sign up</Typography>}
                    <TextField label='userEmail' variant="filled" margin="normal" type="email" fullWidth inputRef={emailRef} required />
                    <TextField label='userPassword' variant="filled" margin="normal" fullWidth inputRef={passwordRef} required />
                    <Button sx={{ marginTop: '2px' }} color="info" fullWidth variant="contained" type="submit">התחברות</Button>
                </form>
            </Box>
        </Modal>

        <UserIdContext.Provider value={userID}>
            {!openModal && <ShowUserNameAndAvatar />}
        </UserIdContext.Provider>
    </>)
}
