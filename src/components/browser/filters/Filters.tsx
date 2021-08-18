import React from "react";

export default function Filters(props: any) {

	return (
		<>
		<p>Generations</p>
		<button onClick={() => props.handleClick(0)}>All</button>
		<button onClick={() => props.handleClick(1)}>1</button>
		<button onClick={() => props.handleClick(2)}>2</button>
		<button onClick={() => props.handleClick(3)}>3</button>
		<button onClick={() => props.handleClick(4)}>4</button>
		<button onClick={() => props.handleClick(5)}>5</button>
		</>
	)
}
