import prisma from '../lib/services/prismaClient.js';

export default class MembrosModel {
	constructor({ id = null, nome, idade, curso, cursoEn, descricao, descricaoEn, cargo, avaliacaoDaObra, diasDeLeitura, opiniao, idDoProjeto = null } = {}) {
		this.id = id;
		this.nome = nome;
		this.idade = idade;
		this.curso = curso;
		this.cursoEn = cursoEn;
		this.descricao = descricao;
		this.descricaoEn = descricaoEn;
		this.cargo = cargo;
		this.avaliacaoDaObra = avaliacaoDaObra;
		this.diasDeLeitura = diasDeLeitura;
		this.opiniao = opiniao;
		this.idDoProjeto = idDoProjeto;
	}

	async criar() {
		return prisma.membros.create({
			data: {
				nome: this.nome,
				idade: this.idade,
				curso: this.curso,
				cursoEn: this.cursoEn,
				descricao: this.descricao,
				descricaoEn: this.descricaoEn,
				cargo: this.cargo,
				avaliacaoDaObra: this.avaliacaoDaObra,
				diasDeLeitura: this.diasDeLeitura,
				opiniao: this.opiniao,
				idDoProjeto: this.idDoProjeto,
			},
		});
	}

	async atualizar() {
		return prisma.membros.update({
			where: { id: this.id },
			data: {
				nome: this.nome,
				idade: this.idade,
				curso: this.curso,
				cursoEn: this.cursoEn,
				descricao: this.descricao,
				descricaoEn: this.descricaoEn,
				cargo: this.cargo,
				avaliacaoDaObra: this.avaliacaoDaObra,
				diasDeLeitura: this.diasDeLeitura,
				opiniao: this.opiniao,
				idDoProjeto: this.idDoProjeto,
			},
		});
	}

	async deletar() {
		return prisma.membros.delete({ where: { id: this.id } });
	}

	static async buscarTodos(filtros = {}) {
		const where = {};

		if (filtros.nome) {
			where.nome = { contains: filtros.nome, mode: 'insensitive' };
		}
		if (filtros.idade !== undefined && filtros.idade !== '') {
			where.idade = parseInt(filtros.idade);
		}
		if (filtros.curso) {
			where.curso = { contains: filtros.curso, mode: 'insensitive' };
		}
		if (filtros.cursoEn) {
			where.cursoEn = { contains: filtros.cursoEn, mode: 'insensitive' };
		}
		if (filtros.descricao) {
			where.descricao = { contains: filtros.descricao, mode: 'insensitive' };
		}
		if (filtros.descricaoEn) {
			where.descricaoEn = { contains: filtros.descricaoEn, mode: 'insensitive' };
		}
		if (filtros.cargo) {
			where.cargo = { contains: filtros.cargo, mode: 'insensitive' };
		}
		if (filtros.avaliacaoDaObra !== undefined && filtros.avaliacaoDaObra !== '') {
			where.avaliacaoDaObra = parseInt(filtros.avaliacaoDaObra);
		}
		if (filtros.diasDeLeitura !== undefined && filtros.diasDeLeitura !== '') {
			where.diasDeLeitura = parseInt(filtros.diasDeLeitura);
		}
		if (filtros.opiniao) {
			where.opiniao = { contains: filtros.opiniao, mode: 'insensitive' };
		}
		if (filtros.idDoProjeto !== undefined && filtros.idDoProjeto !== '') {
			where.idDoProjeto = parseInt(filtros.idDoProjeto);
		}

		return prisma.membros.findMany({ where });
	}

	static async buscarPorId(id) {
		const data = await prisma.membros.findUnique({ where: { id } });
		if (!data) {
			return null;
		}
		return new MembrosModel(data);
	}
}
