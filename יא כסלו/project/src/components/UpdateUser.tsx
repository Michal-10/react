import {  Box, Button, Modal,  TextField } from "@mui/material"
import { FormEvent, useRef, useState, useContext } from "react"
import { userCotext } from "./HomePage";

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

    // const [open, setOpen] = useState(false);
    const [open, setOpen] = useState(true);
    const [user, userDispatch] = useContext(userCotext);

    // const userRef = useRef<User>(user)

    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target;
    //     userRef.current[name as keyof User] = value;
    // }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        userDispatch({
            type: 'UPDATE',
            data: {
                // userRef.current
                // firstName: userRef.current?.firstName ,
                // email: userRef.current?.email ,
                // lastName: userRef.current?.lastName ,
                // address: userRef.current?.address ,
                // phone: userRef.current?.phone ,
                // password: userRef.current?.password 
                firstName: firstNameRef.current?.value || user.firstName,
                email: emailRef.current?.value || user.email,
                lastName: lastNameRef.current?.value || user.lastName,
                address: addressRef.current?.value || user.address,
                phone: phoneRef.current?.value || user.phone,
                password: passwordRef.current?.value || user.password
            }
        })
        // setOpen(!open);//סגור את המודל לאחר עדכון
        setOpen(!open);
    }

    return (<>
        <Modal open={open} onClose={() => setOpen(!open)}>
            <Box sx={style}>
                <form onSubmit={handleSubmit}>
                    {/* <TextField label='firstName' onChange={handleChange} />
                    <TextField label='lastName' onChange={handleChange} />
                    <TextField label='passward' onChange={handleChange} />
                    <TextField label='email' onChange={handleChange} />
                    <TextField label='addres' onChange={handleChange} />
                    <TextField label='phone' onChange={handleChange} />
                    <Button type="submit">Save Change</Button> */}
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