import { POKEMON_LIST } from "../data";

export const FindPokemonByID = (id: number) => {
	for (let i = 0; i < POKEMON_LIST.length; i++) {
		if (POKEMON_LIST[i].id === id) {
			return POKEMON_LIST[i];
		}
	}
};

export const FindPokemonByName = (name: string) => {
	for (let i = 0; i < POKEMON_LIST.length; i++) {
		if (POKEMON_LIST[i].identifier === name) {
			return POKEMON_LIST[i];
		}
	}
};
