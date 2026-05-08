import prisma from '../lib/services/prismaClient.js';

export default class CenariosModel {
    constructor({
        id = null,
        nome,
        caracteristicas,
        caracteristicasEn,
        descricao,
        descricaoEn,
        fotoURL,
        idDoLivro,

    } = {}) {
        this.id = id;
        this.nome = nome;
        this.caracteristicas = caracteristicas;
        this.caracteristicasEn = caracteristicasEn;
        this.descricaoEn = descricaoEn;
        this.descricao = descricao;
        this.fotoURL = fotoURL;
        this.idDoLivro = idDoLivro;

    }

    async criar() {
        return prisma.cenarios.create({
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
        return prisma.cenarios.update({
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
        return prisma.cenarios.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.nome) {
            where.nome = { contains: filtros.nome, mode: 'insensitive' };
        }
        if (filtros.caracteristicas) {
            where.caracteristicas = { contains: filtros.caracteristicas, mode: 'insensitive' };
        }
        if (filtros.caracteristicasEn) {
            where.caracteristicasEn = { contains: filtros.caracteristicasEn, mode: 'insensitive' };
        }
        if (filtros.descricao) {
            where.descricao = { contains: filtros.descricao, mode: 'insensitive' };
        }
        if (filtros.descricaoEn) {where.descricaoEn = {contains: filtros.contextoHistoricoEn,mode: 'insensitive',
            };
        }
        if (filtros.fotoURL) {where.fotoURL = {contains: filtros.fotoURL,mode: 'insensitive',
            };
        }
        if (filtros.idDoLivro !== undefined) {where.idDoLivro = parseFloat(filtros.idDoLivro);
        }

        return prisma.cenarios.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.cenarios.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new CenariosModel(data);
    }
}
