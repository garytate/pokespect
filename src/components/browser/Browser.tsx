import React, { useEffect, useState } from "react";

import axios from "axios";
import Pokecard from "../pokecard/Pokecard";

export default function Browser() {
	const [page, setPage] = useState(1);

	const cards = []

	for (let i = 1; i <= 24; i++) {
		cards.push(<Pokecard index={i} />)
	}

	return (
		<>
			<div className="grid grid-cols-4">
				{cards}
			</div>
		</>
	)
}
