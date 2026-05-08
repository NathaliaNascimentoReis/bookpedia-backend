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
        this.id = id;
        this.tituloCuriosidade = tituloCuriosidade;
        this.tituloCuriosidadeEn = tituloCuriosidadeEn;
        this.curiosidadeEn = curiosidadeEn;
        this.curiosidade = curiosidade;
        this.idDoLivro = idDoLivro;
    }

    async criar() {
        return prisma.curiosidade.create({
            data: {
                nome: this.nome,
                caracteristicas: this.caracteristicas,
                caracteristicasEn: this.caracteristicasEn,
                descricaoEn: this.descricaoEn,
                descricao: this.descricao,
                fotoURL: this.fotoURL,
                idDoLivro: this.idDoLivro,
            },
        });
    }

    async atualizar() {
        return prisma.curiosidade.update({
            where: { id: this.id },
            data: {
                nome: this.nome,
                caracteristicas: this.caracteristicas,
                caracteristicasEn: this.caracteristicasEn,
                descricao: this.descricao,
                descricaoEn: this.descricaoEn,
                fotoURL: this.fotoURL,
                idDoLivro: this.idDoLivro,
            },
        });
    }

    async deletar() {
        return prisma.curiosidade.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.tituloCuriosidade) {
            where.tituloCuriosidade = { contains: filtros.tituloCuriosidade, mode: 'insensitive' };
        }
        if (filtros.tituloCuriosidadeEn) {
            where.tituloCuriosidadeEn = { contains: filtros.tituloCuriosidadeEn, mode: 'insensitive' };
        }
        if (filtros.curiosidade) {
            where.curiosidade = { contains: filtros.curiosidade, mode: 'insensitive' };
        }
        if (filtros.curiosidadeEn) {
            where.curiosidadeEn = { contains: filtros.curiosidadeEn, mode: 'insensitive' };
        }
        if (filtros.idDoLivro !== undefined) {
            where.idDoLivro = parseFloat(filtros.idDoLivro);
        }

        return prisma.curiosidade.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.curiosidade.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new CuriosidadesModel(data);
    }
}
