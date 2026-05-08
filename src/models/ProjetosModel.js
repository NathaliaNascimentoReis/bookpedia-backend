import prisma from '../lib/services/prismaClient.js';

export default class ProjetosModel {
	constructor({ id = null, nome, introducao, introducaoEn, objetivoProjeto, objetivoProjetoEn, sobreAEquipe, sobreAEquipeEn, desenvolvimentoTecnico, desenvolvimentoTecnicoEn, tecnologias, integracaoAPI, integracaoAPIEn } = {}) {
		this.id = id;
		this.nome = nome;
		this.introducao = introducao;
		this.introducaoEn = introducaoEn;
		this.objetivoProjeto = objetivoProjeto;
		this.objetivoProjetoEn = objetivoProjetoEn;
		this.sobreAEquipe = sobreAEquipe;
		this.sobreAEquipeEn = sobreAEquipeEn;
		this.desenvolvimentoTecnico = desenvolvimentoTecnico;
		this.desenvolvimentoTecnicoEn = desenvolvimentoTecnicoEn;
		this.tecnologias = tecnologias;
		this.integracaoAPI = integracaoAPI;
		this.integracaoAPIEn = integracaoAPIEn;
	}

	async criar() {
		return prisma.projetos.create({
			data: {
				nome: this.nome,
				introducao: this.introducao,
				introducaoEn: this.introducaoEn,
				objetivoProjeto: this.objetivoProjeto,
				objetivoProjetoEn: this.objetivoProjetoEn,
				sobreAEquipe: this.sobreAEquipe,
				sobreAEquipeEn: this.sobreAEquipeEn,
				desenvolvimentoTecnico: this.desenvolvimentoTecnico,
				desenvolvimentoTecnicoEn: this.desenvolvimentoTecnicoEn,
				tecnologias: this.tecnologias,
				integracaoAPI: this.integracaoAPI,
				integracaoAPIEn: this.integracaoAPIEn,
			},
		});
	}

	async atualizar() {
		return prisma.projetos.update({
			where: { id: this.id },
			data: {
				nome: this.nome,
				introducao: this.introducao,
				introducaoEn: this.introducaoEn,
				objetivoProjeto: this.objetivoProjeto,
				objetivoProjetoEn: this.objetivoProjetoEn,
				sobreAEquipe: this.sobreAEquipe,
				sobreAEquipeEn: this.sobreAEquipeEn,
				desenvolvimentoTecnico: this.desenvolvimentoTecnico,
				desenvolvimentoTecnicoEn: this.desenvolvimentoTecnicoEn,
				tecnologias: this.tecnologias,
				integracaoAPI: this.integracaoAPI,
				integracaoAPIEn: this.integracaoAPIEn,
			},
		});
	}

	async deletar() {
		return prisma.projetos.delete({ where: { id: this.id } });
	}

	static async buscarTodos(filtros = {}) {
		const where = {};

		if (filtros.nome) {
			where.nome = { contains: filtros.nome, mode: 'insensitive' };
		}
		if (filtros.introducao) {
			where.introducao = { contains: filtros.introducao, mode: 'insensitive' };
		}
		if (filtros.introducaoEn) {
			where.introducaoEn = { contains: filtros.introducaoEn, mode: 'insensitive' };
		}
		if (filtros.objetivoProjeto) {
			where.objetivoProjeto = { contains: filtros.objetivoProjeto, mode: 'insensitive' };
		}
		if (filtros.objetivoProjetoEn) {
			where.objetivoProjetoEn = { contains: filtros.objetivoProjetoEn, mode: 'insensitive' };
		}
		if (filtros.sobreAEquipe) {
			where.sobreAEquipe = { contains: filtros.sobreAEquipe, mode: 'insensitive' };
		}
		if (filtros.sobreAEquipeEn) {
			where.sobreAEquipeEn = { contains: filtros.sobreAEquipeEn, mode: 'insensitive' };
		}
		if (filtros.desenvolvimentoTecnico) {
			where.desenvolvimentoTecnico = { contains: filtros.desenvolvimentoTecnico, mode: 'insensitive' };
		}
		if (filtros.desenvolvimentoTecnicoEn) {
			where.desenvolvimentoTecnicoEn = { contains: filtros.desenvolvimentoTecnicoEn, mode: 'insensitive' };
		}
		if (filtros.tecnologias) {
			where.tecnologias = { contains: filtros.tecnologias, mode: 'insensitive' };
		}
		if (filtros.integracaoAPI) {
			where.integracaoAPI = { contains: filtros.integracaoAPI, mode: 'insensitive' };
		}
		if (filtros.integracaoAPIEn) {
			where.integracaoAPIEn = { contains: filtros.integracaoAPIEn, mode: 'insensitive' };
		}

		return prisma.projetos.findMany({ where });
	}

	static async buscarPorId(id) {
		const data = await prisma.projetos.findUnique({ where: { id } });
		if (!data) {
			return null;
		}
		return new ProjetosModel(data);
	}
}
