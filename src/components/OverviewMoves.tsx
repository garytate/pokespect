import {
	makeStyles,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	CssBaseline,
	Typography,
	Card,
	CardContent,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { fetchMoveInformation } from "../api/PokemonAPI";
import { IPokemonMove } from "../types/PokemonOverview";
import { NameFormat } from "../utils/StringFormat";
import TypeBadges from "./TypeBadges";

const useStyles = makeStyles({
	tableKey: {
		width: "10%",
		textAlign: "center",
		color: "#283E58",
		borderColor: "#778596",
	},
	tableCell: {
		borderColor: "#778596",
	},
	table: {
		backgroundColor: "#f4f3ee",
	},
	card: {
		height: "100%",
		backgroundColor: "#f4f3ee",
	},
	root: {
		borderRadius: 8,
	},
});

function OverviewMovesRow(props: any) {
	const [move, setMove] = useState<IPokemonMove>();
	const classes = useStyles();

	useEffect(() => {
		fetchMoveInformation(props.url).then((data) => {
			setMove(data);
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!move) return <TableRow />;

	return (
		<TableRow key={move.name}>
			<TableCell className={classes.tableKey}>
				<TypeBadges key={move.type} label={move.type} />{" "}
			</TableCell>
			<TableCell className={classes.tableKey}>
				{NameFormat(move.name)}
			</TableCell>
			<TableCell className={classes.tableKey}>{move.accuracy}</TableCell>
			<TableCell className={classes.tableKey}>{move.power}</TableCell>
			<TableCell className={classes.tableKey}>{move.pp}</TableCell>
		</TableRow>
	);
}

export default function OverviewMoves(props: any) {
	const [moveRows, setMoveRows] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const classes = useStyles();

	useEffect(() => {
		let tempRows: any[] = [];

		for (const move of props.moves) {
			tempRows.push(
				<OverviewMovesRow key={move.move.name} url={move.move.url} />
			);
		}

		setMoveRows(tempRows);
		setLoading(false);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (loading) return <></>;

	return (
		<Card className={classes.card}>
			<CssBaseline />

			<CardContent>
				<Typography
					style={{ color: "#283E58", paddingBottom: 10 }}
					variant="h4"
					align="left"
				>
					Attack Moves
				</Typography>

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
						<TableBody className={classes.table}>{moveRows}</TableBody>
					</Table>
				</TableContainer>
			</CardContent>
		</Card>
	);
}
