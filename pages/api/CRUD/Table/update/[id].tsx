import type {NextApiRequest, NextApiResponse} from 'next'
import {prisma} from "../../../../../lib/prisma"
import { AllService } from '../../../../../demo/service/AllService';

export default async function Update(req: NextApiRequest, res: NextApiResponse) {
    try {
        // CREATE

        let {docNumber, tableNumber} =  req.body
        const table = req.query.id

        // @ts-ignore
        const foundUser = await prisma[table].update({
            where: { tableNumber: tableNumber },
            data: {
                docNumber: docNumber,
                emptyFlag: 'N'
            }
        })
        if(foundUser){
            res.status(200).json({status: true})
        }else{
            res.status(200).json({status: false})
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({status: false, message: error + ""})
    }
}

