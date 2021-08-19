import React, { useEffect, useState } from "react";

import axios from "axios";
import Pokecard from "../pokecard/Pokecard";
import Filters from "./filters/Filters";

import { PokecardData, GenerationFirstPokemon } from "../../types";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
			justifyContent: "center"
		},
		card: {
			display: "flex",
			padding: theme.spacing(2),
			textAlign: 'center',
			color: theme.palette.text.secondary,
			alignItems: "center"
		},
	}),
);

export default function Browser() {
	const [page, setPage] = useState(1);
	const [gen, setGen] = useState(0);
	const [cards, setCards] = useState<PokecardData[]>([]);
	const [fetching, setFetching] = useState(true);
	// const [loadMoreURL, setLoadMoreURL] = useState("");

	const handleGen = (generation: number) => {
		setGen(generation)
	}

	const styles = useStyles();

	useEffect(() => {
		axios.get(`https://pokeapi.co/api/v2/pokemon?limit=16&offset=${GenerationFirstPokemon[gen - 1]}`)
		.then(res => {
			setCards(res.data.results);

			setFetching(false);
		})
	}, [gen]);

	// TODO add load more functionality
	// const clickLoadMore = () => {
	// 	if (!loadMoreURL) return;

	// 	console.log(loadMoreURL)

	// 	axios.get(loadMoreURL)
	// 	.then(res => {
	// 		setCards(oldCards => [...oldCards, res.data.results]);

	// 		setLoadMoreURL(res.data.next);
	// 	}).catch(() => {
	// 		console.log("error?")
	// 	})
	// }

	return (
		<>
			<Filters handleClick={handleGen}/>

			<Grid container spacing={5}>
			{
				fetching && <p>Loading...</p> || cards.map(card => {
					return (
						<Grid item xs={12} md={6} lg={4}>
							<Pokecard key={card.name} url={card.url}/>
						</Grid>
					)
				})
			}

			</Grid>

			<button>Load More...</button>
		</>
	)
}

//
