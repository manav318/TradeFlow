import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const passwordHash = await bcrypt.hash('password123', 10)

  const user = await prisma.user.upsert({
    where: { email: 'test@tradeflow.dev' },
    update: {},
    create: {
      email: 'test@tradeflow.dev',
      passwordHash,
    },
  })

  console.log('Seeded user:', user.email)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
