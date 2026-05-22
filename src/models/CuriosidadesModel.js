// Importa a instância do Prisma Client para acessar o banco de dados.
import prisma from '../lib/services/prismaClient.js';

export default class CuriosidadesModel {
    constructor({
        id = null,
        tituloCuriosidade,
        tituloCuriosidadeEn,
        curiosidade,
        curiosidadeEn,
        idDoLivro,
    } = {}) {
        // Inicializa os campos da curiosidade a partir do objeto recebido.

        this.id = id;
        this.tituloCuriosidade = tituloCuriosidade;
        this.tituloCuriosidadeEn = tituloCuriosidadeEn;
        this.curiosidadeEn = curiosidadeEn;
        this.curiosidade = curiosidade;
        this.idDoLivro = idDoLivro;
    }

    async criar() {
        // Cria um novo registro de curiosidade no banco de dados.

        return prisma.curiosidades.create({
            data: {
                tituloCuriosidade: this.tituloCuriosidade,
                tituloCuriosidadeEn: this.tituloCuriosidadeEn,
                curiosidade: this.curiosidade,
                curiosidadeEn: this.curiosidadeEn,
                idDoLivro: parseInt(this.idDoLivro),
            },
        });
    }

    async atualizar() {
        // Atualiza a curiosidade existente com base no id da instância.
        // Lança erro se não houver id definido.
        if (!this.id) {
            throw new Error('ID não fornecido.');
        }
        return prisma.curiosidades.update({
            where: { id: parseInt(this.id, 10) },
            data: {
                tituloCuriosidade: this.tituloCuriosidade,
                tituloCuriosidadeEn: this.tituloCuriosidadeEn,
                curiosidade: this.curiosidade,
                curiosidadeEn: this.curiosidadeEn,
                idDoLivro: parseInt(this.idDoLivro),
            },
        });
    }

    async deletar() {
        // Exclui a curiosidade do banco pelo id.
        // Se não houver id, impede a operação com um erro.
        if (!this.id) {
            throw new Error('ID não fornecido.');
        }

        return prisma.curiosidades.delete({ where: { id: parseInt(this.id, 10) } });
    }

    static async buscarTodos(filtros = {}) {
        // Busca várias curiosidades aplicando filtros opcionais de título e livro.
        // O resultado inclui também o livro associado.
        const where = {};

        if (filtros.tituloCuriosidade) {
            where.tituloCuriosidade = { contains: filtros.tituloCuriosidade, mode: 'insensitive' };
        }

        if (filtros.tituloCuriosidadeEn) {
            where.tituloCuriosidadeEn = {
                contains: filtros.tituloCuriosidadeEn,
                mode: 'insensitive',
            };
        }

        if (filtros.idDoLivro !== undefined) {
            where.idDoLivro = parseInt(filtros.idDoLivro);
        }

        return prisma.curiosidades.findMany({ where, include: { livro: true } });
    }

    static async buscarPorId(id) {
        // Busca uma curiosidade por id e retorna o objeto do modelo.
        // Retorna null se não encontrar nenhum registro.
        const data = await prisma.curiosidades.findUnique({
            where: { id: parseInt(id, 10) },
            include: { livro: true },
        });

        if (!data) return null;

        return new CuriosidadesModel(data);
    }
}
