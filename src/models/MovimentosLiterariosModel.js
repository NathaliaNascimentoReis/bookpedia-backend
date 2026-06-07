// Importa a instância do Prisma Client para executar consultas e mutações no banco.
import prisma from '../lib/services/prismaClient.js';

export default class MovimentosLiterariosModel {
    constructor({
        id = null,
        nome,
        nomeEn,
        contextoHistorico,
        contextoHistoricoEn,
        caracteristicas,
        caracteristicasEn,
        periodo,
        fase,
        faseEn,
        faseTexto,
        faseTextoEn,
        influencia,
    } = {}) {
        // Esses campos representam as propriedades salvas no banco de dados.
        this.id = id;
        this.nome = nome;
        this.nomeEn = nomeEn;
        this.contextoHistorico = contextoHistorico;
        this.contextoHistoricoEn = contextoHistoricoEn;
        this.caracteristicas = caracteristicas;
        this.caracteristicasEn = caracteristicasEn;
        this.periodo = periodo;
        this.fase = fase;
        this.faseEn = faseEn;
        this.faseTexto = faseTexto;
        this.faseTextoEn = faseTextoEn;
        this.influencia = influencia;
    }

    async criar(idLivroParaConectar = null) {
        // Cria um novo registro de movimento literário no banco.
        // Caso seja passado um id de livro, conecta o movimento literário a esse livro.

        const data = {
            nome: this.nome,
            nomeEn: this.nomeEn,
            contextoHistorico: this.contextoHistorico,
            contextoHistoricoEn: this.contextoHistoricoEn,
            caracteristicas: this.caracteristicas,
            caracteristicasEn: this.caracteristicasEn,
            periodo: this.periodo,
            fase: this.fase,
            faseEn: this.faseEn,
            faseTexto: this.faseTexto,
            faseTextoEn: this.faseTextoEn,
            influencia: this.influencia,
        };

        if (idLivroParaConectar) {
            // Conecta o novo movimento literário ao livro existente pelo id.
            data.livro = {
                connect: { id: parseInt(idLivroParaConectar, 10) },
            };
        }

        return prisma.movimentosLiterarios.create({ data });
    }

    async atualizar() {
        // Atualiza um movimento literário existente no banco de dados.
        // Exige que o id esteja definido na instância.
        if (!this.id) {
            throw new Error('ID não fornecido.');
        }

        return prisma.movimentosLiterarios.update({
            where: { id: parseInt(this.id, 10) },
            data: {
                nome: this.nome,
                nomeEn: this.nomeEn,
                contextoHistorico: this.contextoHistorico,
                contextoHistoricoEn: this.contextoHistoricoEn,
                caracteristicas: this.caracteristicas,
                caracteristicasEn: this.caracteristicasEn,
                periodo: this.periodo,
                fase: this.fase,
                faseEn: this.faseEn,
                faseTexto: this.faseTexto,
                faseTextoEn: this.faseTextoEn,  
                influencia: this.influencia,
            },
        });
    }

    async deletar() {
        // Remove o movimento literário do banco usando seu id.
        // Se não houver id, lança um erro para evitar exclusão inválida.
        if (!this.id) {
            throw new Error('ID não fornecido.');
        }

        return prisma.movimentosLiterarios.delete({ where: { id: parseInt(this.id, 10) } });
    }

    static async buscarTodos(filtros = {}) {
        // Busca movimentos literários aplicando filtros opcionais.
        // Permite pesquisar por nome, influência e livros relacionados.
        const where = {};

        if (filtros.nome) {
            where.nome = { contains: filtros.nome, mode: 'insensitive' };
        }

        if (filtros.influencia) {
            where.influencia = { contains: filtros.influencia, mode: 'insensitive' };
        }

        if (filtros.idDoLivro && filtros.idDoLivro !== '') {
            where.livro = {
                some: {
                    id: parseInt(filtros.idDoLivro, 10),
                },
            };
        }

        return prisma.movimentosLiterarios.findMany({ where, include: { livro: true } });
    }

    static async buscarPorId(id) {
        // Busca um único movimento literário por id e inclui os livros relacionados.
        const data = await prisma.movimentosLiterarios.findUnique({
            where: { id: parseInt(id, 10) },
            include: { livro: true },
        });

        if (!data) return null;

        return new MovimentosLiterariosModel(data);
    }
}
