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

    async criar() {

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
                idDoProjeto: Number(this.idDoProjeto),
            },
        });
    }

    async atualizar() {
        if (!this.id) {
            throw new Error('ID não fornecido.');
        }


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
                idDoProjeto: this.idDoProjeto ? Number(this.idDoProjeto) : undefined,
            },
        });
    }

    async deletar() {
        if (!this.id) {
            throw new Error('ID não fornecido.');
        }

        return prisma.membros.delete({ where: { id: Number(this.id) } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};
        const idDoProjeto = filtros.idDoProjeto;

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
            where: {
                idDoProjeto: idDoProjeto ? Number(idDoProjeto) : undefined,
            },
            include: {
                projetos: true,
            }

           
        });
    }

    static async buscarPorId(id) {
        const data = await prisma.membros.findUnique({
           where: {
            id: Number(id),
           },
           include: {
            projetos: true,
           }
        });

        if (!data) return null;

        return new MembrosModel(data);
    }
}