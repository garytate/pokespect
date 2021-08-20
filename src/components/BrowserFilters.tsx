import { Button, Menu, MenuItem } from "@material-ui/core";
import React, { useState } from "react";

export default function Filters(props: any) {
	// these are referenced from material-ui docs
	const [anchorEl, setAnchorEl] = useState(null);
	const [buttonText, setButtonText] = useState("Generations");
	// const [buttonVariant, setButtonVariant] = useState("contained");

	const handleClick = (event: any) => setAnchorEl(event.currentTarget);
	const handleClose = () => setAnchorEl(null);

	// TODO add this functionality
	const handleGenChange = (value: any) => {

	}

	// TODO make this auto-generate
	return (
		<div style={{padding: "20px"}}>
			<Button size="small" variant="contained" color="primary" aria-controls="generations-menu" aria-haspopup="true" onClick={handleClick}>
				{buttonText}
			</Button>
			<Menu
				id="generations-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem onClick={() => props.handleClick(0)}>No Filter</MenuItem>
				<MenuItem onClick={() => props.handleClick(1)}>Generation I</MenuItem>
				<MenuItem onClick={() => props.handleClick(2)}>Generation II</MenuItem>
				<MenuItem onClick={() => props.handleClick(3)}>Generation III</MenuItem>
				<MenuItem onClick={() => props.handleClick(4)}>Generation IV</MenuItem>
				<MenuItem onClick={() => props.handleClick(5)}>Generation V</MenuItem>
				<MenuItem onClick={() => props.handleClick(6)}>Generation VI</MenuItem>
				<MenuItem onClick={() => props.handleClick(7)}>Generation VII</MenuItem>
				<MenuItem onClick={() => props.handleClick(8)}>Generation VIII</MenuItem>
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
