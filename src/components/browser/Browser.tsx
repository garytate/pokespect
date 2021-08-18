import React, { useEffect, useState } from "react";

import axios from "axios";
import Pokecard from "../pokecard/Pokecard";

export default function Browser() {
	const [page, setPage] = useState(1);

	return (
		<>
		<p>Browser</p>

		<Pokecard index="3"/>
		</>
	)
}
