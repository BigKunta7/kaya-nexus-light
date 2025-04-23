// Script de seed Prisma pour Kaya Nexus
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Création des rôles de base
  await prisma.role.createMany({
    data: [
      { name: 'admin' },
      { name: 'user' },
      { name: 'manager' }
    ],
    skipDuplicates: true
  });

  // Création d'une organisation de test
  const org = await prisma.organization.upsert({
    where: { name: 'DemoOrg' },
    update: {},
    create: { name: 'DemoOrg' }
  });

  // Création de l'utilisateur admin
  await prisma.user.upsert({
    where: { email: 'admin@demo.org' },
    update: {},
    create: {
      email: 'admin@demo.org',
      isActive: true,
      organizations: { connect: { id: org.id } },
      roles: { connect: { name: 'admin' } }
    }
  });

  // Création d'un projet de démo
  await prisma.project.upsert({
    where: { name: 'Projet Démo' },
    update: {},
    create: {
      name: 'Projet Démo',
      organizationId: org.id
    }
  });
}

main()
  .then(() => {
    console.log('Seed terminé');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
