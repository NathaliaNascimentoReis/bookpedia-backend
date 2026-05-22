// Importa a instância do Prisma Client para realizar operações no banco de dados.
import prisma from '../lib/services/prismaClient.js';

export default class EnredosModel {
    constructor({
        id = null,
        introducao,
        introducaoEn,
        conflito,
        conflitoEn,
        climax,
        climaxEn,
        desfecho,
        desfechoEn,
        idDoLivro,
    } = {}) {
        // Esse modelo representa a estrutura narrativa associada a um livro.
        this.id = id;
        this.introducao = introducao;
        this.introducaoEn = introducaoEn;
        this.conflito = conflito;
        this.conflitoEn = conflitoEn;
        this.climax = climax;
        this.climaxEn = climaxEn;
        this.desfecho = desfecho;
        this.desfechoEn = desfechoEn;
        this.idDoLivro = idDoLivro;
    }

    async criar() {
        // Cria um novo registro de enredo no banco de dados.
        // Converte idDoLivro para inteiro antes de salvar.

        return prisma.enredos.create({
            data: {
                introducao: this.introducao,
                introducaoEn: this.introducaoEn,
                conflito: this.conflito,
                conflitoEn: this.conflitoEn,
                climax: this.climax,
                climaxEn: this.climaxEn,
                desfecho: this.desfecho,
                desfechoEn: this.desfechoEn,
                idDoLivro: parseInt(this.idDoLivro, 10),
            },
        });
    }

    async atualizar() {
        // Atualiza um enredo existente no banco usando o id da instância.
        // Exige que o id seja fornecido antes de prosseguir.
        if (!this.id) {
            throw new Error('ID não fornecido.');
        }

        return prisma.enredos.update({
            where: { id: parseInt(this.id, 10) },
            data: {
                introducao: this.introducao,
                introducaoEn: this.introducaoEn,
                conflito: this.conflito,
                conflitoEn: this.conflitoEn,
                climax: this.climax,
                climaxEn: this.climaxEn,
                desfecho: this.desfecho,
                desfechoEn: this.desfechoEn,
                idDoLivro: this.idDoLivro ? parseInt(this.idDoLivro) : undefined,
            },
        });
    }

    async deletar() {
        // Exclui o enredo do banco de dados usando o id informado.
        // Se não houver id, uma exceção é lançada.
        if (!this.id) {
            throw new Error('ID não fornecido.');
        }

        return prisma.enredos.delete({ where: { id: parseInt(this.id, 10) } });
    }

    static async buscarTodos(filtros = {}) {
        // Busca todos os enredos, aplicando filtro opcional por id do livro.
        // Inclui também os dados do livro relacionado no resultado.
        const where = {};

        if (filtros.idDoLivro !== undefined && filtros.idDoLivro !== '') {
            where.idDoLivro = parseInt(filtros.idDoLivro, 10);
        }

        return prisma.enredos.findMany({ where, include: { livro: true } });
    }

    static async buscarPorId(id) {
        // Busca um enredo por id e retorna uma instância de EnredosModel.
        // Retorna null caso o registro não exista.
        const data = await prisma.enredos.findUnique({
            where: { id: parseInt(id, 10) },
            include: { livro: true },
        });

        if (!data) return null;

        return new EnredosModel(data);
    }
}
