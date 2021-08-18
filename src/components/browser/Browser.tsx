import React, { useEffect, useState } from "react";

import axios from "axios";
import Pokecard from "../pokecard/Pokecard";
import Filters from "./filters/Filters";

import { PokemonData, GenerationFirstPokemon } from "../../types";

export default function Browser() {
	const [page, setPage] = useState(1);
	const [gen, setGen] = useState(0);
	const [cards, setCards] = useState<PokemonData[]>([]);
	const [fetching, setFetching] = useState(true);
	const [loadMoreURL, setLoadMoreURL] = useState();

	const handleGen = (generation: number) => {
		setGen(generation)
	}

	useEffect(() => {
		axios.get(`https://pokeapi.co/api/v2/pokemon?limit=16&offset=${GenerationFirstPokemon[gen - 1]}`)
		.then(res => {
			setCards(res.data.results);

			setFetching(false)
		})
	}, [gen]);

	return (
		<>
			<Filters handleClick={handleGen}/>

			<div className="grid grid-cols-4">
				{
					fetching && <p>Loading...</p> || cards.map(card => <Pokecard key={card.name} url={card.url}/>)
				}
			</div>

			<button>Load More...</button>
		</>
	)
}
