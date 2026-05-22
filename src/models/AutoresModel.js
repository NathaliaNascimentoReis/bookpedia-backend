// Importa a instância do Prisma Client configurada para acessar o banco de dados.
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
        // Prepara os dados do autor para criação no banco de dados.
        // Converte os anos para inteiros e permite associar o autor a um livro existente.
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
            // Caso seja fornecido um id de livro, conecta o autor a esse livro no relacionamento.
            data.livros = { connect: { id: parseInt(idLivroParaConectar) } };
        }

        return prisma.autores.create({ data });
    }

    async atualizar() {
        // Atualiza um autor existente no banco de dados.
        // Garante que o id esteja presente antes de tentar a atualização.
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
        // Exclui o autor do banco de dados usando o id informado.
        // Se não houver id, lança uma exceção para impedir operação inválida.
        if (!this.id) {
            throw new Error('ID não fornecido.');
        }

        return prisma.autores.delete({ where: { id: parseInt(this.id, 10) } });
    }

    static async buscarTodos(filtros = {}) {
        // Busca todos os autores com filtros opcionais.
        // Permite filtrar por nome e por anos de nascimento ou falecimento.
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

        // Inclui os livros relacionados ao autor no resultado.
        return prisma.autores.findMany({ where, include: { livros: true } });
    }

    static async buscarPorId(id) {
        // Busca um autor por id e retorna o autor com seus livros relacionados.
        const data = await prisma.autores.findUnique({
            where: { id: parseInt(id, 10) },
            include: { livros: true },
        });

        if (!data) return null;
        // Retorna null quando o autor não é encontrado, mantendo a consistência do serviço.
        return data;
    }
}
