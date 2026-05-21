import ProjetosModel from '../models/ProjetosModel.js';

export const criar = async (req, res) => {
    try {
        const { 
            nome, introducao, objetivoProjeto, sobreAEquipe, 
            desenvolvimentoTecnico, tecnologias, integracaoAPI 
        } = req.body;

        if (!nome) return res.status(400).json({ error: 'O nome é obrigatório.' });
        if (!introducao) return res.status(400).json({ error: 'A introdução é obrigatória.' });
        if (!objetivoProjeto) return res.status(400).json({ error: 'O objetivo é obrigatório.' });
        if (!sobreAEquipe) return res.status(400).json({ error: 'O texto sobre a equipe é obrigatório.' });
        if (!desenvolvimentoTecnico) return res.status(400).json({ error: 'O desenvolvimento técnico é obrigatório.' });
        if (!tecnologias) return res.status(400).json({ error: 'As tecnologias são obrigatórias.' });
        if (!integracaoAPI) return res.status(400).json({ error: 'A integração API é obrigatória.' });

        const projeto = new ProjetosModel(req.body);
        const data = await projeto.criar();

        return res.status(201).json({ message: 'Projeto criado!', data });
    } catch (error) {
        return res.status(500).json({ error: 'Erro interno ao salvar.' });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const registros = await ProjetosModel.buscarTodos(req.query);

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

        const item = await ProjetosModel.buscarPorId(parseInt(id));

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

        const item = await ProjetosModel.buscarPorId(parseInt(id));

        if (!item) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        if (req.body.nome !== undefined) item.nome = req.body.nome;
        if (req.body.introducao !== undefined) item.introducao = req.body.introducao;
        if (req.body.introducaoEn !== undefined) item.introducaoEn = req.body.introducaoEn;
        if (req.body.objetivoProjeto !== undefined) item.objetivoProjeto = req.body.objetivoProjeto;
        if (req.body.objetivoProjetoEn !== undefined)
            item.objetivoProjetoEn = req.body.objetivoProjetoEn;
        if (req.body.sobreAEquipe !== undefined) item.sobreAEquipe = req.body.sobreAEquipe;
        if (req.body.sobreAEquipeEn !== undefined) item.sobreAEquipeEn = req.body.sobreAEquipeEn;
        if (req.body.desenvolvimentoTecnico !== undefined)
            item.desenvolvimentoTecnico = req.body.desenvolvimentoTecnico;
        if (req.body.desenvolvimentoTecnicoEn !== undefined)
            item.desenvolvimentoTecnicoEn = req.body.desenvolvimentoTecnicoEn;
        if (req.body.tecnologias !== undefined) item.tecnologias = req.body.tecnologias;
        if (req.body.integracaoAPI !== undefined) item.integracaoAPI = req.body.integracaoAPI;
        if (req.body.integracaoAPIEn !== undefined) item.integracaoAPIEn = req.body.integracaoAPIEn;

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

        const item = await ProjetosModel.buscarPorId(parseInt(id));

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
