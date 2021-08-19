import { Button, Card, CardContent, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@material-ui/core";
import React, { useState } from "react";

function createData(name: string, value: string) {
	return {name, value}
}

const rows = [
	createData("pokedex", "132"),
	createData("height", "171cm"),
	createData("weight", "12kg"),
]

const useStyles = makeStyles({
	card: {
		"background-color": "green",
	}
});


export default function Trivia(props: any) {
	const [color, setColor] = useState();
	const classes = useStyles();

	return (
		<Card className={classes.card}>
			<CardContent>
				<Typography variant="h5" align='left'>Pokemon Information</Typography>

				<TableContainer component={Paper}>
					<Table size="small">
						<TableBody>
							{rows.map((row) => {
								return (
									<TableRow key={row.name}>
										<TableCell style={{width: "20%"}}>{row.name}</TableCell>
										<TableCell>{row.value}</TableCell>
									</TableRow>
								)
							})}
						</TableBody>
					</Table>
				</TableContainer>

				<Button style={{padding: "10", margin: "10"}}variant="contained" color="primary">
					Compare
				</Button>
			</CardContent>
		</Card>
	)
}
