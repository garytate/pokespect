import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	useQuery,
	gql
} from "@apollo/client";

export const GET_POKEMON_INFORMATION = gql`
	query GetPokemonInformation($index: Int!) {
		pokemon_v2_pokemonspecies(where: {id: {_eq: $index}}) {
			id
			name
		}
	}
`;

//   export const fetchPokemonInformation = async (index: string) => {
// 	return axios
// 		.get(`https://pokeapi.co/api/v2/pokemon/${index}/`)
// 		.then((res) => {
// 			let dataTable: IPokemonInformation = {
// 				name: res.data.name,
// 				index: res.data.id,
// 				category: res.data.category,
// 				abilities: res.data.abilities,
// 				stats: res.data.stats,
// 				height: res.data.height,
// 				weight: res.data.weight,
// 				icon: res.data.sprites.front_default,
// 				types: res.data.types.map((type: any) => type.type.name),
// 				moves: res.data.moves,
// 				artwork: res.data.sprites.other["official-artwork"].front_default,
// 			};

// 			for (const stat in res.data.stats) {
// 				dataTable[res.data.stats[stat].stat.name] =
// 					res.data.stats[stat].base_stat;
// 			}

// 			return dataTable;
// 		});
// };
