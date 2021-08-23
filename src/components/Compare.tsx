import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, makeStyles, Container } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { fetchPokemonInformation } from "../api/PokemonAPI";
import { IPokemonInformation } from "../types/PokemonOverview";
import CompareSearch from "./CompareSearch";
import CompareTableRows from "./CompareTableRows";

const useStyles = makeStyles({
	table: {
	  minWidth: 650,
	},
	header: {
		color: "#283E58"
	},
	cell: {
		color: "#283E58",
		textAlign: "center",
		width: "40%"
	},
	cellKey: {
		width: "20%",
		color: "#283E58",
		textAlign: "center",
	}
  });

const Compare: React.FC = () => {
	const {index, compare} = useParams<{index: string, compare: string}>();
	const classes = useStyles();
	const history = useHistory();

	const [comparedPokemon, setComparedPokemon] = useState<IPokemonInformation[]>([])
	const [loading, setLoading] = useState(true);

	const onSearchUpdated = (newIndex: string, position: number) => {
		if (position === 0) {
			history.push(`/pokemon/${newIndex}/compare/${compare}`)
		} else {
			history.push(`/pokemon/${index}/compare/${newIndex}`)
		}

		handleInfoFetch(newIndex, position)
	}

	const handleInfoFetch = async (index: string, position: number) => {
		if (index === "0") return;

		setLoading(true);

		try {
			const pokemonInformation = await fetchPokemonInformation(index);

			let updatedArray = comparedPokemon || [];
			updatedArray[position] = pokemonInformation;
			setComparedPokemon(updatedArray);

			setLoading(false);
		} catch (err) {
			console.error(err)
		}
	}

	 useEffect(() => {
		(async () => {
			await handleInfoFetch(index, 0)
			await handleInfoFetch(compare, 1)

			setLoading(false);
		})()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (loading) return <p>Loading...</p>

	return (
	<Container maxWidth="md">
		<TableContainer>
			<Table aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell></TableCell>
						<TableCell className={classes.header} align="center"><CompareSearch onSearch={onSearchUpdated} position={0}/></TableCell>
						<TableCell className={classes.header} align="center"><CompareSearch onSearch={onSearchUpdated} position={1}/></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					<CompareTableRows comparedPokemon={comparedPokemon} />
				</TableBody>
			</Table>
		</TableContainer>
	</Container>
	)
}

export default Compare;
