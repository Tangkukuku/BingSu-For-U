import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from "../../../../../lib/prisma"

export default async function remove(req: NextApiRequest, res: NextApiResponse) {
    const userId = req.query.id

    if(req.method === 'DELETE'){
        if (typeof userId === "string") {
            const user = await prisma.user.delete({
                where: {id: Number(userId)}
            })
            res.json(true)
        }
    }else{
        console.log("not be created")
    }

}
