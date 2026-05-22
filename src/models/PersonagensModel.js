// Importa a instância do Prisma Client para comunicar com o banco de dados.
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
        // Inicializa os campos do personagem com os valores recebidos.
        // Esse modelo representa uma entidade de personagem vinculada a um livro.
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
        // Cria um novo personagem no banco de dados.
        // Converte campos numéricos em inteiros antes de salvar.

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
        // Atualiza um personagem existente utilizando o id da instância.
        // Caso não haja id, lança um erro para evitar operação inválida.
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
        // Exclui o personagem do banco de dados com base no id informado.
        // Se faltar o id, a operação é interrompida.
        if (!this.id) {
            throw new Error('ID não fornecido.');
        }

        return prisma.personagens.delete({ where: { id: parseInt(this.id, 10) } });
    }

    static async buscarTodos(filtros = {}) {
        // Busca personagens aplicando filtros opcionais de nome, idade e livro.
        // Retorna também os dados do livro associado.
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
        // Busca um personagem único pelo id e inclui o livro relacionado.
        // Retorna null caso não exista registro.
        const data = await prisma.personagens.findUnique({
            where: { id: parseInt(id, 10) },
            include: { livro: true },
        });

        if (!data) return null;

        return new PersonagensModel(data);
    }
}
