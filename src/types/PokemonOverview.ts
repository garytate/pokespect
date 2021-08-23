
export interface PokemonTypes {
	name: string,
	url?: string
}

export interface PokemonOverview {
	name: string;
	icon: string;
	category: string;
	index: number;
	types: object;
	abilities: object;
	moves: object;
	stats: object;
	[key: string]: any;
}
