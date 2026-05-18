import prisma from '../lib/services/prismaClient.js';

export default class CenariosModel {
    constructor({
        id = null,
        nome,
        nomeEn,
        caracteristicas,
        caracteristicasEn,
        descricao,
        descricaoEn,
        fotoURL,
        idDoLivro,
    } = {}) {
        this.id = id;
        this.nome = nome;
        this.nomeEn = nomeEn;
        this.caracteristicas = caracteristicas;
        this.caracteristicasEn = caracteristicasEn;
        this.descricaoEn = descricaoEn;
        this.descricao = descricao;
        this.fotoURL = fotoURL;
        this.idDoLivro = idDoLivro;
    }

    async criar() {
        
        return prisma.cenarios.create({
            data: {
                nome: this.nome,
                nomeEn: this.nomeEn,
                caracteristicas: this.caracteristicas,
                caracteristicasEn: this.caracteristicasEn,
                descricaoEn: this.descricaoEn,
                descricao: this.descricao,
                fotoURL: this.fotoURL,
                idDoLivro: this.idDoLivro ? parseInt(this.idDoLivro) : undefined,
            },
        });
    }

    async atualizar() {
        if (!this.id) {
            throw new Error('ID não fornecido');
        }

        return prisma.cenarios.update({
            where: { id: parseInt(this.id, 10) },

            data: {
                nome: this.nome,
                nomeEn: this.nomeEn,
                caracteristicas: this.caracteristicas,
                caracteristicasEn: this.caracteristicasEn,
                descricao: this.descricao,
                descricaoEn: this.descricaoEn,
                fotoURL: this.fotoURL,
                idDoLivro: this.idDoLivro ? parseInt(this.idDoLivro) : undefined,
            },
        });
    }

    async deletar() {
        if (!this.id) {
            throw new Error('ID não fornecido');
        }

        return prisma.cenarios.delete({
            where: { id: parseInt(this.id, 10) },
        });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.nome) {
            where.nome = { contains: filtros.nome, mode: 'insensitive' };
        }

        if (filtros.nomeEn) {
            where.nomeEn = { contains: filtros.nomeEn, mode: 'insensitive' };
        }

        if (filtros.idDoLivro) {
            where.idDoLivro = parseInt(filtros.idDoLivro, 10);
        }

        return prisma.cenarios.findMany({ where, include: { livro: true } });
    }

    static async buscarPorId(id) {
        const data = await prisma.cenarios.findUnique({
            where: { id: parseInt(id, 10) },
            include: { livro: true },
        });

        if (!data) return null;

        return new CenariosModel(data);
    }
}
