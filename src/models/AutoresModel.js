import prisma from '../lib/services/prismaClient.js';

export default class AutoresModel {
    constructor({
        id = null,
        nome,
        descricao,
        descricaoEn,
        contextoHistorico,
        contextoHistoricoEn,
        anoNascimento,
        anoFalecimento,
        biografia,
        biografiaEn,
        fotoURL,
    } = {}) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.descricaoEn = descricaoEn;
        this.contextoHistorico = contextoHistorico;
        this.contextoHistoricoEn = contextoHistoricoEn;
        this.anoNascimento = anoNascimento;
        this.anoFalecimento = anoFalecimento;
        this.biografia = biografia;
        this.biografiaEn = biografiaEn;
        this.fotoURL = fotoURL;
    }

    async criar(idLivroParaConectar = null) {
        const data = {
            nome: this.nome,
            descricao: this.descricao,
            descricaoEn: this.descricaoEn,
            contextoHistorico: this.contextoHistorico,
            contextoHistoricoEn: this.contextoHistoricoEn,
            anoNascimento: parseInt(this.anoNascimento, 10),
            anoFalecimento: this.anoFalecimento ? parseInt(this.anoFalecimento, 10) : null,
            biografia: this.biografia,
            biografiaEn: this.biografiaEn,
            fotoURL: this.fotoURL,
        };

        if (idLivroParaConectar) {
            data.livros = { connect: { id: parseInt(idLivroParaConectar) } };
        }

        return prisma.autores.create({ data });
    }

    async atualizar() {
        if (!this.id) {
            throw new Error('ID não fornecido.');
        }
        return prisma.autores.update({
            where: { id: parseInt(this.id) },
            data: {
                nome: this.nome,
                descricao: this.descricao,
                descricaoEn: this.descricaoEn,
                contextoHistorico: this.contextoHistorico,
                contextoHistoricoEn: this.contextoHistoricoEn,
                anoNascimento: parseInt(this.anoNascimento, 10),
                anoFalecimento: this.anoFalecimento ? parseInt(this.anoFalecimento, 10) : null,
                biografia: this.biografia,
                biografiaEn: this.biografiaEn,
                fotoURL: this.fotoURL,
            },
        });
    }

    async deletar() {
        if (!this.id) {
            throw new Error('ID não fornecido.');
        }

        return prisma.autores.delete({ where: { id: parseInt(this.id, 10) } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.nome) {
            where.nome = { contains: filtros.nome, mode: 'insensitive' };
        }

        if (filtros.anoNascimento !== undefined) {
            where.anoNascimento = parseInt(filtros.anoNascimento, 10);
        }

        if (filtros.anoFalecimento !== undefined) {
            where.anoFalecimento = parseInt(filtros.anoFalecimento, 10);
        }

        return prisma.autores.findMany({ where, include: { livros: true } });
    }

    static async buscarPorId(id) {
        const data = await prisma.autores.findUnique({
            where: { id: parseInt(id, 10) },
            include: { livros: true },
        });

        if (!data) return null;
        return data;
    }
}
