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
                'Romance clássico que explora memória, ciúme e ambiguidade narrativa.',
            descricaoEn:
                'Classic novel that explores memory, jealousy, and narrative ambiguity.',
            contextoHistorico:
                'Publicado no fim do século XIX, em um Brasil marcado pela transição social e política.',
            contextoHistoricoEn:
                'Published at the end of the 19th century, in a Brazil marked by social and political transition.',
            anoDeLancamento: 1899,
            resumo:
                'A narrativa acompanha Bentinho e sua relação com Capitu, atravessada por suspeitas e lembranças fragmentadas.',
            resumoEn:
                'The narrative follows Bentinho and his relationship with Capitu, crossed by suspicions and fragmented memories.',
            analise:
                'A obra é conhecida pelo narrador não confiável e pela crítica à idealização romântica.',
            analiseEn:
                'The work is known for its unreliable narrator and its critique of romantic idealization.',
            capaURL: 'https://example.com/capas/dom-casmurro.jpg',
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
        },
    });

    const alternativas = await prisma.alternativas.create({
        data: {
            alternativaA: 'Capitu é inocente.',
            alternativaAEn: 'Capitu is innocent.',
            alternativaB: 'Bentinho é narrador confiável.',
            alternativaBEn: 'Bentinho is a reliable narrator.',
            alternativaC: 'A obra é um romance regionalista.',
            alternativaCEn: 'The work is a regionalist novel.',
            alternativaD: 'A história se passa no século XX.',
            alternativaDEn: 'The story takes place in the 20th century.',
            respostaCorreta: 'B',
            justificativa:
                'O romance apresenta um narrador em primeira pessoa cuja visão é parcial e marcada por ciúme.',
            justificativaEn:
                'The novel presents a first-person narrator whose perspective is partial and marked by jealousy.',
        },
    });

    await prisma.questoes.create({
        data: {
            enunciado:
                'Em Dom Casmurro, qual característica mais impacta a interpretação dos acontecimentos?',
            enunciadoEn:
                'In Dom Casmurro, which feature most impacts the interpretation of events?',
            vestibular: 'FUVEST',
            anoVestibular: 2024,
            idAlternativas: alternativas.id,
            idDoLivro: livro.id,
        },
    });

    await prisma.enredos.create({
        data: {
            introducao: 'Bentinho relembra sua juventude e a promessa feita pela mãe.',
            introducaoEn: 'Bentinho recalls his youth and the promise made by his mother.',
            conflito: 'O ciúme cresce à medida que ele desconfia de Capitu.',
            conflitoEn: 'Jealousy grows as he becomes suspicious of Capitu.',
            climax: 'A tensão atinge o auge quando a confiança do narrador se rompe.',
            climaxEn: 'The tension peaks when the narrator’s trust collapses.',
            desfecho: 'A narrativa termina sem uma verdade definitiva sobre os fatos.',
            desfechoEn: 'The narrative ends without a definitive truth about the events.',
            idDoLivro: livro.id,
        },
    });

    await prisma.movimentosLiterarios.create({
        data: {
            nome: 'Realismo',
            contextoHistorico: 'Movimento que valoriza análise social e observação crítica.',
            contextoHistoricoEn: 'Movement that values social analysis and critical observation.',
            caracteristicas: 'Objetividade, crítica social e foco psicológico.',
            caracteristicasEn: 'Objectivity, social criticism, and psychological focus.',
            periodo: 'Segunda metade do século XIX',
            fase: 'Realismo brasileiro',
            influencia: 'Influenciou a forma de narrar conflitos internos e sociais.',
            idDoLivro: livro.id,
        },
    });

    await prisma.autores.create({
        data: {
            nome: 'Machado de Assis',
            descricao: 'Escritor fundamental da literatura brasileira.',
            descricaoEn: 'A fundamental writer in Brazilian literature.',
            contextoHistorico: 'Atuou em um período de grandes mudanças sociais no Brasil.',
            contextoHistoricoEn: 'He worked during a period of major social change in Brazil.',
            anoNascimento: 1839,
            anoFalecimento: 1908,
            biografia: 'Romancista, contista, cronista e fundador da Academia Brasileira de Letras.',
            biografiaEn: 'Novelist, short story writer, chronicler, and founder of the Brazilian Academy of Letters.',
            movimentosLiterario: 'Realismo',
            fotoURL: 'https://example.com/autores/machado-de-assis.jpg',
            idDoLivro: livro.id,
        },
    });

    await prisma.cenarios.create({
        data: {
            nome: 'Rio de Janeiro',
            caracteristicas: 'Ambiente urbano, socialmente diverso e historicamente marcado por transformações.',
            caracteristicasEn: 'Urban environment, socially diverse and historically marked by transformations.',
            descricao: 'Cenário central para a formação dos personagens e dos conflitos da obra.',
            descricaoEn: 'Central setting for the characters’ formation and the conflicts of the work.',
            fotoURL: 'https://example.com/cenarios/rio-de-janeiro.jpg',
            idDoLivro: livro.id,
        },
    });

    await prisma.personagens.createMany({
        data: [
            {
                nome: 'Capitu',
                idade: 20,
                descricao: 'Personagem marcada pela força e pela ambiguidade.',
                descricaoEn: 'A character marked by strength and ambiguity.',
                historia: 'Vive uma relação complexa com Bentinho e se torna alvo das suspeitas do narrador.',
                historiaEn: 'She lives a complex relationship with Bentinho and becomes the target of the narrator’s suspicions.',
                idDoLivro: livro.id,
            },
            {
                nome: 'Bentinho',
                idade: 70,
                descricao: 'Narrador da história e eixo da memória apresentada.',
                descricaoEn: 'The story’s narrator and the axis of the memory presented.',
                historia: 'Reconstrói seu passado tentando entender as próprias inseguranças.',
                historiaEn: 'He reconstructs his past while trying to understand his own insecurities.',
                idDoLivro: livro.id,
            },
        ],
    });

    await prisma.videos.create({
        data: {
            titulo: 'Resumo de Dom Casmurro',
            tituloEn: 'Dom Casmurro Summary',
            descricao: 'Vídeo explicando enredo, personagens e contexto da obra.',
            descricaoEn: 'Video explaining the plot, characters, and context of the work.',
            url: 'https://example.com/videos/dom-casmurro',
            idDoLivro: livro.id,
        },
    });

    await prisma.curiosidades.create({
        data: {
            tituloCuriosidade: 'Narrador não confiável',
            tituloCuriosidadeEn: 'Unreliable narrator',
            curiosidade: 'A interpretação do leitor depende muito da suspeita sobre o narrador.',
            curiosidadeEn: 'The reader’s interpretation depends heavily on suspicion toward the narrator.',
            idDoLivro: livro.id,
        },
    });

    await prisma.vocabulario.create({
        data: {
            palavra: 'Ambiguidade',
            palavraEn: 'Ambiguity',
            significado: 'Característica de algo que admite mais de uma interpretação.',
            significadoEn: 'A characteristic of something that allows more than one interpretation.',
            idDoLivro: livro.id,
        },
    });

    await prisma.membros.createMany({
        data: [
            {
                nome: 'Ana',
                idade: 21,
                curso: 'Letras',
                cursoEn: 'Literature',
                descricao: 'Responsável pela curadoria de conteúdo literário.',
                descricaoEn: 'Responsible for literary content curation.',
                cargo: 'Conteudista',
                avaliacaoDaObra: 5,
                diasDeLeitura: 7,
                opiniao: 'A obra continua atual pela profundidade psicológica.',
                idDoProjeto: projeto.id,
            },
            {
                nome: 'Bruno',
                idade: 23,
                curso: 'Sistemas de Informação',
                cursoEn: 'Information Systems',
                descricao: 'Responsável pela implementação da API.',
                descricaoEn: 'Responsible for API implementation.',
                cargo: 'Desenvolvedor',
                avaliacaoDaObra: 4,
                diasDeLeitura: 5,
                opiniao: 'A estrutura do conteúdo facilita o estudo.',
                idDoProjeto: projeto.id,
            },
        ],
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
