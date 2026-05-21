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

    
    async criar() {
        

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