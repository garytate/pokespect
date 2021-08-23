import { TableRow, TableCell, makeStyles } from "@material-ui/core";
import React from "react";
import { IPokemonInformation } from "../types/PokemonOverview";

export interface ICompareTableRows {
	left: string,
	right: string
}

const columns = ["sprite", "name", "index", "height"];

const leftPokemon = {
	name: "-",
	icon: "",
	category: "-",
	index: 1,
	types: {},
	abilities: {},
	stats: {},
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

const CompareTableRows: React.FC<ICompareTableRows> = ({ left, right }) => {
	const classes = useStyles();

	return (
		<>
		{
			columns.map((column: string) => {
				return (
					<TableRow key={column}>
						<TableCell className={classes.cellKey}>-</TableCell>
						<TableCell className={classes.cell}>{left}</TableCell>
						<TableCell className={classes.cell}>{right}</TableCell>
					</TableRow>
				)
			})
		}
		</>
	)
}

export default CompareTableRows;
