import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, makeStyles, Container } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import NameFormat from "../utils/StringFormat";

const useStyles = makeStyles({
	table: {
	  minWidth: 650,
	},
	header: {
		color: "#FAFAFF"
	}
  });

export default function Compare(props: any) {
	const [leftPokemon, setLeftPokemon] = useState<any>();
	const [rightPokemon, setRightPokemon] = useState<any>();
	const [lFetching, setLFetching] = useState(true);
	const [rFetching, setRFetching] = useState(true);
	const [error, setError] = useState<any>(null);

	const classes = useStyles();

	const {index, compare} = useParams<{index: string, compare: string}>();

	useEffect(() => {
		axios.get(`https://pokeapi.co/api/v2/pokemon/${index}/`)
		.then(res => {
			setLeftPokemon({
				name: NameFormat(res.data.name),
				index: res.data.order,
				types: res.data.types,
				stats: res.data.stats,
				icon: res.data.sprites.other["official-artwork"].front_default,
				category: "",
				abilities: res.data.abilities
			})

			setLFetching(false);
		})
		.catch(err => {
			setError(err.message)
		})

		axios.get(`https://pokeapi.co/api/v2/pokemon/${compare}/`)
		.then(res => {
			setRightPokemon({
				name: NameFormat(res.data.name),
				index: res.data.order,
				types: res.data.types,
				stats: res.data.stats,
				icon: res.data.sprites.other["official-artwork"].front_default,
				category: "",
				abilities: res.data.abilities
			})

			setRFetching(false);
		})
		.catch(err => {
			setError(err.message)
		})
	}, [])

	if (error) return (<p>{error}</p>);
	if (rFetching || lFetching) return (<p>Loading...</p>);

	return (
	<Container maxWidth="sm">
		<TableContainer>
			<Table aria-label="simple table">
				<TableHead>
				<TableRow>
					<TableCell className={classes.header} align="center">{leftPokemon.name}</TableCell>
					<TableCell></TableCell>
					<TableCell className={classes.header} align="center">{rightPokemon.name}</TableCell>
				</TableRow>
				</TableHead>
				<TableBody>
				</TableBody>
			</Table>
		</TableContainer>
	</Container>
	)
}
