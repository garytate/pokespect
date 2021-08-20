import { useTheme, LinearProgress, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CssBaseline, Box, Typography } from "@material-ui/core";
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
		<TableContainer className={classes.root}>
			<CssBaseline />

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
	)
}
