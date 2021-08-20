import React, { useEffect, useState } from "react";

import axios from "axios";
import Pokecard from "./BrowserCard";
import Filters from "./BrowserFilters";

import { PokecardData, GenerationFirstPokemon } from "../types";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		card: {
			alignItems: "center",
			justifyContent: "center",
			display: "grid"
		},
	}),
);

export default function Browser() {
	const [gen, setGen] = useState(0);
	const [cards, setCards] = useState<PokecardData[]>([]);
	const [fetching, setFetching] = useState(true);

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

	if (fetching) return (<p>loading...</p>);

	return (
		<>
			<Filters handleClick={handleGen}/>

			<Grid container spacing={2}>
			{(fetching
					? <p>Loading...</p>
					: cards.map(card => {
					return (
						<Grid key={card.name} className={styles.card} item xs={12} md={6} lg={4}>
							<Pokecard url={card.url}/>
						</Grid>
					)
			}))}

			</Grid>

			<button>Load More...</button>
		</>
	)
}

//