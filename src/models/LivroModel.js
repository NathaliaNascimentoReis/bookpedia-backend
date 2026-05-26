// Importa a instância do Prisma Client para executar operações no banco de dados.
import prisma from '../lib/services/prismaClient.js';

export default class LivroModel {
    constructor({
        id = null,
        tituloDoLivro,
        tituloDoLivroEn,
        descricao,
        descricaoEn,
        contextoHistorico,
        contextoHistoricoEn,
        anoDeLancamento,
        resumo,
        resumoEn,
        analise,
        analiseEn,
        capaURL,
    } = {}) {
        // Esse modelo representa os dados de um livro no sistema.
        this.id = id;
        this.tituloDoLivro = tituloDoLivro;
        this.tituloDoLivroEn = tituloDoLivroEn;
        this.descricao = descricao;
        this.descricaoEn = descricaoEn;
        this.contextoHistorico = contextoHistorico;
        this.contextoHistoricoEn = contextoHistoricoEn;
        this.anoDeLancamento = anoDeLancamento;
        this.resumo = resumo;
        this.resumoEn = resumoEn;
        this.analise = analise;
        this.analiseEn = analiseEn;
        this.capaURL = capaURL;
    }

    async criar() {
        // Cria um novo registro de livro no banco de dados usando os dados da instância.
        // Converte o ano de lançamento para inteiro.

        return prisma.livro.create({
            data: {
                tituloDoLivro: this.tituloDoLivro,
                tituloDoLivroEn: this.tituloDoLivroEn,
                descricao: this.descricao,
                descricaoEn: this.descricaoEn,
                contextoHistorico: this.contextoHistorico,
                contextoHistoricoEn: this.contextoHistoricoEn,
                anoDeLancamento: parseInt(this.anoDeLancamento, 10),
                resumo: this.resumo,
                resumoEn: this.resumoEn,
                analise: this.analise,
                analiseEn: this.analiseEn,
                capaURL: this.capaURL,
            },
        });
    }

    async atualizar() {
        // Atualiza um livro existente com base no id da instância.
        // Lança um erro se o id não estiver presente.
        if (!this.id) {
            throw new Error('ID não fornecido.');
        }

        return prisma.livro.update({
            where: { id: parseInt(this.id, 10) },
            data: {
                tituloDoLivro: this.tituloDoLivro,
                tituloDoLivroEn: this.tituloDoLivroEn,
                descricao: this.descricao,
                descricaoEn: this.descricaoEn,
                contextoHistorico: this.contextoHistorico,
                contextoHistoricoEn: this.contextoHistoricoEn,
                anoDeLancamento: parseInt(this.anoDeLancamento, 10),
                resumo: this.resumo,
                resumoEn: this.resumoEn,
                analise: this.analise,
                analiseEn: this.analiseEn,
                capaURL: this.capaURL,
            },
        });
    }

    async deletar() {
        // Exclui o livro do banco de dados usando o id informado.
        // Se não existir id, a operação é interrompida com um erro.
        if (!this.id) {
            throw new Error('ID não fornecido.');
        }

        return prisma.livro.delete({ where: { id: parseInt(this.id, 10) } });
    }

    static async buscarTodos(filtros = {}) {
        // Busca todos os livros e aplica filtros opcionais de título e ano de lançamento.
        // Retorna também os relacionamentos com autores, movimento literário e personagens.
        const where = {};

        if (filtros.tituloDoLivro) {
            where.tituloDoLivro = { contains: filtros.tituloDoLivro, mode: 'insensitive' };
        }

        if (filtros.tituloDoLivroEn) {
            where.tituloDoLivroEn = { contains: filtros.tituloDoLivroEn, mode: 'insensitive' };
        }

        if (filtros.anoDeLancamento !== undefined) {
            where.anoDeLancamento = parseInt(filtros.anoDeLancamento);
        }

        return prisma.livro.findMany({
            where,
            include: {
                autores: true,
                enredos: true,
                cenarios: true,
                personagens: true,
                movimentoLiterario: true,
                vocabularios: true,
                videos: true,
                curiosidades: true,
                questoes: true,
                temasDeVestibular: true,
            },
        });
    }

    static async buscarPorId(id) {
        // Busca um livro pelo id e retorna uma instância de LivroModel.
        // Se não encontrar o registro, retorna null.
        const data = await prisma.livro.findUnique({
            where: { id: parseInt(id, 10) },
            include: {
                autores: true,
                enredos: true,
                cenarios: true,
                personagens: true,
                movimentosLiterarios: true,
                vocabularios: true,
                videos: true,
                curiosidades: true,
                questoes: true,
                temasDeVestibular: true,
            },
        });
       
        if (!data) return null;

    const instancia = new LivroModel(data);

    // O construtor não salva as relações (autores, personagens, etc), 
    // então tive que por o Object.assign, em que ele "anexa" esses dados à instância para o Front receber.
    Object.assign(instancia, data);

    return instancia;
    }
}
