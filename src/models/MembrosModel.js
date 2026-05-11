import prisma from '../lib/services/prismaClient.js';

export default class MembrosModel {
    constructor({
        id = null,
        nome,
        idade,
        curso,
        cursoEn,
        descricao,
        descricaoEn,
        cargo,
        avaliacaoDaObra,
        diasDeLeitura,
        opiniao,
        idDoProjeto = null,
    } = {}) {
        this.id = id;
        this.nome = nome;
        this.idade = idade;
        this.curso = curso;
        this.cursoEn = cursoEn;
        this.descricao = descricao;
        this.descricaoEn = descricaoEn;
        this.cargo = cargo;
        this.avaliacaoDaObra = avaliacaoDaObra;
        this.diasDeLeitura = diasDeLeitura;
        this.opiniao = opiniao;
        this.idDoProjeto = idDoProjeto;
    }

    validar() {
        if (!this.nome) {
            throw new Error('O nome é um campo obrigatório.');
        }

        if (this.idade === undefined || this.idade === null || this.idade === '') {
            throw new Error('A idade é um campo obrigatório.');
        }

        if (isNaN(parseInt(this.idade, 10)) || parseInt(this.idade, 10) < 0) {
            throw new Error('A idade deve ser um número válido.');
        }

        if (!this.curso) {
            throw new Error('O curso é um campo obrigatório.');
        }

        if (!this.cursoEn) {
            throw new Error('O curso em inglês é um campo obrigatório.');
        }

        if (!this.descricao) {
            throw new Error('A descrição é um campo obrigatório.');
        }

        if (!this.descricaoEn) {
            throw new Error('A descrição em inglês é um campo obrigatório.');
        }

        if (!this.cargo) {
            throw new Error('O cargo é um campo obrigatório.');
        }

        if (
            this.avaliacaoDaObra === undefined ||
            this.avaliacaoDaObra === null ||
            this.avaliacaoDaObra === ''
        ) {
            throw new Error('A avaliação da obra é um campo obrigatório.');
        }

        if (isNaN(parseInt(this.avaliacaoDaObra, 10)) || parseInt(this.avaliacaoDaObra, 10) < 0) {
            throw new Error('A avaliação da obra deve ser um número válido.');
        }

        if (
            this.diasDeLeitura === undefined ||
            this.diasDeLeitura === null ||
            this.diasDeLeitura === ''
        ) {
            throw new Error('Os dias de leitura são um campo obrigatório.');
        }

        if (isNaN(parseInt(this.diasDeLeitura, 10)) || parseInt(this.diasDeLeitura, 10) < 0) {
            throw new Error('Os dias de leitura devem ser um número válido.');
        }

        if (!this.opiniao) {
            throw new Error('A opinião é um campo obrigatório.');
        }

        if (
            this.idDoProjeto === undefined ||
            this.idDoProjeto === null ||
            this.idDoProjeto === ''
        ) {
            throw new Error('O projeto é um campo obrigatório.');
        }

        if (isNaN(parseInt(this.idDoProjeto, 10)) || parseInt(this.idDoProjeto, 10) < 0) {
            throw new Error('O projeto deve ser um número válido.');
        }
    }

    async criar() {
        this.validar();

        return prisma.membros.create({
            data: {
                nome: this.nome,
                idade: parseInt(this.idade, 10),
                curso: this.curso,
                cursoEn: this.cursoEn,
                descricao: this.descricao,
                descricaoEn: this.descricaoEn,
                cargo: this.cargo,
                avaliacaoDaObra: parseInt(this.avaliacaoDaObra, 10),
                diasDeLeitura: parseInt(this.diasDeLeitura, 10),
                opiniao: this.opiniao,
                idDoProjeto: parseInt(this.idDoProjeto, 10),
            },
        });
    }

    async atualizar() {
        if (!this.id) {
            throw new Error('ID não fornecido');
        }

        this.validar();

        return prisma.membros.update({
            where: { id: parseInt(this.id, 10) },

            data: {
                nome: this.nome,
                idade: parseInt(this.idade, 10),
                curso: this.curso,
                cursoEn: this.cursoEn,
                descricao: this.descricao,
                descricaoEn: this.descricaoEn,
                cargo: this.cargo,
                avaliacaoDaObra: parseInt(this.avaliacaoDaObra, 10),
                diasDeLeitura: parseInt(this.diasDeLeitura, 10),
                opiniao: this.opiniao,
                idDoProjeto: parseInt(this.idDoProjeto, 10),
            },
        });
    }

    async deletar() {
        if (!this.id) {
            throw new Error('ID não fornecido');
        }

        return prisma.membros.delete({ where: { id: parseInt(this.id, 10) } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.nome) {
            where.nome = { contains: filtros.nome, mode: 'insensitive' };
        }

        if (filtros.curso) {
            where.curso = { contains: filtros.curso, mode: 'insensitive' };
        }

        if (filtros.cursoEn) {
            where.cursoEn = { contains: filtros.cursoEn, mode: 'insensitive' };
        }

        if (filtros.cargo) {
            where.cargo = { contains: filtros.cargo, mode: 'insensitive' };
        }

        if (filtros.idDoProjeto !== undefined && filtros.idDoProjeto !== '') {
            where.idDoProjeto = parseInt(filtros.idDoProjeto, 10);
        }

        return prisma.membros.findMany({
            where,
            include: { projeto: true },
        });
    }

    static async buscarPorId(id) {
        const data = await prisma.membros.findUnique({
            where: { id: parseInt(id, 10) },
            include: { projeto: true },
        });

        if (!data) return null;

        return new MembrosModel(data);
    }
}
