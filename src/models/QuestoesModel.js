import prisma from '../lib/services/prismaClient.js';

export default class QuestoesModel {
	constructor({ id = null, enunciado, enunciadoEn, vestibular, anoVestibular, idAlternativas = null, idDoLivro = null } = {}) {
		this.id = id;
		this.enunciado = enunciado;
		this.enunciadoEn = enunciadoEn;
		this.vestibular = vestibular;
		this.anoVestibular = anoVestibular;
		this.idAlternativas = idAlternativas;
		this.idDoLivro = idDoLivro;
	}

	async criar() {
		return prisma.questoes.create({
			data: {
				enunciado: this.enunciado,
				enunciadoEn: this.enunciadoEn,
				vestibular: this.vestibular,
				anoVestibular: this.anoVestibular,
				idAlternativas: this.idAlternativas,
				idDoLivro: this.idDoLivro,
			},
		});
	}

	async atualizar() {
		return prisma.questoes.update({
			where: { id: this.id },
			data: {
				enunciado: this.enunciado,
				enunciadoEn: this.enunciadoEn,
				vestibular: this.vestibular,
				anoVestibular: this.anoVestibular,
				idAlternativas: this.idAlternativas,
				idDoLivro: this.idDoLivro,
			},
		});
	}

	async deletar() {
		return prisma.questoes.delete({ where: { id: this.id } });
	}

	static async buscarTodos(filtros = {}) {
		const where = {};

		if (filtros.enunciado) {
			where.enunciado = { contains: filtros.enunciado, mode: 'insensitive' };
		}
		if (filtros.enunciadoEn) {
			where.enunciadoEn = { contains: filtros.enunciadoEn, mode: 'insensitive' };
		}
		if (filtros.vestibular) {
			where.vestibular = { contains: filtros.vestibular, mode: 'insensitive' };
		}
		if (filtros.anoVestibular !== undefined && filtros.anoVestibular !== '') {
			where.anoVestibular = parseInt(filtros.anoVestibular);
		}
		if (filtros.idAlternativas !== undefined && filtros.idAlternativas !== '') {
			where.idAlternativas = parseInt(filtros.idAlternativas);
		}
		if (filtros.idDoLivro !== undefined && filtros.idDoLivro !== '') {
			where.idDoLivro = parseInt(filtros.idDoLivro);
		}

		return prisma.questoes.findMany({ where });
	}

	static async buscarPorId(id) {
		const data = await prisma.questoes.findUnique({ where: { id } });
		if (!data) {
			return null;
		}
		return new QuestoesModel(data);
	}
}
