import type {NextApiRequest, NextApiResponse} from 'next'
import {prisma} from "../../../../../lib/prisma"
import { AllService } from '../../../../../demo/service/AllService';

export default async function read(req: NextApiRequest, res: NextApiResponse) {
    try {
        // CREATE

        let data = req.body.tableNumber
        const table = req.query.id

        // @ts-ignore
        const foundUser = await prisma[table].findMany({
            where:{
                AND: [
                    { tableNumber:data },
                    {statusBill:"ยังไม่จ่าย"}
                    // data
                ]
            }
        })
        if(foundUser.length === 0){
            res.status(200).json({status: false})
        }else{
            res.status(200).json({status: true})
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({status: false, message: error + ""})
    }
}

