import { TableRow, TableCell, makeStyles } from "@material-ui/core";
import React from "react";
import { IPokemonInformation } from "../types/PokemonOverview";
import { NameFormat } from "../utils/StringFormat";

export interface ICompareTableRows {
	comparedPokemon: IPokemonInformation[];
}

const columns = ["icon", "name", "index", "height"];
// const columns = ["sprite", "name", "index", "types", "height", "weight", "attack", "defense", "hp", "special-attack", "special-defense", "speed"]

const getRowJSX = (row: string, pokemon: IPokemonInformation) => {
	if (row === "name")
		return <>{NameFormat(pokemon.name)}</>;

	if (row === "icon")
		return <img alt={pokemon.name} src={pokemon.icon} />;


	return pokemon[row];
}

const useStyles = makeStyles({
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

const CompareTableRows: React.FC<ICompareTableRows> = ({ comparedPokemon }) => {
	const classes = useStyles();

	return (
		<>
		{
			columns.map((column: string) => {
				return (
					<TableRow key={column}>
						<TableCell className={classes.cellKey}>-</TableCell>
						{
							comparedPokemon.map((pokemon: IPokemonInformation) => {
								return <TableCell key={pokemon.name} className={classes.cell}>{getRowJSX(column, pokemon)}</TableCell>
							})
						}
					</TableRow>
				)
			})
		}
		</>
	)
}

export default CompareTableRows;
