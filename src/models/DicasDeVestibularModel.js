import prisma from '../lib/services/prismaClient.js';

export default class DicasDeVestibularModel {
    constructor({
        id = null,
        titulo,
        tituloEn,
        dica,
        dicaEn,

    } = {}) {
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
        return prisma.dicasDeVestibular.update({
            where: { id: this.id },
            data: {
                titulo: this.titulo,
                tituloEn: this.tituloEn,
                dica: this.dica,
                dicaEn: this.dicaEn,
            },
        });
    }

    async deletar() {
        return prisma.dicasDeVestibular.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.titulo) {
            where.titulo = { contains: filtros.titulo, mode: 'insensitive' };
        }
        if (filtros.tituloEn) {
            where.tituloEn = { contains: filtros.tituloEn, mode: 'insensitive' };
        }
        if (filtros.dica) {
            where.dica = { contains: filtros.dica, mode: 'insensitive' };
        }
        if (filtros.dicaEn) {where.dicaEn = {contains: filtros.dicaEn,mode: 'insensitive',
            };
        }
        return prisma.dicasDeVestibular.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.dicasDeVestibular.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new DicasDeVestibularModel(data);
    }
}
