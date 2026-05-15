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
        emDestaque = false
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
        this.emDestaque = emDestaque;
    }

    validar() {
        if (!this.tituloDoLivro || this.tituloDoLivro.trim() === '') {
            throw new Error('O título do livro é um campo obrigatório.');
        }

        if (!this.tituloDoLivroEn || this.tituloDoLivroEn.trim() === '') {
            throw new Error('O título do livro em inglês é um campo obrigatório.');
        }

        if (!this.descricao || this.descricao.trim() === '') {
            throw new Error('A descrição é um campo obrigatório.');
        }

        if (!this.descricaoEn || this.descricaoEn.trim() === '') {
            throw new Error('A descrição em inglês é um campo obrigatório.');
        }

        if (!this.contextoHistorico || this.contextoHistorico.trim() === '') {
            throw new Error('O contexto histórico é um campo obrigatório.');
        }

        if (!this.contextoHistoricoEn || this.contextoHistoricoEn.trim() === '') {
            throw new Error('O contexto histórico em inglês é um campo obrigatório.');
        }

        if (this.anoDeLancamento === undefined || this.anoDeLancamento === null) {
            throw new Error('O ano de lançamento é um campo obrigatório.');
        }

        if (isNaN(parseInt(this.anoDeLancamento, 10)) || parseInt(this.anoDeLancamento, 10) < 0) {
            throw new Error('O ano de lançamento deve ser um número válido.');
        }

        if (!this.resumo || this.resumo.trim() === '') {
            throw new Error('O resumo é um campo obrigatório.');
        }

        if (!this.resumoEn || this.resumoEn.trim() === '') {
            throw new Error('O resumo em inglês é um campo obrigatório.');
        }

        if (!this.analise || this.analise.trim() === '') {
            throw new Error('A análise é um campo obrigatório.');
        }

        if (!this.analiseEn || this.analiseEn.trim() === '') {
            throw new Error('A análise em inglês é um campo obrigatório.');
        }

        if (!this.capaURL || this.capaURL.trim() === '') {
            throw new Error('A capa é um campo obrigatório.');
        }
    }

    async criar() {
        this.validar();

        if (this.emDestaque) {
            const destqueExistente = await prisma.livro.findFirst({
                where: { emDestaque: true }
            });

            if (destqueExistente) {
                throw new Error(
                    `Já existe um livro em destaque: "${destqueExistente.tituloDoLivro}". Remvova o destaque dele antes de criar um novo.`
                );
            }
        }

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
                emDestaque: this.emDestaque,
            },
        });
    }

    async atualizar() {
        if (!this.id) {
            throw new Error('ID não fornecido.');
        }

        this.validar();

        if (this.emDestaque) {
            const destqueExistente = await prisma.livro.findFirst({
                where: {
                    emDestaque: true,
                    NOT: { id: parseInt(this.id, 10) },
                },
            })

            if (destqueExistente) {
                throw new Error(
                    `Já existe um livro em destaque: "${destqueExistente.tituloDoLivro}". Remvova o destaque dele antes de criar um novo.`
                );
            }
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
                emDestaque: this.emDestaque,
            },
        });
    }

    async deletar() {
        if (!this.id) {
            throw new Error('ID não fornecido.');
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

        if (filtros.emDestaque !== undefined) {
            where.emDestaque = filtros.emDestaque === 'true' || filtros.emDestaque === true;
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
        return data;
    }

    static async buscarDestaque() {
        const livro = await prisma.livro.findFirst({
            where: { emDestaque: true },
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
            },
        });

        if (!livro) return null;

        return livro;
    }
}
