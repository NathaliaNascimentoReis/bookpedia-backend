import pg from 'pg';
import 'dotenv/config';
import pkg from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const { PrismaClient } = pkg;
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Resetando tabela exemplo...');

    // Remove todos os registros
    // await prisma.exemplo.deleteMany();

    console.log('📦 Inserindo novos registros...');

    await prisma.guarani.createMany({
        data: [
            {
                nome: 'Exemplo Star',
                idade: 20,
                descricao: 'Desc em PT',
                descricaoEnglish: 'Desc in EN',
                fotoURL: 'http://link.com',
            },
            {
                nome: 'Exemplo Beta',
                idade: 25,
                descricao: 'Outra desc',
                descricaoEnglish: 'Another desc',
                fotoURL: 'http://link2.com',
            },
        ],
    });

    console.log('✅ Seed concluído!');
}

main()
    .catch((e) => {
        console.error('❌ Erro no seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
