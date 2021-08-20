import { Chip, Grid, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import PokeStats from "./OverviewStats";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { PokemonOverview } from "../types";
import Trivia from "./OverviewTrivia";
import TypeBadges from "./TypeBadges";
import OverviewMoves from "./OverviewMoves";
import { NameFormat } from "../utils/StringFormat";


const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		image: {
			"max-width": "100%",
			alignContent: "center"
		}
	}),
);

export default function Pokedata(props: any) {
	const { index } = useParams<{index: string}>();
	const [overview, setOverview] = useState<PokemonOverview>();
	const [fetching, setFetching] = useState(true);
	const [types, setTypes] = useState<string[]>([]);

	const styles = useStyles();

	useEffect(() => {
		axios.get(`https://pokeapi.co/api/v2/pokemon/${index}/`)
		.then(res => {
			setOverview({
				name: res.data.name,
				index: res.data.id,
				types: res.data.types,
				stats: res.data.stats,
				moves: res.data.moves,
				icon: res.data.sprites.other["official-artwork"].front_default,
				category: "",
				abilities: res.data.abilities
			})

			// // TODO rework method of gathering array data
			let types = res.data.types
			let typesArray: string[] = []
			for (const type of types) {
				typesArray.push(type.type.name)
			}

			setTypes(typesArray);

			setFetching(false);
		})
	}, []);

	if (fetching || !overview) return (<p>loading...</p>)

	return (
		<Grid container spacing={3}>
			<Grid item xs={4}>
				<Link to="/"><p className="flex-initial">Browse</p></Link>
			</Grid>
			<Grid item xs={4}>
				<Typography variant="h4" style={{paddingTop: 20}}>{NameFormat(overview.name)}</Typography>
			</Grid>
			<Grid item xs={4}>
				<Typography variant="h5">Favourite</Typography>
			</Grid>
			<Grid item md={4} xs={12}>
				<img alt={overview.name} className={styles.image} src={overview.icon} />
				{types.map(type => {
					return (
						<TypeBadges key={type} label={type} />
					)
				})}
			</Grid>
			<Grid item xs={12} md={8}>
			<PokeStats stats={overview.stats} />
			</Grid>
			<Grid item md={6} xs={12}>
				<Trivia pokemon={overview} />
			</Grid>
			<Grid item xs={12} md={6}>
			<OverviewMoves moves={overview.moves} />
			</Grid>
		</Grid>
	)
}
