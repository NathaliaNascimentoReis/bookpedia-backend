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
            fotoURL:
                'https://academiacearensedeletras.org.br/wp-content/uploads/2020/11/JOSE-DE-ALENCAR.jpg',
        },
    });

    const vocabularioItems = [
        {
            palavra: 'Cataclisma: ',
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
            palavraEn: 'Knoll',
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
            palavra: 'Resvalar',
            palavraEn: 'Slip',
            significado: 'Escorregar, deslize',
            significadoEn: 'To slide or slip',
        },
        {
            palavra: 'Indômito',
            palavraEn: 'Indomitable',
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
            palavraEn: 'Slabstone',
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
            palavraEn: 'Girdded',
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
            palavraEn: 'Paraffin',
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
            palavraEn: 'Boredom',
            significado: 'Mal-estar, tédio, algo maçante ou monótono',
            significadoEn: 'Boredom, discomfort, something tedious or monotonous',
        },
        {
            palavra: 'Anexim',
            palavraEn: 'Attachment',
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
            palavraEn: 'Clavine',
            significado: 'Pequena clava',
            significadoEn: 'A small mace or club',
        },
        {
            palavra: 'Dicastes',
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
        vocabularioItems.map((item) => prisma.vocabulario.create({ data: item })),
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
                fotoUrl: 'https://i.pinimg.com/736x/a1/5f/b3/a15fb3a5c61b96e5ab6c0eecf1d44f3f.jpg',
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
                fotoUrl: 'https://i.pinimg.com/736x/16/ce/3e/16ce3e81eca5809e2609ceeb53056b31.jpg',
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

    await prisma.questoes.createMany({
        data: [
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
                enunciadoEn:
                    'The Romantic Indianism present in O Guarani had as its main objective:',
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
                enunciado:
                    'A natureza, no romance indianista romântico de José de Alencar, aparece:',
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
        ],
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
                        cargoEn: 'Product Owner',
                        avaliacaoDaObra: 5,
                        diasDeLeitura: 5,
                        opiniao: '...',
                        opiniaoEn: ''
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
                        opiniaoEn: ''
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
                        opiniaoEn: ''
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
                    },
                    {
                        nome: 'Nicolas',
                        idade: 16,
                        curso: 'Desenvolvimento de Sistemas',
                        cursoEn: 'Systems Development',
                        descricao:
                            'Tem interesse por livros investigativos e científicos, apesar da diferença de interesse se empenhou na leitura e compreensão da obra. Mostra sempre sua proatividade e vontade de ajudar o grupo a alcançar os objetivos.',
                        descricaoEn:
                            'He is interested in investigative and scientific books, and despite the difference in interests, he dedicated himself to reading and understanding the work. He always shows his proactivity and willingness to help the group achieve its goals.',
                        cargo: 'Designer',
                        cargoEn: 'Designer',
                        avaliacaoDaObra: 3,
                        diasDeLeitura: 9,
                        opiniao:
                            'Como meu interesse principal é voltado para livros científicos e investigativos, ler O Guarani foi um grande desafio fora da minha zona de conforto. Avalio a obra com nota 3. Embora o estilo descritivo e idealizado do Romantismo seja bem diferente do que costumo ler, a trama me envolveu ao longo desses 9 dias pelos seus elementos de ação, mistério e conflito. Foi um excelente exercício de leitura que me ajudou a exercitar a análise crítica e a compreender um dos maiores clássicos da nossa literatura.',
                        opiniaoEn:
                            'Since my main interests lie in scientific and investigative books, reading "O Guarani" was a challenge outside my comfort zone. I rate it 3.5/5. Although the idealized and descriptive style of Brazilian Romanticism is very different from my usual taste, the plot kept me engaged over these 9 days with its elements of action and conflict. It was a great reading exercise that helped me improve my critical analysis and understand a major classic of our literature.',
                    },
                    {
                        nome: 'Isadora',
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
                        opiniaoEn: ''
                    },
                    {
                        nome: 'Henry',
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
                        opiniaoEn: ''
                    },
                    {
                        nome: 'Enzo Vecchi',
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
                        opiniaoEn: ''
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
                        opiniaoEn: ''
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
