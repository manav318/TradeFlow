import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

export const prisma = new PrismaClient()