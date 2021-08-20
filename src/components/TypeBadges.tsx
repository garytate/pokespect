import { Chip } from "@material-ui/core";
import React, { useEffect, useState } from "react";

// https://gist.github.com/apaleslimghost/0d25ec801ca4fc43317bcff298af43c3
const TypeColors: { [key: string]: string } = {
	normal: '#A8A77A',
	fire: '#EE8130',
	water: '#6390F0',
	electric: '#F7D02C',
	grass: '#7AC74C',
	ice: '#96D9D6',
	fighting: '#C22E28',
	poison: '#A33EA1',
	ground: '#E2BF65',
	flying: '#A98FF3',
	psychic: '#F95587',
	bug: '#A6B91A',
	rock: '#B6A136',
	ghost: '#735797',
	dragon: '#6F35FC',
	dark: '#705746',
	steel: '#B7B7CE',
	fairy: '#D685AD',
}

export default function TypeBadges(props: any) {
	const [color, setColor] = useState("");

	useEffect(() => {
		let colorName = props.label

		if (colorName)
			setColor(TypeColors[colorName.toLowerCase()] || '#777');
	}, [])

	if (!color) return <p>loading...</p>

	return (
		<Chip style={{marginRight: 10, marginTop: 10, padding: 10, backgroundColor: color, borderRadius: 10, color: "white"}} label={props.label.toUpperCase()} />
	)
}
