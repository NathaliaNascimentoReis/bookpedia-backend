// temasDeVestibularController.js
import TemasDeVestibularModel from '../models/TemasDeVestibularModel.js';

export const criar = async (req, res) => {
    // Controlador responsável por criar um novo tema de vestibular.
    // Valida campos obrigatórios e utiliza o modelo para persistir o registro.
    try {
        const { tema, temaEn, temaDescricao, temaDescricaoEn } = req.body;

        if (!tema) return res.status(400).json({ error: 'O campo "tema" é obrigatório.' });
        if (!temaEn) return res.status(400).json({ error: 'O campo "temaEn" é obrigatório.' });
        if (!temaDescricao)
            return res.status(400).json({ error: 'O campo "temaDescricao" é obrigatório.' });
        if (!temaDescricaoEn)
            return res.status(400).json({ error: 'O campo "temaDescricaoEn" é obrigatório.' });

        const item = new TemasDeVestibularModel(req.body);
        const data = await item.criar();

        return res.status(201).json({ message: 'Tema criado com sucesso!', data });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro interno ao salvar o tema.' });
    }
};

export const buscarTodos = async (req, res) => {
    // Controlador que retorna todos os temas de vestibular conforme filtros de consulta.
    // Retorna uma lista ou mensagem de nenhum registro encontrado.
    try {
        const registros = await TemasDeVestibularModel.buscarTodos(req.query);

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
    // Controlador para buscar um tema por id.
    // Verifica se o id é numérico antes de consultar o modelo.
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const item = await TemasDeVestibularModel.buscarPorId(parseInt(id));

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
    // Controlador que atualiza um tema existente.
    // Aplica apenas os campos fornecidos no corpo da requisição.
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const item = await TemasDeVestibularModel.buscarPorId(parseInt(id));

        if (!item) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        if (req.body.tema !== undefined) item.tema = req.body.tema;
        if (req.body.temaEn !== undefined) item.temaEn = req.body.temaEn;
        if (req.body.temaDescricao !== undefined) item.temaDescricao = req.body.temaDescricao;
        if (req.body.temaDescricaoEn !== undefined) item.temaDescricaoEn = req.body.temaDescricaoEn;
        if (req.body.livroId !== undefined) item.livroId = req.body.livroId;

        const data = await item.atualizar();

        return res.status(200).json({
            message: `O registro "${data.tema || data.id}" foi atualizado com sucesso!`,
            data,
        });
    } catch (error) {
        console.error('Erro ao atualizar:', error);
        return res.status(500).json({ error: 'Erro ao atualizar registro.' });
    }
};

export const deletar = async (req, res) => {
    // Controlador para excluir um tema pelo id.
    // Garante que o registro exista antes de chamar o modelo para deletar.
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const item = await TemasDeVestibularModel.buscarPorId(parseInt(id));

        if (!item) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await item.deletar();

        return res.status(200).json({
            message: `O registro "${item.tema || item.id}" foi deletado com sucesso!`,
            deletado: item,
        });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar registro.' });
    }
};
