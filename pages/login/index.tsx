/* eslint-disable @next/next/no-img-element */

import { useRouter } from 'next/router';
import React, {useContext, useRef, useState} from 'react';
import AppConfig from '../../layout/AppConfig';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from '../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Page } from '../../types/types';
import {GetServerSideProps} from "next";
import {prisma} from "../../lib/prisma";
import {AllService} from "../../demo/service/AllService";
import {fetcherAuthLogin } from "../../utils/fetcher";
import {Toast} from "primereact/toast";
import {f} from "@fullcalendar/core/internal-common";
interface Users {
    users: {
        id: string
        firstName: string
        lastName: string
        username: string
        password: string
        email: string
        telephone: string
    }[]

}


const LoginPage: Page = ({users}:any) => {
    const [username,setUsername] = useState('')
    const [password, setPassword] = useState('');
    const toast = useRef<Toast>(null);
    const { layoutConfig } = useContext(LayoutContext);

    const router = useRouter();
    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });

    const showError = (detail: string) => {
        toast.current?.show({ severity: 'error', summary: 'Error Message', detail: detail, life: 3000 });
    }
    const showSuccess = (detail: string) =>  {
        toast.current?.show({severity: 'success', summary: 'Success Message', detail: detail, life: 3000});
    }
    function authLogin(username:string,password:string){
        fetcherAuthLogin(`/api/authLogin`,{username:username,password:password})
            .then(r =>{
                if(r.status){
                    // window.sessionStorage.setItem('username',users.filter((user: { username: string; }) => user.username == username)[0].username );
                    window.sessionStorage.setItem('user', JSON.stringify(users.filter((user: { username: string; }) => user.username == username)[0]) );
                    router.push('/')
                }else{
                    showError("username หรือ password ไม่ถูกต้อง")
                }
            })


    }

    return (
        <div className={containerClassName}>
            <div className="flex flex-column align-items-center justify-content-center">
                <img src={`/layout/images/logo-${layoutConfig.colorScheme === 'light' ? 'dark' : 'white'}.svg`} alt="Sakai logo" className="mb-5 w-6rem flex-shrink-0" />
                <div style={{ borderRadius: '56px', padding: '0.3rem', background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)' }}>
                    <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                        <div className="text-center mb-5">
                            <img src="/demo/images/login/avatar.png" alt="Image" height="50" className="mb-3" />
                            <div className="text-900 text-3xl font-medium mb-3">Welcome, Isabel!</div>
                            <span className="text-600 font-medium">Sign in to continue</span>
                        </div>

                        <div>
                            <label htmlFor="username" className="block text-900 text-xl font-medium mb-2">
                                Username
                            </label>
                            <InputText id="username"  value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} />

                            <label htmlFor="password1" className="block text-900 font-medium text-xl mb-2">
                                Password
                            </label>
                            <Password inputId="password1" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" toggleMask className="w-full mb-5" inputClassName="w-full p-3 md:w-30rem"/>

                            <div className="flex align-items-center justify-content-between mb-5 gap-5">

                                <a className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }}>
                                    Forgot password?
                                </a>
                                <a className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }} onClick={() => router.push('/register')}>
                                    Sign Up
                                </a>
                            </div>
                            <Button label="Sign In" className="w-full p-3 text-xl" onClick={() => authLogin(username,password)}></Button>
                        </div>
                        <Toast ref={toast}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {

    let users = await prisma.user.findMany({
        select: {
            firstName: true,
            lastName: true,
            username: true,
            password: true,
            email: true,
            telephone: true,
        }
    })
    // convert Date objects to strings
    users = AllService.convertDatesToJson(users)

    return {
        props: {
            users: users
        },
    };
}

LoginPage.getLayout = function getLayout(page) {
    return (
        <React.Fragment>
            {page}
            <AppConfig simple />
        </React.Fragment>
    );
};


export default LoginPage;
