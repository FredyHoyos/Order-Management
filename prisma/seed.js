import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt"; 
const prisma = new PrismaClient();
const hashedPassword = await bcrypt.hash("admin1234", 10);
const hashedPassword1 = await bcrypt.hash("user1234", 10);
async function main() {
  await prisma.user.createMany({
    data: [
      { name: 'Admin', email: 'admin@mail.com', password: hashedPassword, role: 'ADMIN' },
      { name: 'User', email: 'user@mail.com', password: hashedPassword1, role: 'USER' }
    ]
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
