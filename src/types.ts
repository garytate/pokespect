// We know for certain the first index of each
// generation, making a simple look-up table
export const GenerationFirstPokemon = [0, 151, 251, 386, 493, 649, 721, 809];

export interface PokecardData {
	name: "loading...";
	url: "";
}

export interface PokemonOverview {
	name: "Generic Pokemon";
	index: 0;
	types: {};
	abilities: {};
	stats: {};
	icon: "";
	category: "";
}
