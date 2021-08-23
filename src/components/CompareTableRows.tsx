import { TableRow, TableCell, makeStyles } from "@material-ui/core";
import React from "react";
import { IPokemonInformation } from "../types/PokemonOverview";
import { IndexFormat, NameFormat } from "../utils/StringFormat";
import TypeBadges from "./TypeBadges";

export interface ICompareTableRows {
	comparedPokemon: IPokemonInformation[];
}

// Array of all variables which are compared, and which order they are presented in
const columns = [
	"name",
	"icon",
	"index",
	"types",
	"height",
	"weight",
	"attack",
	"defense",
	"hp",
	"special-attack",
	"special-defense",
	"speed",
];

// Allows for returning dynamic JSX depending on the row, such as using TypeBadges component for the types
const getRowJSX = (row: string, pokemon: IPokemonInformation) => {
	switch (row) {
		case "name":
			return <>{NameFormat(pokemon.name)}</>;

		case "icon":
			return <img alt={pokemon.name} src={pokemon.icon} />;

		case "index":
			return "#" + IndexFormat(pokemon.index);

		case "types":
			return (
				<>
					{Object.keys(pokemon.types).map((key, index) => {
						return (
							<TypeBadges
								key={pokemon.types[key]}
								label={pokemon.types[key]}
								style={{ width: "200px" }}
							/>
						);
					})}
				</>
			);

		default:
			return <>{pokemon[row]}</>;
	}
};

const useStyles = makeStyles({
	cell: {
		color: "#283E58",
		textAlign: "center",
		width: "40%",
	},
	cellKey: {
		width: "20%",
		color: "#283E58",
		textAlign: "center",
	},
});

const CompareTableRows: React.FC<ICompareTableRows> = ({ comparedPokemon }) => {
	const classes = useStyles();

	return (
		<>
			{columns.map((column: string) => {
				return (
					<TableRow key={column}>
						<TableCell className={classes.cellKey}>
							{NameFormat(column)}
						</TableCell>
						{
							// Display each pokemon's value
							comparedPokemon.map((pokemon: IPokemonInformation) => {
								return (
									<TableCell key={pokemon.name} className={classes.cell}>
										{getRowJSX(column, pokemon)}
									</TableCell>
								);
							})
						}
					</TableRow>
				);
			})}
		</>
	);
};

export default CompareTableRows;
