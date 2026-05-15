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
        this.id = id;
        this.enunciado = enunciado;
        this.enunciadoEn = enunciadoEn;
        this.vestibular = vestibular;
        this.anoVestibular = anoVestibular;
        this.idDoLivro = idDoLivro;
        this.alternativas = alternativas;
    }

    validar() {
        if (!this.enunciado || this.enunciado.trim() === '') {
            throw new Error('O enunciado é um campo obrigatório.');
        }

        if (!this.enunciadoEn || this.enunciadoEn.trim() === '') {
            throw new Error('O enunciado em inglês é um campo obrigatório.');
        }

        if (!this.vestibular || this.vestibular.trim() === '') {
            throw new Error('O vestibular é um campo obrigatório.');
        }

        if (this.anoVestibular === undefined || this.anoVestibular === null || this.anoVestibular === '') {
            throw new Error('O ano do vestibular é um campo obrigatório.');
        }

        if (isNaN(parseInt(this.anoVestibular, 10)) || parseInt(this.anoVestibular, 10) < 0) {
            throw new Error('O ano do vestibular deve ser um número válido.');
        }

        if (this.idDoLivro === undefined || this.idDoLivro === null || this.idDoLivro === '') {
            throw new Error('O livro é um campo obrigatório.');
        }

        if (isNaN(parseInt(this.idDoLivro, 10)) || parseInt(this.idDoLivro, 10) < 0) {
            throw new Error('O livro deve ser um número válido.');
        }
    }

    async criar(dadosAlternativas) {
        this.validar();

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
        if (!this.id) {
            throw new Error('ID não fornecido.');
        }

        this.validar();

        const data = {
            enunciado: this.enunciado,
            enunciadoEn: this.enunciadoEn,
            vestibular: this.vestibular,
            anoVestibular: parseInt(this.anoVestibular, 10),
            idDoLivro: parseInt(this.idDoLivro, 10),
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
            throw new Error('ID não fornecido.');
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