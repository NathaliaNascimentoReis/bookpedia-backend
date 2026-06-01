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
    await prisma.temasDeVestibular.deleteMany();
    await prisma.autores.deleteMany();
    await prisma.movimentosLiterarios.deleteMany();
    await prisma.vocabulario.deleteMany();
    await prisma.livro.deleteMany();
    await prisma.dicasDeVestibular.deleteMany();

    console.log('📦 Inserindo novos registros...');

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
        },
    });

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
            faseTexto:
                'O Romantismo no Brasil é dividido em três grandes momentos: a Primeira Geração (Indianista), focada na criação de um herói nacional e na exaltação da natureza; a Segunda Geração (Ultrarromântica), marcada pelo pessimismo, subjetivismo profundo e a Terceira Geração (Condoreira), voltada para questões sociais e a luta abolicionista.',
            idDoLivro: livro.id
        },
    });

    const autor = await prisma.autores.create({
        data: {
            nome: 'José de Alencar',
            descricao:
                'Foi um dos principais escritores do Romantismo brasileiro, patrono da cadeira nº 23 da Academia Brasileira de Letras e autor de obras-primas como O Guarani, Iracema, O Sertanejo e Senhora. Além de romancista, o cearense atuou como advogado, jornalista, redator e político.',
            descricaoEn:
                'He was one of the main writers of Brazilian Romanticism. Lawyer, journalist and Ceará politician, he is considered one of the founders of national literature. He valued nature and Brazilian culture, especially the indigenous people.',
            contextoHistorico:
                'Viveu no Segundo Reinado, época de consolidação do Império Brasileiro após a Independência. Como romancista, buscou criar uma identidade nacional através do indianismo e do romantismo.',
            contextoHistoricoEn:
                'He lived during the Second Reign, a period of consolidation of the Brazilian Empire after independence. As a novelist, he sought to create a national identity through indianism and romanticism.',
            anoNascimento: 1829,
            anoFalecimento: 1877,
            biografia:
                'José de Alencar (1829-1877), nascido em 1 de maio de 1829 no Ceará, era filho de José Martiniano de Alencar, um senador do reinado de Dom Pedro I e ex-padre, e de Ana Josefina. A avó do cearense, Bárbara de Alencar, foi heroína da Revolução Pernambucana e considerada a primeira presa política do Brasil, o que gerou nele um forte engajamento político que seria refletido posteriormente em sua autoridade política e obras. Aos 11 anos, mudou-se com a família para o Rio de Janeiro, mas, aos 17, foi para São Paulo, onde iniciou seus estudos de Direito na Faculdade do Largo de São Francisco, concluídos na Faculdade de Direito de Olinda, em Pernambuco, no ano de 1851. Seu interesse pela escrita veio aos 15 anos, inspirado pelo sucesso de “A Moreninha”, de Joaquim Manuel de Macedo, e algumas de suas obras escritas nessa época foram “Os Contrabandistas", lançado somente após a sua morte, e "O Ermitão da Glória”, publicado em 1873. De volta ao Rio de Janeiro, exerceu a advocacia e ingressou na imprensa sendo redator do "Correio Mercantil", onde escreveu a seção "Ao Correr da Pena", comentando o cotidiano carioca. Como redator-chefe do "Diário do Rio", publicou seu primeiro romance em folhetim, "Cinco Minutos", em 1856, seguido pelo estrondoso sucesso de "O Guarani", de 1857. Na política, foi deputado do Ceará pelo Partido Conservador e chegou ao cargo de Ministro da Justiça em 1868. Sua bibliografia é dividida em: obras indianistas, com "Iracema", "O Guarani" e "Ubirajara", históricas, com "As Minas de Prata" e "A Guerra dos Mascates", regionalistas, com "O Gaúcho" e "O Sertanejo", urbanas, com "Senhora", "Lucíola" e "Diva". Além dos romances, escreveu poesias como "Os Filhos de Tupã" e peças teatrais como "O Demônio Familiar". Casado com Georgiana Augusta da Gama Cochrane, em 1864, teve quatro filhos, um deles sendo o escritor Mário Alencar. No fim da vida, enfrentou um grave caso de tuberculose e faleceu no Rio de Janeiro em 12 de dezembro de 1877, aos 48 anos.',
            biografiaEn:
                'José de Alencar (1829-1877), born on May 1, 1829, in Ceará, was the son of José Martiniano de Alencar, a senator during the reign of Dom Pedro I and a former priest, and Ana Josefina. The Ceará natives grandmother, Bárbara de Alencar, was a heroine of the Pernambucan Revolt and considered Brazils first political prisoner, which generated in him a strong political engagement that would later be reflected in his political authority and works. At the age of 11, he moved with his family to Rio de Janeiro, but at 17, he went to São Paulo, where he began his law studies at the Faculdade do Largo de São Francisco, completed at the Faculdade de Direito de Olinda, in Pernambuco, in the year 1851. His interest in writing came at age 15, inspired by the success of “A Moreninha”, by Joaquim Manuel de Macedo, and some of his works written at that time were “Os Contrabandistas", released only after his death, and "O Ermitão da Glória”, published in 1873. Back in Rio de Janeiro, he practiced law and entered the press as a writer for the "Correio Mercantil", where he wrote the section "Ao Correr da Pena", commenting on daily life in Rio. As editor-in-chief of the "Diário do Rio", he published his first serialized novel, "Cinco Minutos", in 1856, followed by the resounding success of "O Guarani", in 1857. In politics, he was a deputy for Ceará for the Conservative Party and reached the position of Minister of Justice in 1868. His bibliography is divided into: indianist works, with "Iracema", "O Guarani" and "Ubirajara", historical, with "As Minas de Prata" and "A Guerra dos Mascates", regionalist, with "O Gaúcho" and "O Sertanejo", urban, with "Senhora", "Lucíola" and "Diva". In addition to the novels, he wrote poetry such as "Os Filhos de Tupã" and plays such as "O Demônio Familiar". Married to Georgiana Augusta da Gama Cochrane, in 1864, he had four children, one of them being the writer Mário Alencar. At the end of his life, he faced a severe case of tuberculosis and passed away in Rio de Janeiro on December 12, 1877, at the age of 48.',
            fotoURL:
                'https://academiacearensedeletras.org.br/wp-content/uploads/2020/11/JOSE-DE-ALENCAR.jpg',
                idDoLivro: livro.id
        },
    });

    const vocabularioItems = [
        {
            palavra: 'Cataclisma',
            palavraEn: 'Cataclysm',
            significado: 'Desastre natural de grandes proporções',
            significadoEn: 'A natural disaster of great proportions',
            idDoLivro: livro.id
        },
        {
            palavra: 'Sertões',
            palavraEn: 'Backlands',
            significado: 'Lugar de "sertão", refere-se ao termo após o interior',
            significadoEn: 'Remote inland regions, countryside, reservoirs / seasonal rains',
            idDoLivro: livro.id
        },
        {
            palavra: 'Monções',
            palavraEn: 'Monsoons',
            significado: 'Reservatórios naturais de água',
            significadoEn: 'Seasonal rains and water reservoirs',
            idDoLivro: livro.id
        },
        {
            palavra: 'Cabeços',
            palavraEn: 'Knoll',
            significado: 'Pequenos montes de cume, elevação de terreno',
            significadoEn: 'Small hills or elevated landforms',
            idDoLivro: livro.id
        },
        {
            palavra: 'Várzea',
            palavraEn: 'Floodplain',
            significado: 'Terreno plano, fértil e extenso',
            significadoEn: 'Flat, fertile, and extensive land',
            idDoLivro: livro.id
        },
        {
            palavra: 'Suserano',
            palavraEn: 'Suzerain',
            significado: 'Senhor feudal que doava feudos a outro nobre',
            significadoEn: 'A feudal lord who granted lands to another noble',
            idDoLivro: livro.id
        },
        {
            palavra: 'Vassalo',
            palavraEn: 'Vassal',
            significado: 'Um nobre que recebia feudos de outro nobre',
            significadoEn: 'A noble who received lands from another noble',
            idDoLivro: livro.id
        },
        {
            palavra: 'Sobranceiro',
            palavraEn: 'Overbearing',
            significado: 'Alguém em uma posição superior, arrogante',
            significadoEn: 'Someone arrogant or in a superior position',
            idDoLivro: livro.id
        },
        {
            palavra: 'Resvalar',
            palavraEn: 'Slip',
            significado: 'Escorregar, deslize',
            significadoEn: 'To slide or slip',
            idDoLivro: livro.id
        },
        {
            palavra: 'Indômito',
            palavraEn: 'Indomitable',
            significado: 'Algo ou alguém indomável, rebelde',
            significadoEn: 'Someone or something rebellious or impossible to tame',
            idDoLivro: livro.id
        },
        {
            palavra: 'Tapir',
            palavraEn: 'Tapir',
            significado: 'Mamíferos herbívoros, ou como conhecemos anta',
            significadoEn: 'A herbivorous mammal known in Brazil as "anta"',
            idDoLivro: livro.id
        },
        {
            palavra: 'Lajedo',
            palavraEn: 'Slabstone',
            significado: 'Grande extensão de rocha plana, pavimento de pedra',
            significadoEn: 'A large flat rock formation',
            idDoLivro: livro.id
        },
        {
            palavra: 'Gameleiras',
            palavraEn: 'Gameleira Trees',
            significado: 'Árvores nativas do Brasil, mata-pau',
            significadoEn: 'Native Brazilian trees, also called strangler figs',
            idDoLivro: livro.id
        },
        {
            palavra: 'Jacarandá',
            palavraEn: 'Jacaranda',
            significado: 'Árvore de madeira dura',
            significadoEn: 'A hardwood tree',
            idDoLivro: livro.id
        },
        {
            palavra: 'Cingidos',
            palavraEn: 'Girdded',
            significado: 'Envolvido, cercado, ou coberto',
            significadoEn: 'Surrounded, wrapped, or covered',
            idDoLivro: livro.id
        },
        {
            palavra: 'Fidalguia',
            palavraEn: 'Nobility',
            significado: 'Nobreza, classe social dos fidalgos',
            significadoEn: 'The noble social class',
            idDoLivro: livro.id
        },
        {
            palavra: 'Imbuída',
            palavraEn: 'Imbued',
            significado: 'Convencido de uma ideia, preenchido emocionalmente',
            significadoEn: 'Filled or emotionally convinced by an idea',
            idDoLivro: livro.id
        },
        {
            palavra: 'Faceirice',
            palavraEn: 'Vanity/Coquetry',
            significado: 'Se exibir, vaidoso, demonstrar elegância',
            significadoEn: 'Showing off, vanity, elegance',
            idDoLivro: livro.id
        },
        {
            palavra: 'Parafina',
            palavraEn: 'Paraffin',
            significado: 'Camada de matéria orgânica',
            significadoEn: 'A layer of organic material',
            idDoLivro: livro.id
        },
        {
            palavra: 'Alcatroada',
            palavraEn: 'Tarred',
            significado: 'Coberta, revestido com alcatrão',
            significadoEn: 'Covered or coated with tar',
            idDoLivro: livro.id
        },
        {
            palavra: 'Enfado',
            palavraEn: 'Boredom',
            significado: 'Mal-estar, tédio, algo maçante ou monótono',
            significadoEn: 'Boredom, discomfort, something tedious or monotonous',
            idDoLivro: livro.id
        },
        {
            palavra: 'Anexim',
            palavraEn: 'Attachment',
            significado: 'Frase curta rimada, dito popular',
            significadoEn: 'A short rhyming popular saying',
            idDoLivro: livro.id
        },
        {
            palavra: 'Diáfano',
            palavraEn: 'Diaphanous',
            significado: 'Transparente, algo claro, translúcido',
            significadoEn: 'Transparent, clear, translucent',
            idDoLivro: livro.id
        },
        {
            palavra: 'Móbil',
            palavraEn: 'Mobile',
            significado: 'Capaz de se mover ou ser movido',
            significadoEn: 'Able to move or be moved',
            idDoLivro: livro.id
        },
        {
            palavra: 'Cabocla',
            palavraEn: 'Cabocla',
            significado: 'Mestiça de indígena com europeu',
            significadoEn: 'A person of mixed Indigenous and European ancestry',
            idDoLivro: livro.id
        },
        {
            palavra: 'Clavina',
            palavraEn: 'Clavine',
            significado: 'Pequena clava',
            significadoEn: 'A small mace or club',
            idDoLivro: livro.id
        },
        {
            palavra: 'Dicastes',
            palavraEn: 'Warriors/Fighters',
            significado: 'Pessoas que lutavam, batalhavam',
            significadoEn: 'People who fought or battled',
            idDoLivro: livro.id
        },
        {
            palavra: 'Abnegação',
            palavraEn: 'Self-denial',
            significado: 'Renúncia voluntária aos próprios interesses',
            significadoEn: "Voluntary renunciation of one's own interests",
            idDoLivro: livro.id
        },
    ];

    const vocabularios = await Promise.all(
        vocabularioItems.map((item) => prisma.vocabulario.create({ data: item })),
    );

    // Criados antes do livro para poder conectar via connect
    const temas = await Promise.all([
        prisma.temasDeVestibular.create({
            data: {
                tema: 'Desafios para a Representatividade Indígena no Brasil',
                temaEn: 'Challenges for Indigenous Representation in Brazil',
                temaDescricao:
                    'A valorização da cultura indígena na sociedade brasileira contemporânea encontra grandes desafios devido ao apagamento histórico e a marginalização dos povos originários no Brasil, o que impacta diretamente a construção da identidade nacional em um país multicultural.',
                temaDescricaoEn:
                    'The valorization of Indigenous culture in contemporary Brazilian society faces major challenges due to the historical erasure and marginalization of native peoples in Brazil, which directly impacts the construction of a national identity in a multicultural country.',
                livro: {
                connect: { id: livro.id }
}
            },
        }),
        prisma.temasDeVestibular.create({
            data: {
                tema: 'A exploração predatória dos recursos naturais e seus impactos sociais.',
                temaEn: 'The predatory exploitation of natural resources and its social impacts.',
                temaDescricao:
                    'O avanço do desmatamento e do garimpo ilegal é uma herança do período colonialista que perpetuou a exploração. No livro de José de Alencar, O Guarani, essa realidade aparece no avanço do colonizador português para o domínio da Mata Atlântica, impondo a civilização europeia sobre a natureza. ',
                temaDescricaoEn:
                    'The advancement of deforestation and illegal mining is a legacy of the colonial period that perpetuated exploitation. In José de Alencars novel, The Guarani, this reality is reflected in the Portuguese colonizers push to dominate the Atlantic Forest, imposing European civilization upon nature.',
                livro: {
                connect: { id: livro.id }
            },
            }
        }),
        prisma.temasDeVestibular.create({
            data: {
                tema: 'A persistência da violência contra minorias étnicas',
                temaEn: 'The Persistence of Violence Against Ethnic Minorities',
                temaDescricao:
                    'A violência decorrente do etnocentrismo se iniciou nas Grandes Navegações e reverbera hoje na falta de respeito à diversidade cultural e religiosa das comunidades tradicionais. O livro "O Guarani" narra a domesticação da cultura indígena e a conversão do indígena Peri para o cristianismo, sendo uma forte representação desse apagamento histórico.',
                temaDescricaoEn:
                    'Violence stemming from ethnocentrism began during the Age of Discovery and echoes today in the lack of respect for the cultural and religious diversity of traditional communities. The novel The Guarani narrates the domestication of Indigenous culture and the conversion of the native Peri to Christianity, serving as a powerful representation of this historical erasure.',
                livro: {
                    connect: { id: livro.id }
                }
            },
        }),
        prisma.temasDeVestibular.create({
            data: {
                tema: 'O Papel da Mulher e o Patriarcado no Brasil Contemporâneo',
                temaEn: 'The Role of Women and Patriarchy in Contemporary Brazil',
                temaDescricao:
                    'A submissão e a dependência da figura feminina em uma estrutura patriarcal rígida é um desafio atual na luta contra a violência de gênero e a desigualdade, sendo uma herança histórica do período colonial/monárquico. Cecília (Ceci), do livro "O Guarani", é a representação de uma mulher pura e idealizada, sempre precisando ser protegida por uma figura masculina, o que escancara a persistência da visão acerca das mulheres como frágeis e sensíveis, mantendo o patriarcado e seus impactos na sociedade brasileira.',
                temaDescricaoEn:
                   "The submission and dependency of the female figure in a rigid patriarchal structure is a contemporary challenge in the struggle against gender violence and inequality, being a historical heritage of the colonial/monarchical period. Cecília (Ceci), from the book O Guarani, is the representation of a pure and idealized woman, always needing to be protected by a masculine figure, which exposes the persistence of the vision about women as fragile and sensitive, maintaining the patriarchy and its impacts on Brazilian society.",
                livro: {
                    connect: { id: livro.id }
                }
            },
        }),
    ]);



    await prisma.cenarios.createMany({
        data: [
            {
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
            {
                nome: 'Mata Atlântica',
                nomeEn: 'Atlantic Forest',
                caracteristicas:
                    'Possui muitos rios e árvores(especialmente gameleiras e angelins, que são as mais citadas na obra), é úmida, suas cores são vivas, e seu ambiente é perfumado por baunilhas silvestres.Para os colonizadores, ela é um deserto perigoso, selvagem e impenetrável.',
                caracteristicasEn:
                    'It has many rivers and trees (especially wild fig trees and angelim trees, which are the most mentioned in the book), it is humid, its colors are vibrant, and its environment is perfumed by wild vanilla. For the colonizers, it is a dangerous, wild, and impenetrable desert.',
                descricao:
                    'No livro a floresta é descrita de forma extremamente positiva e idealizada, quase como uma entidade harmônica para todos os cenários.Os animais e indígenas que nela se abrigam são exaltados e cultuados, como se fossem filhos herdeiros das qualidades da natureza presentes na Mata Atlântica, que possui um vigor primitivo.Segundo o narrador, a impressão que se dá da mata é de que ela protege o feudo de Dom Antônio, atuando como uma "muralha verde".',
                descricaoEn:
                    'In the book, the forest is described in an extremely positive and idealized way, almost as a harmonious entity for all the settings.The animals and indigenous people who live there are exalted and worshipped, as if they were heirs to the qualities of nature present in the Atlantic Forest, which possesses a primitive vigor.According to the narrator, the impression given of the forest is that it protects Dom Antônios fiefdom, acting as a "green wall".',
                fotoURL: 'https://i.pinimg.com/736x/a1/5f/b3/a15fb3a5c61b96e5ab6c0eecf1d44f3f.jpg',
                idDoLivro: livro.id,
            },
            {
                nome: 'Mansão de Dom Antônio de Mariz',
                nomeEn: "Dom Antônio de Mariz's Mansion",
                caracteristicas:
                    'A mansão é cercada por uma parte intocada da Mata Atlântica, tendo sua vegetação descrita como "luxuosa" e "cheia de vigor", e por um rio que, segundo o livro, "corria no meio das arcarias de verdura e dos capitéis formados pelos leques das palmeiras".',
                caracteristicasEn:
                    'The mansion is surrounded by an untouched part of the Atlantic Forest, its vegetation described as "luxurious" and "full of vigor," and by a river that, according to the book, "flowed through arcades of verdure, with capitals formed by the fans of the palm trees".',
                descricao:
                    'A casa apresenta uma arquitetura "simples e grosseira", que foi construída de modo rudimentar, mas também possui um belo jardim que imita a real natureza do Brasil com flores, árvores e um "fio de água". Aos fundos existem armazéns e senzalas, que servem de abrigo para aventureiros e visitantes de Dom Antônio. Em seu interior, a mansão possui um ar "severo e triste", com símbolos da coroa portuguesa em brasões de armas espalhados, porém, esse aspecto muda em outros cômodos, que revelam a presença feminina em brocatéis de seda, tapetes de peles e bancos dourados e charmosos.',
                descricaoEn:
                    'The house has a "simple and crude" architecture, built in a rudimentary style, but also boasts a beautiful garden that mimics the true nature of Brazil with flowers, trees, and a "trickle of water." In the back are quarters(referred to as "slave quarters" in the book), which served as shelter for adventurers and visitors of Dom Antônio.Inside, the mansion has a "severe and sad" air, with symbols of the Portuguese crown in coats of arms scattered throughout; however, this aspect changes in other rooms, which reveal a feminine presence in silk brocades, fur rugs, and charming gilded benches.',
                fotoURL: 'https://i.pinimg.com/736x/16/ce/3e/16ce3e81eca5809e2609ceeb53056b31.jpg',
                idDoLivro: livro.id,
            },
        ],
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
        url: 'https://youtu.be/_JlDrmk-1aM?si=Zb1fEeg0X1Los4xd', // <-- URL completa aqui
        idDoLivro: livro.id,
    },
});

    await prisma.curiosidades.createMany({
        data: [
            {
                tituloCuriosidade: 'A figura política de José de Alencar',
                tituloCuriosidadeEn: 'The political figure of José de Alencar',
                curiosidade: 'José de Alencar, formado em Direito, atuou na política durante o Segundo Reinado como Deputado Estadual do Ceará, Chefe da Secretaria do Ministro da Justiça e Ministro da Justiça, senador e deputado.',
                curiosidadeEn: 'José de Alencar, who held a degree in Law, was active in politics as a State Representative for Ceará, Chief of Staff for the Minister of Justice, and Minister of Justice.',
                idDoLivro: livro.id,
            },
            {
                tituloCuriosidade: 'A amizade com Machado de Assis',
                tituloCuriosidadeEn: 'The friendship with Machado de Assis',
                curiosidade: 'José de Alencar foi um grande amigo do escritor brasileiro Machado de Assis, que o escolheu para ser o patrono da Cadeira nº 23 da Academia Brasileira de Letras (ABL).',
                curiosidadeEn: 'José de Alencar was a close friend of the Brazilian writer Machado de Assis, who even chose him as the patron of the 23rd chair of the Brazilian Academy of Letters (ABL).',
                idDoLivro: livro.id,
            },
            {
                tituloCuriosidade: 'Um nome que carrega monumentos e teatros',
                tituloCuriosidadeEn: 'A name carried by monuments and theaters',
                curiosidade: 'Em 1910, na cidade de Fortaleza, foi inaugurado um teatro em homenagem ao escritor de O Guarani, José de Alencar, chamado "Theatro José de Alencar" e, além desse espaço, há no Rio de Janeiro uma estátua da figura do autor localizada na praça que também carrega o seu nome. Todas essas construções permanecem intactas até os dias de hoje.',
                curiosidadeEn: 'In 1910, in the city of Fortaleza, a theater was inaugurated in honor of the author of The Guarani, José de Alencar, named "Theatro José de Alencar". In addition to this venue, there is a statue of the author in Rio de Janeiro, located in a square that also bears his name. All of these landmarks remain intact to this day.',
                idDoLivro: livro.id,
            },
            {
                tituloCuriosidade: 'O apelido de infância que José de Alencar compartilha com um famoso cantor dos anos 80',
                tituloCuriosidadeEn: 'The childhood nickname that José de Alencar shares with a famous 80s singer',
                curiosidade: 'O escritor José de Alencar, durante a infância, era chamado de Cazuza (que significa "moleque" ou "garoto"), assim como o cantor e ex-vocalista da banda Barão Vermelho, Cazuza.',
                curiosidadeEn: 'During his childhood, the writer José de Alencar was called Cazuza (which means "scamp" or "boy"), just like the 1980s singer of the band Barão Vermelho, Cazuza.',
                idDoLivro: livro.id,
            },
        ],
    });

    // Substituímos o método createMany pelo loop for...of com create. Isso foi necessário porque o Prisma não permite criar relações (como as alternativas conectadas a uma questão) usando o comando de inserção em massa (createMany).

    const questoesData = [
        {
            enunciado:
                '"Peri não era mais o índio que há pouco ali estava; era um soberano; a majestade do gênio e da coragem iluminava a sua fronte bronzeada (...)" Considerando a representação de Peri no romance O Guarani, de José de Alencar, e o contexto do Romantismo brasileiro, assinale a alternativa correta:',
            enunciadoEn:
                '"Peri was no longer the Indian who had been there just a moment ago; he was a sovereign; the majesty of genius and courage illuminated his bronzed brow (...)" Considering the representation of Peri in the novel O Guarani, by José de Alencar, and the context of Brazilian Romanticism, choose the correct alternative: ',
            vestibular: 'FUVEST',
            anoVestibular: 2019,
            idDoLivro: livro.id,
            alternativas: {
                create: {
                    alternativaA:
                        'Alencar constrói o protagonista a partir de uma perspectiva realista, baseando-se em relatos etnográficos rigorosos da época colonial.',
                    alternativaAEn:
                        'Alencar builds the protagonist from a realistic perspective, based on rigorous ethnographic accounts of the colonial era. ',
                    alternativaB:
                        'A idealização do indígena atende a uma necessidade política e literária de criar um herói nacional que pudesse rivalizar com os cavaleiros medievais europeus. ',
                    alternativaBEn:
                        'The idealization of the indigenous person meets a political and literary need to create a national hero who could rival European medieval knights.',
                    alternativaC:
                        'O heroísmo de Peri é desmistificado ao longo da narrativa, revelando sua incapacidade de se adaptar aos valores da civilização cristã-portuguesa. ',
                    alternativaCEn:
                        'Peri’s heroism is demystified throughout the narrative, revealing his inability to adapt to the values of Christian-Portuguese civilization',
                    alternativaD:
                        'O autor utiliza a figura do indígena para criticar abertamente a colonização portuguesa e denunciar o massacre das tribos nativas.',
                    alternativaDEn:
                        'The author uses the figure of the indigenous person to openly criticize Portuguese colonization and denounce the massacre of native tribes.',
                    respostaCorreta: 'B',
                    justificativa:
                        'Peri é um exemplo do “herói indianista” do Romantismo brasileiro. O Guarani idealiza o indígena para criar uma figura nacional heroica, comparável aos cavaleiros medievais europeus.',
                    justificativaEn:
                        'Peri is an example of the "Indianist hero" of Brazilian Romanticism. The Guarani idealizes the indigenous person to create a heroic national figure, comparable to medieval European knights.',
                },
            },
        },
        {
            enunciado:
                'Em O Guarani, o casal Peri e Cecília encarna o mito de fundação da identidade brasileira. No entanto, para que esse par romântico se consolide no final da narrativa de acordo com a moral da época, ocorre um evento simbólico de extrema importância. Esse evento é: ',
            enunciadoEn:
                'In O Guarani, the couple Peri and Cecília embodies the founding myth of Brazilian identity. However, for this romantic pair to consolidate at the end of the narrative in accordance with the morality of the time, a highly important symbolic event must take place. This event is: ',
            vestibular: 'UNICAMP',
            anoVestibular: 2016,
            idDoLivro: livro.id,
            alternativas: {
                create: {
                    alternativaA:
                        'O casamento civil celebrado por Dom Antônio antes de morrer na explosão.',
                    alternativaAEn:
                        'The civil marriage celebrated by Dom Antônio before dying in the explosion.',
                    alternativaB:
                        'O batismo cristão de Peri, realizado de forma improvisada por Dom Antônio de Mariz.',
                    alternativaBEn:
                        'The Christian baptism of Peri, performed in an improvised manner by Dom Antônio de Mariz.',
                    alternativaC:
                        'A fuga do casal para Portugal, onde Peri é formalmente aceito pela corte do Rei.',
                    alternativaCEn:
                        'The couple’s escape to Portugal, where Peri is formally accepted by the King’s court.',
                    alternativaD:
                        'A aceitação de Cecília como membra legítima da tribo dos Goitacases após o ritual do casamento.',
                    alternativaDEn:
                        'The acceptance of Cecília as a legitimate member of the Goitacás tribe after the marriage ritual.',
                    respostaCorreta: 'B',
                    justificativa:
                        'O batismo cristão de Peri simboliza sua integração à ordem cristã e patriarcal. Isso torna aceitável, dentro da moral do século XIX, sua união simbólica com Cecília.',
                    justificativaEn:
                        'Peri’s Christian baptism symbolizes his integration into the Christian and patriarchal order. This makes his symbolic union with Cecilia acceptable within the morals of the 19th century.',
                },
            },
        },
        {
            enunciado:
                'A respeito do vilão Loredano, personagem de O Guarani, de José de Alencar, assinale a alternativa correta:',
            enunciadoEn:
                'Regarding the villain Loredano, a character in O Guarani, by José de Alencar, choose the correct alternative:',
            vestibular: 'UNESP',
            anoVestibular: 2017,
            idDoLivro: livro.id,
            alternativas: {
                create: {
                    alternativaA:
                        'Trata-se de um índio dissidente da tribo dos Aimorés que busca vingança contra Dom Antônio.',
                    alternativaAEn:
                        'He is a dissident Indian from the Aimoré tribe who seeks revenge against Dom Antônio.',
                    alternativaB:
                        'É um nobre espanhol enviado pela Coroa para fiscalizar as terras de Dom Antônio de Mariz. ',
                    alternativaBEn:
                        'He is a Spanish nobleman sent by the Crown to inspect Dom Antônio de Mariz’s lands. ',
                    alternativaC:
                        'É um ex-frade italiano, movido pela ambição material e pelo desejo carnal por Cecília, que lidera uma revolta interna.',
                    alternativaCEn:
                        'He is an Italian ex-friar, driven by material ambition and carnal desire for Cecília, who leads an internal revolt. ',
                    alternativaD:
                        'Representa a força da lei e da ordem da metrópole, chocando-se contra o isolamento feudal de Dom Antônio.',
                    alternativaDEn:
                        ' He represents the force of law and order from the metropolis, clashing with the feudal isolation of Dom Antônio.',
                    respostaCorreta: 'C',
                    justificativa:
                        'Loredano é um ex-frade italiano ambicioso e manipulador. Ele deseja Cecília e lidera os aventureiros contra Dom Antônio, funcionando como principal antagonista humano da narrativa.',
                    justificativaEn:
                        'Loredano is an ambitious and manipulative former Italian friar. He desires Cecilia and leads the adventurers against Dom Antônio, serving as the main human antagonist in the narrative.',
                },
            },
        },
        {
            enunciado:
                'Sobre a estrutura narrativa e o contexto de publicação de O Guarani, assinale a afirmativa correta:',
            enunciadoEn:
                'Regarding the narrative structure and the context of publication of O Guarani, choose the correct statement:',
            vestibular: 'MACKENZIE',
            anoVestibular: 2019,
            idDoLivro: livro.id,
            alternativas: {
                create: {
                    alternativaA:
                        'O livro foi publicado diretamente em formato de volume encadernado, financiado pelo governo imperial para distribuição nas escolas. ',
                    alternativaAEn:
                        'The book was published directly in a bound volume format, funded by the imperial government for school distribution. ',
                    alternativaB:
                        'A obra foi publicada originalmente sob a forma de folhetim, o que justifica o dinamismo da ação, a profusão de perigos imprevistos e os ganchos de suspense ao final dos capítulos.',
                    alternativaBEn:
                        'The work was originally published in serial format (folhetim), which explains the dynamic action, the abundance of unforeseen dangers, and the suspenseful cliffhangers at the end of chapters. ',
                    alternativaC:
                        'O romance insere-se na vertente do realismo histórico, pois Alencar não ficcionaliza os fatos documentados da União Ibérica.',
                    alternativaCEn:
                        'The novel falls within the scope of historical realism, as Alencar does not fictionalize the documented facts of the Iberian Union. ',
                    alternativaD:
                        'O foco narrativo é em primeira pessoa, sendo a história inteiramente contada do ponto de vista de Cecília na sua velhice.',
                    alternativaDEn:
                        'The narrative focus is in the first person, with the story told entirely from Cecília’s perspective in her old age.',
                    respostaCorreta: 'B',
                    justificativa:
                        'O romance foi publicado inicialmente em folhetins de jornal. Por isso há muitos momentos de suspense, ação intensa e “ganchos” no fim dos capítulos para prender o leitor.',
                    justificativaEn:
                        'The novel was initially published in newspaper installments. Therefore, there are many moments of suspense, intense action, and cliffhangers at the end of each chapter to keep the reader hooked.',
                },
            },
        },
        {
            enunciado:
                ' Considere as afirmações abaixo sobre as personagens femininas Cecília e Isabel em O Guarani: I. Cecília é a típica heroína romântica idealizada: loira, de olhos azuis, frágil e associada à pureza. II. Isabel carrega o estigma da miscigenação (filha de Dom Antônio com uma indígena), representando uma paixão mais sombria, realista e infeliz. III. Isabel e Cecília disputam ferozmente o amor de Peri, que constitui o principal triângulo amoroso da trama principal.Está(ão) correta(s): ',
            enunciadoEn:
                'Consider the statements below regarding the female characters Cecília and Isabel in O Guarani: I. Cecília is the typical idealized romantic heroine: blonde, blue-eyed, fragile, and associated with purity. II. Isabel carries the stigma of miscegenation (the daughter of Dom Antônio with an indigenous woman), representing a darker, more realistic, and unhappy passion. III. Isabel and Cecília fiercely dispute Peri’s love, which constitutes the main love triangle of the primary plot. Which statement(s) is/are correct? ',
            vestibular: 'UFRGS',
            anoVestibular: 2017,
            idDoLivro: livro.id,
            alternativas: {
                create: {
                    alternativaA: 'Apenas I.',
                    alternativaAEn: 'Only I.',
                    alternativaB: 'Apenas I e II. ',
                    alternativaBEn: 'Only I and II.',
                    alternativaC: 'Apenas II e III. ',
                    alternativaCEn: 'Only II and III.',
                    alternativaD: ' I, II e III',
                    alternativaDEn: 'I, II, and III.',
                    respostaCorreta: 'B',
                    justificativa:
                        'Apenas I e II. I é verdadeira: Cecília representa a heroína romântica idealizada, pura e angelical. II é verdadeira: Isabel possui características mais passionais e dramáticas, ligadas ao tema da miscigenação. III é falsa: Isabel não disputa centralmente o amor de Peri; o principal vínculo amoroso é entre Peri e Cecília.',
                    justificativaEn:
                        'Only I and II. I is true: Cecília represents the idealized romantic heroine, pure and angelic. II is true: Isabel possesses more passionate and dramatic characteristics, linked to the theme of miscegenation. III is false: Isabel does not centrally compete for Peri’s love; the main romantic bond is between Peri and Cecília.',
                },
            },
        },
        {
            enunciado:
                'O cenário em O Guarani, particularmente a natureza que cerca o Rio Paquequer e a habitação de Dom Antônio de Mariz, cumpre um papel fundamental na estética romântica. Esse papel consiste em: ',
            enunciadoEn:
                'The setting in O Guarani, particularly the nature surrounding the Paquequer River and the household of Dom Antônio de Mariz, plays a fundamental role in Romantic aesthetics. This role consists of:',
            vestibular: 'FUVEST',
            anoVestibular: 2018,
            idDoLivro: livro.id,
            alternativas: {
                create: {
                    alternativaA:
                        'Servir como mero pano de fundo decorativo, sem qualquer relação com os sentimentos ou ações das personagens.',
                    alternativaAEn:
                        'Serving as a mere decorative backdrop, without any relation to the feelings or actions of the characters. ',
                    alternativaB:
                        'Manifestar uma natureza hostil e puramente destrutiva, que reflete o pessimismo do autor em relação ao futuro do Brasil.  ',
                    alternativaBEn:
                        'Manifesting a hostile and purely destructive nature, which reflects the author’s pessimism regarding the future of Brazil. ',
                    alternativaC:
                        ' Espelhar e amplificar os conflitos humanos, funcionando como uma "natureza cúmplice" que se agita nos momentos de drama e se acalma nos momentos de idílio. ',
                    alternativaCEn:
                        'Mirroring and amplifying human conflicts, functioning as a "sympathetic nature" (natureza cúmplice) that grows turbulent in moments of drama and calms down in moments of idyll. ',
                    alternativaD:
                        'Apresentar uma visão puramente científica e geográfica do território fluminense.',
                    alternativaDEn:
                        'Presenting a purely scientific and geographical view of the territory of Rio de Janeiro.',
                    respostaCorreta: 'C',
                    justificativa:
                        'A natureza no Romantismo participa emocionalmente da narrativa. Em O Guarani, ela acompanha os conflitos, a tensão e os momentos de harmonia das personagens.',
                    justificativaEn:
                        'In Romanticism, nature plays an emotional role in the narrative. In O Guarani, it accompanies the conflicts, tension, and moments of harmony of the characters.',
                },
            },
        },
        {
            enunciado:
                'O desfecho de O Guarani apresenta uma cena célebre em que Peri e Cecília se veem isolados em meio a uma violenta inundação, flutuando sobre a copa de uma palmeira arrancada pelas águas. Essa famosa cena final carrega um forte simbolismo que representa: ',
            enunciadoEn:
                'The ending of O Guarani features a famous scene in which Peri and Cecília find themselves isolated in the middle of a violent flood, floating on the canopy of a palm tree torn apart by the waters. This famous final scene carries a strong symbolism that represents: ',
            vestibular: 'PUC-PR',
            anoVestibular: 2018,
            idDoLivro: livro.id,
            alternativas: {
                create: {
                    alternativaA:
                        'O fracasso total do projeto colonizador português e o retorno inevitável do Brasil ao estado selvagem.',
                    alternativaAEn:
                        'The total failure of the Portuguese colonizing project and the inevitable return of Brazil to a wild state.',
                    alternativaB:
                        ' Uma alegoria mística de um "novo mundo", onde Peri e Cecília figuram como uma espécie de Adão e Eva brasileiros, simbolizando a fusão das raças. ',
                    alternativaBEn:
                        'A mystical allegory of a "new world", where Peri and Cecília figure as a sort of Brazilian Adam and Eve, symbolizing the fusion of races.',
                    alternativaC:
                        'A punição divina contra os excessos cometidos por Dom Antônio de Mariz e seus homens na exploração da terra.',
                    alternativaCEn:
                        ' Divine punishment against the excesses committed by Dom Antônio de Mariz and his men in exploiting the land. ',
                    alternativaD:
                        'Um recurso puramente melodramático de entretenimento, sem qualquer intenção política ou ideológica por parte de José de Alencar.',
                    alternativaDEn:
                        'A purely melodramatic entertainment device, without any political or ideological intention on the part of José de Alencar.',
                    respostaCorreta: 'B',
                    justificativa:
                        'A cena final possui forte simbolismo mítico e nacionalista. Peri e Cecília funcionam como uma espécie de “Adão e Eva brasileiros”, associados à origem simbólica do povo brasileiro.',
                    justificativaEn:
                        'The final scene possesses strong mythical and nationalistic symbolism. Peri and Cecília function as a kind of "Brazilian Adam and Eve," associated with the symbolic origin of the Brazilian people.',
                },
            },
        },
        {
            enunciado:
                'Considerando a relação de Peri com a família de Dom Antônio de Mariz, em especial com Cecília, é correto afirmar que sua submissão e servidão voluntária:  ',
            enunciadoEn:
                'Considering Peri’s relationship with Dom Antônio de Mariz’s family, especially with Cecília, it is correct to state that his submission and voluntary servitude:',
            vestibular: 'FUVEST',
            anoVestibular: 2017,
            idDoLivro: livro.id,
            alternativas: {
                create: {
                    alternativaA:
                        'Entram em contradição com o projeto nacionalista do Romantismo, que exigia um índio totalmente rebelde e hostil ao homem branco.',
                    alternativaAEn:
                        'Contradict the nationalist project of Romanticism, which demanded an indigenous person who was completely rebellious and hostile to the white man. ',
                    alternativaB:
                        '  Refletem a mentalidade da elite imperial brasileira do século XIX, que idealizava o indígena desde que este se mostrasse dócil, leal e integrado à ordem patriarcal e cristã. ',
                    alternativaBEn:
                        ' Reflect the mindset of the 19th-century Brazilian imperial elite, who idealized the indigenous person as long as he proved to be docile, loyal, and integrated into the patriarchal and Christian order. ',
                    alternativaC:
                        'São fruto de um acordo financeiro e comercial estabelecido entre o chefe da tribo dos Goitacases e o fidalgo português. ',
                    alternativaCEn:
                        'Are the result of a financial and commercial agreement established between the chief of the Goitacás tribe and the Portuguese nobleman. ',
                    alternativaD:
                        'Demonstram a superioridade militar dos colonos, que conseguiram subjugar Peri por meio da força das armas de fogo.',
                    alternativaDEn:
                        'Demonstrate the military superiority of the colonists, who managed to subjugate Peri through the force of firearms.',
                    respostaCorreta: 'B',
                    justificativa:
                        'A submissão de Peri reflete a visão da elite imperial do século XIX: o indígena era valorizado quando aparecia como fiel, dócil, cristianizado e integrado à sociedade patriarcal portuguesa.',
                    justificativaEn:
                        'Peri’s submission reflects the vision of the 19th-century imperial elite: indigenous people were valued when they appeared faithful, docile, Christianized, and integrated into Portuguese patriarchal society.',
                },
            },
        },
        {
            enunciado:
                '“Muitos acontecimentos se tinham passado entre eles nestes dois dias; há circunstâncias em que os sentimentos marcham com uma rapidez extraordinária, e devoram meses e anos num só minuto. A reflexão do narrador revela: ',
            enunciadoEn:
                'Many events had taken place between them during these two days; there are circumstances in which feelings move with extraordinary speed and consume months and years in a single minute. The narrator’s reflection reveals:',
            vestibular: 'VUNESP ',
            anoVestibular: 2017,
            idDoLivro: livro.id,
            alternativas: {
                create: {
                    alternativaA: 'A superioridade da razão sobre os sentimentos.',
                    alternativaAEn: 'The superiority of reason over feelings. ',
                    alternativaB: 'O caráter ilusório das paixões humanas.',
                    alternativaBEn: 'The illusory nature of human passions.',
                    alternativaC: 'A percepção subjetiva da passagem do tempo.',
                    alternativaCEn: 'The subjective perception of the passage of time.',
                    alternativaD: 'A crítica romântica ao casamento.',
                    alternativaDEn: 'The romantic criticism of marriage.',
                    respostaCorreta: 'C',
                    justificativa:
                        'O trecho mostra que o tempo é percebido de forma diferente conforme os sentimentos das personagens. Em momentos intensos, parece que muito tempo passou rapidamente, revelando uma visão subjetiva da passagem do tempo.',
                    justificativaEn:
                        'The excerpt shows that time is perceived differently depending on the characters feelings. In intense moments, it seems that a lot of time has passed quickly, revealing a subjective view of the passage of time.',
                },
            },
        },
        {
            enunciado:
                'O indianismo romântico presente em O Guarani tinha como principal objetivo:',
            enunciadoEn: 'The Romantic Indianism present in O Guarani had as its main objective:',
            vestibular: 'FUVEST ',
            anoVestibular: 2016,
            idDoLivro: livro.id,
            alternativas: {
                create: {
                    alternativaA: 'Denunciar a exploração dos indígenas.',
                    alternativaAEn: 'To denounce the exploitation of Indigenous people. ',
                    alternativaB: 'Criar um herói nacional brasileiro.',
                    alternativaBEn: 'To create a Brazilian national hero.',
                    alternativaC: 'Aproximar a literatura brasileira do Naturalismo.',
                    alternativaCEn: 'To bring Brazilian literature closer to Naturalism.',
                    alternativaD: 'Defender exclusivamente costumes europeus.',
                    alternativaDEn: 'To defend exclusively European customs.',
                    respostaCorreta: 'B',
                    justificativa:
                        'No Romantismo brasileiro, o indígena foi idealizado como símbolo da nação. Peri representa coragem, honra e pureza, funcionando como um herói nacional brasileiro.',
                    justificativaEn:
                        'In Brazilian Romanticism, the indigenous person was idealized as a symbol of the nation. Peri represents courage, honor, and purity, functioning as a Brazilian national hero.',
                },
            },
        },
        {
            enunciado: 'A personagem Peri representa:',
            enunciadoEn: 'The character Peri represents:',
            vestibular: 'UNESP ',
            anoVestibular: 2015,
            idDoLivro: livro.id,
            alternativas: {
                create: {
                    alternativaA: 'O anti-herói urbano do século XIX.',
                    alternativaAEn: 'The urban antihero of the 19th century. ',
                    alternativaB: 'A decadência dos valores indígenas.',
                    alternativaBEn: 'The decline of Indigenous values.',
                    alternativaC: 'A idealização do indígena brasileiro.',
                    alternativaCEn: 'The idealization of the Brazilian Indigenous person.',
                    alternativaD: 'O racionalismo científico europeu.',
                    alternativaDEn: 'European scientific rationalism.',
                    respostaCorreta: 'C',
                    justificativa:
                        'Peri é retratado como forte, leal, corajoso e moralmente perfeito. Essa construção exageradamente positiva é típica da idealização romântica do indígena.',
                    justificativaEn:
                        'Peri is portrayed as strong, loyal, courageous, and morally perfect. This exaggeratedly positive portrayal is typical of the romantic idealization of indigenous people.',
                },
            },
        },
        {
            enunciado: 'A natureza, no romance indianista romântico de José de Alencar, aparece:',
            enunciadoEn: 'Nature, in the Romantic Indianist novel by José de Alencar, appears:',
            vestibular: 'FUVEST ',
            anoVestibular: 2017,
            idDoLivro: livro.id,
            alternativas: {
                create: {
                    alternativaA: 'Apenas como elemento de fundo sem importância.',
                    alternativaAEn: 'Only as an unimportant background element. ',
                    alternativaB: 'Descrita de forma objetiva e científica.',
                    alternativaBEn: 'Described in an objective and scientific way.',
                    alternativaC: 'Associada aos sentimentos e à valorização nacional.',
                    alternativaCEn: 'Associated with feelings and national valorization.',
                    alternativaD: ' Como crítica ao atraso econômico brasileiro.',
                    alternativaDEn: 'As criticism of Brazilian economic backwardness.',
                    respostaCorreta: 'C',
                    justificativa:
                        'No Romantismo, a natureza tem forte valor emocional e nacionalista. Em O Guarani, ela reflete os sentimentos das personagens e ajuda a valorizar o Brasil e sua paisagem.',
                    justificativaEn:
                        'In Romanticism, nature holds strong emotional and nationalistic value. In O Guarani, it reflects the characters feelings and helps to highlight Brazil and its landscape.',
                },
            },
        },
        {
            enunciado:
                '“Ele amava, ou julgava ainda amar Cecília; prometera a seu pai desposá-la…” A forma verbal “prometera” indica:',
            enunciadoEn:
                '"He loved, or thought he still loved Cecília; he had promised his father to become her husband…" The verb form “had promised” indicates:',
            vestibular: 'VUNESP',
            anoVestibular: 2017,
            idDoLivro: livro.id,
            alternativas: {
                create: {
                    alternativaA: 'Uma ação posterior.',
                    alternativaAEn: 'A later action. ',
                    alternativaB: 'Uma ação simultânea.',
                    alternativaBEn: 'A simultaneous action.',
                    alternativaC: 'Uma hipótese futura.',
                    alternativaCEn: 'A future hypothesis.',
                    alternativaD: 'Uma ação anterior a outra ação já passada.',
                    alternativaDEn: 'An action prior to another action already in the past.',
                    respostaCorreta: 'D',
                    justificativa:
                        'O verbo “prometer” está no pretérito mais-que-perfeito, indicando uma ação que aconteceu antes de outra ação também passada. Primeiro ele prometeu ao pai; depois ocorreram os outros fatos narrados.',
                    justificativaEn:
                        'The verb "prometer" is in the pluperfect tense, indicating an action that happened before another past action. First he promised his father; then the other narrated events occurred.',
                },
            },
        },
        {
            enunciado:
                'A obra indianista de José de Alencar contribuiu para o Romantismo brasileiro porque:',
            enunciadoEn:
                'The Indianist work of José de Alencar contributed to Brazilian Romanticism because it:',
            vestibular: 'FUVEST',
            anoVestibular: 2019,
            idDoLivro: livro.id,
            alternativas: {
                create: {
                    alternativaA: 'Rejeitou elementos da cultura nacional.',
                    alternativaAEn: 'Rejected elements of national culture. ',
                    alternativaB: 'Valorizou o indígena como símbolo da nacionalidade.',
                    alternativaBEn: 'Valued the Indigenous person as a symbol of nationality.',
                    alternativaC: 'Aproximou-se exclusivamente do modelo clássico europeu.',
                    alternativaCEn: 'Approached exclusively the European classical model.',
                    alternativaD: ' Defendeu a objetividade científica.',
                    alternativaDEn: 'Defended scientific objectivity.',
                    respostaCorreta: 'B',
                    justificativa:
                        'José de Alencar ajudou a construir uma identidade nacional na literatura brasileira, usando o indígena como símbolo do país e valorizando elementos brasileiros.',
                    justificativaEn:
                        'José de Alencar helped build a national identity in Brazilian literature, using indigenous people as symbols of the country and valuing Brazilian elements.',
                },
            },
        },
        {
            enunciado: 'A relação entre Peri e Cecília simboliza:',
            enunciadoEn: 'The relationship between Peri and Cecília symbolizes:',
            vestibular: 'UNESP',
            anoVestibular: 2018,
            idDoLivro: livro.id,
            alternativas: {
                create: {
                    alternativaA: 'O conflito político entre colônia e metrópole.',
                    alternativaAEn: 'The political conflict between colony and metropolis. ',
                    alternativaB: 'A crítica ao sentimentalismo romântico.',
                    alternativaBEn: 'The criticism of Romantic sentimentalism.',
                    alternativaC: 'A união idealizada entre natureza e civilização.',
                    alternativaCEn: 'The idealized union between nature and civilization.',
                    alternativaD: 'A valorização do materialismo burguês.',
                    alternativaDEn: 'The valorization of bourgeois materialism.',
                    respostaCorreta: 'C',
                    justificativa:
                        'Peri representa a natureza e o indígena brasileiro; Cecília representa a civilização europeia. O romance entre os dois simboliza uma união harmoniosa e idealizada entre esses dois mundos.',
                    justificativaEn:
                        'Peri represents nature and the Brazilian indigenous people; Cecília represents European civilization. The romance between the two symbolizes a harmonious and idealized union between these two worlds.',
                },
            },
        },
    ];

    for (const questao of questoesData) {
        await prisma.questoes.create({
            data: questao,
        });
    }

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
                        nome: 'Nathalia Reis',
                        idade: 18,
                        curso: 'Desenvolvimento de Sistemas',
                        cursoEn: 'Systems Development',
                        descricao: 'Responsável pelo projeto.',
                        descricaoEn: 'Responsible for the project.',
                        cargo: 'PO',
                        cargoEn: 'Product Owner',
                        avaliacaoDaObra: 5,
                        diasDeLeitura: 5,
                        opiniao: '...',
                        opiniaoEn: '',
                        fotoURL:
                            'https://i.pinimg.com/736x/0e/53/de/0e53dee842f7e54849b82442685ac980.jpg',
                    },
                    {
                        nome: 'Victor Boehm',
                        idade: 17,
                        curso: 'Desenvolvimento de Sistemas',
                        cursoEn: 'Systems Development',
                        descricao: '...',
                        descricaoEn: '...',
                        cargo: 'Desenvolvedor',
                        cargoEn: 'Developer',
                        avaliacaoDaObra: 5,
                        diasDeLeitura: 9,
                        opiniao: '...',
                        opiniaoEn: '',
                        fotoURL:
                            'https://mail.google.com/mail/u/0?ui=2&ik=eae726dbfa&attid=0.1&permmsgid=msg-f:1866158471246422515&th=19e5ed3e053aa1f3&view=fimg&fur=ip&permmsgid=msg-f:1866158471246422515&sz=s0-l75-ft&attbid=ANGjdJ-mF3ltITTvGEUk4X8rmAqsWOhZl93_uHFFqbFHqHty_gcFCsTgIvit3bvOMyyEjR0m6DbmdBn-3YIdokstFDVzPKOnab3ELpQbo_Wy89wqRsyukGbxfbs5aEA&disp=emb&realattid=C508F893-77CD-4280-936B-6A4BD403DD23&zw',
                    },
                    {
                        nome: 'Matheus Leitão',
                        idade: 17,
                        curso: 'Desenvolvimento de Sistemas',
                        cursoEn: 'Systems Development',
                        descricao:
                            'Gosta de Tecnologia e programação back-end, gosta de ajudar as pessoas do grupo e sempre tem boas ideias para o projeto.',
                        descricaoEn:
                            'He likes technology and back-end programming, likes to help people in the group and always has good ideas for the project.',
                        cargo: 'Desenvolvedor',
                        cargoEn: 'Developer',
                        avaliacaoDaObra: 3,
                        diasDeLeitura: 28,
                        opiniao:
                            'O livro narra a história de Peri, um indígena que vive para proteger Cecília em meio a conflitos entre colonos e tribos inimigas. A trama é uma mistura de romance com aventura épica, cheia de atos heroicos e um final explosivo. O enredo é interessante, mas a linguagem difícil e as descrições excessivas tornam a leitura bem cansativa e lenta.',
                        opiniaoEn: '',
                        fotoURL: 'https://avatars.githubusercontent.com/u/197296659?v=4',
                    },
                    {
                        nome: 'Pedro Brito',
                        idade: 17,
                        curso: 'Desenvolvimento de Sistemas',
                        cursoEn: 'Systems Development',
                        descricao: '...',
                        descricaoEn: '...',
                        cargo: 'Desenvolvedor',
                        cargoEn: 'Developer',
                        avaliacaoDaObra: 5,
                        diasDeLeitura: 5,
                        opiniao: '...',
                        opiniaoEn: '...',
                        fotoURL:
                            'https://mail.google.com/mail/u/0?ui=2&ik=eae726dbfa&attid=0.1&permmsgid=msg-f:1866161525897598446&th=19e5f0053ca095ee&view=fimg&fur=ip&permmsgid=msg-f:1866161525897598446&sz=s0-l75-ft&attbid=ANGjdJ8Z_HhTgIB2usAdxipogCpePVEN7QXTqr7ye8onnPrHkUEs5s10qz70gYN29ULl3g9Up-CzrfuZYdDf0rb0bHubsjrnHZDo1JThvtqfQ4wCrawCbq-ln3K-lB8&disp=emb&realattid=19e5effd4c6b5d973be1&zw',
                    },
                    {
                        nome: 'Arthur Ferian',
                        idade: 17,
                        curso: 'Desenvolvimento de Sistemas',
                        cursoEn: 'Systems Development',
                        descricao:
                            'Gosta de tecnologia e desenvolvimento. Sempre ajuda na organização do grupo e nas discussões sobre a obra.',
                        descricaoEn:
                            'He enjoys technology and development. He always helps with group organization and discussions about the project.',
                        cargo: 'Desenvolvedor',
                        cargoEn: 'Developer',
                        avaliacaoDaObra: 3,
                        diasDeLeitura: 30,
                        opiniao:
                            'O Guarani é uma obra interessante porque mistura romance, aventura e elementos da cultura indígena brasileira. A história de Peri mostra coragem, lealdade e amor, enquanto também apresenta costumes e paisagens do Brasil da época. Apesar da linguagem ser um pouco antiga, o livro consegue prender a atenção em vários momentos e é importante para entender o romantismo brasileiro.',
                        opiniaoEn:
                            "The Guarani is an interesting work because it blends romance, adventure, and elements of Brazilian indigenous culture. Peri's story shows courage, loyalty, and love, while also presenting the customs and landscapes of Brazil at that time. Although the language is somewhat archaic, the book manages to hold the reader's attention at various points and is important for understanding Brazilian Romanticism.",
                        fotoURL:
                            'https://chat.google.com/u/0/api/get_attachment_url?url_type=FIFE_URL&content_type=image%2Fjpeg&attachment_token=AOo0EEXL9jfahFXjnDmbkGpYAbUC4oZcEpT78d13I28GCpfLAIgQyBsn7JpgD4wPOuUJCNR8yYUkSurJd6BucbGgz3OP04c%2FpCM47DG5YTav8vLHqINaZQOy1HNq%2FyxrJKaEDFho9ypvjWLwPGJDv%2BmbZNzVNkNRN%2Fqo3b28IzHCygkOje%2FdQX6YZ8k%2B%2BPr32zMN4%2FxNMvVt4q6%2F168diaAtEEgwil8g7Fo7lUwMC0u9WmR0FTl%2BVuLc50lQoYdo2cR5eqmT5YH8%2BQMulzV51vb5tXF14GYR9RjBjS5hV%2FkobviDGXM2l9muTvvqh1mQv9tccwR4epC0XOhwcPQYR02q0jutQeXqyz0OcGOXxUqc5i1lg3SFlgoQB3BNK%2Bcp%2F1Y06r5edIfZbU4sksuyFrXwX5wZ7rNkPwpXfZV%2BTKY2iU5irTPvUwrpfkiuxdt2IThE0RE6Kqs74TT%2Bc12P%2FvJNC0DOCcNb488u7Pmyo%2FnOzFcc%2Bv4VnJvl55WQsiq9ypfHm7fXaZiQtfcSfDTiStRLhJCELxShajDq%2FBYn7velOe1KciyT8x4w6o8KnqNFkXJzu6wVAnylPxIRtFAN9OUUdJ%2BwEow%3D&allow_caching=true&sz=w1920-h826-rw&auditContext=forDisplay',
                    },
                    {
                        nome: 'Nicolas Silva',
                        idade: 16,
                        curso: 'Desenvolvimento de Sistemas',
                        cursoEn: 'Systems Development',
                        descricao:
                            'Tem interesse por livros investigativos e científicos, apesar da diferença de interesse se empenhou na leitura e compreensão da obra. Mostra sempre sua proatividade e vontade de ajudar o grupo a alcançar os objetivos.',
                        descricaoEn:
                            'He is interested in investigative and scientific books, and despite the difference in interests, he dedicated himself to reading and understanding the work. He always shows his proactivity and willingness to help the group achieve its goals.',
                        cargo: 'Desenvolvedor',
                        cargoEn: 'Developer',
                        avaliacaoDaObra: 3,
                        diasDeLeitura: 9,
                        opiniao:
                            'Como meu interesse principal é voltado para livros científicos e investigativos, ler O Guarani foi um grande desafio fora da minha zona de conforto. Avalio a obra com nota 3. Embora o estilo descritivo e idealizado do Romantismo seja bem diferente do que costumo ler, a trama me envolveu ao longo desses 9 dias pelos seus elementos de ação, mistério e conflito. Foi um excelente exercício de leitura que me ajudou a exercitar a análise crítica e a compreender um dos maiores clássicos da nossa literatura.',
                        opiniaoEn:
                            'Since my main interests lie in scientific and investigative books, reading "O Guarani" was a challenge outside my comfort zone. I rate it 3.5/5. Although the idealized and descriptive style of Brazilian Romanticism is very different from my usual taste, the plot kept me engaged over these 9 days with its elements of action and conflict. It was a great reading exercise that helped me improve my critical analysis and understand a major classic of our literature.',
                        fotoURL:
                            'https://chat.google.com/u/0/api/get_attachment_url?url_type=FIFE_URL&content_type=image%2Fpng&attachment_token=AOo0EEXUl4KSN67RHRNNNuoVTnTkp4VXXaxcjo6ymd4gW9XTIqHPrlCk8FgajAC9oR7TLfh8r0h8HZECmQVUgeNLxxEOvdH0EKKGecaK7HdSSx6HMfTAmjwiph89BkUurHDrHio993F08dpOADiR%2Bia8MsP5lKFQL8ZSD%2FzBtfDrDf0F0L1KsAoRXg%2FPL5Ntyc3WCDsXGS%2Bdi1kAjEAxqyTuFFRb7FK%2BOO3c9f%2FCKphpin%2BazXQx2aqY2Z5%2F2CPveXNfwhYUpWlLoF2ZAN9BCtHF1yJ4b1spDzqE9EVmL%2FX5hG%2FpARemyqByQX6TQ7uyUeSVERzeIssCLXr7%2BNOSwtx3U%2Bc2u5E5PQqJsixbXjjvCcpHNKrNJHpCmxMKQ1pIs7I0JKPYtbSjGCa%2F%2Fjqaz1UQSveTVGVxJLYYsfWPfJ8BDkCvi7%2FuOCMIYBf0qE00WuUfcbsP3NsmaG43PplDZCKsgiZiiwLdY21vMoObHEOV3AIlNp0TTJ1FNiY%2B5xBm185rVEam2VsJPw%2FWgYXdfoXP1d4jDZX9pXl92ShrGGnSHtJiR3BdjrWXhy%2Bsu3clBtn39DReAPxtYRypcwc5o%2BQ%3D&allow_caching=true&sz=w1920-h826-rw&auditContext=forDisplay',
                    },
                    {
                        nome: 'Isadora Murback',
                        idade: 16,
                        curso: 'Eletro Eletrônica',
                        cursoEn: 'Electronics Engineering',
                        descricao:
                            'Gosta de livros de romance e científicos, apesar da linguagem mais formal se empenhou na leitura e compreendeu a obra. Mostra a vontade de ajudar o grupo e pesquisar sobre o livro',
                        descricaoEn:
                            'She enjoys romance and science fiction books, and despite the more formal language, she put effort into reading and understanding the work. She shows a willingness to help the group and research the book.',
                        cargo: 'Gestor de conteúdo',
                        cargoEn: 'Content Manager',
                        avaliacaoDaObra: 4,
                        diasDeLeitura: 15,
                        opiniao:
                            'Na minha opinião, o livro foi interessante, mas um pouco difícil de ler por causa da linguagem antiga. Gostei do personagem Peri porque ele é muito leal e faz de tudo para proteger a Ceci. Mesmo sendo cansativo em algumas partes, o livro é importante para entender a literatura brasileira e a forma como os indígenas eram vistos naquela época.',
                        opiniaoEn:
                            'In my opinion, the book was interesting, but a bit difficult to read due to the old language. I liked the character Peri because he is very loyal and does everything to protect Ceci. Even though it was tiring at times, the book is important for understanding Brazilian literature and the way indigenous people were viewed at that time.',
                        fotoURL:
                            'https://mail.google.com/mail/u/0?ui=2&ik=eae726dbfa&attid=0.1&permmsgid=msg-f:1866163418499213726&th=19e5f1bde479699e&view=fimg&fur=ip&permmsgid=msg-f:1866163418499213726&sz=s0-l75-ft&attbid=ANGjdJ_spez1s0xY6CllzScb97PVh_wAuAdRct50ZwiFJuvlg8WlCKNtf1QVciPLFYi0VXPMNI78ha_1Mr6ArpmysthNrWNu5EB9o94P9rXAVfPz_1jdQo47ooO9ThI&disp=emb&realattid=70D0CB96-D43C-48F2-9BD9-9DE862B38F7F&zw',
                    },
                    {
                        nome: 'Gustavo Durães',
                        idade: 17,
                        curso: 'Eletro Eletrônica',
                        cursoEn: 'Electronics Engineering',
                        descricao: '...',
                        descricaoEn: '...',
                        cargo: 'Gestor de conteúdo',
                        cargoEn: 'Content Manager',
                        avaliacaoDaObra: 3,
                        diasDeLeitura: 44,
                        opiniao: '...',
                        opiniaoEn: '',
                        fotoURL:
                            'https://mail.google.com/mail/u/0?ui=2&ik=eae726dbfa&attid=0.1&permmsgid=msg-f:1866165347760102336&th=19e5f37f15625bc0&view=fimg&fur=ip&permmsgid=msg-f:1866165347760102336&sz=s0-l75-ft&attbid=ANGjdJ9v1xgakCTLNJDHfxOZrTFDTc0-VHmw4wK-c3ls1KG1VNbTEXmdx--crZ3c7rFHE-NZWY5aztFvO0rcsx_T_Ns13vtySzNqYAlDflIQOCScThqdtzQihf79SvI&disp=emb&realattid=24E4F2C0-85B0-475E-B119-7392D5832EEB&zw',
                    },
                    {
                        nome: 'Henry Araújo',
                        idade: 17,
                        curso: 'Mecânica',
                        cursoEn: 'Mechanical Engineering',
                        descricao: '...',
                        descricaoEn: '...',
                        cargo: 'Gestor de conteúdo',
                        cargoEn: 'Content Manager',
                        avaliacaoDaObra: 5,
                        diasDeLeitura: 5,
                        opiniao: '...',
                        opiniaoEn: '',
                        fotoURL:
                            'https://mail.google.com/mail/u/0?ui=2&ik=eae726dbfa&attid=0.1&permmsgid=msg-f:1866162008792123547&th=19e5f075ab62489b&view=fimg&fur=ip&permmsgid=msg-f:1866162008792123547&sz=s0-l75-ft&attbid=ANGjdJ9-se9wr7r7E0eBDJZOx7bsjYdS6oGDx06wCUBTclTiRq6CMcNtBJ8LUBs9kpbrZngVFQWSHQQ0QHDlaAIAz7JqsFNwAnPaa2diIBH1Vgp19LSSr5fqzIUIHT0&disp=emb&realattid=3D3223AC-3D82-4B43-9407-57FB00D54993&zw',
                    },
                    {
                        nome: 'Enzo Vecchi',
                        idade: 17,
                        curso: 'Mecânica',
                        cursoEn: 'Mechanical Engineering',
                        descricao: ' Um entusiasta de música e arte que aprecia o movimento Romancista.',
                        descricaoEn: 'I am an musician and art enthusiast who appreciates the Romantic movement.',
                        cargo: 'Gestor de conteúdo',
                        cargoEn: 'Content Manager',
                        avaliacaoDaObra: 5,
                        diasDeLeitura: 5,
                        opiniao: 'Na minha opinião o livro O Guarani é uma obra literária muito característica do período romantista. Ela retrata diversos elementos nacionais de forma romântica e melancólica. O livro narra a paixão entre o indígena Peri e a jovem nobre portuguêsa, Cecília ou Ceci. Tudo isso em meio a conflitos coloniais e tribais. O livro consegue te deixar conectado à história do início ao fim e retrata muito bem o Brasil do século XVII.',
                        opiniaoEn: 'In my opinion, the book O Guarani is a literary work that strongly represents the Romantic period. It portrays many national elements in a romantic and melancholic way. The book tells the story of the love between the indigenous man Peri and the young Portuguese noblewoman Cecília, also called Ceci, amid colonial and tribal conflicts. The story keeps the reader connected from beginning to end and portrays 17th-century Brazil very well.',
                        fotoURL:
                            'https://mail.google.com/mail/u/0?ui=2&ik=eae726dbfa&attid=0.1&permmsgid=msg-f:1866162277292186008&th=19e5f0b42f3c1998&view=fimg&fur=ip&permmsgid=msg-f:1866162277292186008&sz=s0-l75-ft&attbid=ANGjdJ_dewHzHkZgSkfQtv6Qah_GcqVOiOOjE_OJHeGaz-HlGfnn2-cbeh1YG6A-YgwGQTz2tOmSRrprHYUbbE1GzjyvJKhInc6XEXfUE5Yidr_eeR1ekffgSs6Ybvs&disp=emb&realattid=E87194D3-55CE-4096-AD8C-C33F638A459C&zw',
                    },
                    {
                        nome: 'Matheus Duarte',
                        idade: 16,
                        curso: 'Mecânica',
                        cursoEn: 'Mechanical Engineering',
                        descricao: '...',
                        descricaoEn: '...',
                        cargo: 'Gestor de conteúdo',
                        cargoEn: 'Content Manager',
                        avaliacaoDaObra: 4,
                        diasDeLeitura: 30,
                        opiniao: '...',
                        opiniaoEn: '',
                        fotoURL:
                            'https://mail.google.com/mail/u/0?ui=2&ik=eae726dbfa&attid=0.1&permmsgid=msg-f:1866162928853120135&th=19e5f14be34af487&view=fimg&fur=ip&permmsgid=msg-f:1866162928853120135&sz=s0-l75-ft&attbid=ANGjdJ9M45OPDF7VwV_Y9-aT0qO2utIldmCCR797R8PMD2GN4Vx70Tt2510_OpF-TbI0u_JH-hgMruVqpK_SVyKenIiUiEIcfbZeauTbYrU93Q7lFAoqLFWqZuKi8ZA&disp=emb&realattid=EEADC39A-E8E8-485D-B220-21266BD427A4&zw',
                    },
                ],
            },
        },
    });

    await prisma.dicasDeVestibular.createMany({
        data: [
            {
                titulo: 'Leitura ativa',
                tituloEn: 'Active reading',
                dica: 'Sublinhar palavras-chave e anotar ideias principais melhora a interpretação e economiza tempo na prova.',
                dicaEn: 'Highlighting keywords and noting main ideas improves comprehension and saves time during exams.',
            },
            {
                titulo: 'Treino com provas antigas',
                tituloEn: 'Practice with past exams',
                dica: 'Resolver vestibulares anteriores ajuda a entender o estilo das questões e a administrar melhor o tempo.',
                dicaEn: 'Solving previous entrance exams helps you understand question styles and manage time better.',
            },
            {
                titulo: 'Interpretação antes da decoreba',
                tituloEn: 'Interpretation before memorization',
                dica: 'Muitas provas valorizam a capacidade de interpretar textos e gráficos mais do que decorar conteúdos.',
                dicaEn: 'Many exams value the ability to interpret texts and graphs more than memorizing content.',
            },
            {
                titulo: 'Redação faz diferença',
                tituloEn: 'Essay writing makes a difference',
                dica: 'Treinar redação frequentemente melhora argumentação, repertório e nota final.',
                dicaEn: 'Practicing essays frequently improves argumentation, knowledge repertoire, and final scores.',
            },
            {
                titulo: 'Erros também ensinam',
                tituloEn: 'Mistakes also teach',
                dica: 'Revisar questões erradas ajuda a identificar padrões de distração e falhas de interpretação.',
                dicaEn: 'Reviewing incorrect answers helps identify distraction patterns and interpretation mistakes.',
            },
            {
                titulo: 'Concentração é habilidade',
                tituloEn: 'Concentration is a skill',
                dica: 'Ler sem distrações diariamente fortalece foco e resistência mental para provas longas.',
                dicaEn: 'Reading daily without distractions strengthens focus and mental endurance for long exams.',
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
