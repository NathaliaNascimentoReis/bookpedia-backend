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

    async criar() {

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
