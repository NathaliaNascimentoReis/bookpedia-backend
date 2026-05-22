import CenariosModel from '../models/CenariosModel.js';

export const criar = async (req, res) => {
    // Controlador para criação de cenários.
    // Recebe dados via req.body, valida campos obrigatórios e delega ao modelo.
    try {
        const {
            nome,
            nomeEn,
            caracteristicas,
            caracteristicasEn,
            descricao,
            descricaoEn,
            fotoURL,
            idDoLivro,
        } = req.body;

        // Validações de presença
        if (!nome) return res.status(400).json({ error: 'O campo "nome" é obrigatório.' });
        if (!nomeEn) return res.status(400).json({ error: 'O campo "nomeEn" é obrigatório.' });
        if (!caracteristicas)
            return res.status(400).json({ error: 'O campo "caracteristicas" é obrigatório.' });
        if (!caracteristicasEn)
            return res.status(400).json({ error: 'O campo "caracteristicasEn" é obrigatório.' });
        if (!descricao)
            return res.status(400).json({ error: 'O campo "descricao" é obrigatório.' });
        if (!descricaoEn)
            return res.status(400).json({ error: 'O campo "descricaoEn" é obrigatório.' });
        if (!fotoURL) return res.status(400).json({ error: 'O campo "fotoURL" é obrigatório.' });
        if (!idDoLivro)
            return res.status(400).json({ error: 'O campo "idDoLivro" é obrigatório.' });

        const item = new CenariosModel(req.body);
        const data = await item.criar();

        return res.status(201).json({ message: 'Cenário criado com sucesso!', data });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao salvar o cenário.' });
    }
};

export const buscarTodos = async (req, res) => {
    // Controlador para buscar todos os cenários, com filtros opcionais.
    // Retorna uma lista ou mensagem de nenhum registro encontrado.
    try {
        const registros = await CenariosModel.buscarTodos(req.query);

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
    // Controlador para buscar um único cenário pelo id.
    // Valida o id como numérico antes de consultar o modelo.
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const item = await CenariosModel.buscarPorId(parseInt(id));

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
    // Controlador para atualizar um cenário existente.
    // Aplica apenas os campos fornecidos no corpo da requisição.
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const item = await CenariosModel.buscarPorId(parseInt(id));

        if (!item) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        if (req.body.nome !== undefined) item.nome = req.body.nome;
        if (req.body.caracteristicas !== undefined) item.caracteristicas = req.body.caracteristicas;
        if (req.body.caracteristicasEn !== undefined)
            item.caracteristicasEn = req.body.caracteristicasEn;
        if (req.body.descricao !== undefined) item.descricao = req.body.descricao;
        if (req.body.descricaoEn !== undefined) item.descricaoEn = req.body.descricaoEn;
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
    // Controlador para excluir um cenário pelo id.
    // Garante que o registro exista antes de chamar o modelo para deletar.
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const item = await CenariosModel.buscarPorId(parseInt(id));

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
