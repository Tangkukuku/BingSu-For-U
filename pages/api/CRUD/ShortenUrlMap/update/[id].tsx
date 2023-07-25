import type {NextApiRequest, NextApiResponse} from 'next'
import {prisma} from "../../../../../lib/prisma"
import { AllService } from '../../../../../demo/service/AllService';

export default async function Update(req: NextApiRequest, res: NextApiResponse) {
    try {
        // CREATE

        let {id,fullUrl, ShortenUrl,expiredDate} =  req.body
        const table = req.query.id

        // @ts-ignore
        const found = await prisma[table].update({
            where: { id: id },
            data: {
                fullUrl,
                ShortenUrl,
                expiredDate
            }
        })
        if(found){
            res.status(200).json({status: true})
        }else{
            res.status(200).json({status: false})
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({status: false, message: error + ""})
    }
}

