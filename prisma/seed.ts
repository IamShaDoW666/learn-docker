import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  // Create 10 users
  for (let i = 0; i < 15; i++) {
    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        name: faker.person.fullName(),
        password: faker.internet.password(),
        posts: {
          create: Array.from({
            length: faker.number.int({ min: 1, max: 12 }),
          }).map(() => ({
            title: faker.lorem.sentence(),
            content: faker.lorem.paragraphs(2),
          })),
        },
      },
    });

    console.log(`Created user with id: ${user.id}`);
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
