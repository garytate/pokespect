import { Button, Container, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import OverviewStats from "./OverviewStats";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Trivia from "./OverviewTrivia";
import TypeBadges from "./TypeBadges";
import OverviewMoves from "./OverviewMoves";
import { NameFormat } from "../utils/StringFormat";
import { IPokemonInformation } from "../types/PokemonOverview";
import { fetchPokemonInformation } from "../api/PokemonAPI";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		image: {
			"max-width": "100%",
			alignContent: "center"
		}
	}),
);

export default function Overview(props: any) {
	const { index } = useParams<{index: string}>();
	const [overview, setOverview] = useState<IPokemonInformation>();

	const styles = useStyles();

	useEffect(() => {
		(async() => {
			try {
				const pokemonInformation = await fetchPokemonInformation(index);

				setOverview(pokemonInformation);
			} catch (err) {
				console.error(err);
			}

		})()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!overview) return (<p>loading...</p>)

	return (
		<Container>

		<Grid container spacing={2} style={{marginTop: 2}}>
			<Grid item xs={12} md={4}>
				<Link to="/"><Typography variant="h6" style={{paddingTop: 20, textDecoration: "none"}}>Return to Pokedex</Typography></Link>
			</Grid>
			<Grid item xs={12} md={4}>
				<Typography variant="h4" style={{paddingTop: 20}}>{NameFormat(overview.name)}</Typography>
			</Grid>
			<Grid item xs={12} md={4}>
			<Link to={`/pokemon/${overview.index}/compare/0`}>
					<Button style={{margin: "20px 10px 0px 0px", textDecoration: "none"}} variant="contained" color="primary">
						Compare
					</Button>
				</Link>
			</Grid>
			<Grid item md={4} xs={12}>
				<img alt={overview.name} className={styles.image} src={overview.artwork} />
				{overview.types.map((type: any) => {
					return (
						<TypeBadges key={type} label={type} />
					)
				})}
			</Grid>
			<Grid item xs={12} md={8}>
			<OverviewStats stats={overview.stats} />
			</Grid>
			<Grid item md={6} xs={12}>
				<Trivia pokemon={overview} />
			</Grid>
			<Grid item xs={12} md={6}>
			<OverviewMoves moves={overview.moves} />
			</Grid>
		</Grid>
		</Container>
	)
}
