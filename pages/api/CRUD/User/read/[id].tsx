import type {NextApiRequest, NextApiResponse} from 'next'
import {prisma} from "../../../../../lib/prisma"
import { AllService } from '../../../../../demo/service/AllService';

export default async function read(req: NextApiRequest, res: NextApiResponse) {
    try {
        // CREATE

        let data = req.body.usernameOrTel
        const table = req.query.id

        // @ts-ignore
        const foundUser = await prisma[table].findMany({
            where:{
                OR: [
                    { username:data },
                    { telephone:data }
                    // data
                ]
            }
        })
        if(foundUser.length > 0){
            res.status(200).json({status: true, user: foundUser})
        }else{
            res.status(200).json({status: false, user: ""})
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({status: false, message: error + ""})
    }
}

