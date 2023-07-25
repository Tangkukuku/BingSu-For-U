import React, {useContext, useEffect, useRef, useState} from 'react';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {fetcherCreate} from "../../utils/fetcher";
import {useRouter} from "next/router";
import {GetServerSideProps} from "next";
import {prisma} from "../../lib/prisma";
import Head from "next/head";
import {AllService} from '../../demo/service/AllService';
import {Toast} from "primereact/toast";
import {Messages} from "primereact/messages";
import {Password} from "primereact/password";
import {Checkbox} from "primereact/checkbox";
import {LayoutContext} from "../../layout/context/layoutcontext";


interface FormData {
    firstName: string
    lastName: string
    username: string
    password: string
    email: string
    telephone: string
    point:number
    active:string
    role:string

}

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

export const InputDemo = ({users}: Users) => {
    const [form, setForm] = useState<FormData>({firstName: "", lastName: "", username: "", password: "", email: "", telephone: "",point:0,active:"Y",role:"customer"});
    const [confirmPassword, setConfirmPassword] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const toast = useRef<Toast>(null);
    const {layoutConfig} = useContext(LayoutContext);
    const showWarn =(detail: string) => {
        toast.current?.show({severity: 'warn', summary: 'Warn Message', detail: detail, life: 3000});
    }
    const showSuccess = (detail: string) =>  {
        toast.current?.show({severity: 'success', summary: 'Success Message', detail: detail, life: 3000});
    }
    const showError = (detail: string)  => {
        toast.current?.show({ severity: 'error', summary: 'Error Message', detail: detail, life: 3000 });
    }
    useEffect(() => {

        // ดึงข้อมูลจาก session storage
        // window.sessionStorage.removeItem('user')


    }, []);


    async function create(data: FormData) {

        const found1 = users.find(user => user.username === data.username);
        const found2 = confirmPassword === password
        const found3 = users.find(user => user.email === data.email);
        const found4 = users.find(user => user.telephone === data.telephone);
        // setForm({...form, password: AllService.hashPassword(form.password)})
        if (!found1 && found2 && !found3 && !found4) {
            try {
                const tableName = "user"
                // data.password = AllService.hashPassword(data.password)
                fetcherCreate(`/api/CRUD/User/create/${tableName}`, data).then(() => {
                    setConfirmPassword("")
                    router.push('/login')
                })
                showSuccess("สมัครสมาชิกสำเร็จ")
                // window.sessionStorage.setItem('user', JSON.stringify(data) );
            } catch (e) {
                console.log(e)
            }
        } else {
            showWarn("ข้อมูลไม่ถูกต้อง")
        }

    }


    function checkUsername() {
        const found = users.find(user => user.username === form.username);

        let result
        if (form.username === "") {
            result = null;
        } else if (found) {
            result = <div className="error-color">Username นี้ถูกใช้งานแล้ว</div>;
        } else {
            result = <div className="succeed-color">Username สามารถใช้งานได้</div>;
        } // else {
        //     result = <div className="error-color">กรุณากรอกอีเมลให้ถูกต้อง</div>;
        // }
        return (
            <>
                {result}
            </>
        )
    }

    function checkPassword() {
        let result
        if (confirmPassword === "" || password === "") {
            result = null
        } else if (confirmPassword === password) {
            result = <div className="succeed-color">รหัสผ่านตรงกัน</div>
        } else {
            result = <div className="error-color">รหัสผ่านไม่ตรงกัน</div>

        }
        return (
            <>
                {result}
            </>
        )
    }

    function checkEmail() {
        const found = users.find(user => user.email === form.email);

        let result
        if (form.email === "") {
            result = null;
        } else if (found) {
            result = <div className="error-color">Email นี้ถูกใช้งานแล้ว</div>;
        } else if (form.email.includes('@')) {
            result = <div className="succeed-color">Email สามารถใช้งานได้</div>;
        } else {
            result = <div className="error-color">กรุณากรอกอีเมลให้ถูกต้อง</div>;
        }
        return (
            <>
                {result}
            </>
        )
    }

    function checkTel() {
        const found = users.find(user => user.telephone === form.telephone);
        let result
        if (form.telephone === "") {
            result = null;
        } else if (found) {
            result = <div className="error-color">เบอร์มือถือ นี้ถูกใช้งานแล้ว</div>;
        } else if (form.telephone.length === 10) {
            result = <div className="succeed-color">เบอร์มือถือ สามารถใช้งานได้</div>;
        } else {
            result = <div className="error-color">กรุณากรอกเบอร์มือถือให้ถูกต้อง</div>;
        }
        return (
            <>
                {result}
            </>
        )
    }


    const refreshData = () => {
        router.replace(router.asPath)
    }
    return (
        <>
            <Head>
                <link rel="stylesheet" href="/styles/layout/_poc.scss"/>
                <title>BingSu For U</title>
            </Head>
            <div className="flex flex-column align-items-center justify-content-center " style={{margin: "auto"}}>
                <img src={`/layout/images/logo-${layoutConfig.colorScheme === 'light' ? 'dark' : 'white'}.svg`} alt="Sakai logo" className="mb-3 w-6rem flex-shrink-0"/>
                <div style={{margin: "auto", borderRadius: '56px', padding: '0.3rem', background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)'}}>
                    <div className="w-full surface-card py-5 px-5 sm:px-8" style={{borderRadius: '53px',marginBottom:"20px"}}>
                        <div className="text-center mb-5">
                            {/*<img src="/demo/images/login/avatar.png" alt="Image" height="50" className="mb-3" />*/}
                            <div className="text-900 text-5xl font-medium mb-3">Register!</div>
                            {/*<span className="text-600 font-medium">Sign up to continue</span>*/}
                        </div>
                        {/*<h1 className="text-center">Register</h1>*/}
                        <div className="grid formgrid ">
                            <div className="col-12 mb-2 lg:col-6 lg:mb-0">
                                <label htmlFor="First Name" className="block text-900 text-xl font-medium mb-2">first Name</label>
                                <InputText type="text" placeholder="first Name" className="w-full" value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})}/>
                            </div>
                            <div className="col-12 mb-2 lg:col-6 lg:mb-0">
                                <label htmlFor="Last Name" className="block text-900 text-xl font-medium mb-2">Last Name</label>
                                <InputText type="text" placeholder="Last Name" className="w-full " value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})}/>
                            </div>
                        </div>

                        <div className="col-12 mb-2 lg:col-30 lg:mb-0">
                            <label htmlFor="Username" className="block text-900 text-xl font-medium mb-2">Username</label>
                            <InputText type="text" placeholder="Username" className="w-full md:w-30rem " value={form.username} onChange={e => setForm({...form, username: e.target.value})}/>
                            {checkUsername()}
                        </div>
                        <div className="col-12 mb-2 lg:col-30 lg:mb-0">
                            <label htmlFor="password" className="block text-900 font-medium text-xl mb-2">Password</label>
                            <Password placeholder="Password" toggleMask inputClassName="w-full p-3 md:w-30rem" value={password} onChange={e => {
                                setPassword(e.target.value)
                                setForm({...form, password:AllService.hashPassword(e.target.value)})
                            }}/>
                        </div>
                        <div className="col-12 mb-2 lg:col-30 lg:mb-0">
                            {/*<InputText type="password" placeholder="Password" className="p-invalid" value={form.password} onChange={e => setForm({...form, password: hashPassword(e.target.value)})}/>*/}
                            <Password placeholder="Password" toggleMask inputClassName="w-full p-3 md:w-30rem" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
                            {checkPassword()}
                        </div>

                        <div className="col-12 mb-2 lg:col-30 lg:mb-0">
                            <label htmlFor="email1" className="block text-900 text-xl font-medium mb-2">Email</label>
                            <InputText type="text" placeholder="Email address" className="w-full md:w-30rem " value={form.email} onChange={e => setForm({...form, email: e.target.value})}/>
                            {checkEmail()}
                        </div>
                        <div className="col-12 mb-2 lg:col-30 lg:mb-0">
                            <label htmlFor="tel" className="block text-900 text-xl font-medium mb-2">Telephone</label>
                            <InputText type="tel" placeholder="Telephone" className="w-full md:w-30rem " value={form.telephone} onChange={e => setForm({...form, telephone: e.target.value})}/>
                            {checkTel()}
                        </div>
                        <div className="col-12" >
                        </div>
                        <div className="col-12 mb-2 lg:col-30 lg:mb-0" >
                            <Button label="Sign up" className="w-full p-3 text-xl" onClick={() => {
                                create(form)
                            }} />
                        </div>

                        <Toast ref={toast}/>
                    </div>
                </div>
            </div>
        </>
    );
};


export const getServerSideProps: GetServerSideProps = async (context) => {

    const users = await prisma.user.findMany({
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
    const serializedUsers = AllService.convertDatesToJson(users)

    return {
        props: {
            users: serializedUsers
        },
    };
}


export default InputDemo;
