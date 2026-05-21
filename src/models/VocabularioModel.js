import prisma from '../lib/services/prismaClient.js';

export default class VocabularioModel {
    constructor({ id = null, palavra, palavraEn, significado, significadoEn } = {}) {
        this.id = id;
        this.palavra = palavra;
        this.palavraEn = palavraEn;
        this.significado = significado;
        this.significadoEn = significadoEn;
    }


    async criar(idLivroParaConectar = null) {
        
        const data = {
            palavra: this.palavra,
            palavraEn: this.palavraEn,
            significado: this.significado,
            significadoEn: this.significadoEn,
        };

        if (idLivroParaConectar) {
            data.livros = {
                connect: { id: parseInt(idLivroParaConectar, 10) },
            };
        }

        return prisma.vocabulario.create({ data });
    }

    async atualizar() {
        if (!this.id) {
            throw new Error('ID não fornecido.');
        }

        return prisma.vocabulario.update({
            where: { id: parseInt(this.id, 10) },
            data: {
                palavra: this.palavra,
                palavraEn: this.palavraEn,
                significado: this.significado,
                significadoEn: this.significadoEn,
            },
        });
    }

    async deletar() {
        if (!this.id) {
            throw new Error('ID não fornecido.');
        }

        return prisma.vocabulario.delete({ where: { id: parseInt(this.id, 10) } });
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

        return prisma.vocabulario.findMany({ where, include: { livros: true } });
    }

    static async buscarPorId(id) {
        const data = await prisma.vocabulario.findUnique({
            where: { id: parseInt(id, 10) },
            include: { livros: true },
        });

        if (!data) return null;

        return new VocabularioModel(data);
    }
}