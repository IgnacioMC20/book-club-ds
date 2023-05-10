import { NextPage } from 'next'
import NextLink from 'next/link'
import React from 'react'

import { Button, Card, Grid, Link, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'

import { AuthLayout } from '@/components/layout'
import { validations } from '@/utils';
import { useContext } from 'react';
import { AuthContext } from '@/context'
import { useRouter } from 'next/router';
import Image from 'next/image'

type FormData = {
    email: string,
    password: string,
};

const LoginPage: NextPage = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
    const { loginUser } = useContext(AuthContext);
    const router = useRouter();

    const onLoginUser = async ({ email, password }: FormData) => {
        const isValidLogin = await loginUser(email, password);

        const destination = router.query.p?.toString() || '/';
        if (isValidLogin) router.replace(destination)
    }

    return (
        <AuthLayout title={'Login'}>
            <Grid container sx={{ height: '100%' }} display='flex' justifyContent='center' alignItems='center'>
                <Grid item xs={12} display='flex' justifyContent='center' alignItems='center'>
                    <Card sx={{ width: '50%', padding: '25px 25px', backgroundColor: 'rgba(255,255,255)', boxShadow: '16px 16px 15px 0px rgba(0,0,0,0.1)' }} >
                        <form onSubmit={handleSubmit(onLoginUser)} noValidate>
                            <Grid container spacing={4}>
                                <Grid item xs={12} display='flex' flexDirection='column' justifyContent='center'>
                                    <Typography color='primary' variant='h1' component='h1'>Iniciar Sesión</Typography>
                                    <Image
                                        src="/images/books.png"
                                        width={150}
                                        height={150}
                                        alt="Picture of the author"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label='Correo'
                                        type='email'
                                        variant='outlined'
                                        fullWidth
                                        {...register('email', {
                                            required: 'Este campo es requerido',
                                            validate: (value) => validations.isEmail(value)
                                        })}
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                        autoComplete='false' />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
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
                                        autoComplete='false' />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type='submit' size='large' fullWidth>Ingresar</Button>
                                </Grid>
                                <Grid item xs={12} display='flex' justifyContent='end'>
                                    <NextLink href={'/auth/register'} passHref legacyBehavior>
                                        <Link underline='hover'>
                                        Don&apos;t have an account?
                                        </Link>
                                    </NextLink>
                                </Grid>
                            </Grid>
                        </form>
                    </Card>
                </Grid>
            </Grid >
        </AuthLayout >
    )
}

export default LoginPage