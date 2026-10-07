import { PrismaClient, Prisma } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

const usersSeedData: Prisma.UserCreateInput[] = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@doe.com',
    password: '$2a$12$GN1e68CLapGPnD4UnbC/6uhpGCiqTzWaFyxcFF/cIOPbpDgCS0gEG',
    role: 'ADMIN',
    posts: {
      create: [
        {
          title:
            '5 Docker containers I use to manage my small business like a pro',
          content:
            'I never expected Docker to become such an important part of how I run my small freelancing business. It started as a weekend experiment and quickly became a stack I depend on every day. Instead of paying for a separate app for every little job, I use self-hosted containers to handle everything from documents to automation and file management.',
          published: true,
        },
        {
          title: 'Scale From Zero To Millions Of Users',
          content:
            'Designing a system that supports millions of users is challenging, and it is a journey that requires continuous refinement and endless improvement. In this chapter, we build a system that supports a single user and gradually scale it up to serve millions of users. After reading this chapter, you will master a handful of techniques that will help you to crack the system design interview questions.',
          published: true,
        },
        {
          title: 'Introduction to Amazon Web Services',
          content:
            "Amazon Web Services (AWS) is the world's most comprehensive and broadly adopted cloud platform. Since its launch in 2006, AWS has revolutionized how individuals, companies and governments access technology services.",
        },
      ],
    },
  },
  {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@doe.com',
    password: '$2a$12$GN1e68CLapGPnD4UnbC/6uhpGCiqTzWaFyxcFF/cIOPbpDgCS0gEG',
    posts: {
      create: [
        {
          title:
            'Database Design Patterns: The Complete Developer’s Guide to Modern Data Architecture',
          content:
            'Database design isn’t just about creating tables and throwing some indexes around. It’s about understanding patterns that have been battle-tested by thousands of developers across decades of real-world applications. Think of design patterns as your database’s playbook, proven strategies that help you tackle common problems without reinventing the wheel every single time.',
          published: true,
        },
        {
          title: 'CI/CD Pipelines with Docker for Frontend Applications',
          content:
            'CI/CD (Continuous Integration/Continuous Deployment) processes play a crucial role in modern software development, enabling automation and speeding up integration and delivery cycles. Docker provides significant advantages in these processes by offering containerization, which ensures consistency, scalability, and speed. In this article, I will explain how to set up CI/CD pipelines with Docker for frontend applications and the following steps.',
        },
      ],
    },
  },
];

export async function main() {
  for (const u of usersSeedData) {
    await prisma.user.create({ data: u });
  }
}

main();
