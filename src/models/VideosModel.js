import prisma from '../lib/services/prismaClient.js';

export default class VideosModel {
	constructor({ id = null, titulo, tituloEn, descricao, descricaoEn, url, idDoLivro = null } = {}) {
		this.id = id;
		this.titulo = titulo;
		this.tituloEn = tituloEn;
		this.descricao = descricao;
		this.descricaoEn = descricaoEn;
		this.url = url;
		this.idDoLivro = idDoLivro;
	}

	async criar() {
		return prisma.videos.create({
			data: {
				titulo: this.titulo,
				tituloEn: this.tituloEn,
				descricao: this.descricao,
				descricaoEn: this.descricaoEn,
				url: this.url,
				idDoLivro: this.idDoLivro,
			},
		});
	}

	async atualizar() {
		return prisma.videos.update({
			where: { id: this.id },
			data: {
				titulo: this.titulo,
				tituloEn: this.tituloEn,
				descricao: this.descricao,
				descricaoEn: this.descricaoEn,
				url: this.url,
				idDoLivro: this.idDoLivro,
			},
		});
	}

	async deletar() {
		return prisma.videos.delete({ where: { id: this.id } });
	}

	static async buscarTodos(filtros = {}) {
		const where = {};

		if (filtros.titulo) {
			where.titulo = { contains: filtros.titulo, mode: 'insensitive' };
		}
		if (filtros.tituloEn) {
			where.tituloEn = { contains: filtros.tituloEn, mode: 'insensitive' };
		}
		if (filtros.descricao) {
			where.descricao = { contains: filtros.descricao, mode: 'insensitive' };
		}
		if (filtros.descricaoEn) {
			where.descricaoEn = { contains: filtros.descricaoEn, mode: 'insensitive' };
		}
		if (filtros.url) {
			where.url = { contains: filtros.url, mode: 'insensitive' };
		}
		if (filtros.idDoLivro !== undefined && filtros.idDoLivro !== '') {
			where.idDoLivro = parseInt(filtros.idDoLivro);
		}

		return prisma.videos.findMany({ where });
	}

	static async buscarPorId(id) {
		const data = await prisma.videos.findUnique({ where: { id } });
		if (!data) {
			return null;
		}
		return new VideosModel(data);
	}
}
