import type {NextApiRequest, NextApiResponse} from 'next'
import {prisma} from "../../../../../lib/prisma"
import { AllService } from '../../../../../demo/service/AllService';

export default async function read(req: NextApiRequest, res: NextApiResponse) {
    try {
        // CREATE

        let data = req.body.docNumber
        const table = req.query.id

        // @ts-ignore
        const found= await prisma[table].findMany({
            where:{
                AND: [
                    { fullUrl:data },
                    { expiredDate:"N"}
                    // data
                ]
            },

        })
        if(found.length > 0){
            res.status(200).json({status: true, data: found})
        }else{
            res.status(200).json({status: false, data: ""})
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({status: false, message: error + ""})
    }
}

