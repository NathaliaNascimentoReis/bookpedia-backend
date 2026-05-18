import EnredosModel from '../models/EnredosModel.js';

export const criar = async (req, res) => {
    try {
        const { 
            introducao, introducaoEn, 
            conflito, conflitoEn, 
            climax, climaxEn, 
            desfecho, desfechoEn, 
            idDoLivro 
        } = req.body;

        // Validações básicas de presença (sem trim)
        if (!introducao) return res.status(400).json({ error: 'O campo "introducao" é obrigatório.' });
        if (!introducaoEn) return res.status(400).json({ error: 'O campo "introducaoEn" é obrigatório.' });
        if (!conflito) return res.status(400).json({ error: 'O campo "conflito" é obrigatório.' });
        if (!conflitoEn) return res.status(400).json({ error: 'O campo "conflitoEn" é obrigatório.' });
        if (!climax) return res.status(400).json({ error: 'O campo "climax" é obrigatório.' });
        if (!climaxEn) return res.status(400).json({ error: 'O campo "climaxEn" é obrigatório.' });
        if (!desfecho) return res.status(400).json({ error: 'O campo "desfecho" é obrigatório.' });
        if (!desfechoEn) return res.status(400).json({ error: 'O campo "desfechoEn" é obrigatório.' });
        if (!idDoLivro) return res.status(400).json({ error: 'O campo "idDoLivro" é obrigatório.' });

        const item = new EnredosModel(req.body);
        const data = await item.criar();

        return res.status(201).json({ message: 'Enredo criado com sucesso!', data });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro interno ao salvar o enredo.' });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const registros = await EnredosModel.buscarTodos(req.query);

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

        const enredo = await EnredosModel.buscarPorId(parseInt(id));

        if (!enredo) {
            return res.status(404).json({ error: 'Registro não encontrado.' });
        }

        return res.status(200).json({ data: enredo });
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

        const enredo = await EnredosModel.buscarPorId(parseInt(id));

        if (!enredo) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        if (req.body.introducao !== undefined) enredo.introducao = req.body.introducao;
        if (req.body.introducaoEn !== undefined) enredo.introducaoEn = req.body.introducaoEn;
        if (req.body.conflito !== undefined) enredo.conflito = req.body.conflito;
        if (req.body.conflitoEn !== undefined) enredo.conflitoEn = req.body.conflitoEn;
        if (req.body.climax !== undefined) enredo.climax = req.body.climax;
        if (req.body.climaxEn !== undefined) enredo.climaxEn = req.body.climaxEn;
        if (req.body.desfecho !== undefined) enredo.desfecho = req.body.desfecho;
        if (req.body.desfechoEn !== undefined) enredo.desfechoEn = req.body.desfechoEn;
        if (req.body.idDoLivro !== undefined && req.body.idDoLivro !== null)
            enredo.idDoLivro = parseInt(req.body.idDoLivro);

        const data = await enredo.atualizar();

        return res.status(200).json({
            message: `O registro "${data.titulo || data.nome || data.id}" foi atualizado com sucesso!`,
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

        const enredo = await EnredosModel.buscarPorId(parseInt(id));

        if (!enredo) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await enredo.deletar();

        return res.status(200).json({
            message: `O registro "${enredo.titulo || enredo.nome || enredo.id}" foi deletado com sucesso!`,
            deletado: enredo,
        });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar registro.' });
    }
};
