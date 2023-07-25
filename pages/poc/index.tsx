import {prisma} from '../../lib/prisma'

import {GetServerSideProps} from 'next'
import {useEffect, useState} from 'react'
import {Button} from 'primereact/button'
import {fetcherCreate, fetcherDelete} from "../../utils/fetcher";
import {Prisma, User} from "@prisma/client";
import {useRouter} from "next/router";
import {AllService} from "../../demo/service/AllService";

type Props = {
    users: User[]

}

interface Users {
    users: {
        id: string
        email: string
    }[]

}

interface user {
    id: string
    firstName: string
    lastName: string
    username: string
    password: string
    email: string
    telephone: string
}

interface FormData {

    email: string
}

export default function Page({users}: Users) {
    const [ssUser, setSsUser] = useState<User>();
    const [form, setForm] = useState<FormData>({email: ""});
    const [firstName, setFirstName] = useState("Test");
    const [password, setPassword] = useState("Test");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("");
    const router = useRouter();

    useEffect(() => {
        // ดึงข้อมูลจาก session storage
        const data = window.sessionStorage.getItem('user') ;
        if(data){
            const storedUser = JSON.parse(data);
            setSsUser(storedUser);
        }else{
            router.push('/login')
        }
    }, []);


    async function deleteUser(id: any) {
        try {
            if (id) {
                fetcherDelete(`/api/CRUD/User/delete/${id}`).then(() => refreshData())
            }
        } catch (error) {

        }
    }

    async function create(data: FormData) {
        try {
            fetcherCreate(`/api/CRUD/create`, data).then(() => {
                setForm({email: ''})
                refreshData()
            })

        } catch (e) {
            console.log(e)
        }
    }

    const refreshData = () => {
        router.replace(router.asPath)
    }


    return (
        <div>
            <div style={{fontSize: '40px'}} className='my-label'><label>session</label></div>
            <div  className='my-label'><label>{ssUser?.firstName}</label></div>
            <div style={{fontSize: '40px'}} className='my-label'><label>create</label></div>
            <input type="text"
                   placeholder="email"
                   value={form.email}
                   onChange={e => setForm({email: e.target.value})}
                   className="border-2 rounded border-gray-600 p-1"
                   style={{margin: '5px'}}
            />
            <Button onClick={async () => {create(form)}}> + Add</Button>
            <br/>
            <label>{status}</label>
            <br/>
            <label style={{fontSize: '24px'}}>User List</label>
            <ul>
                {users.map((user, index) =>
                    <div>
                        {user.email && (
                            <>
                                <button onClick={() => {
                                    deleteUser(user.id)
                                }} key={index}>{user.email}</button>
                                <br/>
                            </>
                        )}
                    </div>
                )}
            </ul>
            <form method="post" action="http://localhost:3000/poc/">
                <label>
                    id:
                    <input type="text" name="id"/>
                </label>
                <input type="submit" value="ส่งข้อมูล"/>
            </form>

            <button>show</button>
            <label>{"asd"}</label>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const users = await prisma.user.findMany({
        select: {
            id: true,
            email: true
        }
    })
    // convert Date objects to strings
    const serializedUsers = convertDatesToJson(users)

    return {
        props: {
            users: serializedUsers
        },
    };
}

function convertDatesToJson(obj: any) {
    return JSON.parse(
        JSON.stringify(obj, (key, value) => {
            if (value instanceof Date) {
                return value.toISOString(); // convert Date to ISO string
            }
            return value;
        })
    );
}

