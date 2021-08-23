import React from "react";
import { CssBaseline, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { POKEMON_LIST } from "../data";

export default function CompareSearch(props: any) {
	const handleOnChange = (event: object, value: any) => {
		if (!value) return;

		props.onSearch(value.id, props.position);
	};

	return (
		<>
			<CssBaseline />

			<Autocomplete
				options={POKEMON_LIST}
				getOptionLabel={(option) => option.identifier}
				style={{ width: "100%" }}
				size="small"
				onChange={handleOnChange}
				renderInput={(params) => (
					<TextField {...params} label="Search Pokedex" variant="outlined" />
				)}
			/>
		</>
	);
}
