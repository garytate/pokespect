import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export default function Pokedata(props: any) {
	const { index } = useParams<{index: string}>();
	const [overview, setOverview] = useState<any>({});

	useEffect(() => {
		axios.get(`https://pokeapi.co/api/v2/pokemon/${index}/`)
		.then(res => {
			setOverview(res.data)

			console.log("HI")
			console.log(overview)
		})
	}, []);

	return (
		<>
		<Link to="/"><p>home</p></Link>
		<p>{overview.name}</p>
		</>
	)
}
