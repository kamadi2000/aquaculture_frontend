import { Alert, Button, Stack, TextField, Typography } from "@mui/material"
import { OuterFrame } from "../components/OuterFrameComponent"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";

export const AdminForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rPassword, setRPassword] = useState('');

    const { handleSignIn } = useAuth()

    const handleAddAdmin = () => {
        if (password === rPassword && password.length > 0) {
            const Admin = { name: name, email: email, password: password }
            handleSignIn(Admin)
        }else{
            console.log("passwords do not match")
        }
    }

    return (
        <OuterFrame>
            <Typography sx={{ flex: '1 1 100%' }} variant="h6">Admins</Typography>
            <Stack
                component="form"
                spacing={2}
                noValidate
                autoComplete="off"
            >
                <h1>Add Admin</h1>

                <TextField
                    required
                    id="name"
                    label="Name"
                    size="small"
                    value={name}
                    onChange={(event) => {
                        setName(event.target.value);
                    }}
                />
                <TextField
                    required
                    id="email"
                    label="Email"
                    size="small"
                    value={email}
                    onChange={(event) => {
                        setEmail(event.target.value);
                    }}
                />
                <TextField
                    required
                    id="password"
                    label="Password"
                    size="small"
                    type="password"
                    value={password}
                    onChange={(event) => {
                        setPassword(event.target.value);
                    }}
                />
                <TextField
                    required
                    id="RPassword"
                    label="Re-enter password"
                    size="small"
                    type="password"
                    value={rPassword}
                    onChange={(event) => {
                        setRPassword(event.target.value);
                    }}
                />


                <Button onClick={handleAddAdmin} variant="contained" color="primary">Add</Button>

            </Stack>
        </OuterFrame>
    )
}