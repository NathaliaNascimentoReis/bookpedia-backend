import DicasDeVestibularModel from '../models/DicasDeVestibularModel.js';

export const criar = async (req, res) => {
    // Controlador responsável por criar uma nova dica de vestibular.
    // Valida campos obrigatórios e utiliza o modelo para persistir o registro.
    try {
        const { titulo, tituloEn, dica, dicaEn } = req.body;

        // Validações básicas de presença
        if (!titulo) return res.status(400).json({ error: 'O campo "titulo" é obrigatório.' });
        if (!tituloEn) return res.status(400).json({ error: 'O campo "tituloEn" é obrigatório.' });
        if (!dica) return res.status(400).json({ error: 'O campo "dica" é obrigatório.' });
        if (!dicaEn) return res.status(400).json({ error: 'O campo "dicaEn" é obrigatório.' });

        const item = new DicasDeVestibularModel(req.body);
        const data = await item.criar();

        return res.status(201).json({ message: 'Dica criada com sucesso!', data });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro interno ao salvar a dica.' });
    }
};

export const buscarTodos = async (req, res) => {
    // Controlador que retorna todas as dicas de vestibular conforme filtros de consulta.
    // Retorna uma lista ou mensagem de nenhum registro encontrado.
    try {
        const registros = await DicasDeVestibularModel.buscarTodos(req.query);

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
    // Controlador para buscar uma dica por id.
    // Verifica se o id é numérico antes de consultar o modelo.
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const item = await DicasDeVestibularModel.buscarPorId(parseInt(id));

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
    // Controlador que atualiza uma dica existente.
    // Aplica apenas os campos fornecidos no corpo da requisição.
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const item = await DicasDeVestibularModel.buscarPorId(parseInt(id));

        if (!item) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        if (req.body.titulo !== undefined) item.titulo = req.body.titulo;
        if (req.body.tituloEn !== undefined) item.tituloEn = req.body.tituloEn;
        if (req.body.dica !== undefined) item.dica = req.body.dica;
        if (req.body.dicaEn !== undefined) item.dicaEn = req.body.dicaEn;

        const data = await item.atualizar();

        return res.status(200).json({
            message: `O registro "${data.titulo || data.id}" foi atualizado com sucesso!`,
            data,
        });
    } catch (error) {
        console.error('Erro ao atualizar:', error);
        return res.status(500).json({ error: 'Erro ao atualizar registro.' });
    }
};

export const deletar = async (req, res) => {
    // Controlador para excluir uma dica pelo id.
    // Garante que o registro exista antes de chamar o modelo para deletar.
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const item = await DicasDeVestibularModel.buscarPorId(parseInt(id));

        if (!item) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await item.deletar();

        return res.status(200).json({
            message: `O registro "${item.titulo || item.id}" foi deletado com sucesso!`,
            deletado: item,
        });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar registro.' });
    }
};
