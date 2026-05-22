// Importa a instância do Prisma Client para operações de banco de dados.
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
        // dados fornecidos. Aqui são atribuídos os campos do cenário.
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
        // Cria um novo registro de cenário no banco de dados usando os dados da instância.
        // Se idDoLivro estiver presente, o valor é convertido para inteiro antes de salvar.

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
        // Atualiza um cenário existente com base no id da instância.
        // Lança erro caso o id não esteja definido.
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
        // Remove o cenário do banco de dados usando o id da instância.
        // Caso não haja id, a operação é interrompida com erro.
        if (!this.id) {
            throw new Error('ID não fornecido');
        }

        return prisma.cenarios.delete({
            where: { id: parseInt(this.id, 10) },
        });
    }

    static async buscarTodos(filtros = {}) {
        // Busca todos os cenários, aplicando filtros opcionais de nome e livro.
        // O resultado inclui também o livro relacionado ao cenário.
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
        // Busca um único cenário por id, incluindo o livro associado.
        // Retorna null se não houver resultado.
        const data = await prisma.cenarios.findUnique({
            where: { id: parseInt(id, 10) },
            include: { livro: true },
        });

        if (!data) return null;

        // Cria um novo objeto CenariosModel a partir dos dados retornados.
        return new CenariosModel(data);
    }
}
