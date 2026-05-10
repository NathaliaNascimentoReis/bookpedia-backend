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
        if (!this.id) {
            throw new Error('ID não fornecido');
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
                anoDeLancamento: this.anoDeLancamento ? parseInt(this.anoDeLancamento, 10) : undefined,
                resumo: this.resumo,
                resumoEn: this.resumoEn,
                analise: this.analise,
                analiseEn: this.analiseEn,
                capaURL: this.capaURL,
            },
        });
    }

    async deletar() {
        if (!this.id) {
            throw new Error('ID não fornecido');
        }

        return prisma.livro.delete({ where: { id: parseInt(this.id, 10) } });
    }

    static async buscarTodos(filtros = {}) {
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
                movimentoLiterario: true,
                personagens: true,
            },
        });
    }

    static async buscarPorId(id) {
        const data = await prisma.livro.findUnique({
            where: { id: parseInt(id, 10) },
            include: {
                autores: true,
                movimentoLiterario: true,
                personagens: true,
            },
        });

        if (!data) return null;

        return new LivroModel(data);
    }
}
