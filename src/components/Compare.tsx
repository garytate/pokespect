import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, makeStyles, Container } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { NameFormat, IndexFormat } from "../utils/StringFormat";
import CompareSearch from "./CompareSearch";

const useStyles = makeStyles({
	table: {
	  minWidth: 650,
	},
	header: {
		color: "#FAFAFF"
	},
	cell: {
		color: "#FAFAFF",
		textAlign: "center",
		borderBottom: "none"
	},
	cellKey: {
		width: "20%",
		color: "#FAFAFF",
		textAlign: "right",
		borderBottom: "none"
	}
  });

  const columns = ["name", "index", "height", "weight", "attack", "defense", "hp", "special-attack", "special-defense", "speed"]

export default function Compare(props: any) {
	const {index, compare} = useParams<{index: string, compare: string}>();
	const classes = useStyles();

	const [leftPokemon, setLeftPokemon] = useState<any>({});
	const [rightPokemon, setRightPokemon] = useState<any>({});
	const [loading, setLoading] = useState(0);

	const onSearchUpdated = (index: string, position: number) => {
		handleInfoFetch(index, position)
	}

	const handleInfoFetch = (index: string, position: number) => {
		axios.get(`https://pokeapi.co/api/v2/pokemon/${index}/`)
		.then(res => {
			let dataTable: any = {}

			dataTable.name = NameFormat(res.data.name);
			dataTable.index = IndexFormat(res.data.id);
			dataTable.stats = res.data.stats;
			dataTable.height = res.data.height + 'cm';
			dataTable.weight = res.data.weight + 'kg';

			for (const type in res.data.stats) {
				dataTable[res.data.stats[type].stat.name] = res.data.stats[type].base_stat
			}
			setLoading(loading + 1);

			// TODO change this
			if (position === 1) {
				setLeftPokemon(dataTable)
			} else {
				setRightPokemon(dataTable)
			}
		})
		.catch(err => {
			console.error(err)
		})
	}

	useEffect(() => {
		handleInfoFetch(index, 1)
		handleInfoFetch(compare, 2)
	}, []);

	if (loading < 1) return (<p>Loading</p>);

	return (
	<Container maxWidth="sm">
		<TableContainer>
			<Table aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell></TableCell>
						<TableCell className={classes.header} align="center"><CompareSearch onSearch={onSearchUpdated} position={1} current={leftPokemon}/></TableCell>
						<TableCell className={classes.header} align="center"><CompareSearch onSearch={onSearchUpdated} position={2} current={rightPokemon}/></TableCell>
					</TableRow>
				</TableHead>
				<TableBody >
				{
					columns.map(column => {
						return (
							<TableRow key={column}>
								<TableCell className={classes.cellKey}>{column.toUpperCase()}</TableCell>
								<TableCell className={classes.cell}>{leftPokemon[column]}</TableCell>
								<TableCell className={classes.cell}>{rightPokemon[column]}</TableCell>
							</TableRow>
						)
					})
				}
				</TableBody>
			</Table>
		</TableContainer>
	</Container>
	)
}
