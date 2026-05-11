import prisma from '../lib/services/prismaClient.js';

export default class DicasDeVestibularModel {
    constructor({ id = null, titulo, tituloEn, dica, dicaEn } = {}) {
        this.id = id;
        this.titulo = titulo;
        this.tituloEn = tituloEn;
        this.dica = dica;
        this.dicaEn = dicaEn;
    }

    validar() {
        if (!this.titulo || this.titulo.trim() === '') {
            throw new Error('O título é um campo obrigatório.');
        }

        if (!this.tituloEn || this.tituloEn.trim() === '') {
            throw new Error('O título em inglês é um campo obrigatório.');
        }

        if (!this.dica || this.dica.trim() === '') {
            throw new Error('A dica é um campo obrigatório.');
        }

        if (!this.dicaEn || this.dicaEn.trim() === '') {
            throw new Error('A dica em inglês é um campo obrigatório.');
        }
    }

    async criar() {
        this.validar();

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

        this.validar();

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

        if (filtros.tituloEn) {
            where.tituloEn = { contains: filtros.tituloEn, mode: 'insensitive' };
        }

        if (filtros.dica) {
            where.dica = { contains: filtros.dica, mode: 'insensitive' };
        }

        if (filtros.dicaEn) {
            where.dicaEn = { contains: filtros.dicaEn, mode: 'insensitive' };
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
