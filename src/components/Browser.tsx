import React, { useEffect, useState } from "react";

import axios from "axios";
import Pokecard from "./BrowserCard";
import Filters from "./BrowserFilters";

import { PokecardData, GenerationFirstPokemon } from "../types";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Grid, IconButton } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import BrowserSearch from "./BrowserSearch";

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

	const [currentPage, setCurrentPage] = useState(1);
	const [nextPage, setNextPage] = useState("");

	const styles = useStyles();

	const handleGen = (generation: number) => {
		setGen(generation)
	}

	const handleLoadMore = () => {
		axios.get(nextPage)
		.then(res => {
			setCards(cards.concat(res.data.results))
			setNextPage(res.data.next)
		})
	}

	useEffect(() => {
		axios.get(`https://pokeapi.co/api/v2/pokemon?limit=18&offset=${GenerationFirstPokemon[gen - 1]}`)
		.then(res => {
			setCards(res.data.results);
			setNextPage(res.data.next);

			setFetching(false);
		})
	}, [gen]);

	return (
		<>
			<Grid container spacing={2} alignItems="center" justifyContent="center">
				<BrowserSearch item xs={6}/>
				<Filters item xs={6} handleClick={handleGen} />
			</Grid>

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

			<IconButton onClick={handleLoadMore} aria-label="load-more">
				<ExpandMore fontSize="large" style={{color: "#283E58"}} />
			</IconButton>
		</>
	)
}
