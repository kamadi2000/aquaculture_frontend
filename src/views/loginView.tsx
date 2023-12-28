import styled from "@emotion/styled";
import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../hooks/auth";

export const Login = () => {
    const { handleLogin } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleClick = () => {
        const user = { email: email, password: password }
        return (
            handleLogin(user)    
        )
    }
    
    return (
        <>       
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}} >
            <DIV>
                <Stack
                    component="form"
                    spacing={2}
                    noValidate
                    autoComplete="off"
                >
                    <h1>Login</h1>
                    <TextField
                        id="email"
                        label="email"
                        size="small"
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                    />

                    <TextField
                        id="Password"
                        label="Password"
                        type="password"
                        size="small"
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                    />

                   <Button onClick={handleClick} variant="contained" color="primary">Login</Button>

                </Stack>
            </DIV>
            </div>
        </>
    )
}

const DIV = styled.div`
background: rgba(255, 255, 255, 0.2);
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(5px);
-webkit-backdrop-filter: blur(5px);
border: 1px solid rgba(255, 255, 255, 0.3);
width : 25%;
text-align:center;
padding : 20px
`