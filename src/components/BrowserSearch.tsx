/* eslint-disable no-use-before-define */
import React from "react";
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { POKEMON_LIST } from "../data";
import { useHistory } from "react-router-dom";

const BrowserSearch: React.FC<any> = () => {
	const history = useHistory();

	const handleOnChange = (event: any, value: any) => {
		for (var i = 1; i < POKEMON_LIST.length; i++) {
			if (value === POKEMON_LIST[i]) {
				history.push(`/pokemon/${POKEMON_LIST[i].id}`);
			}
		}
	};

	return (
		<Autocomplete
			id="pokedex-autocomplete"
			options={POKEMON_LIST}
			getOptionLabel={(option) => option.identifier}
			style={{ width: "25vh" }}
			onChange={handleOnChange}
			renderInput={(params) => (
				<TextField {...params} label="Search Pokedex" variant="outlined" />
			)}
		/>
	);
};

export default BrowserSearch;
