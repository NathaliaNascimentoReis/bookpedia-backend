import prisma from '../lib/services/prismaClient.js';

export default class AutoresModel {
    constructor({ id = null,
    nome,
    descricao,
    descricaoEn,
    contextoHistorico,
    contextoHistoricoEn,
    anoNascimento,
    anoFalecimento,
    biografia,
    biografiaEn,
    movimentosLiterario,
    fotoURL,
    idDoLivro  } = {}) {

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
        this.movimentosLiterario = movimentosLiterario;
        this.fotoURL = fotoURL;
        this.idDoLivro = idDoLivro;

    }

    async criar() {
        return prisma.autores.create({
            data: {
                nome: this.nome,
                descricao: this.descricao,
                descricaoEn: this.descricaoEn,
                contextoHistorico: this.contextoHistorico,
                contextoHistoricoEn: this.contextoHistoricoEn,
                anoNascimento: this.anoNascimento,
                anoFalecimento: this.anoFalecimento,
                biografia: this.biografia,
                biografiaEn: this.biografiaEn,
                movimentosLiterario: this.movimentosLiterario,
                fotoURL: this.fotoURL,
                idDoLivro: this.idDoLivro,
            },
        });
    }

    async atualizar() {
        return prisma.autores.update({
            where: { id: this.id },
            data: {
                nome: this.nome,
                descricao: this.descricao,
                descricaoEn: this.descricaoEn,
                contextoHistorico: this.contextoHistorico,
                contextoHistoricoEn: this.contextoHistoricoEn,
                anoNascimento: this.anoNascimento,
                anoFalecimento: this.anoFalecimento,
                biografia: this.biografia,
                biografiaEn: this.biografiaEn,
                movimentosLiterario: this.movimentosLiterario,
                fotoURL: this.fotoURL,
                idDoLivro: this.idDoLivro,
            },
        });
    }

    async deletar() {
        return prisma.autores.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.nome) {
            where.nome = { contains: filtros.nome, mode: 'insensitive' };
        }
        if (filtros.descricao) {
            where.descricao = { contains: filtros.descricao, mode: 'insensitive' };
        }
        if (filtros.descricaoEn) {
            where.descricaoEn = { contains: filtros.descricaoEn, mode: 'insensitive' };
        }
        if (filtros.contextoHistorico) {
            where.contextoHistorico = { contains: filtros.contextoHistorico, mode: 'insensitive' };
        }
        if (filtros.contextoHistoricoEn) {
            where.contextoHistoricoEn = { contains: filtros.contextoHistoricoEn, mode: 'insensitive' };
        }
        if (filtros.anoNascimento !== undefined) {
            where.anoNascimento = parseFloat(filtros.anoNascimento);
        }
        if (filtros.anoFalecimento !== undefined) {
            where.anoFalecimento = parseFloat(filtros.anoFalecimento);
        }
        if (filtros.biografia) {
            where.biografia = { contains: filtros.biografia, mode: 'insensitive' };
        }
        if (filtros.biografiaEn) {
            where.biografiaEn = { contains: filtros.biografiaEn, mode: 'insensitive' };
        }
        if (filtros.movimentosLiterario) {
            where.movimentosLiterario = { contains: filtros.movimentosLiterario, mode: 'insensitive' };
        }
        if (filtros.fotoURL) {
            where.fotoURL = { contains: filtros.fotoURL, mode: 'insensitive' };
        }

        if (filtros.idDoLivro !== undefined) {
            where.idDoLivro = parseFloat(filtros.idDoLivro);
        }

        return prisma.autores.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.autores.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new AutoresModel(data);
    }
}
