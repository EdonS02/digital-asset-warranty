import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Load environment variables from .env
dotenv.config();

const prisma = new PrismaClient();

export { prisma };
