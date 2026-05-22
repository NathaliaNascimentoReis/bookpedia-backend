import MembrosModel from '../models/MembrosModel.js';

export const criar = async (req, res) => {
    // Controlador responsável por criar um novo membro.
    // Valida campos obrigatórios e delega a criação ao modelo.
    try {
        const {
            nome,
            idade,
            curso,
            cursoEn,
            descricao,
            descricaoEn,
            cargo,
            avaliacaoDaObra,
            diasDeLeitura,
            opiniao,
            idDoProjeto,
        } = req.body;

        if (!nome) return res.status(400).json({ error: 'O nome é obrigatório.' });
        if (!idade) return res.status(400).json({ error: 'A idade é obrigatória.' });
        if (!curso) return res.status(400).json({ error: 'O curso é obrigatório.' });
        if (!descricao) return res.status(400).json({ error: 'A descrição é obrigatória.' });
        if (!cargo) return res.status(400).json({ error: 'O cargo é obrigatório.' });
        if (!avaliacaoDaObra)
            return res.status(400).json({ error: 'A avaliação da obra é obrigatória.' });
        if (!diasDeLeitura)
            return res.status(400).json({ error: 'Os dias de leitura são obrigatórios.' });
        if (!idDoProjeto) return res.status(400).json({ error: 'O ID do projeto é obrigatório.' });

        const membro = new MembrosModel(req.body);
        const data = await membro.criar();

        return res.status(201).json({ message: 'Membro criado com sucesso!', data });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro interno ao salvar o membro.' });
    }
};

export const buscarTodos = async (req, res) => {
    // Controlador para listar todos os membros.
    // Aceita filtros pela query string e retorna os resultados encontrados.
    try {
        const registros = await MembrosModel.buscarTodos(req.query);

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
    // Controlador para buscar um membro por id.
    // Valida se o id é numérico antes de consultar o modelo.
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const item = await MembrosModel.buscarPorId(parseInt(id));

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
    // Controlador para atualizar um membro existente.
    // Aplica apenas os campos fornecidos no corpo da requisição.
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const item = await MembrosModel.buscarPorId(parseInt(id));

        if (!item) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        if (req.body.nome !== undefined) item.nome = req.body.nome;
        if (req.body.idade !== undefined && req.body.idade !== null)
            item.idade = parseInt(req.body.idade);
        if (req.body.curso !== undefined) item.curso = req.body.curso;
        if (req.body.cursoEn !== undefined) item.cursoEn = req.body.cursoEn;
        if (req.body.descricao !== undefined) item.descricao = req.body.descricao;
        if (req.body.descricaoEn !== undefined) item.descricaoEn = req.body.descricaoEn;
        if (req.body.cargo !== undefined) item.cargo = req.body.cargo;
        if (req.body.avaliacaoDaObra !== undefined && req.body.avaliacaoDaObra !== null)
            item.avaliacaoDaObra = parseInt(req.body.avaliacaoDaObra);
        if (req.body.diasDeLeitura !== undefined && req.body.diasDeLeitura !== null)
            item.diasDeLeitura = parseInt(req.body.diasDeLeitura);
        if (req.body.opiniao !== undefined) item.opiniao = req.body.opiniao;
        if (req.body.idDoProjeto !== undefined && req.body.idDoProjeto !== null)
            item.idDoProjeto = parseInt(req.body.idDoProjeto);

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
    // Controlador para excluir um membro pelo id.
    // Confirma a existência do registro antes de chamar o modelo para deletar.
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const item = await MembrosModel.buscarPorId(parseInt(id));

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
