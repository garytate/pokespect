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

export default function Favourites() {
	const [cards, setCards] = useState<any[]>([]);
	const [fetching, setFetching] = useState(true);

	const styles = useStyles();

	useEffect(() => {
		const favList = localStorage.getItem("favourites");
		const favJSON = favList ? JSON.parse(favList) : {};

		let tempCards = []

		for (const pokemonName in favJSON) {
			tempCards.push({
				name: pokemonName,
				url: `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
			})
		}

		setCards(tempCards);
		setFetching(false)
	}, []);

	console.log(cards)

	return (
		<>
			<Grid container spacing={2} style={{paddingTop: 15}}>
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
		</>
	)
}
