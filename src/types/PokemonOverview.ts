
export interface IPokemonTypes {
	name: string;
	url?: string;
	[key: string]: any;
}

export interface IPokemonInformation {
	name: string;
	icon: string;
	artwork: string;
	category: string;
	index: number;
	types: IPokemonTypes;
	abilities: object;
	moves: object;
	stats: object;
	[key: string]: any;
}

export interface IPokemonMove {
	name: string;
	id: string;
	type: string;
	accuracy: string;
	pp: string;
	power: string;
}
