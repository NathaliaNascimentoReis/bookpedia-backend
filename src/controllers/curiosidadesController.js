import CuriosidadesModel from '../models/CuriosidadesModel.js';

export const criar = async (req, res) => {
    // Controlador para criar uma nova curiosidade.
    // Valida os campos obrigatórios e chama o modelo para persistir.
    try {
        const { tituloCuriosidade, tituloCuriosidadeEn, curiosidade, curiosidadeEn, idDoLivro } =
            req.body;

        // Validações básicas de presença
        if (!tituloCuriosidade)
            return res.status(400).json({ error: 'O campo "tituloCuriosidade" é obrigatório.' });
        if (!tituloCuriosidadeEn)
            return res.status(400).json({ error: 'O campo "tituloCuriosidadeEn" é obrigatório.' });
        if (!curiosidade)
            return res.status(400).json({ error: 'O campo "curiosidade" é obrigatório.' });
        if (!curiosidadeEn)
            return res.status(400).json({ error: 'O campo "curiosidadeEn" é obrigatório.' });
        if (!idDoLivro)
            return res.status(400).json({ error: 'O campo "idDoLivro" é obrigatório.' });

        const item = new CuriosidadesModel(req.body);
        const data = await item.criar();

        return res.status(201).json({ message: 'Curiosidade criada com sucesso!', data });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro interno ao salvar a curiosidade.' });
    }
};

export const buscarTodos = async (req, res) => {
    // Controlador para retornar todas as curiosidades segundo os filtros da query.
    // Quando não há registros, retorna mensagem apropriada.
    try {
        const registros = await CuriosidadesModel.buscarTodos(req.query);

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
    // Controlador para buscar uma curiosidade por id.
    // Verifica se o id é numérico antes de consultar o modelo.
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const item = await CuriosidadesModel.buscarPorId(parseInt(id));

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
    // Controlador para atualizar uma curiosidade existente.
    // Aplica somente os campos informados no corpo da requisição.
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const item = await CuriosidadesModel.buscarPorId(parseInt(id));

        if (!item) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        if (req.body.tituloCuriosidade !== undefined)
            item.tituloCuriosidade = req.body.tituloCuriosidade;
        if (req.body.tituloCuriosidadeEn !== undefined)
            item.tituloCuriosidadeEn = req.body.tituloCuriosidadeEn;
        if (req.body.curiosidade !== undefined) item.curiosidade = req.body.curiosidade;
        if (req.body.curiosidadeEn !== undefined) item.curiosidadeEn = req.body.curiosidadeEn;
        if (req.body.idDoLivro !== undefined && req.body.idDoLivro !== null)
            item.idDoLivro = parseInt(req.body.idDoLivro);

        const data = await item.atualizar();

        return res.status(200).json({
            message: `O registro "${
                data.tituloCuriosidade || data.nome || data.id
            }" foi atualizado com sucesso!`,
            data,
        });
    } catch (error) {
        console.error('Erro ao atualizar:', error);
        return res.status(500).json({ error: 'Erro ao atualizar registro.' });
    }
};

export const deletar = async (req, res) => {
    // Controlador para excluir uma curiosidade pelo id.
    // Garante que o registro existe antes de deletar.
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const item = await CuriosidadesModel.buscarPorId(parseInt(id));

        if (!item) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await item.deletar();

        return res.status(200).json({
            message: `O registro "${
                item.tituloCuriosidade || item.nome || item.id
            }" foi deletado com sucesso!`,
            deletado: item,
        });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar registro.' });
    }
};
