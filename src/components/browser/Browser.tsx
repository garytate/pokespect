import React, { useEffect, useState } from "react";

import axios from "axios";
import Pokecard from "../pokecard/Pokecard";
import Filters from "./filters/Filters";

import { PokemonData, GenerationFirstPokemon } from "../../types";





export default function Browser() {
	const [page, setPage] = useState(1);
	const [gen, setGen] = useState(0);
	const [cards, setCards] = useState<PokemonData[]>([]);

	const handleGen = (generation: number) => {
		setGen(generation)
	}

	useEffect(() => {
		axios.get(`https://pokeapi.co/api/v2/pokemon?limit=25&offset=${GenerationFirstPokemon[gen - 1]}`)
		.then(res => {
			setCards(res.data.results);
		})
	}, [gen]);

	return (
		<>
			<Filters handleClick={handleGen}/>

			<div className="grid grid-cols-4 gap-4">
				{
					cards.map(card => <Pokecard key={card.name} url={card.url}/>)
				}
			</div>
		</>
	)
}
