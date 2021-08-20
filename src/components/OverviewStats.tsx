import { LinearProgress, makeStyles, Table, TableBody, TableCell, TableContainer, TableRow, CssBaseline, Box, Typography, Card, CardContent, withStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";

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
		color: "#283E58",
		backgroundColor: "#efeee9"
	},
	root: {
		borderRadius: 8
	}
});

const BrightLinearProgress = withStyles({
	barColorPrimary: {
		backgroundColor: "#283E58"
	},
	colorPrimary: {
		backgroundColor: "#efeee9"
	}
})(LinearProgress)

const LinearProgressWithLabel = (props: any & { value: number }) => {
	return (
	  <Box display="flex" alignItems="center">
		<Box width="100%" mr={1}>
		  <BrightLinearProgress variant="determinate" {...props} />
		</Box>
		<Box minWidth={35}>
		  <Typography variant="body1" style={{color: "#283E58"}}>{`${Math.round(
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
				name: stat.stat.name.replace("special-", "SP ")
			})
		}

		setStats(tempStats);

		setLoading(false);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (loading) return (<p>loading</p>)

	// TODO add min/max values to the stats

	return (
		<Card className={classes.card}>
			<CssBaseline />

			<CardContent>
				<Typography style={{color: "#283E58", paddingBottom: 10}} variant="h4" align='left'>Pokemon Stats</Typography>

				<TableContainer className={classes.root}>
					<Table>
						<TableBody className={classes.table}>
							{stats.map(row => {
								return (
									<TableRow key={row.name}>
									<TableCell className={classes.tableKey}>{row.name.toUpperCase()}</TableCell>
									<TableCell className={classes.tableCell}><LinearProgressWithLabel value={row.base} /></TableCell>
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
