// Importa a instância do Prisma Client para executar operações no banco de dados.
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
        // Inicializa os campos do modelo de vídeo com os valores recebidos.
        // Esse modelo representa vídeos relacionados a livros na aplicação.
        this.id = id;
        this.titulo = titulo;
        this.tituloEn = tituloEn;
        this.descricao = descricao;
        this.descricaoEn = descricaoEn;
        this.url = url;
        this.idDoLivro = idDoLivro;
    }

    // Cria um novo registro de vídeo no banco de dados.
    // Converte o id do livro para inteiro antes de salvar.
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
            // Atualiza o registro de vídeo existente usando o id da instância.
            // Garante que os campos estejam definidos antes de persistir as alterações.
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
        // Remove o vídeo do banco de dados com base no id informado.
        if (!this.id) {
            throw new Error('ID não fornecido.');
        }

        // Busca todos os vídeos aplicando filtros opcionais de busca por título ou livro.
        // Inclui o livro relacionado ao vídeo no retorno.
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

        // Busca um único vídeo pelo id e retorna a instância do modelo.
        // Se não encontrar, retorna null.
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
