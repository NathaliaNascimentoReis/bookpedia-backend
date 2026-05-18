import prisma from '../lib/services/prismaClient.js';

export default class DicasDeVestibularModel {
    constructor({ id = null, titulo, tituloEn, dica, dicaEn } = {}) {
        this.id = id;
        this.titulo = titulo;
        this.tituloEn = tituloEn;
        this.dica = dica;
        this.dicaEn = dicaEn;
    }

    async criar() {

        return prisma.dicasDeVestibular.create({
            data: {
                titulo: this.titulo,
                tituloEn: this.tituloEn,
                dica: this.dica,
                dicaEn: this.dicaEn,
            },
        });
    }

    async atualizar() {
        if (!this.id) {
            throw new Error('ID não fornecido.');
        }

        return prisma.dicasDeVestibular.update({
            where: { id: parseInt(this.id, 10) },
            data: {
                titulo: this.titulo,
                tituloEn: this.tituloEn,
                dica: this.dica,
                dicaEn: this.dicaEn,
            },
        });
    }

    async deletar() {
        if (!this.id) {
            throw new Error('ID não fornecido.');
        }

        return prisma.dicasDeVestibular.delete({ where: { id: parseInt(this.id, 10) } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};
        if (filtros.titulo) {
            where.titulo = { contains: filtros.titulo, mode: 'insensitive' };
        }

        return prisma.dicasDeVestibular.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.dicasDeVestibular.findUnique({
            where: { id: parseInt(id, 10) },
        });

        if (!data) return null;

        return new DicasDeVestibularModel(data);
    }
}
