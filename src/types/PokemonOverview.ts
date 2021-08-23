
export interface IPokemonTypes {
	name: string,
	url?: string
}

export interface IPokemonOverview {
	name: string;
	icon: string;
	category: string;
	index: number;
	types: object;
	abilities: object;
	moves?: object;
	stats: object;
	[key: string]: any;
}
