import prisma from '../lib/services/prismaClient.js';

export default class LivroModel {
    constructor({ id = null,tituloDoLivro, tituloDoLivroEn, autor, descricao, descricaoEn, contextoHistorico, contextoHistoricoEn, anoDeLancamento, resumo, resumoEn, analise, analiseEn,capaUrl, capaURL } = {}) {
        this.id = id;
        this.tituloDoLivro = tituloDoLivro;
        this.tituloDoLivroEn = tituloDoLivroEn;
        this.autor = autor;
        this.descricao = descricao;
        this.descricaoEn = descricaoEn;
        this.contextoHistorico = contextoHistorico;
        this.contextoHistoricoEn = contextoHistoricoEn;
        this.anoDeLancamento = anoDeLancamento;
        this.resumo = resumo;
        this.resumoEn = resumoEn;
        this.analise = analise;
        this.analiseEn = analiseEn;
        this.capaURL = capaURL ?? capaUrl;

    }

    async criar() {
        return prisma.livro.create({
            data: {
                tituloDoLivro: this.tituloDoLivro,
                tituloDoLivroEn: this.tituloDoLivroEn,
                autor: this.autor,
                descricao: this.descricao,
                descricaoEn: this.descricaoEn,
                contextoHistorico: this.contextoHistorico,
                contextoHistoricoEn: this.contextoHistoricoEn,
                anoDeLancamento: this.anoDeLancamento,
                resumo: this.resumo,
                resumoEn: this.resumoEn,
                analise: this.analise,
                analiseEn: this.analiseEn,
                capaURL: this.capaURL,
            },
        });
    }

    async atualizar() {
        return prisma.livro.update({
            where: { id: this.id },
            data: {
                tituloDoLivro: this.tituloDoLivro,
                tituloDoLivroEn: this.tituloDoLivroEn,
                autor: this.autor,
                descricao: this.descricao,
                descricaoEn: this.descricaoEn,
                contextoHistorico: this.contextoHistorico,
                contextoHistoricoEn: this.contextoHistoricoEn,
                anoDeLancamento: this.anoDeLancamento,
                resumo: this.resumo,
                resumoEn: this.resumoEn,
                analise: this.analise,
                analiseEn: this.analiseEn,
                capaURL: this.capaURL,
            },
        });
    }

    async deletar() {
        return prisma.livro.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.tituloDoLivro) {
            where.tituloDoLivro = { contains: filtros.tituloDoLivro, mode: 'insensitive' };
        }
        if (filtros.tituloDoLivroEn) {
            where.tituloDoLivroEn = { contains: filtros.tituloDoLivroEn, mode: 'insensitive' };
        }
        if (filtros.autor) {
            where.autor = { contains: filtros.autor, mode: 'insensitive' };
        }
        if (filtros.descricao) {
            where.descricao = { contains: filtros.descricao, mode: 'insensitive' };
        }
        if (filtros.descricaoEn) {
            where.descricaoEn = { contains: filtros.descricaoEn, mode: 'insensitive' };
        }
        if (filtros.contextoHistorico) {
            where.contextoHistorico = { contains: filtros.contextoHistorico, mode: 'insensitive' };
        }
        if (filtros.contextoHistoricoEn) {
            where.contextoHistoricoEn = { contains: filtros.contextoHistoricoEn, mode: 'insensitive' };
        }
        if (filtros.anoDeLancamento !== undefined) {
            where.anoDeLancamento = parseFloat(filtros.anoDeLancamento);
        }
        if (filtros.resumo) {where.resumo = {contains: filtros.resumo,mode: 'insensitive',
            };
        }
        if (filtros.resumoEn) {where.resumoEn = {contains: filtros.resumoEn,mode: 'insensitive',
            };
        }
        if (filtros.analise) {where.analise = {contains: filtros.analise,mode: 'insensitive',
            };
        }
        if (filtros.analiseEn) {where.analiseEn = {contains: filtros.analiseEn,mode: 'insensitive',
            };
        }
        if (filtros.capaUrl) {where.capaURL = { contains: filtros.capaUrl, mode: 'insensitive' };
        }
        if (filtros.capaURL) {where.capaURL = { contains: filtros.capaURL, mode: 'insensitive' };
        }

        return prisma.livro.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.livro.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new LivroModel(data);
    }
}
