import type {NextApiRequest, NextApiResponse} from 'next'
import {prisma} from "../../../../lib/prisma"
import { AllService } from '../../../../demo/service/AllService';

export default async function create(req: NextApiRequest, res: NextApiResponse) {
    try {
        // CREATE

        let data = req.body
        const table = req.query.id

        // @ts-ignore
        const newUser = await prisma[table].create({
            data
        })
        res.status(200).json({status: true, message: newUser})
    } catch (error) {
        console.log(error)
        res.status(400).json({status: false, message: error + ""})
    }
}

