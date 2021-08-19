import { LinearProgress, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import React, { useEffect, useState } from "react";

const useStyles = makeStyles({
	tableKey: {
		width: "10%"
	}
});

export default function PokeStats(props: any) {
	const [stats, setStats] = useState<any[]>([{}])
	const [loading, setLoading] = useState(true);
	const classes = useStyles();

	useEffect(() => {
		let tempStats = []

		for (const stat of props.stats) {
			console.log(props.stats)
			tempStats.push({
				base: stat.base_stat,
				effort: stat.effort,
				name: stat.stat.name
			})
		}

		setStats(tempStats);

		setLoading(false);
	}, []);

	if (loading) return (<p>loading</p>)

	// TODO add min/max values to the stats

	return (
		<TableContainer>
			<Table>
				<TableBody>
					{stats.map(row => {
						return (
							<TableRow key={row.name}>
							<TableCell className={classes.tableKey}>{row.name}</TableCell>
							<TableCell className={classes.tableKey}>{row.base}</TableCell>
							<TableCell><LinearProgress value={row.base} variant="determinate"/></TableCell>
							</TableRow>
						)
					})}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
