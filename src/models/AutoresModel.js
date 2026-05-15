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

    validar() {
        if (!this.nome || this.nome.trim() === '') {
            throw new Error('O nome é um campo obrigatório.');
        }

        if (!this.descricao || this.descricao.trim() === '') {
            throw new Error('A descrição é um campo obrigatório.');
        }

        if (!this.descricaoEn || this.descricaoEn.trim() === '') {
            throw new Error('A descrição em inglês é um campo obrigatório.');
        }

        if (!this.contextoHistorico || this.contextoHistorico.trim() === '') {
            throw new Error('O contexto histórico é um campo obrigatório.');
        }

        if (!this.contextoHistoricoEn || this.contextoHistoricoEn.trim() === '') {
            throw new Error('O contexto histórico em inglês é um campo obrigatório.');
        }

        if (this.anoNascimento === undefined || this.anoNascimento === null) {
            throw new Error('O ano de nascimento é um campo obrigatório.');
        }

        if (isNaN(parseInt(this.anoNascimento, 10)) || parseInt(this.anoNascimento, 10) < 0) {
            throw new Error('O ano de nascimento deve ser um número válido.');
        }

        if (!this.biografia || this.biografia.trim() === '') {
            throw new Error('A biografia é um campo obrigatório.');
        }

        if (!this.biografiaEn || this.biografiaEn.trim() === '') {
            throw new Error('A biografia em inglês é um campo obrigatório.');
        }

        if (!this.fotoURL || this.fotoURL.trim() === '') {
            throw new Error('A foto é um campo obrigatório.');
        }

        if (this.anoFalecimento !== null && this.anoFalecimento !== undefined) {
            if (isNaN(parseInt(this.anoFalecimento, 10)) || parseInt(this.anoFalecimento, 10) < 0) {
                throw new Error('O ano de falecimento deve ser um número válido.');
            }

            if (parseInt(this.anoFalecimento, 10) < parseInt(this.anoNascimento, 10)) {
                throw new Error('O ano de falecimento não pode ser anterior ao ano de nascimento.');
            }
        }
    }

    async criar(idLivroParaConectar = null) {
        this.validar();

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

        this.validar();

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
