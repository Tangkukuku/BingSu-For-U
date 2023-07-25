import type {NextApiRequest, NextApiResponse} from 'next'
import {prisma} from "../../../../lib/prisma"
import { AllService } from '../../../../demo/service/AllService';

export default async function create(req: NextApiRequest, res: NextApiResponse) {
    try {
        // CREATE

        let {firstName,lastName,username,password,email,telephone} = req.body
        const point = Number(0)
        const active = 'Y'
        password = AllService.hashPassword(password)
        const newUser = await prisma.user.create({
            data: {
                firstName,
                lastName,
                username,
                password,
                email,
                telephone,
                active,
                point
            }
        })
        res.status(200).json({status: true, message: 'Note created'})
    } catch (error) {
        console.log(error)
        res.status(400).json({status: false, message: error + ""})
    }
}

