import { Button, Card, CardContent, CssBaseline, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IndexFormat } from "../utils/StringFormat";

// TODO use actual variable names
function createData(name: string, value: string) {
	return {name, value}
}

const useStyles = makeStyles({
	card: {
		backgroundColor: "#efeee9",
	},
	tableKey: {
		width: "20%",
		textAlign: "center",
		color: "#283E58",
		borderColor: "#778596"
	},
	tableValue: {
		borderColor: "#778596",
		textAlign: "left",
		color: "#283E58"
	},
	table: {
		backgroundColor: "#efeee9",
	}
});

// TODO use color from pokemon-color fetch
export default function Trivia(props: any) {
	const [color, setColor] = useState();
	const classes = useStyles();
	const [rows, setRows] = useState<[[string, string]]>();

	useEffect(() => {
		const tempRows: any = [];

		tempRows.push(["Name", props.pokemon.name.toUpperCase()]);
		tempRows.push(["Ability", props.pokemon.abilities[0].ability.name.toUpperCase()]);
		tempRows.push(["Index", "#" + IndexFormat(props.pokemon.index)]);

		setRows(tempRows)
	}, [])

	if (!rows) return (<p>loading...</p>)

	return (
		<Card className={classes.card}>
			<CssBaseline />

			<CardContent>
				<Typography style={{color: "#283E58", paddingBottom: 10}} variant="h4" align='left'>Pokemon Information</Typography>

				<TableContainer>
					<Table>
						<TableBody className={classes.table}>
							{rows.map((row) => {
								return (
									<TableRow key={row[0]}>
									<TableCell className={classes.tableKey}>{row[0]}</TableCell>
									<TableCell className={classes.tableValue}>{row[1]}</TableCell>
									</TableRow>
								)
							})}
						</TableBody>
					</Table>
				</TableContainer>
			</CardContent>
		</Card>
	)
}
