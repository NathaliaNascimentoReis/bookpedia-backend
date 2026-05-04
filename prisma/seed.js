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

    const livro = await prisma.livros.create({
        data: {
            tituloDoLivro: 'Dom Casmurro',
            tituloDoLivroEn: 'Dom Casmurro',
            autor: 'Machado de Assis',
            descricao:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            descricaoEn:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            contextoHistorico:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi.',
            contextoHistoricoEn:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi.',
            anoDeLancamento: 1899,
            resumo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            resumoEn:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            analise:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est enim vitium in amicitia, si alter plus quam alter colat. At ille pellit, qui permulcet sensum voluptate. Quid in isto egregio tuo officio et disciplina ponit? Nec enim, dum metuit, iustus est, et certe, si metuere destiterit, non erit; Nam cum solitudo et vita sine amicis insidiarum et metus plena sit.',
            analiseEn:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est enim vitium in amicitia, si alter plus quam alter colat. At ille pellit, qui permulcet sensum voluptate. Quid in isto egregio tuo officio et disciplina ponit? Nec enim, dum metuit, iustus est, et certe, si metuere destiterit, non erit; Nam cum solitudo et vita sine amicis insidiarum et metus plena sit.',
            capaUrl: 'https://link.com/capa.jpg',
        },
    });

    await prisma.personagens.createMany({
        data: [
            {
                nome: 'Capitu',
                idade: 'Adulta',
                descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                descricaoEn: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                historia:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                idDoLivro: livro.id,
            },
            {
                nome: 'Bentinho',
                idade: 'Idoso',
                descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                descricaoEn: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                historia:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                idDoLivro: livro.id,
            },
        ],
    });

    const questao = await prisma.questoes.create({
        data: {
            enunciado:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?',
            enunciadoEn:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?',
            vestibular: 'FUVEST',
            anoVestibular: 2024,
            idDoLivro: livro.id,
        },
    });

    await prisma.alternativas.createMany({
        data: [
            {
                alternativaA: 'Sim, Lorem Ipsum.',
                alternativaAEn: 'Yes, Lorem Ipsum.',
                alternativaB: 'Não, Lorem Ipsum.',
                alternativaBEn: 'No, Lorem Ipsum.',
                respostaCorreta: 'B',
                justificativa:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                justificativaEn:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                idDoLivro: questao.id,
            },
        ],
    });

    await prisma.dicasDeVestibular.createMany({
        data: [
            {
                titulo: 'Foque no Realismo',
                tituloEn: 'Focus on Realism',
                dica: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                dicaEn: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
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
