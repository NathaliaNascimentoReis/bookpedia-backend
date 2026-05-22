// Importa a instância do Prisma Client usada pelo modelo para acessar o banco de dados.
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
        cargoEn,
        avaliacaoDaObra,
        diasDeLeitura,
        opiniao,
        idDoProjeto = null,
    } = {}) {
        // Esse modelo representa um participante associado a um projeto.
        this.id = id;
        this.nome = nome;
        this.idade = idade;
        this.curso = curso;
        this.cursoEn = cursoEn;
        this.descricao = descricao;
        this.descricaoEn = descricaoEn;
        this.cargo = cargo;
        this.cargoEn = cargoEn;
        this.avaliacaoDaObra = avaliacaoDaObra;
        this.diasDeLeitura = diasDeLeitura;
        this.opiniao = opiniao;
        this.idDoProjeto = idDoProjeto;
    }

    async criar() {
        // Cria um novo membro no banco de dados usando os valores da instância.

        return prisma.membros.create({
            data: {
                nome: this.nome,
                idade: parseInt(this.idade, 10),
                curso: this.curso,
                cursoEn: this.cursoEn,
                descricao: this.descricao,
                descricaoEn: this.descricaoEn,
                cargo: this.cargo,
                cargoEn: this.cargoEn,
                avaliacaoDaObra: parseInt(this.avaliacaoDaObra, 10),
                diasDeLeitura: parseInt(this.diasDeLeitura, 10),
                opiniao: this.opiniao,
                idDoProjeto: Number(this.idDoProjeto),
            },
        });
    }

    async atualizar() {
        // Atualiza o registro de membro existente identificado pelo id.
        // Lança erro se o id não estiver presente na instância.
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
                cargoEn: this.cargoEn,
                avaliacaoDaObra: parseInt(this.avaliacaoDaObra, 10),
                diasDeLeitura: parseInt(this.diasDeLeitura, 10),
                opiniao: this.opiniao,
                idDoProjeto: this.idDoProjeto ? Number(this.idDoProjeto) : undefined,
            },
        });
    }

    async deletar() {
        // Exclui o membro do banco de dados usando seu id.
        // Caso o id não esteja definido, evita a operação.
        if (!this.id) {
            throw new Error('ID não fornecido.');
        }

        return prisma.membros.delete({ where: { id: Number(this.id) } });
    }

    static async buscarTodos(filtros = {}) {
        // Busca todos os membros aplicando filtros opcionais.
        // Permite pesquisar por nome, curso, cargo e id do projeto.
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
        if (filtros.cargoEn) {
            where.cargo = { contains: filtros.cargo, mode: 'insensitive' };
        }

        if (filtros.idDoProjeto !== undefined && filtros.idDoProjeto !== '') {
            where.idDoProjeto = parseInt(filtros.idDoProjeto, 10);
        }

        return prisma.membros.findMany({
            // Aqui é usado o filtro de projeto para retornar apenas membros do projeto informado.
            where: {
                idDoProjeto: idDoProjeto ? Number(idDoProjeto) : undefined,
            },
            include: {
                projetos: true,
            },
        });
    }

    static async buscarPorId(id) {
        // Busca um membro pelo seu id e inclui o projeto associado.
        // Retorna null caso o registro não exista.
        const data = await prisma.membros.findUnique({
            where: {
                id: Number(id),
            },
            include: {
                projetos: true,
            },
        });

        if (!data) return null;

        return new MembrosModel(data);
    }
}
