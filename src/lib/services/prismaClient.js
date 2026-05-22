// Importa o cliente PostgreSQL nativo e as dependências do Prisma.
import pg from 'pg';
import 'dotenv/config';
import pkg from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const { PrismaClient } = pkg;

// Cria um pool de conexões PostgreSQL usando a URL definida nas variáveis de ambiente, ppara integrar o Prisma com o driver nativo.
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export default prisma;
