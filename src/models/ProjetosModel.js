// Importa a instância do Prisma Client para acessar o banco de dados.
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
        // Inicializa os campos do projeto com os valores recebidos.
        // Esse modelo representa as informações de um projeto na aplicação.
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

    async criar() {
        // Cria um novo registro de projeto no banco de dados usando os campos da instância.

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
        // Atualiza um projeto existente.
        // Exige que o id esteja definido na instância do modelo.
        if (!this.id) {
            throw new Error('ID não fornecido.');
        }

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
        // Exclui o projeto do banco de dados pelo id.
        // Se não houver id, lança um erro para evitar exclusão indevida.
        if (!this.id) {
            throw new Error('ID não fornecido.');
        }

        return prisma.projetos.delete({ where: { id: parseInt(this.id, 10) } });
    }

    static async buscarTodos(filtros = {}) {
        // Busca todos os projetos, aplicando filtro opcional por nome.
        // Inclui também os membros associados a cada projeto no resultado.
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
        // Busca um projeto por id e retorna uma instância do modelo.
        // Retorna null se não encontrar o registro.
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
