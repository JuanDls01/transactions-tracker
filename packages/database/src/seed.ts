import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: 'juanignaciodelossantos01@gmail.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'juanignaciodelossantos01@gmail.com',
      password: await bcrypt.hash(`${process.env.ADMIN_USER_PASS}`, 10),
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
