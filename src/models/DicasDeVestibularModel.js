// Importa a instância do Prisma Client para realizar operações no banco de dados.
import prisma from '../lib/services/prismaClient.js';

export default class DicasDeVestibularModel {
    constructor({ id = null, titulo, tituloEn, dica, dicaEn } = {}) {
        // O id é opcional para permitir criação e atualização com a mesma classe.
        this.id = id;
        this.titulo = titulo;
        this.tituloEn = tituloEn;
        this.dica = dica;
        this.dicaEn = dicaEn;
        this.idDoLivro = idDoLivro;
    }

    async criar() {
        // Cria um novo registro de dica de vestibular no banco de dados.

        return prisma.dicasDeVestibular.create({
            data: {
                titulo: this.titulo,
                tituloEn: this.tituloEn,
                dica: this.dica,
                dicaEn: this.dicaEn,
                idDoLivro: this.idDoLivro,
            },
        });
    }

    async atualizar() {
        // Atualiza um registro já existente de dica de vestibular.
        // Caso não haja id definido, lança um erro para evitar atualização inválida.
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
        // Remove o registro do banco de dados usando o id da instância.
        // Se o id estiver faltando, a operação não é permitida.
        if (!this.id) {
            throw new Error('ID não fornecido.');
        }

        return prisma.dicasDeVestibular.delete({ where: { id: parseInt(this.id, 10) } });
    }

    static async buscarTodos(filtros = {}) {
        // Busca todas as dicas de vestibular, aplicando filtro opcional por título.
        const where = {};
        if (filtros.titulo) {
            where.titulo = { contains: filtros.titulo, mode: 'insensitive' };
        }

        return prisma.dicasDeVestibular.findMany({ where });
    }

    static async buscarPorId(id) {
        // Busca uma dica de vestibular pelo id e retorna o modelo correspondente.
        // Retorna null caso nenhum registro seja encontrado.
        const data = await prisma.dicasDeVestibular.findUnique({
            where: { id: parseInt(id, 10) },
        });

        if (!data) return null;

        return new DicasDeVestibularModel(data);
    }
}
