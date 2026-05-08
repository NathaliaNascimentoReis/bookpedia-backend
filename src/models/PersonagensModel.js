import prisma from '../lib/services/prismaClient.js';

export default class PersonagensModel {
	constructor({ id = null, nome, idade, descricao, descricaoEn, historia, historiaEn, idDoLivro = null } = {}) {
		this.id = id;
		this.nome = nome;
		this.idade = idade;
		this.descricao = descricao;
		this.descricaoEn = descricaoEn;
		this.historia = historia;
		this.historiaEn = historiaEn;
		this.idDoLivro = idDoLivro;
	}

	async criar() {
		return prisma.personagens.create({
			data: {
				nome: this.nome,
				idade: this.idade,
				descricao: this.descricao,
				descricaoEn: this.descricaoEn,
				historia: this.historia,
				historiaEn: this.historiaEn,
				idDoLivro: this.idDoLivro,
			},
		});
	}

	async atualizar() {
		return prisma.personagens.update({
			where: { id: this.id },
			data: {
				nome: this.nome,
				idade: this.idade,
				descricao: this.descricao,
				descricaoEn: this.descricaoEn,
				historia: this.historia,
				historiaEn: this.historiaEn,
				idDoLivro: this.idDoLivro,
			},
		});
	}

	async deletar() {
		return prisma.personagens.delete({ where: { id: this.id } });
	}

	static async buscarTodos(filtros = {}) {
		const where = {};

		if (filtros.nome) {
			where.nome = { contains: filtros.nome, mode: 'insensitive' };
		}
		if (filtros.idade !== undefined && filtros.idade !== '') {
			where.idade = parseInt(filtros.idade);
		}
		if (filtros.descricao) {
			where.descricao = { contains: filtros.descricao, mode: 'insensitive' };
		}
		if (filtros.descricaoEn) {
			where.descricaoEn = { contains: filtros.descricaoEn, mode: 'insensitive' };
		}
		if (filtros.historia) {
			where.historia = { contains: filtros.historia, mode: 'insensitive' };
		}
		if (filtros.historiaEn) {
			where.historiaEn = { contains: filtros.historiaEn, mode: 'insensitive' };
		}
		if (filtros.idDoLivro !== undefined && filtros.idDoLivro !== '') {
			where.idDoLivro = parseInt(filtros.idDoLivro);
		}

		return prisma.personagens.findMany({ where });
	}

	static async buscarPorId(id) {
		const data = await prisma.personagens.findUnique({ where: { id } });
		if (!data) {
			return null;
		}
		return new PersonagensModel(data);
	}
}
