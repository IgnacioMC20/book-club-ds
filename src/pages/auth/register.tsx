import { NextPage } from 'next'
import NextLink from 'next/link'
import React, { useState } from 'react'

import { Button, Card, Grid, InputLabel, Link, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'

import { AuthLayout } from '@/components/layout'
import { validations } from '@/utils'
import { useContext } from 'react';
import { AuthContext } from '@/context'
import { useRouter } from 'next/router'
import Image from 'next/image'

type FormData = {
    email: string;
    name: string;
    lastname: string;
    password: string,
    confirmPassword: string,

};

const RegisterPage: NextPage = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
    const { registerUser } = useContext(AuthContext)
    const router = useRouter()

    const onRegisterUser = async ({ email, password, name, lastname }: FormData) => {
        const fullName = `${name.trim()} ${lastname.trim()}`
        const isValidRegister = await registerUser(email, password, fullName);

        const destination = router.query.p?.toString() || '/';
        if (isValidRegister) router.replace(destination)
    }

    const samePasswordAs = (password: string) => {
        return (value: string) => {
            return value === password || 'Las contraseñas no coinciden';
        };
    };

const [country, setCountry] = useState('GT')
    const handleChange = (event: SelectChangeEvent) => {
        setCountry(event.target.value as string);
    };

    const password = watch('password', '');

    return (
        <AuthLayout title={'Register'}>
            <Grid container sx={{ height: '100%' }}>
                <Grid item xs={12} display='flex' justifyContent='center' alignItems='center'>
                    <Card sx={{ width: '50%', padding: '25px 25px', backgroundColor: 'rgba(255,255,255)' }}>
                        <form onSubmit={handleSubmit(onRegisterUser)} noValidate>
                            <Grid container spacing={4}>
                                <Grid item xs={12} display='flex' flexDirection='column' justifyContent='center'>
                                    <Typography color='primary' variant='h1' component='h1'>Register</Typography>
                                    <Image
                                        src="/images/books.png"
                                        width={150}
                                        height={150}
                                        alt="Picture of the author"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        size='small'
                                        label='Nombres'
                                        variant='outlined'
                                        fullWidth
                                        {...register('name', {
                                            required: 'Este campo es requerido',
                                        })}
                                        error={!!errors.name}
                                        helperText={errors.name?.message}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        size='small'
                                        label='Apellidos'
                                        variant='outlined'
                                        fullWidth
                                        {...register('lastname', {
                                            required: 'Este campo es requerido',
                                            minLength: { value: 3, message: 'Minimo de 3 caracteres' }
                                        })}
                                        error={!!errors.lastname}
                                        helperText={errors.lastname?.message}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        size='small'
                                        label='Correo'
                                        variant='outlined'
                                        fullWidth
                                        {...register('email', {
                                            required: 'Este campo es requerido',
                                            validate: (value) => validations.isEmail(value)
                                        })}
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                        autoComplete='false'
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <InputLabel>Country</InputLabel>
                                    <Select
                                        label="Country"
                                        onChange={handleChange}
                                        value={country}
                                        size='small'
                                    >
                                        <MenuItem value={'GT'}>Guatemala</MenuItem>
                                        <MenuItem value={'ES'}>El Salvador</MenuItem>
                                    </Select>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        size='small'
                                        label='Contraseña'
                                        type='password'
                                        variant='outlined'
                                        fullWidth
                                        {...register('password', {
                                            required: 'Este campo es requerido',
                                            minLength: { value: 6, message: 'Minimo de 6 caracteres' }
                                        })}
                                        error={!!errors.password}
                                        helperText={errors.password?.message}
                                        autoComplete='false'
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        size='small'
                                        label='Confirmar Contraseña'
                                        type='password'
                                        variant='outlined'
                                        fullWidth
                                        {...register('confirmPassword', {
                                            required: 'Este campo es requerido',
                                            minLength: { value: 6, message: 'Minimo de 6 caracteres' },
                                            validate: samePasswordAs(password),
                                        })}
                                        error={!!errors.confirmPassword}
                                        helperText={errors.confirmPassword?.message}
                                        autoComplete='false'
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button size='large' type='submit' fullWidth>Create Account</Button>
                                </Grid>
                                <Grid item xs={12} display='flex' justifyContent='end'>
                                    <NextLink href={'/auth/login'} passHref legacyBehavior>
                                        <Link underline='hover'>
                                        Already have an account?
                                        </Link>
                                    </NextLink>
                                </Grid>
                            </Grid>
                        </form>
                    </Card>
                </Grid>
            </Grid>
        </AuthLayout>
    )
}

export default RegisterPage