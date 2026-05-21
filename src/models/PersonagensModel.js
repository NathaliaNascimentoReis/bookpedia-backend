import prisma from '../lib/services/prismaClient.js';

export default class PersonagensModel {
    constructor({
        id = null,
        nome,
        idade,
        descricao,
        descricaoEn,
        historia,
        historiaEn,
        idDoLivro = null,
    } = {}) {
        this.id = id;
        this.nome = nome;
        this.idade = idade;
        this.descricao = descricao;
        this.descricaoEn = descricaoEn;
        this.historia = historia;
        this.historiaEn = historiaEn;
        this.idDoLivro = idDoLivro;
    }


    async criar() {

        return prisma.personagens.create({
            data: {
                nome: this.nome,
                idade: parseInt(this.idade, 10),
                descricao: this.descricao,
                descricaoEn: this.descricaoEn,
                historia: this.historia,
                historiaEn: this.historiaEn,
                idDoLivro: parseInt(this.idDoLivro, 10),
            },
        });
    }

    async atualizar() {
        if (!this.id) {
            throw new Error('ID não fornecido.');
        }


        return prisma.personagens.update({
            where: { id: parseInt(this.id, 10) },
            data: {
                nome: this.nome,
                idade: parseInt(this.idade, 10),
                descricao: this.descricao,
                descricaoEn: this.descricaoEn,
                historia: this.historia,
                historiaEn: this.historiaEn,
                idDoLivro: parseInt(this.idDoLivro, 10),
            },
        });
    }

    async deletar() {
        if (!this.id) {
            throw new Error('ID não fornecido.');
        }

        return prisma.personagens.delete({ where: { id: parseInt(this.id, 10) } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.nome) {
            where.nome = { contains: filtros.nome, mode: 'insensitive' };
        }

        if (filtros.idade !== undefined && filtros.idade !== '') {
            where.idade = parseInt(filtros.idade);
        }

        if (filtros.idDoLivro !== undefined && filtros.idDoLivro !== '') {
            where.idDoLivro = parseInt(filtros.idDoLivro);
        }

        return prisma.personagens.findMany({ where, include: { livro: true } });
    }

    static async buscarPorId(id) {
        const data = await prisma.personagens.findUnique({
            where: { id: parseInt(id, 10) },
            include: { livro: true },
        });

        if (!data) return null;

        return new PersonagensModel(data);
    }
}