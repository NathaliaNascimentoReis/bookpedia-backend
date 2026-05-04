import AlternativasModel from '../models/AlternativasModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const item = new AlternativasModel(req.body);
        const data = await item.criar();

        return res.status(201).json({ message: 'Registro criado com sucesso!', data });
    } catch (error) {
        console.error('Erro ao criar:', error);
        return res.status(500).json({ error: 'Erro interno ao salvar o registro.' });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const registros = await AlternativasModel.buscarTodos(req.query);

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

        const item = await AlternativasModel.buscarPorId(parseInt(id));

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

        const item = await AlternativasModel.buscarPorId(parseInt(id));

        if (!item) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        if (req.body.alternativaA !== undefined) item.alternativaA = req.body.alternativaA;
        if (req.body.alternativaAEn !== undefined) item.alternativaAEn = req.body.alternativaAEn;
        if (req.body.alternatvaB !== undefined) item.alternatvaB = req.body.alternatvaB;
        if (req.body.alternativaBEn !== undefined) item.alternativaBEn = req.body.alternativaBEn;
        if (req.body.alternativaC !== undefined) item.alternativaC = req.body.alternativaC;
        if (req.body.alternativaCEn !== undefined) item.alternativaCEn = req.body.alternativaCEn;
        if (req.body.alternativaD !== undefined) item.alternativaD = req.body.alternativaD;
        if (req.body.alternativaDEn !== undefined) item.alternativaDEn = req.body.alternativaDEn;
        if (req.body.respostaCorreta !== undefined) item.respostaCorreta = req.body.respostaCorreta;
        if (req.body.justificativa !== undefined) item.justificativa = req.body.justificativa;
        if (req.body.justificativaEn !== undefined) item.justificativaEn = req.body.justificativaEn;

        const data = await item.atualizar();

        return res
            .status(200)
            .json({ message: `O registro "${data.id}" foi atualizado com sucesso!`, data });
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

        const item = await AlternativasModel.buscarPorId(parseInt(id));

        if (!item) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await item.deletar();

        return res
            .status(200)
            .json({ message: `O registro "${item.id}" foi deletado com sucesso!`, deletado: item });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar registro.' });
    }
};
