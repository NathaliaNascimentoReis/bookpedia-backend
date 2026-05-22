import AutoresModel from '../models/AutoresModel.js';

export const criar = async (req, res) => {
    // Controlador que trata a criação de um novo autor.
    // Recebe os dados no corpo da requisição e chama o modelo para persistir.
    try {
        const {
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
        } = req.body;

        // Validações de presença
        if (!nome) return res.status(400).json({ error: 'O campo "nome" é obrigatório.' });
        if (!descricao)
            return res.status(400).json({ error: 'O campo "descricao" é obrigatório.' });
        if (!descricaoEn)
            return res.status(400).json({ error: 'O campo "descricaoEn" é obrigatório.' });
        if (!contextoHistorico)
            return res.status(400).json({ error: 'O campo "contextoHistorico" é obrigatório.' });
        if (!contextoHistoricoEn)
            return res.status(400).json({ error: 'O campo "contextoHistoricoEn" é obrigatório.' });
        if (!anoNascimento)
            return res.status(400).json({ error: 'O campo "anoNascimento" é obrigatório.' });
        if (!anoFalecimento)
            return res.status(400).json({ error: 'O campo "anoFalecimento" é obrigatório.' });
        if (!biografia)
            return res.status(400).json({ error: 'O campo "biografia" é obrigatório.' });
        if (!biografiaEn)
            return res.status(400).json({ error: 'O campo "biografiaEn" é obrigatório.' });
        if (!fotoURL) return res.status(400).json({ error: 'O campo "fotoURL" é obrigatório.' });

        const autor = new AutoresModel(req.body);
        const data = await autor.criar(req.body.idLivroParaConectar);

        return res.status(201).json({ message: 'Autor criado com sucesso!', data });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao salvar o autor.' });
    }
};

export const buscarTodos = async (req, res) => {
    // Controlador que retorna todos os autores de acordo com os filtros informados.
    // Chamadas sem filtros retornam todos os registros disponíveis.
    try {
        const registros = await AutoresModel.buscarTodos(req.query);

        if (!registros || registros.length === 0) {
            return res.status(400).json({ message: 'Nenhum registro encontrado.' });
        }

        return res.status(200).json(registros);
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({ error: 'Erro ao buscar registros.' });
    }
};

export const buscarPorId = async (req, res) => {
    // Controlador para recuperar um autor por seu id.
    // Valida se o id é numérico antes de consultar o modelo.
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const item = await AutoresModel.buscarPorId(parseInt(id));

        if (!item) {
            return res.status(404).json({ error: 'Registro não encontrado.' });
        }

        return res.status(200).json({ data: item });
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({ error: 'Erro ao buscar registro.' });
    }
};

export const atualizar = async (req, res) => {
    // Controlador para atualizar campos de um autor existente.
    // Verifica a existência do registro antes de aplicar alterações parciais.
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const item = await AutoresModel.buscarPorId(parseInt(id));

        if (!item) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        if (req.body.nome !== undefined) item.nome = req.body.nome;
        if (req.body.descricao !== undefined) item.descricao = req.body.descricao;
        if (req.body.descricaoEn !== undefined) item.descricaoEn = req.body.descricaoEn;
        if (req.body.contextoHistorico !== undefined)
            item.contextoHistorico = req.body.contextoHistorico;
        if (req.body.contextoHistoricoEn !== undefined)
            item.contextoHistoricoEn = req.body.contextoHistoricoEn;
        if (req.body.anoNascimento !== undefined && req.body.anoNascimento !== null)
            item.anoNascimento = parseInt(req.body.anoNascimento);
        if (req.body.anoFalecimento !== undefined && req.body.anoFalecimento !== null)
            item.anoFalecimento = parseInt(req.body.anoFalecimento);
        if (req.body.biografia !== undefined) item.biografia = req.body.biografia;
        if (req.body.biografiaEn !== undefined) item.biografiaEn = req.body.biografiaEn;
        if (req.body.movimentosLiterario !== undefined)
            item.movimentosLiterario = req.body.movimentosLiterario;
        if (req.body.fotoURL !== undefined) item.fotoURL = req.body.fotoURL;
        if (req.body.idDoLivro !== undefined && req.body.idDoLivro !== null)
            item.idDoLivro = parseInt(req.body.idDoLivro);

        const data = await item.atualizar();

        return res.status(200).json({
            message: `O registro "${data.nome || data.id}" foi atualizado com sucesso!`,
            data,
        });
    } catch (error) {
        console.error('Erro ao atualizar:', error);
        return res.status(500).json({ error: 'Erro ao atualizar registro.' });
    }
};

export const deletar = async (req, res) => {
    // Controlador para excluir um autor pelo id.
    // Garante que o registro exista antes de deletar.
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const item = await AutoresModel.buscarPorId(parseInt(id));

        if (!item) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await item.deletar();

        return res.status(200).json({
            message: `O registro "${item.nome || item.id}" foi deletado com sucesso!`,
            deletado: item,
        });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar registro.' });
    }
};
