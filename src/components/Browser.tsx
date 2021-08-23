import React, { useEffect, useState } from "react";
import Pokecard from "./BrowserCard";
import Filters from "./BrowserFilters";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Container, Grid, IconButton } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import BrowserSearch from "./BrowserSearch";
import { fetchPokemonPage } from "../api/PokemonAPI";

// We know for certain the first index of each
// generation, making a simple look-up table
const GenerationFirstPokemon = [0, 151, 251, 386, 493, 649, 721, 809];

interface PokecardData {
	name: "loading...";
	url: "";
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		card: {
			alignItems: "center",
			justifyContent: "center",
			display: "grid",
			padding: 10
		},
		browser: {
			marginTop: 2
		}
	}),
);

export default function Browser() {
	const [gen, setGen] = useState(0);
	const [cards, setCards] = useState<PokecardData[]>([]);
	const [nextPage, setNextPage] = useState<string>();

	const styles = useStyles();

	const handleGen = (generation: number) => {
		setGen(generation)
	}

	const handleLoadMore = async () => {
		try {
			const offset = GenerationFirstPokemon[gen - 1];
			const url = nextPage || `https://pokeapi.co/api/v2/pokemon?limit=18&offset=${offset}`;

			const pageInfo = await fetchPokemonPage(url);

			setCards(cards.concat(pageInfo.results));
			setNextPage(pageInfo.next);
		} catch ( err ) {
			console.error(err)
		}
	}

	useEffect(() => {
		handleLoadMore();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [gen]);

	if (!cards) return <p>loading...</p>;

	return (
		<Container>
			<Grid container alignItems="center" justifyContent="center">
				<BrowserSearch item md={6} />
				<Filters item md={6} handleClick={handleGen} />
			</Grid>

			<Grid container spacing={2}>
				{cards.map(card => {
					return (
						<Grid key={card.name} className={styles.card} item xs={12} md={6} lg={4}>
							<Pokecard url={card.url}/>
						</Grid>
					)
			})}

			</Grid>


			<IconButton onClick={handleLoadMore} aria-label="load-more">
				<ExpandMore fontSize="large" style={{color: "#283E58"}} />
			</IconButton>
		</Container>
	)
}
