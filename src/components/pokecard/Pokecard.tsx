import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';

import axios from "axios";
import { Link } from "react-router-dom";

export default function Pokecard(props: any) {
	const [pokemon, setPokemon] = useState({name: "Generic Pokemon", sprite: "", index: 0});

	useEffect(() => {
		const index = props.index

		axios.get(`https://pokeapi.co/api/v2/pokemon/${index}/`)
		.then(res => {
			setPokemon({
				name: res.data.name,
				sprite: res.data.sprites.front_default,
				index: props.index
			})
			console.log(res.data)
		})
	}, []);

	return (
		<div className="text-xl px-8 m-2 bg-blue-200 flex-auto">
			<img className="mx-auto object-center" src={pokemon.sprite} />
			<Link to={`/pokemon/${pokemon.index}`}><p>{pokemon.name}</p></Link>
		</div>
	)
}
