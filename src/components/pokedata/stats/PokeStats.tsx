import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import React, { useEffect, useState } from "react";

export default function PokeStats(props: any) {
	const [stats, setStats] = useState<any[]>([{}])
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let tempStats = [{}]

		for (const stat of props.stats) {
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

	return (
		<TableContainer component={Paper}>
			<Table>
				<TableBody>
					{stats.map(row => {
						return (
							<TableRow key={row.name}>
							<TableCell>{row.name}</TableCell>
							<TableCell>{row.base}</TableCell>
							<TableCell>{row.effort}</TableCell>
							</TableRow>
						)
					})}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
