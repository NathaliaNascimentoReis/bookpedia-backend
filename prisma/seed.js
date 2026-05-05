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

    console.log('📦 Inserindo novos registros...');

    const livro = await prisma.livro.create({
        data: {
            tituloDoLivro: 'Dom Casmurro',
            tituloDoLivroEn: 'Dom Casmurro',
            autor: 'Machado de Assis',
            descricao:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            descricaoEn:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            contextoHistorico:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. At vero eos et accusamus et iusto odio dignissimos.',
            contextoHistoricoEn:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. At vero eos et accusamus et iusto odio dignissimos.',
            anoDeLancamento: 1899,
            resumo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            resumoEn:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            analise:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est enim vitium in amicitia, si alter plus quam alter colat.',
            analiseEn:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est enim vitium in amicitia, si alter plus quam alter colat.',
            capaURL: 'https://link.com/capa.jpg',
        },
    });

    await prisma.personagens.createMany({
        data: [
            {
                nome: 'Capitu',
                idade: 20,
                descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                descricaoEn: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                historia:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                historiaEn:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                idDoLivro: livro.id,
            },
            {
                nome: 'Bentinho',
                idade: 70,
                descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                descricaoEn: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                historia:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                historiaEn:
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
                alternatvaB: 'Não, Lorem Ipsum.',
                alternativaBEn: 'No, Lorem Ipsum.',
                alternativaC: 'Talvez, Lorem Ipsum.',
                alternativaCEn: 'Maybe, Lorem Ipsum.',
                alternativaD: 'Nunca, Lorem Ipsum.',
                alternativaDEn: 'Never, Lorem Ipsum.',
                respostaCorreta: 'B',
                justificativa:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                justificativaEn:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
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
