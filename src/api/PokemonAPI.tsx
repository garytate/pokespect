import axios from "axios";
import { IPokemonInformation, IPokemonMove } from "../types/PokemonOverview";

export const fetchPokemonInformation = async (index: string) => {
	return axios.get(`https://pokeapi.co/api/v2/pokemon/${index}/`)
	.then((res) => {
		let dataTable: IPokemonInformation = {
			name: res.data.name,
			index: res.data.id,
			category: res.data.category,
			abilities: res.data.abilities,
			stats: res.data.stats,
			height: res.data.height,
			weight: res.data.weight,
			icon: res.data.sprites.front_default,
			types: res.data.types.map((type: any) => type.type.name),
			moves: res.data.moves,
			artwork: res.data.sprites.other["official-artwork"].front_default,
		};

		for (const stat in res.data.stats) {
			dataTable[res.data.stats[stat].stat.name] = res.data.stats[stat].base_stat;
		}

		return dataTable;
	});
};

export const fetchMoveInformation = async (url: string) => {
	return axios.get(url).
	then((res) => {
		let dataTable: IPokemonMove = {
			name: res.data.name,
			id: res.data.id,
			type: res.data.type.name,
			accuracy: res.data.accuracy || "-",
			pp: res.data.pp,
			power: res.data.power || "-",
		};

		return dataTable;
	});
};

export const fetchPokemonPage = async (url: string) => {
	return axios.get(url)
	.then((res) => {
		let dataTable: any = {
			results: res.data.results,
			next: res.data.next,
		};

		return dataTable;
	});
};

export const fetchPokemonCard = async (url: string) => {
	return axios.get(url)
	.then((res) => {
		const types = res.data.types.map((type: any) => type.type.name);

		let dataTable = {
			name: res.data.name,
			sprite: res.data.sprites.other["official-artwork"].front_default,
			index: res.data.id,
			types: types,
		};

		return dataTable;
	})
};
