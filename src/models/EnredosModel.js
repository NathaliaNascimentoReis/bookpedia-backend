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
                idDoLivro: parseInt(this.idDoLivro, 10),
            },
        });
    }

    async atualizar() {
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
                idDoLivro: parseInt(this.idDoLivro, 10),
            },
        });
    }

    async deletar() {
        if (!this.id) {
            throw new Error('ID não fornecido.');
        }

        return prisma.enredos.delete({ where: { id: parseInt(this.id, 10) } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.idDoLivro !== undefined && filtros.idDoLivro !== '') {
            where.idDoLivro = parseInt(filtros.idDoLivro, 10);
        }

        return prisma.enredos.findMany({ where, include: { livro: true } });
    }

    static async buscarPorId(id) {
        const data = await prisma.enredos.findUnique({
            where: { id: parseInt(id, 10) },
            include: { livro: true },
        });

        if (!data) return null;

        return new EnredosModel(data);
    }
}
