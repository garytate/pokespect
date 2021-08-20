import { useTheme, LinearProgress, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CssBaseline, Box, Typography, Card, CardContent, withStyles } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { NameFormat } from "../utils/StringFormat";
import TypeBadges from "./TypeBadges";

const useStyles = makeStyles({
	tableKey: {
		width: "10%",
		textAlign: "center",
		color: "#283E58",
		borderColor: "#778596"
	},
	tableCell: {
		borderColor: "#778596"
	},
	table: {
		backgroundColor: "#efeee9"
	},
	card: {
		height: "100%",
		backgroundColor: "#efeee9",
	},
	root: {
		borderRadius: 8
	}
});

	// tempStats.push({
			// 	base: stat.base_stat,
			// 	effort: stat.effort,
			// 	name: stat.stat.name.replace("special-", "SP ")
			// })

function OverviewMovesRow(props: any) {
	const [move, setMove] = useState<any>({});
	const [loading, setLoading] = useState(true);
	const classes = useStyles();

	useEffect(() => {
		axios.get(props.url)
			.then(res => {
				console.log(res.data)
				let tempMove = {
					name: res.data.name,
					id: res.data.id,
					type: res.data.type.name,
					accuracy: res.data.accuracy || "-",
					pp: res.data.pp,
					power: res.data.power || "-"
				}

				setMove(tempMove);
				setLoading(false);
				 });
	}, []);

	if (loading) return <p>Loading</p>

	return (
				<TableRow key={move.name}>
					<TableCell className={classes.tableKey}><TypeBadges key={move.type} label={move.type} /> </TableCell>
					<TableCell className={classes.tableKey}>{NameFormat(move.name)}</TableCell>
					<TableCell className={classes.tableKey}>{move.accuracy}</TableCell>
					<TableCell className={classes.tableKey}>{move.power}</TableCell>
					<TableCell className={classes.tableKey}>{move.pp}</TableCell>
				</TableRow>
	)
}

export default function OverviewMoves(props: any) {
	const [moveRows, setMoveRows] = useState<any[]>([])
	const [loading, setLoading] = useState(true);
	const classes = useStyles();

	useEffect(() => {
		let tempRows: any[] = []

		for (const move of props.moves) {
			tempRows.push(<OverviewMovesRow url={move.move.url} />)
		}

		setMoveRows(tempRows);
		setLoading(false);
	}, []);

	if (loading) return (<p>loading</p>)

	return (
		<Card className={classes.card}>
			<CssBaseline />

			<CardContent>
				<Typography style={{color: "#283E58", paddingBottom: 10}} variant="h4" align='left'>Attack Moves</Typography>

				<TableContainer className={classes.root}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell align="center">Type</TableCell>
								<TableCell align="center">Move</TableCell>
								<TableCell align="center">Accuracy</TableCell>
								<TableCell align="center">Power</TableCell>
								<TableCell align="center">PP</TableCell>
							</TableRow>
						</TableHead>
						<TableBody className={classes.table}>
							{moveRows}
						</TableBody>
					</Table>
				</TableContainer>
			</CardContent>
		</Card>
	)
}
