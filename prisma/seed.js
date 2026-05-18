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
            descricao:
                'Foi um dos principais escritores do Romantismo brasileiro. Advogado, jornalista e político cearense, ele é considerado um dos fundadores da literatura nacional. Valorizou a natureza e a cultura brasileira, especialmente o índio.',
            descricaoEn:
                'He was one of the main writers of Brazilian Romanticism. Lawyer, journalist and Ceará politician, he is considered one of the founders of national literature. He valued nature and Brazilian culture, especially the indigenous people.',
            contextoHistorico:
                'Viveu no Segundo Reinado, época de consolidação do Império Brasileiro após a Independência. Como romancista, buscou criar uma identidade nacional através do indianismo e do romantismo.',
            contextoHistoricoEn:
                'He lived during the Second Reign, a period of consolidation of the Brazilian Empire after independence. As a novelist, he sought to create a national identity through indianism and romanticism.',
            anoNascimento: 1829,
            anoFalecimento: 1877,
            biografia:
                'José de Alencar, cearense, foi o principal escritor do Romantismo brasileiro. Advogado, jornalista, deputado e ministro da Justiça, ficou famoso por romances como O Guarani e Iracema. Morreu no Rio de Janeiro aos 48 anos.',
            biografiaEn:
                'José de Alencar, from Ceará, was the main writer of Brazilian Romanticism. Lawyer, journalist, deputy and Minister of Justice, he became famous for novels such as O Guarani and Iracema. He died in Rio de Janeiro at the age of 48.',
            fotoURL: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Jose_de_Alencar.png',
        },
    });

    const vocabularioItems = [
        {
            palavra: 'Catachisna',
            palavraEn: 'Cataclysm',
            significado: 'Desastre natural de grandes proporções',
            significadoEn: 'A natural disaster of great proportions',
        },
        {
            palavra: 'Sertões',
            palavraEn: 'Backlands',
            significado: 'Lugar de “sertão”, refere-se ao termo após o interior',
            significadoEn: 'Remote inland regions, countryside, reservoirs / seasonal rains',
        },
        {
            palavra: 'Monções',
            palavraEn: 'Monsoons',
            significado: 'Reservatórios naturais de água',
            significadoEn: 'Seasonal rains and water reservoirs',
        },
        {
            palavra: 'Cabeços',
            palavraEn: 'Hilltops',
            significado: 'Pequenos montes de cume, elevação de terreno',
            significadoEn: 'Small hills or elevated landforms',
        },
        {
            palavra: 'Várzea',
            palavraEn: 'Floodplain',
            significado: 'Terreno plano, fértil e extenso',
            significadoEn: 'Flat, fertile, and extensive land',
        },
        {
            palavra: 'Suserano',
            palavraEn: 'Suzerain',
            significado: 'Senhor feudal que doava feudos a outro nobre',
            significadoEn: 'A feudal lord who granted lands to another noble',
        },
        {
            palavra: 'Vassalo',
            palavraEn: 'Vassal',
            significado: 'Um nobre que recebia feudos de outro nobre',
            significadoEn: 'A noble who received lands from another noble',
        },
        {
            palavra: 'Sobranceiro',
            palavraEn: 'Overbearing',
            significado: 'Alguém em uma posição superior, arrogante',
            significadoEn: 'Someone arrogant or in a superior position',
        },
        {
            palavra: 'Ressvalar',
            palavraEn: 'Slip',
            significado: 'Escorregar, deslize',
            significadoEn: 'To slide or slip',
        },
        {
            palavra: 'Indômito',
            palavraEn: 'Untamed',
            significado: 'Algo ou alguém indomável, rebelde',
            significadoEn: 'Someone or something rebellious or impossible to tame',
        },
        {
            palavra: 'Tapir',
            palavraEn: 'Tapir',
            significado: 'Mamíferos herbívoros, ou como conhecemos anta',
            significadoEn: 'A herbivorous mammal known in Brazil as “anta”',
        },
        {
            palavra: 'Lajedo',
            palavraEn: 'Rocky Plateau',
            significado: 'Grande extensão de rocha plana, pavimento de pedra',
            significadoEn: 'A large flat rock formation',
        },
        {
            palavra: 'Gameleiras',
            palavraEn: 'Gameleira Trees',
            significado: 'Árvores nativas do Brasil, mata-pau',
            significadoEn: 'Native Brazilian trees, also called strangler figs',
        },
        {
            palavra: 'Jacarandá',
            palavraEn: 'Jacaranda',
            significado: 'Árvore de madeira dura',
            significadoEn: 'A hardwood tree',
        },
        {
            palavra: 'Cingidos',
            palavraEn: 'Bound/Covered',
            significado: 'Envolvido, cercado, ou coberto',
            significadoEn: 'Surrounded, wrapped, or covered',
        },
        {
            palavra: 'Fidalguia',
            palavraEn: 'Nobility',
            significado: 'Nobreza, classe social dos fidalgos',
            significadoEn: 'The noble social class',
        },
        {
            palavra: 'Imbuída',
            palavraEn: 'Imbued',
            significado: 'Convencido de uma ideia, preenchido emocionalmente',
            significadoEn: 'Filled or emotionally convinced by an idea',
        },
        {
            palavra: 'Faceirice',
            palavraEn: 'Vanity/Coquetry',
            significado: 'Se exibir, vaidoso, demonstrar elegância',
            significadoEn: 'Showing off, vanity, elegance',
        },
        {
            palavra: 'Parafina',
            palavraEn: 'Paraffin/Organic Layer',
            significado: 'Camada de matéria orgânica',
            significadoEn: 'A layer of organic material',
        },
        {
            palavra: 'Alcatroada',
            palavraEn: 'Tarred',
            significado: 'Coberta, revestido com alcatrão',
            significadoEn: 'Covered or coated with tar',
        },
        {
            palavra: 'Enfado',
            palavraEn: 'Weariness',
            significado: 'Mal-estar, tédio, algo maçante ou monótono',
            significadoEn: 'Boredom, discomfort, something tedious or monotonous',
        },
        {
            palavra: 'Anexim',
            palavraEn: 'Proverb',
            significado: 'Frase curta rimada, dito popular',
            significadoEn: 'A short rhyming popular saying',
        },
        {
            palavra: 'Diáfano',
            palavraEn: 'Diaphanous',
            significado: 'Transparente, algo claro, translúcido',
            significadoEn: 'Transparent, clear, translucent',
        },
        {
            palavra: 'Móbil',
            palavraEn: 'Mobile',
            significado: 'Capaz de se mover ou ser movido',
            significadoEn: 'Able to move or be moved',
        },
        {
            palavra: 'Cabocla',
            palavraEn: 'Cabocla',
            significado: 'Mestiça de indígena com europeu',
            significadoEn: 'A person of mixed Indigenous and European ancestry',
        },
        {
            palavra: 'Clavina',
            palavraEn: 'Small Club',
            significado: 'Pequena clava',
            significadoEn: 'A small mace or club',
        },
        {
            palavra: 'Dileastes',
            palavraEn: 'Warriors/Fighters',
            significado: 'Pessoas que lutavam, batalhavam',
            significadoEn: 'People who fought or battled',
        },
        {
            palavra: 'Abnegação',
            palavraEn: 'Self-denial',
            significado: 'Renúncia voluntária aos próprios interesses',
            significadoEn: 'Voluntary renunciation of one’s own interests',
        },
    ];

    const vocabularios = await Promise.all(
        vocabularioItems.map((item) => prisma.vocabulario.create({ data: item }))
    );

    const livro = await prisma.livro.create({
        data: {
            tituloDoLivro: 'O Guarani',
            tituloDoLivroEn: 'The Guarani',
            descricao:
                'A história se passa no século XVII e conta o amor impossível entre Peri, um índio guarani nobre e corajoso, e Cecília, filha de um fidalgo português. Ambientado em uma fazenda-fortaleza no interior do Brasil, o romance mistura aventura, heroísmo, perigos da floresta e intrigas indígenas.',
            descricaoEn:
                'The story takes place in the 17th century and tells the impossible love between Peri, a noble and brave Guarani Indian, and Cecília, daughter of a Portuguese nobleman. Set in a farm-fortress in the interior of Brazil, the novel combines adventure, heroism, forest dangers, and indigenous intrigues.',
            contextoHistorico:
                'O Guarani, de José de Alencar, foi publicado em 1857, no período do Romantismo brasileiro. A obra faz parte do indianismo, movimento que valorizava o indígena como símbolo nacional após a independência do Brasil. A história se passa no período colonial e apresenta o índio Peri como herói idealizado.',
            contextoHistoricoEn:
                "The Guarani, by José de Alencar, was published in 1857, during the Brazilian Romanticism period. The work is part of the indianism movement, which valued the indigenous people as a national symbol after Brazil's independence. The story takes place in the colonial period and presents the indigenous hero Peri.",
            anoDeLancamento: 1857,
            resumo: 'O Guarani conta a história de Peri, um indígena corajoso e leal que protege Cecília, filha de um fidalgo português. Durante a trama, eles enfrentam ataques indígenas, traições e perigos na floresta. O livro mistura romance e aventura, mostrando o amor idealizado entre Peri e Cecília.',
            resumoEn:
                'The Guarani tells the story of Peri, a brave and loyal indigenous man who protects Cecília, daughter of a Portuguese nobleman. Throughout the plot, they face indigenous attacks, betrayals, and dangers in the forest. The book combines romance and adventure, showing the idealized love between Peri and Cecília.',
            analise: '...',
            analiseEn: '...',
            capaURL: 'https://m.media-amazon.com/images/I/7125-MeD+KL._AC_UF1000,1000_QL80_.jpg',
            autores: { connect: { id: autor.id } },
            movimentoLiterario: { connect: { id: movimento.id } },
            vocabularios: { connect: vocabularios.map((item) => ({ id: item.id })) },
        },
    });

    await prisma.cenarios.create({
        data: {
            nome: 'A fazenda de Dom Antônio de Mariz, no interior do Rio de Janeiro colonial, onde vive a família de Cecília. A floresta brasileira, que aparece como um ambiente de aventura, perigo e contato com a natureza. Os rios e montanhas da região, usados nas fugas e conflitos ao longo da história.',
            nomeEn: "Dom Antônio de Mariz's farm, in the interior of colonial Rio de Janeiro, where Cecília's family lives. The Brazilian forest, which appears as an environment of adventure, danger and contact with nature. The region's rivers and mountains, used in escapes and conflicts throughout history.",
            caracteristicas:
                'Os cenários de O Guarani têm como principais características a natureza exuberante, com florestas, rios e montanhas descritos de forma grandiosa e idealizada. O ambiente é cheio de aventuras, perigos e mistério, além de representar a valorização da paisagem brasileira, típica do Romantismo.',
            caracteristicasEn:
                "The main characteristics of O Guarani's scenarios are exuberant nature, with forests, rivers and mountains described in a grandiose and idealized way. The environment is full of adventures, dangers and mystery, in addition to representing the appreciation of the Brazilian landscape, typical of Romanticism.",
            descricao:
                'Fazenda de Dom Antônio: local seguro e organizado onde vive a família de Cecília, representando a sociedade colonial. Floresta: ambiente selvagem e perigoso, cheio de aventuras e contato com a natureza. Rios e montanhas: cenários usados nas fugas e batalhas, mostrando a grandiosidade da paisagem brasileira.',
            descricaoEn:
                "Dom Antônio's farm: a safe and organized place where Cecília's family lives, representing the colonial society. Forest: a wild and dangerous environment, full of adventures and contact with nature. Rivers and mountains: scenarios used in escapes and battles, showing the grandiosity of the Brazilian landscape.",
            fotoURL: 'https://example.com/cenarios/rio-de-janeiro.jpg',
            idDoLivro: livro.id,
        },
    });

    await prisma.personagens.createMany({
        data: [
            {
                nome: 'Peri',
                idade: 25,
                descricao: 'Indígena corajoso, leal e protetor',
                descricaoEn: 'Brave, loyal and protective indigenous man',
                historia:
                    'É o herói da história e dedica sua vida a proteger Cecília e sua família.',
                historiaEn:
                    'He is the hero of the story and dedicates his life to protecting Cecília and her family.',
                idDoLivro: livro.id,
            },
            {
                nome: 'Cecília',
                idade: 18,
                descricao: 'Jovem doce, delicada e bondosa.',
                descricaoEn: 'Young, sweet, delicate and kind.',
                historia: 'Filha de Dom Antônio de Mariz, desperta o amor e a proteção de Peri.',
                historiaEn:
                    'Daughter of Dom Antônio de Mariz, she awakens the love and protection of Peri.',
                idDoLivro: livro.id,
            },
            {
                nome: 'Dom Antônio de Mariz',
                idade: 50,
                descricao: 'Fidalgo português respeitado e líder da família.',
                descricaoEn: 'Respected Portuguese noble and family leader.',
                historia: 'Dono da fazenda onde a história acontece e pai de Cecília.',
                historiaEn: 'Owner of the farm where the story takes place and father of Cecília.',
                idDoLivro: livro.id,
            },
            {
                nome: 'Isabel',
                idade: 20,
                descricao: 'Moça forte e ciumenta.',
                descricaoEn: 'Strong and jealous girl.',
                historia: 'Prima de Cecília, vive conflitos emocionais ao longo da trama.',
                historiaEn:
                    "Cecília's cousin, experiences emotional conflicts throughout the plot.",
                idDoLivro: livro.id,
            },
            {
                nome: 'Álvaro',
                idade: 27,
                descricao: 'Cavaleiro honrado e valente.',
                descricaoEn: 'Honorable and brave knight.',
                historia: 'Aliado de Dom Antônio e apaixonado por Isabel.',
                historiaEn: 'Ally of Dom Antônio and in love with Isabel.',
                idDoLivro: livro.id,
            },
            {
                nome: 'Loredano',
                idade: 40,
                descricao: 'Homem ambicioso e traiçoeiro.',
                descricaoEn: 'Ambitious and treacherous man.',
                historia: 'Vilão da história, tenta destruir a família de Dom Antônio.',
                historiaEn: "The villain of the story, tries to destroy Dom Antônio's family.",
                idDoLivro: livro.id,
            },
        ],
    });

    await prisma.enredos.create({
        data: {
            introducao:
                'A história apresenta Peri, um indígena guerreiro que vive próximo à fazenda de Dom Antônio de Mariz e se torna protetor de Cecília.',
            introducaoEn:
                "The story presents Peri, a warrior indigenous man who lives near Dom Antônio de Mariz's farm and becomes Cecília's protector.",
            conflito:
                'A família de Dom Antônio passa a enfrentar ataques indígenas e a traição de Loredano, que deseja destruir a família e tomar riquezas.',
            conflitoEn:
                "Dom Antônio's family begins to face attacks from indigenous people and the betrayal of Loredano, who wants to destroy the family and take their wealth.",
            climax: 'A fazenda é atacada e destruída, colocando Cecília e todos os moradores em grande perigo.',
            climaxEn:
                'The farm is attacked and destroyed, putting Cecília and all the residents in great danger.',
            desfecho:
                'Peri salva Cecília e foge com ela pela floresta e pelos rios, deixando o destino dos dois em aberto.',
            desfechoEn:
                'Peri saves Cecília and flees with her through the forest and rivers, leaving the fate of both in uncertainty.',
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
            anoVestibular: 2000,
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
            objetivoProjeto:
                'Ajudar estudantes a estudar literatura com contexto, análise e exercícios.',
            objetivoProjetoEn:
                'Help students study literature with context, analysis, and exercises.',
            sobreAEquipe:
                'Equipe multidisciplinar focada em conteúdo, tecnologia e experiência do usuário.',
            sobreAEquipeEn:
                'A multidisciplinary team focused on content, technology, and user experience.',
            desenvolvimentoTecnico: 'API em Node.js com Prisma e banco relacional.',
            desenvolvimentoTecnicoEn: 'Node.js API with Prisma and a relational database.',
            tecnologias: 'Node.js, Express, Prisma, PostgreSQL',
            integracaoAPI:
                'Consumo de dados estruturados para livros, questões e materiais de apoio.',
            integracaoAPIEn:
                'Consumption of structured data for books, questions, and support materials.',
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
                        avaliacaoDaObra: 5,
                        diasDeLeitura: 5,
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
                        avaliacaoDaObra: 5,
                        diasDeLeitura: 5,
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
                        avaliacaoDaObra: 5,
                        diasDeLeitura: 5,
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
                        avaliacaoDaObra: 5,
                        diasDeLeitura: 5,
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
                        avaliacaoDaObra: 5,
                        diasDeLeitura: 5,
                        opiniao: '...',
                    },
                    {
                        nome: 'Nicolas',
                        idade: 16,
                        curso: 'Desenvolvimento de Sistemas',
                        cursoEn: 'Systems Development',
                        descricao: '...',
                        descricaoEn: '...',
                        cargo: 'Designer',
                        avaliacaoDaObra: 5,
                        diasDeLeitura: 5,
                        opiniao: '...',
                    },
                    {
                        nome: 'Isadora',
                        idade: 16,
                        curso: 'Eletro Eletrônica',
                        cursoEn: 'Electronics Engineering',
                        descricao: '...',
                        descricaoEn: '...',
                        cargo: '...',
                        avaliacaoDaObra: 5,
                        diasDeLeitura: 5,
                        opiniao: '...',
                    },
                    {
                        nome: 'Gustavo Durães',
                        idade: 17,
                        curso: 'Eletro Eletrônica',
                        cursoEn: 'Electronics Engineering',
                        descricao: '...',
                        descricaoEn: '...',
                        cargo: '...',
                        avaliacaoDaObra: 5,
                        diasDeLeitura: 5,
                        opiniao: '...',
                    },
                    {
                        nome: 'Henry',
                        idade: 17,
                        curso: 'Mecânica',
                        cursoEn: 'Mechanical Engineering',
                        descricao: '...',
                        descricaoEn: '...',
                        cargo: '...',
                        avaliacaoDaObra: 5,
                        diasDeLeitura: 5,
                        opiniao: '...',
                    },
                    {
                        nome: 'Enzo Vecchi',
                        idade: 17,
                        curso: 'Mecânica',
                        cursoEn: 'Mechanical Engineering',
                        descricao: '...',
                        descricaoEn: '...',
                        cargo: '...',
                        avaliacaoDaObra: 5,
                        diasDeLeitura: 5,
                        opiniao: '...',
                    },
                    {
                        nome: 'Matheus Duarte',
                        idade: 16,
                        curso: 'Mecânica',
                        cursoEn: 'Mechanical Engineering',
                        descricao: '...',
                        descricaoEn: '...',
                        cargo: '...',
                        avaliacaoDaObra: 5,
                        diasDeLeitura: 5,
                        opiniao: '...',
                    },
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
