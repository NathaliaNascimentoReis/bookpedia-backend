import prisma from '../lib/services/prismaClient.js';

export default class QuestoesModel {
    constructor({
        id = null,
        enunciado,
        enunciadoEn,
        vestibular,
        anoVestibular,
        idAlternativas = null,
        idDoLivro = null,
        alternativas = null,
    } = {}) {
        this.id = id;
        this.enunciado = enunciado;
        this.enunciadoEn = enunciadoEn;
        this.vestibular = vestibular;
        this.anoVestibular = anoVestibular;
        this.idDoLivro = idDoLivro;
        this.alternativas = alternativas;
    }

    async criar(dadosAlternativas) {
        return prisma.questoes.create({
            data: {
                enunciado: this.enunciado,
                enunciadoEn: this.enunciadoEn,
                vestibular: this.vestibular,
                anoVestibular: parseInt(this.anoVestibular, 10),
                idDoLivro: this.idDoLivro ? parseInt(this.idDoLivro, 10) : undefined,
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
        if (!this.id) throw new Error('ID não fornecido');

        const data = {
            enunciado: this.enunciado,
            enunciadoEn: this.enunciadoEn,
            vestibular: this.vestibular,
            anoVestibular: parseInt(this.anoVestibular, 10),
            idDoLivro: this.idDoLivro ? parseInt(this.idDoLivro, 10) : undefined,
        };

        if (dadosAlternativas) {
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
        if (!this.id) {
            throw new Error('ID não fornecido');
        }

        return prisma.questoes.delete({ where: { id: parseInt(this.id, 10) } });
    }

    static async buscarTodos(filtros = {}) {
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
        const data = await prisma.questoes.findUnique({
            where: { id: parseInt(this.id, 10) },
            include: {
                alternativas: true,
                livro: true,
            },
        });

        if (!data) return null;

        return new QuestoesModel(data);
    }
}
