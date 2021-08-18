import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';

import axios from "axios";

export default function Pokecard(props: any) {
	const [pokemon, setPokemon] = useState({name: "Generic Pokemon"});

	useEffect(() => {
		const index = props.index

		axios.get(`https://pokeapi.co/api/v2/pokemon/${index}/`)
		.then(res => {
			setPokemon({
				name: res.data.name
			})
			console.log(res.data)
		})
	}, []);

	return (
		<>
		<p>{pokemon.name}</p>
		</>
	)
}
