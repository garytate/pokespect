import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, makeStyles, Container } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import GetPokemonInformation from "../api/PokemonAPI";
import { IPokemonInformation } from "../types/PokemonOverview";
import { NameFormat, IndexFormat } from "../utils/StringFormat";
import CompareSearch from "./CompareSearch";
import CompareTableRows from "./CompareTableRows";
import TypeBadges from "./TypeBadges";

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

// const columns = ["sprite", "name", "index", "types", "height", "weight", "attack", "defense", "hp", "special-attack", "special-defense", "speed"]



const DefaultPokemonData = {
	name: "-",
	icon: "",
	category: "-",
	index: 1,
	types: {},
	abilities: {},
	stats: {},
}

const Compare: React.FC = () => {
	const {index, compare} = useParams<{index: string, compare: string}>();
	const classes = useStyles();
	const history = useHistory();

	const [leftPokemon, setLeftPokemon] = useState<IPokemonInformation>(DefaultPokemonData);
	const [rightPokemon, setRightPokemon] = useState<IPokemonInformation>(DefaultPokemonData);
	const [loading, setLoading] = useState(0);

	const onSearchUpdated = (newIndex: string, position: number) => {
		if (position === 1) {
			history.push(`/pokemon/${newIndex}/compare/${compare}`)
		} else {
			history.push(`/pokemon/${index}/compare/${newIndex}`)
		}

		handleInfoFetch(newIndex, position)
	}

	const handleInfoFetch = async (index: string, position: number) => {
		if (index === "0") return;

		try {
			const pokemonInformation = await GetPokemonInformation(index);

			setLoading(loading + 1);

			// TODO change this
			if (position === 1) {
				setLeftPokemon(pokemonInformation)
			} else {
				setRightPokemon(pokemonInformation)
			}
		} catch (err) {
			console.error(err)
		}
	}

	useEffect(() => {
		handleInfoFetch(index, 1)
		handleInfoFetch(compare, 2)

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!leftPokemon || !rightPokemon) return <p>hi</p>;

	return (
	<Container maxWidth="md">
		<TableContainer>
			<Table aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell></TableCell>
						<TableCell className={classes.header} align="center"><CompareSearch onSearch={onSearchUpdated} position={1} current={leftPokemon}/></TableCell>
						<TableCell className={classes.header} align="center"><CompareSearch onSearch={onSearchUpdated} position={2} current={rightPokemon}/></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					<CompareTableRows left="1" right="2" />
				</TableBody>
			</Table>
		</TableContainer>
	</Container>
	)
}

export default Compare;

// columns.map(column => {
// 	return (
// 		<TableRow key={column}>
// 			<TableCell className={classes.cell}>{leftPokemon[column]}</TableCell>
// 			<TableCell className={classes.cellKey}>{NameFormat(column)}</TableCell>
// 			<TableCell className={classes.cell}>{rightPokemon[column]}</TableCell>
// 		</TableRow>
// 	)
// })

// <Table aria-label="simple table">
// 				<TableHead>
// 					<TableRow>
// 						<TableCell className={classes.header} align="center"><CompareSearch onSearch={onSearchUpdated} position={1} current={leftPokemon}/></TableCell>
// 						<TableCell></TableCell>
// 						<TableCell className={classes.header} align="center"><CompareSearch onSearch={onSearchUpdated} position={2} current={rightPokemon}/></TableCell>
// 					</TableRow>
// 				</TableHead>
// 				<TableBody >
// 				{
// 					columns.map(column => {
// 						return (
// 							<TableRow key={column}>
// 								<TableCell className={classes.cell}>dev</TableCell>
// 								<TableCell className={classes.cellKey}>dev</TableCell>
// 								<TableCell className={classes.cell}>dev</TableCell>
// 							</TableRow>
// 						)
// 					})
// 				}
// 				</TableBody>
// 			</Table>
