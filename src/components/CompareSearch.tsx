import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import { CssBaseline, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { POKEMON_LIST } from '../data';
import { FindPokemonByID } from '../utils/PokemonSearch';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: "100%",
	  color: "#FAFAFF",
	},
	input: {
		color: "#FAFAFF",
	}
  }));

export default function CompareSearch(props: any) {
  const classes = useStyles();

  const handleOnChange = (event: object, value: any) => {
	props.onSearch(value.id, props.position)
	}

	const pokemon = FindPokemonByID(parseInt(props.current.index))

  return (
	<>
		<CssBaseline />

		<Autocomplete
		id={props.current.name}
		options={POKEMON_LIST}
		getOptionLabel={(option) => option.identifier}
		style={{ width: "100%" }}
		size="small"
		onChange={handleOnChange}
		renderInput={(params) =>
			<TextField
			{...params}
			label="Search Pokedex"

			variant="outlined"
			/>}
		/>
	</>
);
}
