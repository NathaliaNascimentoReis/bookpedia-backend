import prisma from '../lib/services/prismaClient.js';

export default class ProjetosModel {
    constructor({
        id = null,
        nome,
        introducao,
        introducaoEn,
        objetivoProjeto,
        objetivoProjetoEn,
        sobreAEquipe,
        sobreAEquipeEn,
        desenvolvimentoTecnico,
        desenvolvimentoTecnicoEn,
        tecnologias,
        integracaoAPI,
        integracaoAPIEn,
    } = {}) {
        this.id = id;
        this.nome = nome;
        this.introducao = introducao;
        this.introducaoEn = introducaoEn;
        this.objetivoProjeto = objetivoProjeto;
        this.objetivoProjetoEn = objetivoProjetoEn;
        this.sobreAEquipe = sobreAEquipe;
        this.sobreAEquipeEn = sobreAEquipeEn;
        this.desenvolvimentoTecnico = desenvolvimentoTecnico;
        this.desenvolvimentoTecnicoEn = desenvolvimentoTecnicoEn;
        this.tecnologias = tecnologias;
        this.integracaoAPI = integracaoAPI;
        this.integracaoAPIEn = integracaoAPIEn;
    }

    validar() {
        if (!this.nome || this.nome.trim() === '') {
            throw new Error('O nome é um campo obrigatório.');
        }

        if (!this.introducao || this.introducao.trim() === '') {
            throw new Error('A introdução é um campo obrigatório.');
        }

        if (!this.introducaoEn || this.introducaoEn.trim() === '') {
            throw new Error('A introdução em inglês é um campo obrigatório.');
        }

        if (!this.objetivoProjeto || this.objetivoProjeto.trim() === '') {
            throw new Error('O objetivo do projeto é um campo obrigatório.');
        }

        if (!this.objetivoProjetoEn || this.objetivoProjetoEn.trim() === '') {
            throw new Error('O objetivo do projeto em inglês é um campo obrigatório.');
        }

        if (!this.sobreAEquipe || this.sobreAEquipe.trim() === '') {
            throw new Error('O texto sobre a equipe é um campo obrigatório.');
        }

        if (!this.sobreAEquipeEn || this.sobreAEquipeEn.trim() === '') {
            throw new Error('O texto sobre a equipe em inglês é um campo obrigatório.');
        }

        if (!this.desenvolvimentoTecnico || this.desenvolvimentoTecnico.trim() === '') {
            throw new Error('O desenvolvimento técnico é um campo obrigatório.');
        }

        if (!this.desenvolvimentoTecnicoEn || this.desenvolvimentoTecnicoEn.trim() === '') {
            throw new Error('O desenvolvimento técnico em inglês é um campo obrigatório.');
        }

        if (!this.tecnologias || this.tecnologias.trim() === '') {
            throw new Error('As tecnologias são um campo obrigatório.');
        }

        if (!this.integracaoAPI || this.integracaoAPI.trim() === '') {
            throw new Error('A integração com API é um campo obrigatório.');
        }

        if (!this.integracaoAPIEn || this.integracaoAPIEn.trim() === '') {
            throw new Error('A integração com API em inglês é um campo obrigatório.');
        }
    }

    async criar() {
        this.validar();

        return prisma.projetos.create({
            data: {
                nome: this.nome,
                introducao: this.introducao,
                introducaoEn: this.introducaoEn,
                objetivoProjeto: this.objetivoProjeto,
                objetivoProjetoEn: this.objetivoProjetoEn,
                sobreAEquipe: this.sobreAEquipe,
                sobreAEquipeEn: this.sobreAEquipeEn,
                desenvolvimentoTecnico: this.desenvolvimentoTecnico,
                desenvolvimentoTecnicoEn: this.desenvolvimentoTecnicoEn,
                tecnologias: this.tecnologias,
                integracaoAPI: this.integracaoAPI,
                integracaoAPIEn: this.integracaoAPIEn,
            },
        });
    }

    async atualizar() {
        if (!this.id) {
            throw new Error('ID não fornecido.');
        }

        this.validar();

        return prisma.projetos.update({
            where: { id: parseInt(this.id, 10) },
            data: {
                nome: this.nome,
                introducao: this.introducao,
                introducaoEn: this.introducaoEn,
                objetivoProjeto: this.objetivoProjeto,
                objetivoProjetoEn: this.objetivoProjetoEn,
                sobreAEquipe: this.sobreAEquipe,
                sobreAEquipeEn: this.sobreAEquipeEn,
                desenvolvimentoTecnico: this.desenvolvimentoTecnico,
                desenvolvimentoTecnicoEn: this.desenvolvimentoTecnicoEn,
                tecnologias: this.tecnologias,
                integracaoAPI: this.integracaoAPI,
                integracaoAPIEn: this.integracaoAPIEn,
            },
        });
    }

    async deletar() {
        if (!this.id) {
            throw new Error('ID não fornecido.');
        }

        return prisma.projetos.delete({ where: { id: parseInt(this.id, 10) } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.nome) {
            where.nome = { contains: filtros.nome, mode: 'insensitive' };
        }

        return prisma.projetos.findMany({
            where,
            include: {
                membros: true,
            },
        });
    }

    static async buscarPorId(id) {
        const data = await prisma.projetos.findUnique({
            where: { id: parseInt(id, 10) },
            include: {
                membros: true,
            },
        });

        if (!data) return null;

        return new ProjetosModel(data);
    }
}