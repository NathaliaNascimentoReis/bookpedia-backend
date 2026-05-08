import prisma from '../lib/services/prismaClient.js';

export default class VocabularioModel {
    constructor({ id = null, palavra, palavraEn, significado, significadoEn, idDoLivro = null } = {}) {
        this.id = id;
        this.palavra = palavra;
        this.palavraEn = palavraEn;
        this.significado = significado;
        this.significadoEn = significadoEn;
        this.idDoLivro = idDoLivro;
    }

    async criar() {
        return prisma.vocabulario.create({
            data: {
                palavra: this.palavra,
                palavraEn: this.palavraEn,
                significado: this.significado,
                significadoEn: this.significadoEn,
                idDoLivro: this.idDoLivro,
            },
        });
    }

    async atualizar() {
        return prisma.vocabulario.update({
            where: { id: this.id },
            data: {
                palavra: this.palavra,
                palavraEn: this.palavraEn,
                significado: this.significado,
                significadoEn: this.significadoEn,
                idDoLivro: this.idDoLivro,
            },
        });
    }

    async deletar() {
        return prisma.vocabulario.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.palavra) {
            where.palavra = { contains: filtros.palavra, mode: 'insensitive' };
        }
        if (filtros.palavraEn) {
            where.palavraEn = { contains: filtros.palavraEn, mode: 'insensitive' };
        }
        if (filtros.significado) {
            where.significado = { contains: filtros.significado, mode: 'insensitive' };
        }
        if (filtros.significadoEn) {
            where.significadoEn = { contains: filtros.significadoEn, mode: 'insensitive' };
        }
        if (filtros.idDoLivro !== undefined && filtros.idDoLivro !== '') {
            where.idDoLivro = parseInt(filtros.idDoLivro);
        }

        return prisma.vocabulario.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.vocabulario.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new VocabularioModel(data);
    }
}
