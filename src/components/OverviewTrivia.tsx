import {
	Card,
	CardContent,
	CssBaseline,
	makeStyles,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { IndexFormat, NameFormat } from "../utils/StringFormat";

const useStyles = makeStyles({
	card: {
		backgroundColor: "#f4f3ee",
	},
	tableKey: {
		width: "20%",
		textAlign: "center",
		color: "#283E58",
		borderColor: "#778596",
	},
	tableValue: {
		borderColor: "#778596",
		textAlign: "left",
		color: "#283E58",
	},
	table: {
		backgroundColor: "#f4f3ee",
	},
});

export default function OverviewTrivia(props: any) {
	const classes = useStyles();
	const [rows, setRows] = useState<[[string, string]]>();

	useEffect(() => {
		const tempRows: any = [];

		tempRows.push(["NAME", NameFormat(props.pokemon.name)]);
		tempRows.push([
			"ABILITY",
			NameFormat(props.pokemon.abilities[0].ability.name),
		]);
		tempRows.push(["INDEX", "#" + IndexFormat(props.pokemon.index)]);

		setRows(tempRows);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!rows) return <p>loading...</p>;

	return (
		<Card className={classes.card}>
			<CssBaseline />

			<CardContent>
				<Typography
					style={{ color: "#283E58", paddingBottom: 10 }}
					variant="h4"
					align="left"
				>
					Pokemon Information
				</Typography>

				<TableContainer>
					<Table>
						<TableBody className={classes.table}>
							{rows.map((row) => {
								return (
									<TableRow key={row[0]}>
										<TableCell className={classes.tableKey}>{row[0]}</TableCell>
										<TableCell className={classes.tableValue}>
											{row[1]}
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
			</CardContent>
		</Card>
	);
}
