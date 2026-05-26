// Importa o Prisma Client configurado para conexão com o banco de dados.
import prisma from '../lib/services/prismaClient.js';

export default class VocabularioModel {
    constructor({ id = null, palavra, palavraEn, significado, significadoEn } = {}) {
        // Inicializa os campos do vocabulário com os valores recebidos.
        // Esse modelo representa uma entrada de vocabulário associada a livros.
        this.id = id;
        this.palavra = palavra;
        this.palavraEn = palavraEn;
        this.significado = significado;
        this.significadoEn = significadoEn;
    }

    async criar(idLivroParaConectar = null) {
        // Prepara os dados do vocabulário para criação no banco de dados.
        // Permite conectar a entrada a um livro existente, quando fornecido.

        const data = {
            palavra: this.palavra,
            palavraEn: this.palavraEn,
            significado: this.significado,
            significadoEn: this.significadoEn,
        };

        if (idLivroParaConectar) {
            // Se um id de livro for informado, cria o relacionamento com o livro.
            data.livro = {
                connect: { id: parseInt(idLivroParaConectar, 10) },
            };
        }

        return prisma.vocabulario.create({ data });
    }

    async atualizar() {
        // Atualiza a entrada de vocabulário existente no banco de dados.
        // Verifica se o id está definido antes de tentar a atualização.
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
        // Remove a entrada de vocabulário do banco de dados usando o id.
        // Se não houver id, a operação é interrompida com um erro.
        if (!this.id) {
            throw new Error('ID não fornecido.');
        }

        return prisma.vocabulario.delete({ where: { id: parseInt(this.id, 10) } });
    }

    static async buscarTodos(filtros = {}) {
        // Busca todas as entradas de vocabulário, aplicando filtros opcionais.
        // Retorna também os livros relacionados a cada item de vocabulário.
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

        return prisma.vocabulario.findMany({ where, include: { livro: true } });
    }

    static async buscarPorId(id) {
        // Busca uma entrada de vocabulário pelo id e inclui os livros associados.
        // Retorna null se nenhum registro for encontrado.
        const data = await prisma.vocabulario.findUnique({
            where: { id: parseInt(id, 10) },
            include: { livro: true },
        });

        if (!data) return null;

        return new VocabularioModel(data);
    }
}
