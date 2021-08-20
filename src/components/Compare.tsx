import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, makeStyles, Container } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { NameFormat, IndexFormat } from "../utils/StringFormat";
import CompareSearch from "./CompareSearch";
import TypeBadges from "./TypeBadges";

const useStyles = makeStyles({
	table: {
	  minWidth: 650,
	},
	header: {
		color: "#283E58"
	},
	cell: {
		color: "#283E58",
		textAlign: "center",
		width: "40%"
	},
	cellKey: {
		width: "20%",
		color: "#283E58",
		textAlign: "center",
	}
  });

  const columns = ["sprite", "name", "index", "types", "height", "weight", "attack", "defense", "hp", "special-attack", "special-defense", "speed"]

export default function Compare(props: any) {
	const {index, compare} = useParams<{index: string, compare: string}>();
	const classes = useStyles();
	const history = useHistory();

	const [leftPokemon, setLeftPokemon] = useState<any>({});
	const [rightPokemon, setRightPokemon] = useState<any>({});
	const [loading, setLoading] = useState(0);

	const onSearchUpdated = (newIndex: string, position: number) => {
		if (position === 1) {
			history.push(`/pokemon/${newIndex}/compare/${compare}`)
		} else {
			history.push(`/pokemon/${index}/compare/${newIndex}`)
		}

		handleInfoFetch(newIndex, position)
	}

	const handleInfoFetch = (index: string, position: number) => {
		if (index === "0") return;

		axios.get(`https://pokeapi.co/api/v2/pokemon/${index}/`)
		.then(res => {
			let dataTable: any = {}

			console.log(res.data.types)

			dataTable.name = NameFormat(res.data.name);
			dataTable.index = "#" + IndexFormat(res.data.id);
			dataTable.stats = res.data.stats;
			dataTable.height = res.data.height + 'cm';
			dataTable.weight = res.data.weight + 'kg';
			dataTable.sprite = <img alt={res.data.name} src={res.data.sprites.front_default} />
			dataTable.types = []

			for (const type in res.data.types) {
				let typeName = res.data.types[type].type.name;

				dataTable.types.push(<TypeBadges key={typeName} label={typeName} style={{width: "200px"}}/>)
			}
			//	dataTable.types = res.data.types

			for (const stat in res.data.stats) {
				dataTable[res.data.stats[stat].stat.name] = res.data.stats[stat].base_stat
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

	return (
	<Container maxWidth="sm">
		<TableContainer>
			<Table aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell className={classes.header} align="center"><CompareSearch onSearch={onSearchUpdated} position={1} current={leftPokemon}/></TableCell>
						<TableCell></TableCell>
						<TableCell className={classes.header} align="center"><CompareSearch onSearch={onSearchUpdated} position={2} current={rightPokemon}/></TableCell>
					</TableRow>
				</TableHead>
				<TableBody >
				{
					columns.map(column => {
						return (
							<TableRow key={column}>
								<TableCell className={classes.cell}>{leftPokemon[column]}</TableCell>
								<TableCell className={classes.cellKey}>{NameFormat(column)}</TableCell>
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
