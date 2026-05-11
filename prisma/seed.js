import pg from 'pg';
import 'dotenv/config';
import pkg from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const { PrismaClient } = pkg;
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Limpando o banco de dados...');
    await prisma.membros.deleteMany();
    await prisma.projetos.deleteMany();
    await prisma.alternativas.deleteMany();
    await prisma.questoes.deleteMany();
    await prisma.enredos.deleteMany();
    await prisma.personagens.deleteMany();
    await prisma.cenarios.deleteMany();
    await prisma.videos.deleteMany();
    await prisma.curiosidades.deleteMany();
    await prisma.autores.deleteMany();
    await prisma.movimentosLiterarios.deleteMany();
    await prisma.vocabulario.deleteMany();
    await prisma.livro.deleteMany();
    await prisma.dicasDeVestibular.deleteMany();

    console.log('📦 Inserindo novos registros...');

    const movimento = await prisma.movimentosLiterarios.create({
        data: {
            nome: 'Romantismo',
            contextoHistorico:
                'Surgiu após a Independência, adaptando o movimento europeu para valorizar a natureza, o indianismo e a identidade nacional.',
            contextoHistoricoEn:
                'It emerged after Independence, adapting the European movement to value nature, Indianism and national identity.',
            caracteristicas:
                'Nacionalismo e indianismo, Subjetividade e sentimentalismo, Liberalismo.',
            caracteristicasEn:
                'Nationalism and Indianism, Subjectivity and sentimentalism, Liberalism.',
            periodo: '1836 à 1880',
            fase: 'Romantismo Brasileiro',
            influencia:
                'Criou as bases da literatura nacional, promoveu o nacionalismo, o indianismo e a valorização da natureza brasileira, ajudando o país a construir sua identidade cultural independente de Portugal.',
        },
    });

    const autor = await prisma.autores.create({
        data: {
            nome: 'José de Alencar',
            descricao: 'Foi um dos principais escritores do Romantismo brasileiro. Advogado, jornalista e político cearense, ele é considerado um dos fundadores da literatura nacional. Valorizou a natureza e a cultura brasileira, especialmente o índio.',
            descricaoEn: 'He was one of the main writers of Brazilian Romanticism. Lawyer, journalist and Ceará politician, he is considered one of the founders of national literature. He valued nature and Brazilian culture, especially the indigenous people.',
            contextoHistorico: '...',
            contextoHistoricoEn: '...',
            anoNascimento: 1829,
            anoFalecimento: 1877,
            biografia: '...',
            biografiaEn: '...',
            fotoURL: 'https://example.com/autores/jose-de-alencar.jpg',
        },
    });

    const palavra = await prisma.vocabulario.create({
        data: {
            palavra: '...',
            palavraEn: '...',
            significado: '...',
            significadoEn:
                '...',
        },
    });

    const livro = await prisma.livro.create({
        data: {
            tituloDoLivro: 'O Guarani',
            tituloDoLivroEn: 'The Guarani',
            descricao: '...',
            descricaoEn: '...',
            contextoHistorico: '...',
            contextoHistoricoEn: '...',
            anoDeLancamento: 1857,
            resumo: '...',
            resumoEn: '...',
            analise: '...',
            analiseEn: '...',
            capaURL: 'https://m.media-amazon.com/images/I/7125-MeD+KL._AC_UF1000,1000_QL80_.jpg',
            autores: { connect: { id: autor.id } },
            movimentoLiterario: { connect: { id: movimento.id } },
            vocabularios: { connect: { id: palavra.id } },
        },
    });

    await prisma.cenarios.create({
        data: {
            nome: '...',
            nomeEn: '...',
            caracteristicas: '...',
            caracteristicasEn: '...',
            descricao: '...',
            descricaoEn: '...',
            fotoURL: 'https://example.com/cenarios/rio-de-janeiro.jpg',
            idDoLivro: livro.id,
        },
    });

    await prisma.personagens.createMany({
        data: [
            {
                nome: '...',
                idade: '...',
                descricao: '...',
                descricaoEn: '...',
                historia: '...',
                historiaEn: '...',
                idDoLivro: livro.id,
            },
            {
                nome: '...',
                idade: '...',
                descricao: '...',
                descricaoEn: '...',
                historia: '...',
                historiaEn:'...',
                idDoLivro: livro.id,
            },
        ],
    });

    await prisma.enredos.create({
        data: {
            introducao: '...',
            introducaoEn: '...',
            conflito: '...',
            conflitoEn: '...',
            climax: '...',
            climaxEn: '...',
            desfecho: '...',
            desfechoEn: '...',
            idDoLivro: livro.id,
        },
    });

    await prisma.videos.create({
        data: {
            titulo: 'Resumo de O Guarani',
            tituloEn: 'The Guarani Summary',
            descricao: 'Vídeo explicando enredo, personagens e contexto da obra.',
            descricaoEn: 'Video explaining the plot, characters, and context of the work.',
            url: 'https://example.com/videos/o-guarani',
            idDoLivro: livro.id,
        },
    });

    await prisma.curiosidades.create({
        data: {
            tituloCuriosidade: '...',
            tituloCuriosidadeEn: '...',
            curiosidade: '...',
            curiosidadeEn: '...',
            idDoLivro: livro.id,
        },
    });

    await prisma.questoes.create({
        data: {
            enunciado: '...',
            enunciadoEn: '...',
            vestibular: '...',
            anoVestibular: '...',
            idDoLivro: livro.id,
            alternativas: {
                create: {
                    alternativaA: '...',
                    alternativaAEn: '...',
                    alternativaB: '...',
                    alternativaBEn: '...',
                    alternativaC: '...',
                    alternativaCEn: '...',
                    alternativaD: '...',
                    alternativaDEn: '...',
                    respostaCorreta: '?',
                    justificativa: '...',
                    justificativaEn: '...',
                },
            },
        },
    });

    const projeto = await prisma.projetos.create({
        data: {
            nome: 'Bookpedia',
            introducao: 'Projeto educacional para explorar obras literárias de forma organizada.',
            introducaoEn: 'Educational project to explore literary works in an organized way.',
            objetivoProjeto: 'Ajudar estudantes a estudar literatura com contexto, análise e exercícios.',
            objetivoProjetoEn: 'Help students study literature with context, analysis, and exercises.',
            sobreAEquipe: 'Equipe multidisciplinar focada em conteúdo, tecnologia e experiência do usuário.',
            sobreAEquipeEn: 'A multidisciplinary team focused on content, technology, and user experience.',
            desenvolvimentoTecnico: 'API em Node.js com Prisma e banco relacional.',
            desenvolvimentoTecnicoEn: 'Node.js API with Prisma and a relational database.',
            tecnologias: 'Node.js, Express, Prisma, PostgreSQL',
            integracaoAPI: 'Consumo de dados estruturados para livros, questões e materiais de apoio.',
            integracaoAPIEn: 'Consumption of structured data for books, questions, and support materials.',
            membros: {
                create: [
                    {
                        nome: 'Nathalia',
                        idade: 18,
                        curso: 'Desenvolvimento de Sistemas',
                        cursoEn: 'Systems Development',
                        descricao: 'Responsável pelo projeto.',
                        descricaoEn: 'Responsible for the project.',
                        cargo: 'PO',
                        avaliacaoDaObra: '?',
                        diasDeLeitura: '?',
                        opiniao: '...',
                    },
                    {
                        nome: 'Victor Boehm',
                        idade: 17,
                        curso: 'Desenvolvimento de Sistemas',
                        cursoEn: 'Systems Development',
                        descricao: '...',
                        descricaoEn: '...',
                        cargo: 'Desenvolvedor',
                        avaliacaoDaObra: '?',
                        diasDeLeitura: '?',
                        opiniao: '...',
                    },
                    {
                        nome: 'Matheus Leitão',
                        idade: 17,
                        curso: 'Desenvolvimento de Sistemas',
                        cursoEn: 'Systems Development',
                        descricao: '...',
                        descricaoEn: '...',
                        cargo: 'Desenvolvedor',
                        avaliacaoDaObra: '?',
                        diasDeLeitura: '?',
                        opiniao: '...',
                    },
                    {
                        nome: 'Pedro Brito',
                        idade: 17,
                        curso: 'Desenvolvimento de Sistemas',
                        cursoEn: 'Systems Development',
                        descricao: '...',
                        descricaoEn: '...',
                        cargo: 'Desenvolvedor',
                        avaliacaoDaObra: '?',
                        diasDeLeitura: '?',
                        opiniao: '...',
                    },
                    {
                        nome: 'Arthur Ferian',
                        idade: 16,
                        curso: 'Desenvolvimento de Sistemas',
                        cursoEn: 'Systems Development',
                        descricao: '...',
                        descricaoEn: '...',
                        cargo: 'Desenvolvedor',
                        avaliacaoDaObra: '?',
                        diasDeLeitura: '?',
                        opiniao: '...',
                    },
                    {
                        nome: 'Nicolas',
                        idade: '16',
                        curso: 'Desenvolvimento de Sistemas',
                        cursoEn: 'Systems Development',
                        descricao: '...',
                        descricaoEn: '...',
                        cargo: 'Designer',
                        avaliacaoDaObra: '?',
                        diasDeLeitura: '?',
                        opiniao: '...',
                    },
                    {
                        nome: 'Isadora',
                        idade: '?',
                        curso: 'Eletro Eletrônica',
                        cursoEn: 'Electronics Engineering',
                        descricao: '...',
                        descricaoEn: '...',
                        cargo: '...',
                        avaliacaoDaObra: '?',
                        diasDeLeitura: '?',
                        opiniao: '...',
                    },
                    {
                        nome: 'Gustavo Durães',
                        idade: '?',
                        curso: 'Eletro Eletrônica',
                        cursoEn: 'Electronics Engineering',
                        descricao: '...',
                        descricaoEn: '...',
                        cargo: '...',
                        avaliacaoDaObra: '?',
                        diasDeLeitura: '?',
                        opiniao: '...',
                    },
                    {
                        nome: 'Henry',
                        idade: '?',
                        curso: 'Mecânica',
                        cursoEn: 'Mechanical Engineering',
                        descricao: '...',
                        descricaoEn: '...',
                        cargo: '...',
                        avaliacaoDaObra: '?',
                        diasDeLeitura: '?',
                        opiniao: '...',
                    },
                    {
                        nome: 'Enzo Vecchi',
                        idade: '?',
                        curso: 'Mecânica',
                        cursoEn: 'Mechanical Engineering',
                        descricao: '...',
                        descricaoEn: '...',
                        cargo: '...',
                        avaliacaoDaObra: '?',
                        diasDeLeitura: '?',
                        opiniao: '...',
                    },
                    {
                        nome: 'Matheus Duarte',
                        idade: '16',
                        curso: 'Mecânica',
                        cursoEn: 'Mechanical Engineering',
                        descricao: '...',
                        descricaoEn: '...',
                        cargo: '...',
                        avaliacaoDaObra: '?',
                        diasDeLeitura: '?',
                        opiniao: '...',
                    }

                ],
            },
        },
    });

    await prisma.dicasDeVestibular.createMany({
        data: [
            {
                titulo: 'Observe o narrador',
                tituloEn: 'Observe the narrator',
                dica: 'Preste atenção em como a voz narrativa influencia a leitura da obra.',
                dicaEn: 'Pay attention to how the narrative voice influences the reading of the work.',
            },
            {
                titulo: 'Estude o contexto',
                tituloEn: 'Study the context',
                dica: 'Relacione o romance ao Realismo e às transformações do século XIX.',
                dicaEn: 'Connect the novel to Realism and the transformations of the 19th century.',
            },
        ],
    });

    console.log('✅ Seed concluído com todos os models do Prisma!');
}

main()
    .catch((e) => {
        console.error('❌ Erro no seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
