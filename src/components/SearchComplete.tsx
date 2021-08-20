/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { POKEMON_LIST } from '../data';
import { Redirect, useHistory } from 'react-router-dom';

let shouldRedirect = false;

export default function SearchComplete(props: any) {
	const history = useHistory();

	const handleOnChange = (event: any) => {
		if (event.keyCode === 13) {
			let search = event.target.value

			for (var i = 1; i < POKEMON_LIST.length; i++) {
				if (search === POKEMON_LIST[i].identifier) {
					history.push(`/pokemon/${POKEMON_LIST[i].id}`)
				}
			}
		}
	}

	return (
		<>

		<Autocomplete
		id="combo-box-demo"
		options={POKEMON_LIST}
		getOptionLabel={(option) => option.identifier}
		style={{ width: "100%" }}
		renderInput={(params) =>
			<TextField
			{...params}
			label="Search Pokedex"
			variant="outlined"
			onKeyDown={handleOnChange}
			/>}
		/>
		</>
  );
}
