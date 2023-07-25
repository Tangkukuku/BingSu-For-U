import { PrismaClient } from '@prisma/client'
import { prisma } from "../../lib/prisma"
interface TableNames {
    user: 'user',
    Menu: 'menu',
    OrderHdr: 'orderHdr',
    OrderDtl: 'orderDtl',
    FileIni: 'fileIni',
    Table: 'table',
    ShortenUrlMap: 'shortenUrlMap',
}


const createCrudFunctions = (modelName: string) => ({
  async create(data: any) {

    const result = await  (prisma as any)[modelName].create({ data })
    return result
  },
  async findMany() {
    const result = await (prisma as any)[modelName].findMany()
    return result
  },
  async findUnique(where: any) {
    const result = await (prisma as any)[modelName].findUnique({ where })
    return result
  },
  async update(where: any, data: any) {
    const result = await (prisma as any)[modelName].update({ where, data })
    return result
  },
  async delete(where: any) {
    const result = await (prisma as any)[modelName].delete({ where })
    return result
  },
})

const modelNames = ['User', 'Menu', 'OrderHdr', 'OrderDtl', 'FileIni', 'Table', 'ShortenUrlMap'] // กำหนดชื่อของตารางที่ต้องการสร้าง CRUD functions

const crudFunctions = {
    User: createCrudFunctions('user'),
}


export default crudFunctions
