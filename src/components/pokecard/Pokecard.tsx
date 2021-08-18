import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';

import axios from "axios";
import { Link } from "react-router-dom";

export default function Pokecard(props: any) {
	const [pokemon, setPokemon] = useState({name: "Generic Pokemon", sprite: "", index: 0});

	useEffect(() => {
		axios.get(props.url)
		.then(res => {
			setPokemon({
				name: res.data.name,
				sprite: res.data.sprites.front_default,
				index: res.data.id
			})
		})
	}, []);

	return (
		<div className="p-8 m-2 bg-blue-200 flex-auto">
			<img className="mx-auto object-center" src={pokemon.sprite} />
			<Link to={`/pokemon/${pokemon.index}`}><p>{pokemon.name}</p></Link>
			<p>#{pokemon.index}</p>
		</div>
	)
}
