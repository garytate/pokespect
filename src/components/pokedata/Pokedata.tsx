import { Chip, Grid, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export default function Pokedata(props: any) {
	const { index } = useParams<{index: string}>();
	const [overview, setOverview] = useState<any>({});
	const [fetching, setFetching] = useState(true);
	const [types, setTypes] = useState<string[]>([])

	useEffect(() => {
		axios.get(`https://pokeapi.co/api/v2/pokemon/${index}/`)
		.then(res => {
			setOverview(res.data)

			// TODO rework method of gathering array data
			let types = res.data.types
			let typesArray: string[] = []

			for (const type of types) {
				typesArray.push(type.type.name)
			}

			setTypes(typesArray)

			setFetching(false);
		})
	}, []);

	if (fetching) return (<p>loading...</p>)

	console.log(overview)

	return (
		<Grid container spacing={3}>
			<Grid item xs={4}>
				<Link to="/"><p className="flex-initial">Browse</p></Link>
			</Grid>
			<Grid item xs={4}>
				<Typography variant="h4">{overview.name}</Typography>
			</Grid>
			<Grid item xs={4}>
				<Typography variant="h5">Favourite</Typography>
			</Grid>
			<Grid item xs={4}>
				<img src={overview.sprites.other["official-artwork"].front_default} />
			</Grid>
			<Grid item xs={8}>
			<Typography variant="h6">Types</Typography>
				{types.map(type => {
					return (
						<Chip key={type} label={type} />
					)
				})}
			</Grid>
		</Grid>
	)
}
/*
0, …}
abilities: (2) [{…}, {…}]
base_experience: 142
forms: [{…}]
game_indices: (20) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
height: 10
held_items: []
id: 8
is_default: true
location_area_encounters: "https://pokeapi.co/api/v2/pokemon/8/encounters"
moves: (76) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
name: "wartortle"
order: 11
past_types: []
species: {name: "wartortle", url: "https://pokeapi.co/api/v2/pokemon-species/8/"}
sprites: {back_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/8.png", back_female: null, back_shiny: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/8.png", back_shiny_female: null, front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png", …}
stats: (6) [{…}, {…}, {…}, {…}, {…}, {…}]
types: [{…}]
weight: 225

*/

{/* <div className="table w-full">
			<div className="table-row-group">
				<div className="table-row">
					<div className="table-cell">1</div>
					<div className="table-cell">2</div>
					<div className="table-cell">3</div>
				</div>
				<div className="table-row">
					<div className="table-cell">2</div>
					<div className="table-cell">3</div>
					<div className="table-cell">4</div>
				</div>
			</div>
		</div> */}
