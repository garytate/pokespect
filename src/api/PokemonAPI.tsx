import axios from "axios";
import { IPokemonInformation } from "../types/PokemonOverview";

const GetPokemonInformation = async (index: string) => {
	const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${index}/`);

		let dataTable: IPokemonInformation = {
			name: res.data.name,
			index: res.data.id,
			category: res.data.category,
			abilities: res.data.abilities,
			stats: res.data.stats,
			height: res.data.height,
			weight: res.data.weight,
			icon: res.data.sprites.front_default,
			types: (res.data.types.map((type: any) => type.type.name))
		}

		for (const stat in res.data.stats) {
			dataTable[res.data.stats[stat].stat.name] = res.data.stats[stat].base_stat
		};

		return dataTable;
}

export default GetPokemonInformation;
