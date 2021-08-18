import React, { useEffect, useState } from "react";

import axios from "axios";
import Pokecard from "../pokecard/Pokecard";

export default function Browser() {
	const [page, setPage] = useState(1);

	const cards = []

	for (let i = 1; i <= 25; i++) {
		cards.push(<Pokecard index={i} />)
	}

	return (
		<>
		{cards}
		</>
	)
}
