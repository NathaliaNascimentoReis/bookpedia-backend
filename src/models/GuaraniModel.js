import prisma from '../lib/services/prismaClient.js';

export default class GuaraniModel {
    constructor({ id = null, nome, estado = true, preco = null } = {}) {
        this.id = id;
        this.nome = nome;
        this.estado = estado;
        this.preco = preco;
    }

    async criar() {
        return prisma.guarani.create({
            data: {
                nome: this.nome,
                estado: this.estado,
                preco: this.preco,
            },
        });
    }

    async atualizar() {
        return prisma.guarani.update({
            where: { id: this.id },
            data: { nome: this.nome, estado: this.estado, preco: this.preco },
        });
    }

    async deletar() {
        return prisma.guarani.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.nome) {
            where.nome = { contains: filtros.nome, mode: 'insensitive' };
        }
        if (filtros.estado !== undefined) {
            where.estado = filtros.estado === 'true';
        }
        if (filtros.preco !== undefined) {
            where.preco = parseFloat(filtros.preco);
        }

        return prisma.guarani.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.guarani.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new GuaraniModel(data);
    }
}