import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from "../../lib/prisma"
import {AllService} from '../../demo/service/AllService';
import {f} from "@fullcalendar/core/internal-common";

interface TableNames {
    user: 'user',
    Menu: 'menu',
    OrderHdr: 'orderHdr',
    OrderDtl: 'orderDtl',
    FileIni: 'fileIni',
    Table: 'table',
    ShortenUrlMap: 'shortenUrlMap',
}

export default async function AuthLogin(req: NextApiRequest, res: NextApiResponse) {
    let {username,password} = req.body
    let result
    try {

        password = AllService.hashPassword(password)
        result = await  prisma.user.findMany({
            where:{
                AND: [
                    { username:username },
                    { password:password }
                ]
            }

        })
        if(result.length > 0){
            res.status(200).json({ status: true, message: 'found User' })
        }else{
            res.status(200).json({ status: false, message: 'not found User' })
        }


    } catch (error) {
        console.log(error)
        res.status(400).json({ status:false,message: error+"" })
    }
}
