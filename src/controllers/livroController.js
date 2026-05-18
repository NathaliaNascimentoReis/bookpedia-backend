import LivroModel from '../models/LivroModel.js';

export const criar = async (req, res) => {
    try {
        const { 
            tituloDoLivro, tituloDoLivroEn, 
            descricao, descricaoEn, 
            contextoHistorico, contextoHistoricoEn, 
            anoDeLancamento, 
            resumo, resumoEn, 
            analise, analiseEn, 
            capaURL 
        } = req.body;

        // Validações de presença para TODOS os campos obrigatórios
        if (!tituloDoLivro) return res.status(400).json({ error: 'O campo "tituloDoLivro" é obrigatório.' });
        if (!tituloDoLivroEn) return res.status(400).json({ error: 'O campo "tituloDoLivroEn" é obrigatório.' });
        if (!descricao) return res.status(400).json({ error: 'O campo "descricao" é obrigatório.' });
        if (!descricaoEn) return res.status(400).json({ error: 'O campo "descricaoEn" é obrigatório.' });
        if (!contextoHistorico) return res.status(400).json({ error: 'O campo "contextoHistorico" é obrigatório.' });
        if (!contextoHistoricoEn) return res.status(400).json({ error: 'O campo "contextoHistoricoEn" é obrigatório.' });
        if (!anoDeLancamento) return res.status(400).json({ error: 'O campo "anoDeLancamento" é obrigatório.' });
        if (!resumo) return res.status(400).json({ error: 'O campo "resumo" é obrigatório.' });
        if (!resumoEn) return res.status(400).json({ error: 'O campo "resumoEn" é obrigatório.' });
        if (!analise) return res.status(400).json({ error: 'O campo "analise" é obrigatório.' });
        if (!analiseEn) return res.status(400).json({ error: 'O campo "analiseEn" é obrigatório.' });
        if (!capaURL) return res.status(400).json({ error: 'O campo "capaURL" é obrigatório.' });

        const livro = new LivroModel(req.body);
        const data = await livro.criar();

        return res.status(201).json({ message: 'Livro criado com sucesso!', data });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro interno ao salvar o livro.' });
    }
};
export const buscarTodos = async (req, res) => {
    try {
        const registros = await LivroModel.buscarTodos(req.query);

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

        const livro = await LivroModel.buscarPorId(parseInt(id));

        if (!livro) {
            return res.status(404).json({ error: 'Registro não encontrado.' });
        }

        return res.status(200).json({ data: livro });
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

        const livro = await LivroModel.buscarPorId(parseInt(id));

        if (!livro) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        if (req.body.tituloDoLivro !== undefined) livro.tituloDoLivro = req.body.tituloDoLivro;
        if (req.body.tituloDoLivroEn !== undefined)
            livro.tituloDoLivroEn = req.body.tituloDoLivroEn;
        if (req.body.autor !== undefined) livro.autor = req.body.autor;
        if (req.body.descricao !== undefined) livro.descricao = req.body.descricao;
        if (req.body.descricaoEn !== undefined) livro.descricaoEn = req.body.descricaoEn;
        if (req.body.contextoHistorico !== undefined)
            livro.contextoHistorico = req.body.contextoHistorico;
        if (req.body.contextoHistoricoEn !== undefined)
            livro.contextoHistoricoEn = req.body.contextoHistoricoEn;
        if (req.body.anoDeLancamento !== undefined && req.body.anoDeLancamento !== null)
            livro.anoDeLancamento = parseInt(req.body.anoDeLancamento);
        if (req.body.resumo !== undefined) livro.resumo = req.body.resumo;
        if (req.body.resumoEn !== undefined) livro.resumoEn = req.body.resumoEn;
        if (req.body.analise !== undefined) livro.analise = req.body.analise;
        if (req.body.analiseEn !== undefined) livro.analiseEn = req.body.analiseEn;
        if (req.body.capaURL !== undefined) livro.capaURL = req.body.capaURL;

        const data = await livro.atualizar();

        return res.status(200).json({
            message: `O registro "${
                data.tituloDoLivro || data.nome || data.id
            }" foi atualizado com sucesso!`,
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

        const livro = await LivroModel.buscarPorId(parseInt(id));

        if (!livro) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await livro.deletar();

        return res.status(200).json({
            message: `O registro "${
                livro.tituloDoLivro || livro.nome || livro.id
            }" foi deletado com sucesso!`,
            deletado: livro,
        });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar registro.' });
    }
};
