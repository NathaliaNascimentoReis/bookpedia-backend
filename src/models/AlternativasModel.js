import prisma from '../lib/services/prismaClient.js';

export default class AlternativasModel {
    constructor({
        id = null,
        alternativaA,
        alternativaAEn,
        alternativaB,
        alternativaBEn,
        alternativaC,
        alternativaCEn,
        alternativaD,
        alternativaDEn,
        respostaCorreta,
        justificativa,
        justificativaEn
        
    } = {}) {
        this.id = id;
        this.alternativaA = alternativaA;
        this.alternativaAEn = alternativaAEn;
        this.alternativaB = alternativaB;
        this.alternativaBEn = alternativaBEn;
        this.alternativaC = alternativaC;
        this.alternativaCEn = alternativaCEn;
        this.alternativaD = alternativaD;
        this.alternativaDEn = alternativaDEn;
        this.respostaCorreta = respostaCorreta;
        this.justificativa = justificativa;
        this.justificativaEn = justificativaEn;
    }

    async criar() {
        return prisma.alternativas.create({
            data: {
                alternativaA: this.alternativaA,
                alternativaAEn: this.alternativaAEn,
                alternativaB: this.alternativaB,
                alternativaBEn: this.alternativaBEn,
                alternativaC: this.alternativaC,
                alternativaCEn: this.alternativaCEn,
                alternativaD: alternativaD,
                alternativaDEn: alternativaDEn,
                respostaCorreta: respostaCorreta,
                justificativa: justificativa,
                justificativaEn: justificativaEn,
            },
        });
    }

    async atualizar() {
        return prisma.alternativas.update({
            where: { id: this.id },
            data: {
                alternativaA: this.alternativaA,
                alternativaAEn: this.alternativaAEn,
                alternativaB: this.alternativaB,
                alternativaBEn: this.alternativaBEn,
                alternativaC: this.alternativaC,
                alternativaCEn: this.alternativaCEn,
                alternativaD: alternativaD,
                alternativaDEn: alternativaDEn,
                respostaCorreta: respostaCorreta,
                justificativa: justificativa,
                justificativaEn: justificativaEn,
            },
        });
    }

    async deletar() {
        return prisma.alternativas.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.alternativaA) {
            where.alternativaA = { contains: filtros.alternativaA, mode: 'insensitive' };
        }
        if (filtros.alternativaAEn) {
            where.alternativaAEn = { contains: filtros.alternativaAEn, mode: 'insensitive' };
        }
        if (filtros.alternativaB) {
            where.alternativaB = { contains: filtros.alternativaB, mode: 'insensitive' };
        }
        if (filtros.alternativaBEn) {
            where.alternativaBEn = { contains: filtros.alternativaBEn, mode: 'insensitive' };
        }
        if (filtros.alternativaC) {
            where.alternativaC = { contains: filtros.alternativaC, mode: 'insensitive' };
        }
        if (filtros.alternativaCEn) {
            where.alternativaCEn = { contains: filtros.alternativaCEn, mode: 'insensitive' };
        }
        if (filtros.alternativaD) {
            where.alternativaD = { contains: filtros.alternativaD, mode: 'insensitive' };
        }
        if (filtros.alternativaDEn) {
            where.alternativaDEn = { contains: filtros.alternativaDEn, mode: 'insensitive' };
        }
        if (filtros.respostaCorreta) {
            where.respostaCorreta = { contains: filtros.respostaCorreta, mode: 'insensitive' };
        }
        if (filtros.justificativa) {
            where.justificativa = { contains: filtros.justificativa, mode: 'insensitive' };
        }

        if (filtros.justificativaEn) {
            where.justificativaEn = { contains: filtros.justificativaEn, mode: 'insensitive' };
        }

        return prisma.alternativas.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.alternativas.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new AlternativasModel(data);
    }
}
