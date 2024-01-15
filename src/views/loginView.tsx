import styled from "@emotion/styled";
import { Button, Stack, TextField } from "@mui/material";
import { useCallback, useState } from "react";
import { useAuth } from "../hooks/auth";
import * as EmailValidator from 'email-validator';
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginData, LoginProps } from "../components/LoginSchemaComponent";

export const Login = () => {
    const { handleLogin } = useAuth();
    
    const { handleSubmit, control, formState: { errors } } = useForm({
        mode: 'all',
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(LoginData)
    })
    
    const onSubmit = useCallback((values: LoginProps) => {
        const user = { email: values.email, password: values.password }
        handleLogin(user)    
    }, [])
    
    return (
        <>       
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}} >
            <DIV>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack
                    spacing={2}
                >
                    <h1>Login</h1>
                    <Controller
                                name='email'
                                control={control}
                                render={({field}) => (
                                    <TextField
                                        error={!!errors.email}
                                        label='Email'
                                        type='text'
                                        size="small"
                                        variant='outlined'
                                        helperText={errors.email?.message}
                                        {...field}
                                    />
                                )}
                            />
                            <Controller
                                name='password'
                                control={control}
                                render={({field}) => (
                                    <TextField
                                        error={!!errors.password}
                                        label='Password'
                                        type='password'
                                        size="small"
                                        variant='outlined'
                                        helperText={errors.password?.message}
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


