import {  Box, Button, Modal,  TextField } from "@mui/material"
import { FormEvent, useRef, useState, useContext } from "react"
import { userCotext } from "./HomePage";
import { setUpdateClose } from "./ShowUserNameAndAvatar";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const UpdateUser = () => {

    const [open, setOpen] = useState(true);
    const [close,setClose]=useContext(setUpdateClose);
    const [user, userDispatch] = useContext(userCotext);

    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        userDispatch({
            type: 'UPDATE',
            data: {
                firstName: firstNameRef.current?.value || user.firstName,
                email: emailRef.current?.value || user.email,
                lastName: lastNameRef.current?.value || user.lastName,
                address: addressRef.current?.value || user.address,
                phone: phoneRef.current?.value || user.phone,
                password: passwordRef.current?.value || user.password
            }
        })
        setClose(!close);
        setOpen(!open);//סגור את המודל לאחר עדכון
    }

    return (<>
        <Modal open={open} >
            <Box sx={style}>
                <form onSubmit={handleSubmit}>
                    <TextField label='firstName' inputRef={firstNameRef} />
                    <TextField label='lastName' inputRef={lastNameRef} />
                    <TextField label='passward' inputRef={passwordRef} />
                    <TextField label='email' inputRef={emailRef} />
                    <TextField label='addres' inputRef={addressRef} />
                    <TextField label='phone' inputRef={phoneRef} />
                    <Button type="submit">Save Change</Button>
                </form>
            </Box>
        </Modal>

    </>)
}
export default UpdateUser;