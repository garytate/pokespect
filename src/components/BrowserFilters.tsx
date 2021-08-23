import { FormControl, InputLabel, Select } from "@material-ui/core";
import React from "react";

// export interface BrowserFiltersProps extends React.ElementType {
// 	handleClick: Function;
// 	item: Boolean;
// }

const BrowserFilters: React.FC<any> = (props: any) => {
	const handleGenChange = (event: any) => {
		let gen = event.target.value !== "" ? event.target.value : 0

		props.handleClick(gen)
	}

	return (
		<div style={{padding: "20px"}}>
			<FormControl>
        <InputLabel htmlFor="generationSelection">Generation</InputLabel>
        <Select
          native
					onChange={handleGenChange}
        >
          <option value="" aria-label="None" />
          <option value={1}>Generation I</option>
					<option value={2}>Generation II</option>
					<option value={3}>Generation III</option>
					<option value={4}>Generation IV</option>
					<option value={5}>Generation V</option>
					<option value={6}>Generation VI</option>
					<option value={7}>Generation VII</option>
					<option value={8}>Generation VIII</option>
        </Select>
      </FormControl>
		</div>
	)
}

export default BrowserFilters;
