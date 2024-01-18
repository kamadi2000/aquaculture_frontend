import styled from "@emotion/styled";
import { Button, IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import { useCallback, useState } from "react";
import { useAuth } from "../hooks/auth";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginData, LoginProps } from "../components/LoginSchemaComponent";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export const Login = () => {
    const { handleLogin } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const { handleSubmit, control, formState: { errors } } = useForm({
        mode: 'all',
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(LoginData)
    })
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = useCallback((values: LoginProps) => {
        const user = { email: values.email, password: values.password }
        handleLogin(user)
    }, [])

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} >
                <DIV>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack
                            spacing={2}
                        >
                            <h1>Login</h1>
                            <Controller
                                name='email'
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        error={!!errors.email}
                                        label='Email'
                                        type='text'
                                        size="small"
                                        required
                                        variant='outlined'
                                        helperText={errors.email?.message}
                                        {...field}
                                    />
                                )}
                            />
                            <Controller
                                name='password'
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        error={!!errors.password}
                                        label='Password'
                                        type={showPassword ? "text" : "password"}
                                        size="small"
                                        variant='outlined'
                                        helperText={errors.password?.message}
                                        required={true}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        {...field}
                                    />
                                )}
                            />

                            <Button type="submit" variant="contained" color="primary">Login</Button>

                        </Stack>
                    </form>
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


