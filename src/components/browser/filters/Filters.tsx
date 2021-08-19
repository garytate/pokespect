import { Button, Menu, MenuItem } from "@material-ui/core";
import React, { useState } from "react";

export default function Filters(props: any) {
	// these are referenced from material-ui docs
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event: any) => setAnchorEl(event.currentTarget);
	const handleClose = () => setAnchorEl(null);

	return (
		<div>
			<Button variant="contained" color="primary" aria-controls="generations-menu" aria-haspopup="true" onClick={handleClick}>
				GENERATIONS
			</Button>
			<Menu
				id="generations-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem onClick={handleClose}>No Filter</MenuItem>
				<MenuItem onClick={handleClose}>Generation I</MenuItem>
				<MenuItem onClick={handleClose}>Generation II</MenuItem>
				<MenuItem onClick={handleClose}>Generation III</MenuItem>
				<MenuItem onClick={handleClose}>Generation IV</MenuItem>
				<MenuItem onClick={handleClose}>Generation V</MenuItem>
				<MenuItem onClick={handleClose}>Generation VI</MenuItem>
				<MenuItem onClick={handleClose}>Generation VII</MenuItem>
				<MenuItem onClick={handleClose}>Generation VIII</MenuItem>
			</Menu>
		</div>
	)

	// return (
	// 	<>
	// 	<p>Generations</p>
	// 	<button onClick={() => props.handleClick(0)}>All</button>
	// 	<button onClick={() => props.handleClick(1)}>1</button>
	// 	<button onClick={() => props.handleClick(2)}>2</button>
	// 	<button onClick={() => props.handleClick(3)}>3</button>
	// 	<button onClick={() => props.handleClick(4)}>4</button>
	// 	<button onClick={() => props.handleClick(5)}>5</button>
	// 	</>
	// )
}
