import {prisma} from '../../lib/prisma'

import {GetServerSideProps} from 'next'
import React, {useEffect, useState} from 'react'
import {Button} from 'primereact/button'
import {Dialog} from 'primereact/dialog';
import {InputNumber} from 'primereact/inputnumber';
import {fetcherCreate, fetcherDelete, fetcherRead, fetcherUpdate} from "../../utils/fetcher";
import {Prisma, Table, User} from "@prisma/client";
import {useRouter} from "next/router";
import {AllService} from "../../demo/service/AllService";
import {InputText} from "primereact/inputtext";
import Head from "next/head";
import {c, s} from "@fullcalendar/core/internal-common";
import {SelectButton} from 'primereact/selectbutton';
import moment from 'moment';
import QRCode from 'qrcode.react';

type Props = {
    tables: Table[],
    users: User[]

}

interface Tables {
    tables: {
        tableNumber: string,
        docNumber: string,
        emptyFlag: string
    }[]
}

interface Users {
    users: {
        username: string,
        telephone: string
    }[]
}


export default function Page(props: Props) {
    const [ssUser, setSsUser] = useState<User>();

    const [selectTable, setSelectTable] = useState("");
    const [numOfPeople, setNumOfPeople] = useState(0);
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [visible3, setVisible3] = useState(false);
    const [usernameOrTel, setUsernameOrTel] = useState("");

    const [people, setPeople] = useState("");
    const [orderList, setOrderList] = useState("");
    const [price, setPrice] = useState("");
    const [qrCode, setQRCode] = useState("");
    const [dateQRCode, setDateQRCode] = useState("");
    const [docNumber, setDocNumber] = useState("");

    useEffect(() => {
        // ดึงข้อมูลจาก session storage
        const data = window.sessionStorage.getItem('user');
        if (data) {
            const storedUser = JSON.parse(data);
            setSsUser(storedUser);
        } else {
            router.push('/login')
        }
    }, []);

    const refreshData = () => {
        router.replace(router.asPath)
    }

    const onNumOfPeopleChange = (e: any) => {
        setNumOfPeople(e.value);
    };

    const showDialog = () => {
        setNumOfPeople(0)
        setVisible(true);
    };
    const hideDialog = () => {
        setVisible(false);
        setUsernameOrTel("")
    };

    const showDialog2 = () => {
        setVisible2(true);
    };
    const hideDialog2 = () => {
        setVisible2(false);

    };

    const hideDialog3 = () => {
        setVisible3(false);
    };


    const idToShortenUrl = (id: number) => {
        const map = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split('');
        let shortUrl = '';

        while (id > 0) {
            shortUrl += map[id % 62];
            id = Math.floor(id / 62);
        }

        return shortUrl.split('').reverse().join('');

    }

    const showDtl = async (tableNumber: string) => {
        if (props.tables.find(table => table.tableNumber === tableNumber && table.emptyFlag === 'N')) {
            let docNumber = props.tables.filter(e => {
                if (e.tableNumber == tableNumber) {
                    return e
                }
            })[0].docNumber
            setDocNumber(docNumber? docNumber:"")
            let tableName = "orderHdr"
            await fetcherRead(`/api/CRUD/OrderHdr/read/${tableName}`, {docNumber}).then(a => {
                setPeople(a.data[0].people)
                setOrderList("a.data.")
                setPrice(a.data[0].price)
            })
            tableName = "shortenUrlMap"
            await fetcherRead(`/api/CRUD/ShortenUrlMap/read/${tableName}`, {docNumber}).then(a => {
                setQRCode(window.location.origin + "/menu/"+a.data[0].ShortenUrl)

                setDateQRCode(AllService.convertDatesFormat(a.data[0].createdDate))
                console.log(window.location.origin + "/menu/"+a.data[0].ShortenUrl)
            })
        } else {
            setPeople("")
            setOrderList("")
            setPrice("")
            setQRCode("")
        }


    }

    const dialogCreateBill = () => {
        return <Dialog visible={visible} onHide={hideDialog}>
            <div>
                <div className="show-dtl-topic">Create Bill</div>
                <div className="p-mt-4">
                    <div className="p-mr-2" style={{paddingBottom: "2.5%"}}>จำนวนคน</div>
                    <Button icon="pi pi-minus" onClick={() => setNumOfPeople(numOfPeople == 0 ? numOfPeople : numOfPeople - 1)}/>
                    <InputNumber className="custom-input-number" value={numOfPeople} onChange={onNumOfPeopleChange}/>
                    <Button icon="pi pi-plus" onClick={() => setNumOfPeople(numOfPeople + 1)}/>

                </div>
                <br/>
                <div className="p-mt-4">
                    <div className="p-mr-2" style={{paddingBottom: "2.5%"}}>username หรือ เบอร์โทร</div>
                    <InputText style={{width: "100%"}} value={usernameOrTel} onChange={e => {
                        setUsernameOrTel(e.target.value)
                    }}/>
                    {(chaeckUsernameOrTel(usernameOrTel) && usernameOrTel != "") && (<div className="succeed-color">พบข้อมูล</div>)}
                    {(!chaeckUsernameOrTel(usernameOrTel) && usernameOrTel != "") && (<div className="error-color">ไม่พบข้อมูล</div>)}
                </div>


                <br/>
                <div className="p-mt-4" style={{marginLeft: 'auto', marginRight: "0"}}>
                    <Button label="ปิด" style={{marginLeft: 'auto', marginRight: "0"}} className="p-button-secondary" onClick={hideDialog}/>

                    <Button label="ยืนยัน" style={{marginLeft: 'auto', marginRight: "0"}} className="p-button-success p-ml-2" onClick={showDialog2} disabled={!((numOfPeople > 0 && usernameOrTel == "") || (numOfPeople > 0 && chaeckUsernameOrTel(usernameOrTel)))}/>
                </div>
            </div>
            <Dialog visible={visible2} onHide={hideDialog2}>
                <div className="p-d-flex p-flex-column p-ai-center">
                    <div className="header">ยืนยันการสั่งอาหาร</div>
                    <div className="p-mt-4" style={{margin: "auto"}}>
                        <div style={{paddingBottom: "5%", paddingTop: "5%", margin: "auto", textAlign: "center"}}>จำนวนคน: {numOfPeople}</div>
                    </div>

                    <Button label="ยืนยัน" className="p-button-success p-mt-4" onClick={e => createBill(usernameOrTel, selectTable, ssUser ? ssUser.username ? ssUser.username : "" : "", numOfPeople)}/>
                    <Button label="ปิด" style={{marginLeft: '3%', marginRight: "0"}} className="p-button-secondary" onClick={hideDialog2}/>
                </div>
            </Dialog>
        </Dialog>
    }

    const dialogQrCode = (width:string,height:string) => {
        return <Dialog id="Test"  visible={visible3} onHide={hideDialog3} style={{width: width,height: height, textAlign: "center"}} >
            <div className="p-d-flex p-flex-column p-ai-center">
                <div className="show-dtl-topic">QR Code</div>
                <div className="p-mt-4">
                        <div className="p-mr-2 show-dtl" style={{  }} >เวลา: {dateQRCode}</div>
                    <div className="p-mr-2 " style={{ paddingBottom: "2.5%" }} >หมายเลขเอกสาร: {docNumber}</div>
                    <div><QRCode size={256} value={qrCode} /></div>
                    <div className="p-mr-2 " style={{ paddingBottom: "2.5%" }} ><a href={qrCode} target="_blank">{qrCode}</a></div>
                    <div className="p-mr-2 show-dtl" style={{ paddingBottom: "2.5%" }} >โต๊ะที่: {selectTable}</div>
                </div>
            </div>
            <button onClick={e =>{

                window.print()

            }}>พิมพ์</button>
        </Dialog>
    }

    const createBill = async (usernameOrTel: string, tableNumber: string, employee: string, people: number) => {
        try {
            let tableName = "user"
            const thaiTime = moment().utcOffset('+0700');
            let docNumber = thaiTime.format('DDMMYYYYHHmmss')
            let userCode

            await fetcherRead(`/api/CRUD/User/read/${tableName}`, {usernameOrTel}).then(async a => {

                if (a.status) {
                    userCode = a.user[0].userCode
                    tableName = "orderHdr"
                    await fetcherCreate(`/api/CRUD/create/${tableName}`, {userCode: userCode, docNumber, employee, tableNumber, people, statusBill: "ยังไม่จ่าย"}).then(async b => {
                        if (b.status) {
                            tableName = "table"
                            await fetcherUpdate(`/api/CRUD/Table/update/${tableName}`, {tableNumber, docNumber}).then(async c => {
                                if (c.status) {
                                    tableName = "shortenUrlMap"
                                    await fetcherCreate(`/api/CRUD/create/${tableName}`, {}).then(async d => {
                                        await fetcherUpdate(`/api/CRUD/ShortenUrlMap/update/${tableName}`, {id: d.message.id, fullUrl: docNumber, ShortenUrl: idToShortenUrl(d.message.id), expiredDate: "N"}).then(e => {
                                            if (e.status) {
                                                refreshData()
                                            }
                                        })
                                    })
                                }
                            })
                        }
                    })
                }
            })


            setVisible(false);
            setVisible2(false);
            setSelectTable("")
            setUsernameOrTel("")
            // window.sessionStorage.setItem('user', JSON.stringify(data) );
        } catch (e) {
            console.log(e)
            setVisible(false);
            setVisible2(false);
            setSelectTable("")
            setUsernameOrTel("")
        }
    };

    const chaeckUsernameOrTel = (usernameOrTel: string) => {
        if (usernameOrTel) {
            const found = props.users.find(user => user.username === usernameOrTel || user.telephone === usernameOrTel);
            if (found) {
                return true
            } else {
                return false
            }
        }
    }




    const router = useRouter();


    return (
        <div>
            <Head>
                <link rel="stylesheet" href="/styles/layout/_poc.scss"/>
                <title>BingSu For U</title>
            </Head>

            <label style={{fontSize: '200%'}}>Table List</label>
            <div></div>
            <div className="container">
                {props.tables.map((table, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            showDtl(table.tableNumber ? table.tableNumber : "")
                            setSelectTable(table.tableNumber ? table.tableNumber : "")
                        }}
                        // selectTable === table.tableNumber
                        className={table.emptyFlag === 'Y' ? selectTable === table.tableNumber ? "selected buttonTable" : 'buttonTable' : selectTable === table.tableNumber ? "selected buttonTable" : "buttonTable notEmpty"}
                        // className={selectTable === table.tableNumber ? checkButton(table.tableNumber)?  "selected buttonTable" : 'buttonTable' : 'buttonTable'}
                        // disabled={table.emptyFlag === 'Y' ? false : true}
                    >
                        โต๊ะที่ {table.tableNumber}
                    </button>
                ))}
            </div>

            <div style={{marginTop:"1%"}}>
                <Button style={{marginRight: "1%"}} label="Create Bill" onClick={showDialog} disabled={selectTable || selectTable != "" ? !!props.tables.find(table => table.tableNumber === selectTable && table.emptyFlag == "N") : true}/>
                <Button label="QR Code" onClick={e => setVisible3(true) } disabled={selectTable || selectTable != "" ? !!props.tables.find(table => table.tableNumber === selectTable && table.emptyFlag == "Y") : true}/>
            </div>
            <div className="show-dtl-topic">รายละเอียด โต๊ะที่ {selectTable}</div>
            <div className="show-dtl">จำนวนคน:{people}</div>
            <div className="show-dtl">หมายเลขเอกสาร:{people}</div>
            <div className="show-dtl">จำนวนรายการ:{orderList}</div>
            <div className="show-dtl">ส่วนลด:{price}</div>
            <div className="show-dtl">ราคาสุทธิ:{price}</div>


            {dialogCreateBill()}
            {dialogQrCode("20%","57%")}
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const tables = await prisma.table.findMany({
        select: {
            tableNumber: true,
            docNumber: true,
            emptyFlag: true
        },
        orderBy: {
            id: 'asc'
        }

    })

    const users = await prisma.user.findMany({
        select: {
            username: true,
            telephone: true
        }

    })

    return {
        props: {
            tables: tables,
            users: users
        },
    };
}

