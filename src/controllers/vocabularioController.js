import VocabularioModel from '../models/VocabularioModel.js';

export const criar = async (req, res) => {
    // Controlador para criar uma nova entrada de vocabulário.
    // Valida os campos obrigatórios e utiliza o modelo para persistência.
    try {
        const { palavra, significado, idDoLivro } = req.body;

        if (!palavra) return res.status(400).json({ error: 'A palavra é obrigatória.' });
        if (!significado) return res.status(400).json({ error: 'O significado é obrigatório.' });

        const vocabulario = new VocabularioModel(req.body);
        const data = await vocabulario.criar(idDoLivro);

        return res.status(201).json({ message: 'Vocabulário criado com sucesso!', data });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro interno ao salvar o vocabulário.' });
    }
};

export const buscarTodos = async (req, res) => {
    // Controlador que retorna todas as entradas de vocabulário com filtros opcionais.
    // Quando não existirem registros, retorna uma mensagem adequada.
    try {
        const registros = await VocabularioModel.buscarTodos(req.query);

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
    // Controlador para buscar uma entrada de vocabulário pelo id.
    // Verifica o id como numérico antes de consultar o modelo.
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const item = await VocabularioModel.buscarPorId(parseInt(id));

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
    // Controlador para atualizar uma entrada de vocabulário existente.
    // Aplica apenas os campos enviados no corpo da requisição.
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const item = await VocabularioModel.buscarPorId(parseInt(id));

        if (!item) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        if (req.body.palavra !== undefined) item.palavra = req.body.palavra;
        if (req.body.palavraEn !== undefined) item.palavraEn = req.body.palavraEn;
        if (req.body.significado !== undefined) item.significado = req.body.significado;
        if (req.body.significadoEn !== undefined) item.significadoEn = req.body.significadoEn;
        if (req.body.idDoLivro !== undefined && req.body.idDoLivro !== null)
            item.idDoLivro = parseInt(req.body.idDoLivro);

        const data = await item.atualizar();

        return res.status(200).json({
            message: `O registro "${data.palavra || data.id}" foi atualizado com sucesso!`,
            data,
        });
    } catch (error) {
        console.error('Erro ao atualizar:', error);
        return res.status(500).json({ error: 'Erro ao atualizar registro.' });
    }
};

export const deletar = async (req, res) => {
    // Controlador para excluir uma entrada de vocabulário pelo id.
    // Garante que o registro exista antes de deletar.
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const item = await VocabularioModel.buscarPorId(parseInt(id));

        if (!item) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await item.deletar();

        return res.status(200).json({
            message: `O registro "${item.palavra || item.id}" foi deletado com sucesso!`,
            deletado: item,
        });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar registro.' });
    }
};
