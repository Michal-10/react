import { Box, Button, Modal, TextField, Typography } from "@mui/material"
import { FormEvent, useRef, /*useState,*/ useContext, useState } from "react"
import { setUpdateClose } from "./ShowUserNameAndAvatar";
import axios from "axios";
import { styleModal, UserIdContext } from "./LoginRegisterWithApi";
import { userCotext } from "./MenuPage";



const UpdateUser = () => {

    // const [open, setOpen] = useState(true);
    const [close, setClose] = useContext(setUpdateClose);// = update from ShowNameAndAvatar
    const [user, userDispatch] = useContext(userCotext);
    const [errors, setErrors] = useState<{ email: null | string, phone: null | string }>({ email: null, phone: null });
    const userId = useContext(UserIdContext);


    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const checkEmail = (): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRef.current?.value) {
            if (!emailRegex.test(emailRef.current.value)) {
                console.log("email " + emailRef.current?.value);
                setErrors(prevErrors => ({ ...prevErrors, email: "Invalid email address." }));
                return false;
            } else {
                setErrors(prevErrors => ({ ...prevErrors, email: null })); // מוחקת את הערך
                return true;
            }
        }
        return true;
    }

    const checkPhone = (): boolean => {
        const phoneRegex = /^(?=.*\d{9})[0-9+\-\s()]*$/; // מאפשר רק מספרים, +, -, רווחים וסוגריים
        if (phoneRef.current?.value) {
            if (!phoneRegex.test(phoneRef.current.value)) {
                setErrors(prevErrors => ({ ...prevErrors, phone: "Invalid phone number." }));
                return false;
            }
            else {
                setErrors(prevErrors => ({ ...prevErrors, phone: null }));// אין שגיאה, מוחקת את הערך
                return true;
            }
        }
        return true;
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const valid = {
            email: checkEmail(),
            phone: checkPhone()
        };
        if (!valid.email || !valid.phone) {
            alert("פרמטרים לא חוקיים");
            return;
        }

        try {

            await axios.put('http://localhost:3000/api/user', {
                firstName: firstNameRef.current?.value,
                lastName: lastNameRef.current?.value,
                email: emailRef.current?.value,
                address: addressRef.current?.value,
                phone: phoneRef.current?.value
            },
            { headers: { 'user-id': userId + '' } }
            );

            userDispatch({
                type: 'UPDATE',
                data: {
                    firstName: firstNameRef.current?.value == '' ? user.firstName : firstNameRef.current?.value,
                    email: emailRef.current?.value == '' ? user.email : emailRef.current?.value,
                    lastName: lastNameRef.current?.value == '' ? user.lastName : lastNameRef.current?.value,
                    address: addressRef.current?.value == '' ? user.address : addressRef.current?.value,
                    phone: phoneRef.current?.value == '' ? user.phone : phoneRef.current?.value,
                    password: passwordRef.current?.value == '' ? user.password : passwordRef.current?.value
                }
            })
            setClose(!close);//update the UpdateButton in ShowAvatarAndUserComponenet to close

        } catch (e: any) {

            if (e.status == 404)
                alert("user don't found 😢");
        }
    }

    return (<>
        <Modal open={true} >
            <Box sx={styleModal}>
                <form onSubmit={handleSubmit}>
                    <Typography variant="h5" sx={{ color: '#193137', margin: '10px', fontWeight: 'bold', textAlign: 'center' }}>Update</Typography>
                    <TextField label='firstName' variant="filled" margin="normal" fullWidth inputRef={firstNameRef} />
                    <TextField label='lastName' variant="filled" margin="normal" fullWidth inputRef={lastNameRef} />
                    <TextField label='password' defaultValue={user.password}  variant="filled" margin="normal" fullWidth type="password" inputRef={passwordRef} />
                    <TextField label='email' defaultValue={user.email}  variant="filled" margin="normal" fullWidth type="email" /*onChange={HandleChange}*/ inputRef={emailRef} />
                    {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
                    <TextField label='addres' variant="filled" margin="normal" fullWidth inputRef={addressRef} />
                    <TextField label='phone' variant="filled" margin="normal" fullWidth /*onChange={HandlePhone}*/ inputRef={phoneRef} />
                    {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}

                    <Button color="info" variant="contained" fullWidth type="submit">Save Change</Button>
                </form>
            </Box>
        </Modal>
    </>)
}
export default UpdateUser;