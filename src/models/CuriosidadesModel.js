import prisma from '../lib/services/prismaClient.js';

export default class CuriosidadesModel {
    constructor({
        id = null,
        tituloCuriosidade,
        tituloCuriosidadeEn,
        curiosidade,
        curiosidadeEn,
        idDoLivro,
    } = {}) {
        this.id = id;
        this.tituloCuriosidade = tituloCuriosidade;
        this.tituloCuriosidadeEn = tituloCuriosidadeEn;
        this.curiosidadeEn = curiosidadeEn;
        this.curiosidade = curiosidade;
        this.idDoLivro = idDoLivro;
    }

    validar() {
        if (!this.tituloCuriosidade || this.tituloCuriosidade.trim() === '') {
            throw new Error('O título da curiosidade é um campo obrigatório.');
        }

        if (!this.tituloCuriosidadeEn || this.tituloCuriosidadeEn.trim() === '') {
            throw new Error('O título da curiosidade em inglês é um campo obrigatório.');
        }

        if (!this.curiosidade || this.curiosidade.trim() === '') {
            throw new Error('A curiosidade é um campo obrigatório.');
        }

        if (!this.curiosidadeEn || this.curiosidadeEn.trim() === '') {
            throw new Error('A curiosidade em inglês é um campo obrigatório.');
        }

        if (this.idDoLivro === undefined || this.idDoLivro === null) {
            throw new Error('O ID do livro é um campo obrigatório.');
        }

        if (isNaN(parseInt(this.idDoLivro, 10)) || parseInt(this.idDoLivro, 10) < 0) {
            throw new Error('O ID do livro deve ser um número válido.');
        }
    }

    async criar() {
        this.validar();

        return prisma.curiosidades.create({
            data: {
                tituloCuriosidade: this.tituloCuriosidade,
                tituloCuriosidadeEn: this.tituloCuriosidadeEn,
                curiosidade: this.curiosidade,
                curiosidadeEn: this.curiosidadeEn,
                idDoLivro: parseInt(this.idDoLivro),
            },
        });
    }

    async atualizar() {
        if (!this.id) {
            throw new Error('ID não fornecido.');
        }

        this.validar();

        return prisma.curiosidades.update({
            where: { id: parseInt(this.id, 10) },
            data: {
                tituloCuriosidade: this.tituloCuriosidade,
                tituloCuriosidadeEn: this.tituloCuriosidadeEn,
                curiosidade: this.curiosidade,
                curiosidadeEn: this.curiosidadeEn,
                idDoLivro: parseInt(this.idDoLivro),
            },
        });
    }

    async deletar() {
        if (!this.id) {
            throw new Error('ID não fornecido.');
        }

        return prisma.curiosidades.delete({ where: { id: parseInt(this.id, 10) } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.tituloCuriosidade) {
            where.tituloCuriosidade = { contains: filtros.tituloCuriosidade, mode: 'insensitive' };
        }

        if (filtros.tituloCuriosidadeEn) {
            where.tituloCuriosidadeEn = {
                contains: filtros.tituloCuriosidadeEn,
                mode: 'insensitive',
            };
        }

        if (filtros.idDoLivro !== undefined) {
            where.idDoLivro = parseInt(filtros.idDoLivro);
        }

        return prisma.curiosidades.findMany({ where, include: { livro: true } });
    }

    static async buscarPorId(id) {
        const data = await prisma.curiosidades.findUnique({
            where: { id: parseInt(id, 10) },
            include: { livro: true },
        });

        if (!data) return null;

        return new CuriosidadesModel(data);
    }
}
