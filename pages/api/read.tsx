import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from "../../lib/prisma"
// type Data = {
//     name: string
//     newUser : User
// }

interface TableNames {
    user: 'user',
    Menu: 'menu',
    OrderHdr: 'orderHdr',
    OrderDtl: 'orderDtl',
    FileIni: 'fileIni',
    Table: 'table',
    ShortenUrlMap: 'shortenUrlMap',
}

export default async function read(req: NextApiRequest, res: NextApiResponse) {
    const table = req.body.table
    let result
    try {
        // @ts-ignore
        result = await  prisma[table].findMany()
        res.status(200).json({ status: true, message: 'Data retrieved' })

    } catch (error) {
        console.log(error)
        res.status(400).json({ status:false,message: error+"" })
    }
}
