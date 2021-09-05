import React, { useEffect, useState } from "react";

import Pokecard from "./BrowserCard";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Container, Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		card: {
			alignItems: "center",
			justifyContent: "center",
			display: "grid",
		},
	})
);

// TODO remove the need for a duplicate browser for favourites
const Favourites = () => {
	const [cards, setCards] = useState<any[]>([]);
	const [fetching, setFetching] = useState(true);

	const styles = useStyles();

	useEffect(() => {
		const favList = localStorage.getItem("favourites");
		const favJSON = favList ? JSON.parse(favList) : {};

		let tempCards = [];

		for (const pokemonName in favJSON) {
			tempCards.push({
				name: pokemonName,
				url: `https://pokeapi.co/api/v2/pokemon/${pokemonName}`,
			});
		}

		setCards(tempCards);
		setFetching(false);
	}, []);

	return (
		<Container>
			<Grid container spacing={2} style={{ marginTop: 2, flexGrow: 1 }}>
				{fetching ? (
					<p>Loading...</p>
				) : cards.length > 0 ? (
					cards.map((card) => {
						return (
							<Grid
								key={card.name}
								className={styles.card}
								item
								xs={12}
								md={6}
								lg={4}
							>
								<Pokecard index={1} />
							</Grid>
						);
					})
				) : (
					<Typography variant="h6">No Favourites!</Typography>
				)}
			</Grid>
		</Container>
	);
};

export default Favourites;
