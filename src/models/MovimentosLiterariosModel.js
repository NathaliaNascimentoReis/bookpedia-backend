import prisma from '../lib/services/prismaClient.js';

export default class MovimentosLiterariosModel {
    constructor({
        id = null,
        nome,
        contextoHistorico,
        contextoHistoricoEn,
        caracteristicas,
        caracteristicasEn,
        periodo,
        fase,
        influencia,
    } = {}) {
        this.id = id;
        this.nome = nome;
        this.contextoHistorico = contextoHistorico;
        this.contextoHistoricoEn = contextoHistoricoEn;
        this.caracteristicas = caracteristicas;
        this.caracteristicasEn = caracteristicasEn;
        this.periodo = periodo;
        this.fase = fase;
        this.influencia = influencia;
    }

    validar() {
        if (!this.nome || this.nome.trim() === '') {
            throw new Error('O nome é um campo obrigatório.');
        }

        if (!this.contextoHistorico || this.contextoHistorico.trim() === '') {
            throw new Error('O contexto histórico é um campo obrigatório.');
        }

        if (!this.contextoHistoricoEn || this.contextoHistoricoEn.trim() === '') {
            throw new Error('O contexto histórico em inglês é um campo obrigatório.');
        }

        if (!this.caracteristicas || this.caracteristicas.trim() === '') {
            throw new Error('As características são um campo obrigatório.');
        }

        if (!this.caracteristicasEn || this.caracteristicasEn.trim() === '') {
            throw new Error('As características em inglês são um campo obrigatório.');
        }

        if (!this.periodo || this.periodo.trim() === '') {
            throw new Error('O período é um campo obrigatório.');
        }

        if (!this.fase || this.fase.trim() === '') {
            throw new Error('A fase é um campo obrigatório.');
        }

        if (!this.influencia || this.influencia.trim() === '') {
            throw new Error('A influência é um campo obrigatório.');
        }
    }

    async criar(idLivroParaConectar = null) {
        this.validar();

        const data = {
            nome: this.nome,
            contextoHistorico: this.contextoHistorico,
            contextoHistoricoEn: this.contextoHistoricoEn,
            caracteristicas: this.caracteristicas,
            caracteristicasEn: this.caracteristicasEn,
            periodo: this.periodo,
            fase: this.fase,
            influencia: this.influencia,
        };

        if (idLivroParaConectar) {
            data.livros = {
                connect: { id: parseInt(idLivroParaConectar, 10) },
            };
        }

        return prisma.movimentosLiterarios.create({ data });
    }

    async atualizar() {
        if (!this.id) {
            throw new Error('ID não fornecido.');
        }

        this.validar();

        return prisma.movimentosLiterarios.update({
            where: { id: parseInt(this.id, 10) },
            data: {
                nome: this.nome,
                contextoHistorico: this.contextoHistorico,
                contextoHistoricoEn: this.contextoHistoricoEn,
                caracteristicas: this.caracteristicas,
                caracteristicasEn: this.caracteristicasEn,
                periodo: this.periodo,
                fase: this.fase,
                influencia: this.influencia,
            },
        });
    }

    async deletar() {
        if (!this.id) {
            throw new Error('ID não fornecido.');
        }

        return prisma.movimentosLiterarios.delete({ where: { id: parseInt(this.id, 10) } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.nome) {
            where.nome = { contains: filtros.nome, mode: 'insensitive' };
        }

        if (filtros.influencia) {
            where.influencia = { contains: filtros.influencia, mode: 'insensitive' };
        }

        if (filtros.idDoLivro && filtros.idDoLivro !== '') {
            where.livros = {
                some: {
                    id: parseInt(filtros.idDoLivro, 10),
                },
            };
        }

        return prisma.movimentosLiterarios.findMany({ where, include: { livros: true } });
    }

    static async buscarPorId(id) {
        const data = await prisma.movimentosLiterarios.findUnique({
            where: { id: parseInt(id, 10) },
            include: { livros: true },
        });

        if (!data) return null;

        return new MovimentosLiterariosModel(data);
    }
}