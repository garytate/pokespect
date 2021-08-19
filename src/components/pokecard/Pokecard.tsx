import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';

import axios from "axios";
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, makeStyles, Typography } from "@material-ui/core";

const cardStyles = makeStyles((theme: any) => ({
	container: {
		display: "flex",
		width: 200
	},
	sprite: {
		width: 100
	},
	info: {
		padding: 0
	},
	text: {
		textAlign: "left"
	}
}));

export default function Pokecard(props: any) {
	const styles = cardStyles();
	const [pokemon, setPokemon] = useState({name: "Generic Pokemon", sprite: "", index: 0});
	const [fetching, setFetching] = useState(true);

	useEffect(() => {
		axios.get(props.url)
		.then(res => {
			setPokemon({
				name: res.data.name,
				sprite: res.data.sprites.front_default,
				index: res.data.id
			})

			setFetching(false);
		})
	}, []);

	if (fetching) return (<p>Loading...</p>);

	return (
		<Card className={styles.container} variant="outlined">
			<CardMedia
				component="img"
				className={styles.sprite}
				image={pokemon.sprite}
				title={pokemon.name}
			/>
			<div >
				<CardContent className={styles.info}>
					<Typography className={styles.text} variant="body1" align="right">
						{pokemon.name}
					</Typography>
					<Typography variant="subtitle1">
						#{pokemon.index}
					</Typography>
				</CardContent>
			</div>
		</Card>
	)
}
