import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export default function Pokedata(props: any) {
	const { index } = useParams<{index: string}>();
	const [pokemon, setPokemon] = useState({name: "Generic Pokemon", sprite: "", index: 0});

	useEffect(() => {
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
		<>
		<Link to="/"><p>home</p></Link>
		<p>{pokemon.name}</p>
		</>
	)
}
