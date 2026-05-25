// TemasDeVestibularModel.js
import prisma from '../lib/services/prismaClient.js';

export default class TemasDeVestibularModel {
    constructor({ id = null, tema, temaEn, temaDescricao, temaDescricaoEn, livroId = null } = {}) {
        // O id é opcional para permitir criação e atualização com a mesma classe.
        this.id = id;
        this.tema = tema;
        this.temaEn = temaEn;
        this.temaDescricao = temaDescricao;
        this.temaDescricaoEn = temaDescricaoEn;
        this.livroId = livroId;
    }

    async criar() {
        // Cria um novo registro de tema de vestibular no banco de dados.
        return prisma.temasDeVestibular.create({
            data: {
                tema: this.tema,
                temaEn: this.temaEn,
                temaDescricao: this.temaDescricao,
                temaDescricaoEn: this.temaDescricaoEn,
                ...(this.livroId && { livro: { connect: { id: parseInt(this.livroId, 10) } } }),
            },
            include: { livro: true },
        });
    }

    async atualizar() {
        // Atualiza um registro já existente de tema de vestibular.
        // Caso não haja id definido, lança um erro para evitar atualização inválida.
        if (!this.id) {
            throw new Error('ID não fornecido.');
        }

        return prisma.temasDeVestibular.update({
            where: { id: parseInt(this.id, 10) },
            data: {
                tema: this.tema,
                temaEn: this.temaEn,
                temaDescricao: this.temaDescricao,
                temaDescricaoEn: this.temaDescricaoEn,
                ...(this.livroId !== undefined && {
                    livro: this.livroId
                        ? { connect: { id: parseInt(this.livroId, 10) } }
                        : { disconnect: true },
                }),
            },
            include: { livro: true },
        });
    }

    async deletar() {
        // Remove o registro do banco de dados usando o id da instância.
        // Se o id estiver faltando, a operação não é permitida.
        if (!this.id) {
            throw new Error('ID não fornecido.');
        }

        return prisma.temasDeVestibular.delete({ where: { id: parseInt(this.id, 10) } });
    }

    static async buscarTodos(filtros = {}) {
        // Busca todos os temas de vestibular, aplicando filtro opcional por tema.
        const where = {};
        if (filtros.tema) {
            where.tema = { contains: filtros.tema, mode: 'insensitive' };
        }
        if (filtros.livroId) {
            where.livroId = parseInt(filtros.livroId, 10);
        }

        return prisma.temasDeVestibular.findMany({ where, include: { livro: true } });
    }

    static async buscarPorId(id) {
        // Busca um tema de vestibular pelo id e retorna o modelo correspondente.
        // Retorna null caso nenhum registro seja encontrado.
        const data = await prisma.temasDeVestibular.findUnique({
            where: { id: parseInt(id, 10) },
            include: { livro: true },
        });

        if (!data) return null;

        return new TemasDeVestibularModel(data);
    }
}
