// Importa a instância do Prisma Client para executar operações de banco de dados.
import prisma from '../lib/services/prismaClient.js';

export default class QuestoesModel {
    constructor({
        id = null,
        enunciado,
        enunciadoEn,
        vestibular,
        anoVestibular,
        idDoLivro = null,
        alternativas = null,
    } = {}) {
        // Inicializa os campos do modelo de questão com os valores fornecidos.
        // Isso permite criar e atualizar questões com os dados recebidos.
        this.id = id;
        this.enunciado = enunciado;
        this.enunciadoEn = enunciadoEn;
        this.vestibular = vestibular;
        this.anoVestibular = anoVestibular;
        this.idDoLivro = idDoLivro;
        this.alternativas = alternativas;
    }

    async criar(dadosAlternativas) {
        // Cria uma nova questão no banco de dados e adiciona as alternativas.
        // O campo idDoLivro é convertido para inteiro antes da criação.

        return prisma.questoes.create({
            data: {
                enunciado: this.enunciado,
                enunciadoEn: this.enunciadoEn,
                vestibular: this.vestibular,
                anoVestibular: parseInt(this.anoVestibular, 10),
                idDoLivro: parseInt(this.idDoLivro, 10),
                alternativas: {
                    create: {
                        alternativaA: dadosAlternativas.alternativaA,
                        alternativaAEn: dadosAlternativas.alternativaAEn,
                        alternativaB: dadosAlternativas.alternativaB,
                        alternativaBEn: dadosAlternativas.alternativaBEn,
                        alternativaC: dadosAlternativas.alternativaC,
                        alternativaCEn: dadosAlternativas.alternativaCEn,
                        alternativaD: dadosAlternativas.alternativaD,
                        alternativaDEn: dadosAlternativas.alternativaDEn,
                        respostaCorreta: dadosAlternativas.respostaCorreta,
                        justificativa: dadosAlternativas.justificativa,
                        justificativaEn: dadosAlternativas.justificativaEn,
                    },
                },
            },
            include: { alternativas: true },
        });
    }

    async atualizar(dadosAlternativas = null) {
        // Atualiza uma questão existente e, se fornecido, atualiza suas alternativas.
        // Garante que o id esteja presente antes de executar a atualização.
        if (!this.id) {
            throw new Error('ID não fornecido.');
        }

        const data = {
            enunciado: this.enunciado,
            enunciadoEn: this.enunciadoEn,
            vestibular: this.vestibular,
            anoVestibular: parseInt(this.anoVestibular, 10),
            idDoLivro: parseInt(this.idDoLivro, 10),
        };

        if (dadosAlternativas) {
            // Atualiza o registro das alternativas quando os dados são informados.
            data.alternativas = {
                update: {
                    ...dadosAlternativas,
                },
            };
        }

        return prisma.questoes.update({
            where: { id: parseInt(this.id, 10) },
            data,
            include: { alternativas: true },
        });
    }

    async deletar() {
        // Remove a questão do banco de dados pelo id.
        // Se não houver id definido, evita a exclusão.
        if (!this.id) {
            throw new Error('ID não fornecido.');
        }

        return prisma.questoes.delete({ where: { id: parseInt(this.id, 10) } });
    }

    static async buscarTodos(filtros = {}) {
        // Busca todas as questões aplicando filtros opcionais.
        // Inclui as alternativas e o livro associado no resultado.
        const where = {};

        if (filtros.enunciado) {
            where.enunciado = { contains: filtros.enunciado, mode: 'insensitive' };
        }

        if (filtros.enunciadoEn) {
            where.enunciadoEn = { contains: filtros.enunciadoEn, mode: 'insensitive' };
        }

        if (filtros.vestibular) {
            where.vestibular = { contains: filtros.vestibular, mode: 'insensitive' };
        }

        if (filtros.anoVestibular !== undefined && filtros.anoVestibular !== '') {
            where.anoVestibular = parseInt(filtros.anoVestibular);
        }

        if (filtros.idDoLivro !== undefined && filtros.idDoLivro !== '') {
            where.idDoLivro = parseInt(filtros.idDoLivro);
        }

        return prisma.questoes.findMany({
            where,
            include: {
                alternativas: true,
                livro: true,
            },
        });
    }

    static async buscarPorId(id) {
        // Busca uma questão por id e retorna a entidade com alternativas e livro relacionados.
        // Se não encontrar a questão, retorna null.
        const data = await prisma.questoes.findUnique({
            where: { id: parseInt(id, 10) }, // ← corrigido: era this.id
            include: {
                alternativas: true,
                livro: true,
            },
        });

        if (!data) return null;

        return new QuestoesModel(data);
    }
}
