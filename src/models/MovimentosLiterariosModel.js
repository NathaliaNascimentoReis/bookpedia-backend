import prisma from '../lib/services/prismaClient.js';

export default class MovimentosLiterariosModel {
	constructor({ id = null, nome, contextoHistorico, contextoHistoricoEn, caracteristicas, caracteristicasEn, periodo, fase, influencia, idDoLivro = null } = {}) {
		this.id = id;
		this.nome = nome;
		this.contextoHistorico = contextoHistorico;
		this.contextoHistoricoEn = contextoHistoricoEn;
		this.caracteristicas = caracteristicas;
		this.caracteristicasEn = caracteristicasEn;
		this.periodo = periodo;
		this.fase = fase;
		this.influencia = influencia;
		this.idDoLivro = idDoLivro;
	}

	async criar() {
		return prisma.movimentosLiterarios.create({
			data: {
				nome: this.nome,
				contextoHistorico: this.contextoHistorico,
				contextoHistoricoEn: this.contextoHistoricoEn,
				caracteristicas: this.caracteristicas,
				caracteristicasEn: this.caracteristicasEn,
				periodo: this.periodo,
				fase: this.fase,
				influencia: this.influencia,
				idDoLivro: this.idDoLivro,
			},
		});
	}

	async atualizar() {
		return prisma.movimentosLiterarios.update({
			where: { id: this.id },
			data: {
				nome: this.nome,
				contextoHistorico: this.contextoHistorico,
				contextoHistoricoEn: this.contextoHistoricoEn,
				caracteristicas: this.caracteristicas,
				caracteristicasEn: this.caracteristicasEn,
				periodo: this.periodo,
				fase: this.fase,
				influencia: this.influencia,
				idDoLivro: this.idDoLivro,
			},
		});
	}

	async deletar() {
		return prisma.movimentosLiterarios.delete({ where: { id: this.id } });
	}

	static async buscarTodos(filtros = {}) {
		const where = {};

		if (filtros.nome) {
			where.nome = { contains: filtros.nome, mode: 'insensitive' };
		}
		if (filtros.contextoHistorico) {
			where.contextoHistorico = { contains: filtros.contextoHistorico, mode: 'insensitive' };
		}
		if (filtros.contextoHistoricoEn) {
			where.contextoHistoricoEn = { contains: filtros.contextoHistoricoEn, mode: 'insensitive' };
		}
		if (filtros.caracteristicas) {
			where.caracteristicas = { contains: filtros.caracteristicas, mode: 'insensitive' };
		}
		if (filtros.caracteristicasEn) {
			where.caracteristicasEn = { contains: filtros.caracteristicasEn, mode: 'insensitive' };
		}
		if (filtros.periodo) {
			where.periodo = { contains: filtros.periodo, mode: 'insensitive' };
		}
		if (filtros.fase) {
			where.fase = { contains: filtros.fase, mode: 'insensitive' };
		}
		if (filtros.influencia) {
			where.influencia = { contains: filtros.influencia, mode: 'insensitive' };
		}
		if (filtros.idDoLivro !== undefined && filtros.idDoLivro !== '') {
			where.idDoLivro = parseInt(filtros.idDoLivro);
		}

		return prisma.movimentosLiterarios.findMany({ where });
	}

	static async buscarPorId(id) {
		const data = await prisma.movimentosLiterarios.findUnique({ where: { id } });
		if (!data) {
			return null;
		}
		return new MovimentosLiterariosModel(data);
	}
}
