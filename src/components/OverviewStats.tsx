import { useTheme, LinearProgress, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CssBaseline, Box, Typography, Card, CardContent } from "@material-ui/core";
import React, { useEffect, useState } from "react";

const useStyles = makeStyles({
	tableKey: {
		width: "10%",
		borderBottom: "none",
		textAlign: "center",
		color: "#FAFAFF"
	},
	tableCell: {
		borderBottom: "none"
	},
	table: {
		backgroundColor: "#283D58",

	},
	card: {
		height: "100%",
		backgroundColor: "#283D58",
	},
	root: {
		borderRadius: 8
	}
});

const LinearProgressWithLabel = (props: any & { value: number }) => {
	return (
	  <Box display="flex" alignItems="center">
		<Box width="100%" mr={1}>
		  <LinearProgress variant="determinate" {...props} />
		</Box>
		<Box minWidth={35}>
		  <Typography variant="body2" color="primary">{`${Math.round(
			props.value,
		  )}`}</Typography>
		</Box>
	  </Box>
	);
  }

export default function PokeStats(props: any) {
	const [stats, setStats] = useState<any[]>([{}])
	const [loading, setLoading] = useState(true);
	const classes = useStyles();

	useEffect(() => {
		let tempStats = []

		for (const stat of props.stats) {
			tempStats.push({
				base: stat.base_stat,
				effort: stat.effort,
				name: stat.stat.name.replace("-", " ")
			})
		}

		setStats(tempStats);

		setLoading(false);
	}, []);

	if (loading) return (<p>loading</p>)

	// <LinearProgress color="primary" value={1} variant="determinate"/>

	// TODO add min/max values to the stats

	return (
		<Card className={classes.card}>
			<CssBaseline />

			<CardContent>
				<Typography style={{color: "#FAFAFF", paddingBottom: 30}} variant="h5" align='left'>Pokemon Information</Typography>

				<TableContainer className={classes.root}>
					<Table>
						<TableBody className={classes.table}>
							{stats.map(row => {
								return (
									<TableRow key={row.name}>
									<TableCell className={classes.tableKey}>{row.name.toUpperCase()}</TableCell>
									<TableCell className={classes.tableCell}><LinearProgressWithLabel value={50} /></TableCell>
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
