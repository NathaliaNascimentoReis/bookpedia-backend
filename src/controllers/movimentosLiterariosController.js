import MovimentosLiterariosModel from '../models/MovimentosLiterariosModel.js';

export const criar = async (req, res) => {
    // Controlador responsável pela criação de um movimento literário.
    // Valida campos obrigatórios e delega a persistência ao modelo.
    try {
        const {
            nome, contextoHistorico, contextoHistoricoEn,
            caracteristicas, caracteristicasEn, periodo,
            fase, faseTexto, idDoLivro
        } = req.body;

        // Validações de presença
        if (!nome) return res.status(400).json({ error: 'O nome é obrigatório.' });
        if (!contextoHistorico) return res.status(400).json({ error: 'O contexto histórico é obrigatório.' });
         if (!contextoHistoricoEn)
             return res.status(400).json({ error: 'O contexto histórico é obrigatório.' });
        if (!caracteristicas) return res.status(400).json({ error: 'As características são obrigatórias.' });
        if (!caracteristicasEn)
            return res.status(400).json({ error: 'As características são obrigatórias.' });
        if (!periodo) return res.status(400).json({ error: 'O período é obrigatório.' });
        if (!fase) return res.status(400).json({ error: 'A fase é obrigatória.' });
        if (!faseTexto) return res.status(400).json({ error: 'A fase é obrigatória.' });

        const movimento = new MovimentosLiterariosModel(req.body);
        const data = await movimento.criar(idDoLivro);

        return res.status(201).json({ message: 'Movimento literário criado com sucesso!', data });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro interno ao salvar o movimento.' });
    }
};

export const buscarTodos = async (req, res) => {
    // Controlador que busca todos os movimentos literários.
    // Aceita filtros via query string e responde com os registros encontrados.
    try {
        const registros = await MovimentosLiterariosModel.buscarTodos(req.query);

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
    // Controlador para buscar um único movimento literário por id.
    // Valida que o id seja numérico antes de consultar o modelo.
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const item = await MovimentosLiterariosModel.buscarPorId(parseInt(id));

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
    // Controlador para atualizar um movimento literário existente.
    // Aplica apenas os campos enviados no corpo da requisição.
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const item = await MovimentosLiterariosModel.buscarPorId(parseInt(id));

        if (!item) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        if (req.body.nome !== undefined) item.nome = req.body.nome;
        if (req.body.contextoHistorico !== undefined)
            item.contextoHistorico = req.body.contextoHistorico;
        if (req.body.contextoHistoricoEn !== undefined)
            item.contextoHistoricoEn = req.body.contextoHistoricoEn;
        if (req.body.caracteristicas !== undefined) item.caracteristicas = req.body.caracteristicas;
        if (req.body.caracteristicasEn !== undefined)
            item.caracteristicasEn = req.body.caracteristicasEn;
        if (req.body.periodo !== undefined) item.periodo = req.body.periodo;
        if (req.body.fase !== undefined) item.fase = req.body.fase;
        if (req.body.faseTexto !== undefined) item.faseTexto = req.body.faseTexto;
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
    // Controlador para excluir um movimento literário pelo id.
    // Verifica a existência do registro antes de deletar.
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const item = await MovimentosLiterariosModel.buscarPorId(parseInt(id));

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
