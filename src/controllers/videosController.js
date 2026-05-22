import VideosModel from '../models/VideosModel.js';

export const criar = async (req, res) => {
    // Controlador responsável por criar um novo vídeo.
    // Valida campos obrigatórios e usa o modelo para persistir o registro.
    try {
        const { titulo, tituloEn, descricao, descricaoEn, url, idDoLivro } = req.body;

        if (!titulo) return res.status(400).json({ error: 'O título é obrigatório.' });
        if (!tituloEn) return res.status(400).json({ error: 'O título é obrigatório.' });
        if (!url) return res.status(400).json({ error: 'A URL do vídeo é obrigatória.' });
        if (!idDoLivro) return res.status(400).json({ error: 'O ID do livro é obrigatório.' });
        if (!descricao) return res.status(400).json({ error: 'A descrição é obrigatório.' });
        if (!descricaoEn) return res.status(400).json({ error: 'A descrição é obrigatório.' });

        const video = new VideosModel(req.body);
        const data = await video.criar();

        return res.status(201).json({ message: 'Vídeo registrado com sucesso!', data });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro interno ao salvar o vídeo.' });
    }
};

export const buscarTodos = async (req, res) => {
    // Controlador que retorna todos os vídeos conforme filtros enviados.
    // Retorna mensagem quando nenhum registro é encontrado.
    try {
        const registros = await VideosModel.buscarTodos(req.query);

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
    // Controlador para buscar um vídeo pelo id.
    // Verifica se o id é numérico antes de consultar o modelo.
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const item = await VideosModel.buscarPorId(parseInt(id));

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
    // Controlador para atualizar os dados de um vídeo existente.
    // Atualiza apenas os campos enviados no corpo da requisição.
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const item = await VideosModel.buscarPorId(parseInt(id));

        if (!item) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        if (req.body.titulo !== undefined) item.titulo = req.body.titulo;
        if (req.body.tituloEn !== undefined) item.tituloEn = req.body.tituloEn;
        if (req.body.descricao !== undefined) item.descricao = req.body.descricao;
        if (req.body.descricaoEn !== undefined) item.descricaoEn = req.body.descricaoEn;
        if (req.body.url !== undefined) item.url = req.body.url;
        if (req.body.idDoLivro !== undefined && req.body.idDoLivro !== null)
            item.idDoLivro = parseInt(req.body.idDoLivro);

        const data = await item.atualizar();

        return res.status(200).json({
            message: `O registro "${
                data.titulo || data.nome || data.id
            }" foi atualizado com sucesso!`,
            data,
        });
    } catch (error) {
        console.error('Erro ao atualizar:', error);
        return res.status(500).json({ error: 'Erro ao atualizar registro.' });
    }
};

export const deletar = async (req, res) => {
    // Controlador para excluir um vídeo pelo id.
    // Confirma a existência do registro antes de deletar.
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const item = await VideosModel.buscarPorId(parseInt(id));

        if (!item) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await item.deletar();

        return res.status(200).json({
            message: `O registro "${
                item.titulo || item.nome || item.id
            }" foi deletado com sucesso!`,
            deletado: item,
        });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar registro.' });
    }
};
