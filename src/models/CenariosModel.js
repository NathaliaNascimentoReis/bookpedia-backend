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

    validar() {
        if (!this.nome || this.nome.trim() === '') {
            throw new Error('O nome é um campo obrigatório.');
        }

        if (!this.nomeEn || this.nomeEn.trim() === '') {
            throw new Error('O nome em inglês é um campo obrigatório.');
        }

        if (!this.caracteristicas || this.caracteristicas.trim() === '') {
            throw new Error('As características são um campo obrigatório.');
        }

        if (!this.caracteristicasEn || this.caracteristicasEn.trim() === '') {
            throw new Error('As características em inglês são um campo obrigatório.');
        }

        if (!this.descricao || this.descricao.trim() === '') {
            throw new Error('A descrição é um campo obrigatório.');
        }

        if (!this.descricaoEn || this.descricaoEn.trim() === '') {
            throw new Error('A descrição em inglês é um campo obrigatório.');
        }

        if (!this.fotoURL || this.fotoURL.trim() === '') {
            throw new Error('A foto é um campo obrigatório.');
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
