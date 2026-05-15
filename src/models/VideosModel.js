import prisma from '../lib/services/prismaClient.js';

export default class VideosModel {
    constructor({
        id = null,
        titulo,
        tituloEn,
        descricao,
        descricaoEn,
        url,
        idDoLivro = null,
    } = {}) {
        this.id = id;
        this.titulo = titulo;
        this.tituloEn = tituloEn;
        this.descricao = descricao;
        this.descricaoEn = descricaoEn;
        this.url = url;
        this.idDoLivro = idDoLivro;
    }

    validar() {
        if (!this.titulo || this.titulo.trim() === '') {
            throw new Error('O título é um campo obrigatório.');
        }

        if (!this.tituloEn || this.tituloEn.trim() === '') {
            throw new Error('O título em inglês é um campo obrigatório.');
        }

        if (!this.descricao || this.descricao.trim() === '') {
            throw new Error('A descrição é um campo obrigatório.');
        }

        if (!this.descricaoEn || this.descricaoEn.trim() === '') {
            throw new Error('A descrição em inglês é um campo obrigatório.');
        }

        if (!this.url || this.url.trim() === '') {
            throw new Error('A URL é um campo obrigatório.');
        }

        if (this.idDoLivro === undefined || this.idDoLivro === null || this.idDoLivro === '') {
            throw new Error('O livro é um campo obrigatório.');
        }

        if (isNaN(parseInt(this.idDoLivro, 10)) || parseInt(this.idDoLivro, 10) < 0) {
            throw new Error('O livro deve ser um número válido.');
        }
    }

    async criar() {
        this.validar();

        return prisma.videos.create({
            data: {
                titulo: this.titulo,
                tituloEn: this.tituloEn,
                descricao: this.descricao,
                descricaoEn: this.descricaoEn,
                url: this.url,
                idDoLivro: parseInt(this.idDoLivro, 10),
            },
        });
    }

    async atualizar() {
        if (!this.id) {
            throw new Error('ID não fornecido.');
        }

        this.validar();

        return prisma.videos.update({
            where: { id: parseInt(this.id, 10) },
            data: {
                titulo: this.titulo,
                tituloEn: this.tituloEn,
                descricao: this.descricao,
                descricaoEn: this.descricaoEn,
                url: this.url,
                idDoLivro: parseInt(this.idDoLivro, 10),
            },
        });
    }

    async deletar() {
        if (!this.id) {
            throw new Error('ID não fornecido.');
        }

        return prisma.videos.delete({ where: { id: parseInt(this.id, 10) } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.titulo) {
            where.titulo = { contains: filtros.titulo, mode: 'insensitive' };
        }

        if (filtros.tituloEn) {
            where.tituloEn = { contains: filtros.tituloEn, mode: 'insensitive' };
        }

        if (filtros.idDoLivro !== undefined && filtros.idDoLivro !== '') {
            where.idDoLivro = parseInt(filtros.idDoLivro);
        }

        return prisma.videos.findMany({ where, include: { livro: true } });
    }

    static async buscarPorId(id) {
        const data = await prisma.videos.findUnique({
            where: { id: parseInt(id, 10) },
            include: { livro: true },
        });

        if (!data) return null;

        return new VideosModel(data);
    }
}