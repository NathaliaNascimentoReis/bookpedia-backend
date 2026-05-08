import prisma from '../lib/services/prismaClient.js';

export default class EnredosModel {
    constructor({ id = null, introducao, introducaoEn, conflito, conflitoEn, climax, climaxEn, desfecho, desfechoEn, idDoLivro
} = {}) {
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
                idDoLivro: this.idDoLivro
            },
        });
    }

    async atualizar() {
        return prisma.enredos.update({
            where: { id: this.id },
            data: {
                introducao: this.introducao,
                introducaoEn: this.introducaoEn,
                conflito: this.conflito,
                conflitoEn: this.conflitoEn,
                climax: this.climax,
                climaxEn: this.climaxEn,
                desfecho: this.desfecho,
                desfechoEn: this.desfechoEn,
                idDoLivro: this.idDoLivro
            },
        });
    }

    async deletar() {
        return prisma.enredos.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.introducao) {
            where.introducao = { contains: filtros.introducao, mode: 'insensitive' };
        }
        if (filtros.introducaoEn) {
            where.introducaoEn = { contains: filtros.introducaoEn, mode: 'insensitive' };
        }
        if (filtros.conflito) {
            where.conflito = { contains: filtros.conflito, mode: 'insensitive' };
        }
        if (filtros.conflitoEn) {
            where.conflitoEn = { contains: filtros.conflitoEn, mode: 'insensitive' };
        }
        if (filtros.climax) {where.climax = {contains: filtros.climax,mode: 'insensitive',
            };
        }
        if (filtros.climaxEn) {where.climaxEn = {contains: filtros.climaxEn,mode: 'insensitive',
            };
        }
        if (filtros.desfecho) {
            where.desfecho = { contains: filtros.desfecho, mode: 'insensitive' };
        }
        if (filtros.desfechoEn) {
            where.desfechoEn = { contains: filtros.desfechoEn, mode: 'insensitive' };
        }
        if (filtros.idDoLivro !== undefined) {
            where.idDoLivro = parseFloat(filtros.idDoLivro);
        }
        return prisma.enredos.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.enredos.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new EnredosModel(data);
    }
}
