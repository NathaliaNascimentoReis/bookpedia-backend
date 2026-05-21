import PersonagensModel from '../models/PersonagensModel.js';

export const criar = async (req, res) => {
    try {
        const { 
            nome, idade, descricao, descricaoEn, 
            historia, historiaEn, idDoLivro 
        } = req.body;

        // Validações de presença
        if (!nome) return res.status(400).json({ error: 'O nome é obrigatório.' });
        if (!idade) return res.status(400).json({ error: 'A idade é obrigatória.' });
        if (!descricao) return res.status(400).json({ error: 'A descrição é obrigatória.' });
        if (!historia) return res.status(400).json({ error: 'A história é obrigatória.' });
        if (!idDoLivro) return res.status(400).json({ error: 'O ID do livro é obrigatório.' });

        const personagem = new PersonagensModel(req.body);
        const data = await personagem.criar();

        return res.status(201).json({ message: 'Personagem criado com sucesso!', data });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro interno ao salvar personagem.' });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const registros = await PersonagensModel.buscarTodos(req.query);

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
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const item = await PersonagensModel.buscarPorId(parseInt(id));

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
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const item = await PersonagensModel.buscarPorId(parseInt(id));

        if (!item) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        if (req.body.nome !== undefined) item.nome = req.body.nome;
        if (req.body.idade !== undefined && req.body.idade !== null)
            item.idade = parseInt(req.body.idade);
        if (req.body.descricao !== undefined) item.descricao = req.body.descricao;
        if (req.body.descricaoEn !== undefined) item.descricaoEn = req.body.descricaoEn;
        if (req.body.historia !== undefined) item.historia = req.body.historia;
        if (req.body.historiaEn !== undefined) item.historiaEn = req.body.historiaEn;
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
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const item = await PersonagensModel.buscarPorId(parseInt(id));

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
