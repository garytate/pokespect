import { Chip } from "@material-ui/core";
import React, { useEffect, useState } from "react";

const TypeColors: { [key: string]: string } = {
	FIRE: 'Crimson',
	FLYING: 'DeepSkyBlue'
}

export default function TypeBadges(props: any) {
	const [color, setColor] = useState("");

	useEffect(() => {
		let colorName = props.label

		if (colorName)
			setColor(TypeColors[colorName.toUpperCase()]);
	}, [])

	return (
		<Chip style={{margin: 5, padding: 10, backgroundColor: color}} key={props.key} label={props.label} />
	)
}
