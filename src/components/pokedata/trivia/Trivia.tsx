import { Button, Card, CardContent, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";

// TODO use actual variable names
function createData(name: string, value: string) {
	return {name, value}
}

const useStyles = makeStyles({
	card: {
		height: "100%"
	}
});

// TODO use color from pokemon-color fetch
export default function Trivia(props: any) {
	const [color, setColor] = useState();
	const classes = useStyles();
	const [rows, setRows] = useState<[[string, string]]>();

	useEffect(() => {
		const tempRows: any = [];
		tempRows.push(["Name", props.pokemon.name]);
		tempRows.push(["Ability", props.pokemon.abilities[0].ability.name]);
		tempRows.push(["Index", props.pokemon.index]);

		setRows(tempRows)
	}, [])

	if (!rows) return (<p>loading...</p>)

	return (
		<Card className={classes.card}>
			<CardContent>
				<Typography variant="h5" align='left'>Pokemon Information</Typography>

				<TableContainer component={Paper}>
					<Table>
						<TableBody>
							{rows.map((row) => {
								return (
									<TableRow key={row[0]}>
									<TableCell style={{width: "20%"}}>{row[0]}</TableCell>
									<TableCell>{row[1]}</TableCell>
									</TableRow>
								)
							})}
						</TableBody>
					</Table>
				</TableContainer>

				<Button style={{margin: "20px"}} variant="contained" color="primary">
					Compare
				</Button>
				<Button style={{margin: "20px"}} variant="contained" color="primary">
					FAVOURITE
				</Button>
			</CardContent>
		</Card>
	)
}
