import QuestoesModel from '../models/QuestoesModel.js';

export const criar = async (req, res) => {
    // Controlador responsável por criar uma nova questão.
    // Valida os campos obrigatórios e delega a criação ao modelo.
    try {
        const { enunciado, vestibular, anoVestibular, idDoLivro, alternativas } = req.body;

        if (!enunciado) return res.status(400).json({ error: 'O enunciado é obrigatório.' });
        if (!vestibular) return res.status(400).json({ error: 'O vestibular é obrigatório.' });
        if (!anoVestibular)
            return res.status(400).json({ error: 'O ano do vestibular é obrigatório.' });
        if (!idDoLivro) return res.status(400).json({ error: 'O ID do livro é obrigatório.' });
        if (!alternativas || !alternativas.respostaCorreta) {
            return res
                .status(400)
                .json({
                    error: 'Os dados das alternativas e a resposta correta são obrigatórios.',
                });
        }

        const questao = new QuestoesModel(req.body);
        const data = await questao.criar(alternativas);

        return res.status(201).json({ message: 'Questão criada com sucesso!', data });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro interno ao salvar a questão.' });
    }
};

export const buscarTodos = async (req, res) => {
    // Controlador para buscar todas as questões com filtros opcionais.
    // Retorna a lista de registros ou mensagem caso não encontre nenhum.
    try {
        const registros = await QuestoesModel.buscarTodos(req.query);

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
    // Controlador para buscar uma questão por id.
    // Verifica se o id é numérico antes de consultar o modelo.
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const item = await QuestoesModel.buscarPorId(parseInt(id));

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
    // Controlador para atualizar uma questão existente.
    // Atualiza apenas os campos enviados no corpo da requisição.
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const item = await QuestoesModel.buscarPorId(parseInt(id));

        if (!item) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        if (req.body.enunciado !== undefined) item.enunciado = req.body.enunciado;
        if (req.body.enunciadoEn !== undefined) item.enunciadoEn = req.body.enunciadoEn;
        if (req.body.vestibular !== undefined) item.vestibular = req.body.vestibular;
        if (req.body.anoVestibular !== undefined && req.body.anoVestibular !== null)
            item.anoVestibular = parseInt(req.body.anoVestibular, 10);
        if (req.body.idDoLivro !== undefined && req.body.idDoLivro !== null)
            item.idDoLivro = parseInt(req.body.idDoLivro);

        const data = await item.atualizar();

        return res.status(200).json({
            message: `O registro "${data.enunciado || data.id}" foi atualizado com sucesso!`,
            data,
        });
    } catch (error) {
        console.error('Erro ao atualizar:', error);
        return res.status(500).json({ error: 'Erro ao atualizar registro.' });
    }
};

export const deletar = async (req, res) => {
    // Controlador para excluir uma questão pelo id.
    // Garante que o registro exista antes de chamar o modelo para deletar.
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const item = await QuestoesModel.buscarPorId(parseInt(id));

        if (!item) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await item.deletar();

        return res.status(200).json({
            message: `O registro "${item.enunciado || item.id}" foi deletado com sucesso!`,
            deletado: item,
        });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar registro.' });
    }
};
